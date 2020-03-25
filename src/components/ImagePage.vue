<template>
    <div class="container">
        <div class="date-slider">
            <Slider :start="start" :end="end" v-on:date-change="debounceEvent"></Slider>
        </div>
        <div v-if="noImages" class="nothing"> 
            <img src="@/assets/Marvin_the_Martian.png" alt="No Images" class="uh-oh" />
            <span>Nothing to see here</span>
        </div>
        <div class="grid" v-infinite-scroll="loadPhotos" infinite-scroll-disabled="loading" infinite-scroll-distance="200" infinite-scroll-throttle-delay="200">
            <template v-for="(image, key) in images">
                <img :src="image" :key="key" v-if="image"/>
            </template>
        </div>
        <div v-if="loading" class="loading-container"> 
            <Loading />
        </div>
    </div>
</template>

<script>
    import * as axios from "axios";
    import Slider from "./Slider";
    import Loading from "./Loading";
    import _ from 'lodash';
    import infiniteScroll from 'vue-infinite-scroll'; 

    export default {
        name: "ImagePage",
        components: {
            Slider,
            Loading
        },
        directives: {infiniteScroll},
        data () {
            return {
                images: [],
                debounce:  _.debounce( function(event){
                        this.images = [];
                        this.page = 1;
                        this.selectedDate = event;
                        this.loadPhotos();
                    }, 2000),
                loading: true,
                page: 1,
                selectedDate: Date,
                noImages: false
            }
        },
        props: {
            rover: String,
            token: String,
            start: Date,
            end: Date
        },
        methods: {
            shuffle: function (array, shuffleStart) {
                let currentIndex = array.length, temporaryValue, randomIndex;
                console.log("start index: " + currentIndex);
                console.log("shuffleStart: " + shuffleStart)

                // While there remain elements to shuffle...
                while (shuffleStart !== currentIndex) {

                    // Pick a remaining element...
                    randomIndex = Math.floor(Math.random() * currentIndex) + shuffleStart;
                    currentIndex -= 1;

                    // And swap it with the current element.
                    temporaryValue = array[currentIndex];
                    array[currentIndex] = array[randomIndex];
                    array[randomIndex] = temporaryValue;
                }
                return array;
            },
            debounceEvent(event) {
                this.debounce(event);
            },
            loadPhotos() {
                const date = this.selectedDate;
                const sizeBeforeLoad = this.images.length;
                if (this.page !== -1) {
                    this.loading = true;
                    axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${this.rover}/photos` +
                                `?earth_date=${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}&api_key=${this.token}&page=${this.page}`)
                    .then(response => {
                        if (response.data.photos.length) {
                            response.data.photos.forEach( (photo) => {
                                this.removeLowResPhotos(photo)

                                this.images.push(photo.img_src);
                            });
                            this.images = this.shuffle(this.images, sizeBeforeLoad);
                            this.loading = false;
                            this.page +=1;
                        } else {
                            if(this.images.length === 0) {
                                this.noImages = true;
                            }
                            this.loading = false;
                            this.page = -1;
                        }
                    });
                }
            },
            removeLowResPhotos(photo) {
                let img = new Image();
                img.onload = () => {
                            if (img.height < 300 || img.width < 300) {
                                let key = this.images.findIndex(url => url === photo.img_src); //find index by url
                                this.images.splice(key,1); //remove index from image array
                            }
                        };
                img.src = photo.img_src;
            }
        },
        mounted() {
            this.selectedDate = this.start;
            this.loadPhotos(this.start);
        }
    }
</script>

<style scoped>
    .container {
        margin: 70px auto 0;
        width: 100%;
    }

    .date-slider {
        margin: -40px 0 30px 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .grid img {
        flex: auto;
        height: 500px;
        width: auto;
        margin: 0 25px 25px 0;
        object-fit: cover;
        border-radius: .25rem;
        filter: drop-shadow(5px 5px 10px black)
    }

    .grid {
        display: flex;
        flex-flow: row wrap;
        margin-left: 25px;
    }

    .uh-oh {
        height: 80%;
        width: auto;
        max-height: 500px;
    }

    .nothing {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    .nothing span {
        font-size: x-large;
    }

</style>