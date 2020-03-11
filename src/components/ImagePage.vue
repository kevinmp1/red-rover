<template>
    <div class="container">
        <div class="grid">
            <template v-for="(image, key) in images">
                <div class="cell" :key="key">
                    <img :src="image"  v-if="image"/>
                </div>
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
        mounted() {
            axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${this.rover}/photos/?earth_date=2015-6-2&api_key=${this.token}`)
                .then(response => response.data.photos.forEach( (photo) => {

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
                }))
        }
    }
</script>

<style scoped>
    .container {
        margin: 70px auto 0;
        max-width: 1200px;
    }

    .container img {
        max-width: 100%;
    }

    .grid {
        display: flex;
        flex-wrap: wrap;
    }

    .cell {
        max-width: 50%;
        flex-grow: 1;
    }

</style>