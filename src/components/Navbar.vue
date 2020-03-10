<template>
    <div class="bar">
        <img src="@/assets/rover.png" alt="Red Rover" class="nav-logo"/>

        <div class="options">
            <ul>
                <li><a>Curiosity</a></li>
                <li><a>Spirit</a></li>
                <li><a>Opportunity</a></li>
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
    .bar {
        width: 100%;
        background-color: rgba(52, 6, 10, 0.3);
        height: 50px;
        position: fixed;
        display: flex;
        justify-content: space-between;
        align-items: center;
        line-height: 50px;
    }

    .bar div.options {
        display: flex;
        justify-content: space-between;
    }

    .bar div.options ul li {
        list-style: none;
    }

    .bar div.options ul {
        display: flex;
    }

    .bar div.options ul li a {

    }

    .nav-logo {
        height: 40px;
        width: 40px;
    }
</style>
