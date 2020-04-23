<template>
    <div class="full" @click="$emit('close-fullscreen')">
            <div class="content">
                <img :src="img">
            </div>
    </div>
</template>

<script>
    export default {
        name: 'FullscreenImage',
        props: {
            img: String
        }
    }
</script>

<style scoped>
    .full {
        position: fixed;
        left: 0;
        top: 0;
        margin-top: 50px;
        width: 100%;
        height: calc(100% - 50px);
    }

    .full .content {
        background-color: rgba(0,0,0,0.75) !important;
        height: 100%;
        width: 100%;
        display: grid;
    }

    .full .content img {
        left: 50%;
        max-width: 100%;
        max-height: 100%;
        margin: auto;
    }
</style>







