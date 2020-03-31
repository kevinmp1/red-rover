<template>
    <div class="container">
        <div class="date-slider">
            <Slider :start="start" :end="end" v-on:date-change="debounceEvent"></Slider>
        </div>
        <div class="grid">
            <template v-for="(image, key) in images">
                    <img :src="image" :key="key" v-if="image"/>
            </template>
        </div>
        <infinite-loading @infinite="loadPhotos"  ref="infiniteLoading">
            <div slot="no-results" class="nothing"> 
                <img src="@/assets/Marvin_the_Martian.png" alt="No Images" class="uh-oh" />
                <span>Nothing to see here</span>
            </div>
            <div slot="spinner" class="loading-container"> 
                <Loading />
            </div>
            <div slot="no-more">No more images ヽ༼ຈʖ̯ຈ༽ﾉ</div>
        </infinite-loading>
    </div>
</template>

<script>
    import * as axios from "axios";
    import Slider from "../slider/Slider";
    import Loading from "../general/Loading";
    import _ from 'lodash';
    import InfiniteLoading from 'vue-infinite-loading';

    export default {
        name: "ImagePage",
        components: {
            Slider,
            Loading,
            InfiniteLoading
        },
        data () {
            return {
                images: [],
                debounce:  _.debounce( function(event){
                        this.images = [];
                        this.page = 1;
                        this.selectedDate = event;
                        this.$refs.infiniteLoading.stateChanger.reset();
                    }, 2000),
                page: 1,
                selectedDate: Date
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
            loadPhotos($state) {
                const date = this.selectedDate;
                const sizeBeforeLoad = this.images.length;
                axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${this.rover}/photos` +
                            `?earth_date=${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}&api_key=${this.token}&page=${this.page}`)
                .then(response => {
                    if (response.data.photos.length) {
                        response.data.photos.forEach( (photo) => {
                            this.images.push(photo.img_src);
                        });
                        this.images = this.shuffle(this.images, sizeBeforeLoad);
                        this.page +=1;
                        this.removeLowResPhotos(response.data.photos);
                        $state.loaded();
                    } else {
                        if(!this.images.length) {
                            $state.reset();
                        }
                        $state.complete();
                    }
                });
            },
            removeLowResPhotos(photos) {
                photos.forEach( (photo) => {
                    let img = new Image();
                    img.onload = () => {
                                if (img.height < 300 || img.width < 300) {
                                    let key = this.images.findIndex(url => url === photo.img_src); //find index by url
                                    this.images.splice(key,1); //remove index from image array
                                }
                            };
                    img.src = photo.img_src;
                });
            }
        },
        mounted() {
            this.selectedDate = this.start;
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
        margin-bottom: 50px;
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

    .loading-container {
        height: 200px !important;
        width: 100% !important;
    }

</style>