<template>
    <div class="container">
        <div class="grid">
            <template v-for="(image, key) in images">
                <img :src="image" :key="key" v-if="image"/>
            </template>
        </div>
    </div>
</template>

<script>
    import * as axios from "axios";

    export default {
        name: "ImagePage",
        data () {
            return {
                images: []
            }
        },
        props: {
            rover: String,
            token: String
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
            }
        },
        mounted() {
            axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${this.rover}/photos/?earth_date=2015-6-2&api_key=${this.token}`)
                .then(response => {
                    response.data.photos.forEach( (photo) => {
                        //remove images of low resolution
                        let img = new Image();
                        img.onload = () => {
                            if (img.height < 300 || img.width < 300) {
                                let key = this.images.findIndex(url => url === photo.img_src);
                                this.images.splice(key,1);
                            }
                        };
                        img.src = photo.img_src;

                        this.images.push(photo.img_src);
                    });
                    this.images = this.shuffle(this.images);
                });
        }
    }
</script>

<style scoped>
    .container {
        margin: 70px auto 0;
        /*max-width: 1200px;*/
    }

    .container img {
        /*max-width: 100%;*/
        width: 400px;
        margin: 0 1rem 1rem 0;
        display: inline-block;
    }

    .grid {
        columns: 4 200px;
        column-gap: 1rem;
    }

</style>