<template>
    <div class="slider-container"> 
        <div class="box-minmax">
            <span>{{formatDate(start)}}</span><span>{{formatDate(end)}}</span>
        </div>
        <div class="range-container"> 
            <input type="range" class="slideyboi" min="0" step="1" :max="difference" v-model="inputNum" v-on:input="$emit('date-change', picked)"/>
        </div>
        <span class="slide-label">{{formatDate(picked)}}</span>
    </div>
</template>

<script>
    export default {
        name: 'Slider',
        props: {
            start: Date,
            end: Date
        },
        data() {
            return {
                inputNum: 0
            }
        },
        methods: {
            formatDate(date) {
                return date.toLocaleDateString("en-US", {year: 'numeric', month: 'long', day: 'numeric'});
            }
        },
        computed: {
            dates: function() {
                let dates = [];
                for (var i = 1; i <= this.difference; i++) {
                    dates.push(new Date(this.start.getYear(), this.start.getMonth(), i));
                }
                return dates;
            },
            difference: function() {
                const timeDiff = this.end - this.start;
                return timeDiff / (1000 * 3600 * 24);
            },
            picked: function() {
                return new Date( this.start.getTime() + 86400000*this.inputNum);
            }
        }
    }
</script>

<style scoped>
    .slider-container {
        display: flex;
        flex-direction: column;
        width: 80%;
    }
    .box-minmax {
        margin-top: 30px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        font-size: 20px;
        color: #FFFFFF;
    }

    .range-container {
        width: 100%; 
    }

    .slideyboi {
        -webkit-appearance: none;
        width: 100%;
        height: 30px;
        border-radius: 10px;
        background: #d3d3d3;
        outline: none;
        opacity: .8;
        -webkit-transition: .2s;
        transition: opacity .2s;
    }

    .slideyboi:hover {
        opacity: .5;
    }

    .slideyboi::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        height: 30px;
        width: 30px;
        border: 0;
        background: url('~@/assets/rover-minier.png');
        cursor: pointer;
    }

    .slideyboi::-moz-range-thumb {
        height: 30px;
        width: 30px;
        border: 0;
        background: url('~@/assets/rover-minier.png');
        cursor: pointer;
    }

    .slideyboi::-ms-thumb {
        height: 30px;
        width: 30px;
        border: 0;
        background: url('~@/assets/rover-minier.png');
        cursor: pointer;
    }

</style>
