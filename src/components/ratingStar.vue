<template>
    <div class="ratingStar">
        <div class="rate">
            <div class="rate_t" :style="{width:(60/5)*ratingStar-1+'px'}"></div>
        </div>
        <span>{{ratingStar}}</span>
    </div>
</template>

<script>

    export default {
        data () {
            return {

            }
        },
        props:['ratingStar']
    }
</script>
<style scoped>
    .ratingStar{
        width: 95px;
    }
    .ratingStar span:nth-of-type(1){
        font-size: 12px;
        color: #ff6000;
        margin: 0px 0.05rem;
    }
    .rate_t{
        width: 60px;
        height: 18px;
        display: block;
        position: absolute; top: 0px; left: 0px; z-index: 99;
        background: url('../assets/image/rate_01.png') no-repeat left center;
        background-size: 60px auto;
    }
    .rate{
        width: 60px;
        height: 18px;
        color: #ff9a0d;
        float: left;
        position: relative;
        background: url('../assets/image/rate_02.png') no-repeat left center;
        background-size: 60px auto;
    }
</style>
