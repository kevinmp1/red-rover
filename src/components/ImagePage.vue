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
            axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${this.rover}/photos/?earth_date=2015-6-3&api_key=${this.token}`)
                .then(response => response.data.photos.forEach( (photo) => {
                        this.images.push(photo.img_src);
                }))
        }
    }
</script>

<style scoped>
    .container {
        margin: 0 auto;
        max-width: 1200px;
        padding: 0 1rem;
    }

    .container img {

    }

    .grid {
        display: flex;
        flex-wrap: wrap;
    }

    .cell {
        height: 40vh;
        flex-grow: 1;
    }

</style>