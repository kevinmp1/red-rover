<template>
    <div class="bar">
        <img src="@/assets/rover.png" alt="Red Rover" class="nav-logo" v-on:click="$router.push('/')"/>

        <div class="options">
            <ul>
                <li><router-link to="/rovers/curiosity/images">Curiosity</router-link></li>
                <li><router-link to="/rovers/spirit/images">Spirit</router-link></li>
                <li><router-link to="/rovers/opportunity/images">Opportunity</router-link></li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Navbar',
        props: {
        }
    }
</script>

<style scoped>
    .bar img {
        margin-left: 10px;
        cursor: pointer;
    }

    .bar {
        width: 100%;
        background-color: rgba(52, 6, 10, 0.5);
        height: 50px;
        position: fixed;
        display: flex;
        justify-content: space-between;
        align-items: center;
        line-height: 50px;
        font-size: x-large;
    }

    .bar div.options {
        display: flex;
        justify-content: space-between;
    }

    .bar div.options ul {
        display: flex;
        margin-right: 10px;
    }

    .bar div.options ul li {
        list-style: none;
        margin: 0 10px 0 10px;
        cursor: pointer;
    }

    .bar div.options ul li a {
        color: white;
        text-decoration: none;
    }

    .nav-logo {
        height: 40px;
        width: 40px;
    }
</style>
