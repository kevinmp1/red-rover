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

    export default {
        name: "ImagePage",
        components: {
            Slider,
            Loading
        },
        data () {
            return {
                images: [],
                debounce:  _.debounce( function(event){this.loadPhotos(event)}, 2000),
                loading: false
            }
        },
        props: {
            rover: String,
            token: String,
            start: Date,
            end: Date
        },
        methods: {
            shuffle: function (array) {
                let currentIndex = array.length, temporaryValue, randomIndex;

                // While there remain elements to shuffle...
                while (0 !== currentIndex) {

                    // Pick a remaining element...
                    randomIndex = Math.floor(Math.random() * currentIndex);
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
            loadPhotos(date) {
                this.images = [];
                this.loading = true;
                axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${this.rover}/photos/?earth_date=${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}&api_key=${this.token}`)
                .then(response => {
                    response.data.photos.forEach( (photo) => {
                        this.removeLowResPhotos(photo)

                        this.images.push(photo.img_src);
                    });
                    this.images = this.shuffle(this.images);
                    this.loading = false;
                });
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

    .container img {
        width: 400px;
        margin: 0 1rem 1rem 0;
        display: inline-block;
        border-radius: .25rem;
        filter: drop-shadow(5px 5px 10px black)
    }

    .grid {
        columns: 4 200px;
        column-gap: 1rem;
    }

    @media only screen and (max-width: 1650px) {
        .grid {
            columns: 3 200px;
        }
    }

    @media only screen and (max-width: 1250px) {
        .grid {
            columns: 2 200px;
        }
    }

    @media only screen and (max-width: 900px) {
        .grid {
            display: flex;
            flex-direction: column;
        }
        .container img {
            margin-bottom: 25px;
        }
    }

</style>