<template>
    <div class="loading">
        <div class="loading_img" :style='{backgroundPositionY : -positionY*0.65+"rem"}'></div>
        <div class="loading_shadow"></div>
    </div>
</template>

<script>
    import myHeader from './Header'
    export default {
        data () {
            return {
                positionY : 0 ,
                timer     : null
            }
        },
        mounted(){
            this.timer = setInterval(()=>{
                this.positionY == 6 ? this.positionY = 0 : this.positionY++
            },500)
        },
        beforeDestroy(){
        	clearInterval(this.timer);
        }
    }
</script>
<style scoped>
    @keyframes loadingImg{
        0%{
            transform: translateY(0px);
        }
        50%{
            transform: translateY(-0.5rem);
        }
        100%{
            transform: translateY(0px);
        }
    }
    @keyframes loadingShadow{
        0%{
            transform: scale(1);
        }
        50%{
            transform: scale(0.3);
        }
        100%{
            transform: scale(1);
        }
    }
    .loading{
        width: 0.65rem;
        height: 0.65rem;
        position: fixed;
        top: 50%; left: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);

    }
    .loading_img{
        width: 0.64rem;
        height: 0.64rem;
        position: absolute; z-index: 9;
        transform: translateY(0);
        background: url('../assets/image/loading.png') no-repeat;
        background-size: 0.64rem auto;
        animation: loadingImg 0.6s infinite ease-in-out;
    }
    .loading_shadow{
        width: 0.54rem;
        height: 0.24rem;
        background: #ddd;
        transform: scale(1);
        position: absolute; top: 0.54rem; left: 0.04rem;
        -webkit-border-radius: 0.54rem / 0.24rem;
        border-radius:  0.54rem / 0.24rem;
        animation: loadingShadow 0.6s infinite ease-in-out;
    }
</style>
