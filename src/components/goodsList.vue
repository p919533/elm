<template>
    <div class="goodsList">
        <section class="shop_li" v-for="item in goodsList">
            <router-link :to='{ path:"/shop" , query:{ geohash:geohash , id:item.id }}'>
                <div class="left"><img :src="imgBaseUrl + getImgPath(item.image_path)" alt=""></div>
                <div class="right">
                    <div class="title">
                        <h3><em>品牌</em>{{item.name}}</h3>
                        <div>
                            <span class="protect" v-for="supports in item.supports">{{supports.icon_name}}</span>
                        </div>
                    </div>
                    <div class="news">
                        <div class="news_left">
                            <rating-star :ratingStar="item.rating"></rating-star>
                            <span>月售{{item.recent_order_num}}单</span>
                        </div>
                        <div class="news_right" v-if="item.delivery_mode">
                            <span>准时</span>
                            <span>{{item.delivery_mode.text}}</span>
                        </div>
                    </div>
                    <div class="express">
                        <div class="express_left">
                            <span>¥{{item.float_minimum_order_amount}}起送</span>
                            <span>配送费约¥{{item.float_delivery_fee}}</span>
                        </div>
                        <div class="express_right">
                            <span>{{item.distance > 1000? (item.distance/1000).toFixed(2) + 'km': item.distance + 'm'}}</span>
                            <span>{{item.order_lead_time}}分钟</span>
                        </div>
                    </div>
                </div>
            </router-link>
        </section>
    </div>
</template>

<script>
    import ratingStar from './ratingStar'
    import {Loadmore} from 'mint-ui';
    import {imgBaseUrl,getImgPath} from '../config/index';
    import {shopList,screenList} from '../config/getData';
    export default {
        data () {
            return {
                imgBaseUrl   : imgBaseUrl,
                getImgPath   : getImgPath
            }
        },
        mounted(){

        },
        methods:{


        },
        props:[
            "goodsList" , "geohash"
        ],
        components: {
            ratingStar , Loadmore
        }
    }
</script>

<style scoped>
    .loadMore{
        text-align: center;
        height: 50px;
        line-height: 50px;
    }
    .goodsList {
        background: #fff;
    }
    .shop_li{
        width: 94%;
        height: 0.9rem;
        margin: 0px auto;
        overflow: hidden;
        padding: 0.1rem 0 0.1rem 0.78rem;
        border-bottom: 1px solid #e8e8e8;
    }
    .shop_li .left{
        width: 0.7rem;
        height: 0.7rem;
        overflow: hidden;
        margin-left: -0.78rem;
        float: left;
    }

    .shop_li .right{
        width: 100%;
    }
    .shop_li .right .title{
        position: relative;
    }
    .shop_li .right .title h3{
        width: 70%;
        white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
        font-size: 0.15rem;
        color: #222;
    }

    .shop_li .right .title h3 em{
        color: #52250a;
        font-size: 0.11rem;
        background: #ffd930;
        padding: 0.01rem 0.05rem;
        font-style: normal;
        border-radius: 0.03rem;
        margin-right: 0.05rem;
    }
    .shop_li .right .title div {
        position: absolute; top:0; right: 0px;
    }
    .shop_li .right .title div span{
        width: 0.2rem;
        height: 0.2rem;
        color: #666;
        line-height: 0.18rem;
        text-align: center;
        display: block;
        float: left;
        font-size: 0.11rem;
        border: 1px solid #e8e8e8;
        border-radius: 0.03rem;
        margin-left: 0.05rem;
    }
    .shop_li .right .news{
        height: 0.2rem;
        line-height: 0.2rem;
        margin: 0.1rem 0px 0.05rem 0;
    }
    .shop_li .right .news_left{
        width: 62%;
        float: left;
        display: flex;
    }
    .shop_li .right .news_left div:nth-of-type(1) i{
        font-size: 0.12rem;
    }
    .shop_li .right .news_left span{
        font-size: 0.12rem;
    }
    .shop_li .right .news_left span:nth-of-type(1){
        color: #666666;
    }
    .shop_li .right .news_right{
        width: 38%;
        float: right;
    }
    .shop_li .right .news_right span{
        font-size: 0.11rem;
        padding: 0rem 0.05rem;
        border-radius: 0.03rem;
        float: right;
        display: block;

    }
    .shop_li .right .news_right span:nth-of-type(1){
        color: #44a5ff;
        height: 0.2rem;
        line-height: 0.18rem;
        border: 1px solid #44a5ff;
    }
    .shop_li .right .news_right span:nth-of-type(2){
        color: #fff;
        height: 0.2rem;
        background: #44a5ff;
        margin-right: 0.05rem;
    }
    .shop_li .right .express{
        color: #666;
    }
    .shop_li .right .express_left{
        float: left;
    }
    .shop_li .right .express_left span{
        font-size: 0.12rem;
        color: #666;
    }
    .shop_li .right .express_left span:nth-of-type(1){
        margin-right: 0.1rem;
    }
    .shop_li .right .express_right {
        float: right;
    }
    .shop_li .right .express_right span{
        color: #666;
        font-size: 0.12rem;
    }
    .shop_li .right .express_right span:nth-of-type(1){
        margin-right: 0.1rem;
    }
    .shop_li .right .express_right span:nth-of-type(2){
        color: #44a5ff;
    }
</style>
