<template>
    <svg version="1.1" viewBox="0 0 214 214" id="rocket">
        <g class="rocket_wrap">
            <circle cx="105.5" cy="105.5" r="105.5" class="icon_circle"/>
            <g class="rocket_inner">
                <path class="fire fire_path"  id="fireMiddle" d="M106.891,146.806c3.928,0,7.111,3.176,7.111,7.094 c0,7.78-7.111,16-7.111,16s-7.111-8.349-7.111-16C99.78,149.982,102.963,146.806,106.891,146.806z"/>
                <path class="fire_path fire" id="fireRight" d="M112.063,147.992c3.577-1.624,7.788-0.048,9.408,3.52 c3.216,7.084,0.139,17.508,0.139,17.508s-9.927-4.662-13.09-11.63C106.9,153.823,108.487,149.615,112.063,147.992z"/>
                <path class="fire_path fire" id="fireLeft" d="M101.392,149.419c3.25,2.207,4.098,6.623,1.896,9.864 c-4.372,6.436-14.873,9.238-14.873,9.238s-1.191-10.902,3.108-17.23C93.725,148.049,98.143,147.212,101.392,149.419z"/>
                <path class="fire_path fire" id="fireSmallLeft" d="M101.193 154.431c2.226 0.4 3.7 2.6 3.2 4.8 c-0.875 4.407-5.829 8.264-5.829 8.264s-3.09-5.53-2.229-9.865C96.807 155.4 99 154 101.2 154.431z"/>
                <path class="fire_path fire" id="fireSmallRight" d="M110.089 155.499c2.043-0.985 4.496-0.132 5.5 1.9 c1.952 4 0.3 10.1 0.3 10.107s-5.795-2.56-7.713-6.541C107.186 158.9 108 156.5 110.1 155.499z"/>
                <path class="rocket_bottom" d="M115.069 138.21h-3.292c-1.562-0.048-3.178-0.076-4.846-0.076 s-3.284 0.028-4.846 0.076h-3.292c-7.277-7.938-12.371-26.182-12.371-47.434c0-28.54 9.182-51.676 20.508-51.676 c11.327 0 20.5 23.1 20.5 51.676C127.44 112 122.3 130.3 115.1 138.21z"/> -->
                <g id="right_wing_wrap">
                    <path class="wing_base" d="M124.678 94.061c0 0 17.7 3.3 12.9 48.099l-18.06-14.05 L124.678 94.061z"/>
                    <path class="wing_shadow" d="M116.225 107.236c10.481-5.584 22.7 22.2 21.4 34.9 l-18.06-14.05C119.542 128.1 114.1 111.2 116.2 107.236z"/>
                </g>
                <g id="left_wing_wrap">
                    <path class="wing_base" d="M93.131 128.11l-18.06 14.1 c-4.805-44.793 12.924-48.099 12.924-48.099L93.131 128.11z"/>
                    <path class="wing_shadow" d="M93.131 128.11l-18.06 14.1 c-1.367-12.746 10.896-40.509 21.377-34.924C98.614 111.2 93.1 128.1 93.1 128.11z"/>
                </g>
                <g id="rocket_body_wrap">
                    <path class="rocket_base" d="M120.728 134.258c-3.778-0.623-8.573-0.996-13.796-0.996 s-10.018 0.373-13.795 0.996c-5.033-10.186-8.257-25.808-8.257-43.338c0-30.688 9.873-55.566 22.052-55.566 s22.053 24.9 22.1 55.566C128.984 108.5 125.8 124.1 120.7 134.258z" />
                    <path class="rocket_shadow" d="M103.464 133.317c19.578-40.575 7.26-85.229 4.112-98.067 c11.88 0.9 21.4 25.4 21.4 55.525c0 17.529-3.225 33.152-8.257 43.337c0 0-3.786-0.472-8.069-0.697 S103.464 133.3 103.5 133.317z"/>
                </g>
                <circle class="large_window_path" cx="106.9" cy="78.2" r="10.5"/>
                <circle class="small_window_path" cx="106.9" cy="99.3" r="5.2"/>
            </g>
        </g>
    </svg>
</template>

<script>
    export default {
        name: 'Rocket'
    }
</script>

<style scoped>
/*=============================================
[ Inactive State Styles ]
==============================================*/

.rocket_inner {
    transform: translateY(15px) translateX(-3px);
    -webkit-transition: .3s;
    -moz-transition: .3s;
    transition: .3s;
}
.icon_circle {
    transition: .2s;
    fill: #d3d3d3;
}
.large_window_path {
    transition: .2s;
    fill: #d3d3d3;
}
.small_window_path { fill: #d3d3d3; }
.wing_shadow { fill: #100507; }
.rocket_bottom { fill: #100507 }
.rocket_base { fill: #100507 }
.rocket_shadow { fill: #100507 }
.wing_base { fill: #100507 }
.fire_path { fill: #FC0 }

/*=============================================
[ Hover Styles ]
==============================================*/
.rocket_wrap:hover .rocket_base {
    fill: #FFFFFF !important;
    stroke-width: 0px !important;
}
.rocket_wrap:hover .rocket_shadow {
    fill: #EDEDED !important;
    stroke-width: 0px !important;
}
.rocket_wrap:hover .icon_circle {
    fill: #0c0909 !important;
    stroke: #d3d3d3 !important;
    stroke-width: 7px !important;
}
.rocket_wrap:hover .small_window_path {
    fill: #66ccff !important;
    stroke-width: 0px !important;
}
.rocket_wrap:hover .wing_shadow {
    display: block !important;
    fill: #fb5f37 !important;
}
.rocket_wrap:hover .wing_base {
    fill: #fa3605 !important;
    stroke-width: 0px !important;
}
.rocket_wrap:hover .rocket_bottom {
    fill: #fa3605 !important;
    stroke-width: 0px !important;
}
.rocket_wrap:hover .large_window_path {
    fill: #66ccff !important;
    stroke-width: 0px !important;
}
.rocket_wrap:hover .rocket_inner { transform: translateY(0px) translateX(-3px) !important; }

/*=============================================
[ Animation Classes ]
==============================================*/
.fire {
    display: none;
    animation-delay: 0s;
    fill-opacity: 1;
    animation-timing-function: ease-in;
    stroke-width: 0px;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    transform-origin: 50% 50%;
    animation-direction: normal;
}
.rocket_wrap:hover #fireLeft {
    display: block;
    animation-delay: 0s;
    animation-name: fireLeft, fillOpacity1;
    animation-duration: 1.2s;
}
.rocket_wrap:hover #fireMiddle {
    display: block;
    animation-delay: 0s;
    animation-name: fireMiddle, fillOpacity1;
    animation-duration: 1s;
}
.rocket_wrap:hover #fireRight {
    display: block;
    animation-delay: 0s;
    animation-name: fireRight, fillOpacity1;
    animation-duration: 1.3s;
}
.rocket_wrap:hover #fireSmallLeft {
    display: block;
    animation-delay: 0s;
    animation-name: fireSmall, fillOpacity2;
    animation-duration: 1.3s;
    transform-origin: bottom;
}
.rocket_wrap:hover #fireSmallRight {
    display: block;
    animation-delay: 0.3s;
    animation-name: fireSmall, fillOpacity3;
    animation-duration: 1.6s;
    transform-origin: bottom;
}
/*=============================================
[ KeyFrame Animations ]
==============================================*/
@keyframes fireSmall { 
    10% { transform: rotate(17deg) translateY(1px) }
    20% { transform: rotate(-13deg) translateY(2px) }
    30% { transform: rotate(21deg) translateY(3px) }
    40% { transform: rotate(-34deg)translateY(4px) }
    50% { transform: rotate(24deg) translateY(5px) }
    60% { transform: rotate(-17deg) translateY(6px) }
    70% { transform: rotate(31deg) translateY(7px) }
    80% { transform: rotate(-28deg) translateY(8px) }
    90% { transform: rotate(14deg) translateY(9px) }
    99% { transform: rotate(0deg) translateY(10px) }
}
@keyframes fireLeft { 
    6% { transform: rotate(25deg) }
    15% { transform: rotate(-19deg) }
    25% { transform: rotate(25deg) }
    32% { transform: rotate(-30deg) }
    46% { transform: rotate(22deg) }
    54% { transform: rotate(-29deg) }
    61% { transform: rotate(32deg) }
    74% { transform: rotate(-9deg) }
    83% { transform: rotate(16deg) }
    99% { transform: rotate(0deg) }
}
@keyframes fireMiddle { 
    10% { transform: rotate(25deg) }
    20% { transform: rotate(-25deg) }
    30% { transform: rotate(30deg) }
    40% { transform: rotate(-22deg) }
    50% { transform: rotate(29deg) }
    60% { transform: rotate(-45deg) }
    70% { transform: rotate(37deg) }
    80% { transform: rotate(-15deg) }
    90% { transform: rotate(16deg) }
    99% { transform: rotate(0deg) }
}
@keyframes fireRight { 
    15% { transform: rotate(17deg) }
    23% { transform: rotate(-13deg) }
    37% { transform: rotate(21deg) }
    45% { transform: rotate(-34deg) }
    54% { transform: rotate(24deg) }
    67% { transform: rotate(-17deg) }
    72% { transform: rotate(31deg) }
    84% { transform: rotate(-28deg) }
    96% { transform: rotate(14deg) }
    99% { transform: rotate(0deg) }
}
@keyframes fillOpacity1 { 
    0% {
        fill-opacity: 1;
        stroke-opacity: 1;
    }
    50% {
        fill-opacity: 1;
        stroke-opacity: 1;
    }
    100% {
        fill-opacity: 0;
        stroke-opacity: 0;
    }
}
@keyframes fillOpacity2 { 
    0% {
        fill-opacity: 1;
        stroke-opacity: 1;
    }
    25% {
        fill-opacity: 1;
        stroke-opacity: 1;
    }
    100% {
        fill-opacity: 0;
        stroke-opacity: 0;
    }
}
@keyframes fillOpacity3 { 
    0% {
        fill-opacity: 1;
        stroke-opacity: 1;
    }
    67% {
        fill-opacity: 1;
        stroke-opacity: 1;
    }
    100% {
        fill-opacity: 0;
        stroke-opacity: 0;
    }
}
@keyframes rocektMove { 
    0% { transform: translateY(0px) }
    100% { transform: translateY(20px) }
}
	
</style>
