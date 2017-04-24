<template>
    <div id="footer">
        <ul>
            <router-link :to="{ path: 'home', query: { geohash: geohash }}" tag="li" active-class="on" > 
                <i></i>
                <span>外卖</span>
            </router-link>
            <router-link :to="{ path: 'search', query: { geohash: geohash }}" tag="li" active-class="on">
                <i></i>
                <span>搜索</span>
            </router-link>
            <router-link :to="{ path: 'order', query: { geohash: geohash }}" tag="li" active-class="on">
                <i></i>
                <span>订单</span>
            </router-link>
            <router-link :to="{ path: 'profile', query: { geohash: geohash }}" tag="li" active-class="on">
                <i></i>
                <span>我的</span>
            </router-link>
        </ul>
    </div>
</template>

<script>
    export default {
        data () {
            return {

            }
        },
        mounted(){
        },
        props:["geohash"]
    }
</script>

<style scoped>
    #footer{
        width: 100%;
        background: #f6f6f6;
        position: fixed; bottom: 0px;
        z-index: 200;
    }
    #footer ul{
        display: flex;
        height: 0.58rem;
        line-height: 0.58rem;
        border-top: 1px solid #c8c8c8;
    }
    #footer ul li{
        width: 25%;
        text-align: center;
    }
    #footer ul li i{
        width: 100%;
        height: 0.35rem;
        display: block;
    }
    #footer ul li:nth-of-type(1) i{
        background: url('../assets/image/ioc01.png') no-repeat center 0.04rem;
        background-size: 0.28rem 0.28rem;
    }
    #footer ul li.on:nth-of-type(1) i{
        background: url('../assets/image/ioc01_a.png') no-repeat center 0.04rem !important;
        background-size: 0.28rem 0.28rem!important;
    }
    #footer ul li:nth-of-type(2) i{
        background: url('../assets/image/ioc02.png') no-repeat center 0.04rem;
        background-size: 0.28rem 0.28rem;
    }
    #footer ul li.on:nth-of-type(2) i{
        background: url('../assets/image/ioc02_a.png') no-repeat center 0.04rem;
        background-size: 0.28rem 0.28rem;
    }
    #footer ul li:nth-of-type(3) i{
        background: url('../assets/image/ioc03.png') no-repeat center 0.04rem;
        background-size: 0.28rem 0.28rem;
    }
    #footer ul li.on:nth-of-type(3) i{
        background: url('../assets/image/ioc03_a.png') no-repeat center 0.04rem;
        background-size: 0.28rem 0.28rem;
    }
    #footer ul li:nth-of-type(4) i{
        background: url('../assets/image/ioc04.png') no-repeat center 0.04rem;
        background-size: 0.28rem 0.28rem;
    }
    #footer ul li.on:nth-of-type(4) i{
        background: url('../assets/image/ioc04_a.png') no-repeat center 0.04rem;
        background-size: 0.28rem 0.28rem;
    }
    #footer ul li span{
        display: block;
        font-size: 0.12rem;
        line-height: 0.16rem;
    }
</style>
