<template>
    <div class="shopDetail">
        <head-top head-title="商家详情"></head-top>
        <div class="shopDetail_list" v-if='shopDetailData'>
            <div class="title">活动与属性</div>
            <div class="shopDetail_text">
                <p v-for="item in shopDetailData.activities">
                    <span :style="{backgroundColor:'#'+item.icon_color}">{{item.icon_name}}</span>
                    <span>{{item.description}}(APP专享)</span>
                </p>
                <p v-for="item in shopDetailData.supports">
                    <span :style="{backgroundColor:'#'+item.icon_color}">{{item.icon_name}}</span>
                    <span>{{item.description}}(APP专享)</span>
                </p>
            </div>
            <div class="title">商家信息</div>
            <div class="shopDetail_address">
                <p>{{shopDetailData.name}}</p>
                <p>地址：{{shopDetailData.address}}</p>
                <p>营业时间：{{shopDetailData.opening_hours}}</p>
                <p><span>营业执照</span> </p>
                <p><span>餐饮服务许可证</span></p>
            </div>
        </div>
    </div>
</template>

<script>
    import headTop from './Header'
    import {shopDetailList} from '../config/getData'
    import {mapState} from 'vuex'
    export default {
        data () {
            return {
                shopDetailData  : null
            }
        },
        computed:{
            ...mapState([
                'shopId'
            ])
        },
        mounted(){
            shopDetailList(this.shopId,31.237129,121.489983).then((res)=>{
                this.shopDetailData = res.data
            })
        },
        components:{
            headTop
        }
    }
</script>
<style scoped>
    .shopDetail_list{
        margin-top: 0.6rem;
    }
    .shopDetail_address p:last-of-type{
        border-bottom: none;
    }
    .shopDetail_address p{
        width: 94%;
        margin: 0px auto;
        line-height: 0.24rem;
        padding: 0.1rem 0px;
        border-bottom: 1px solid #f0f0f0;
    }
    .shopDetail_address{
        background: #fff;
    }
    .shopDetail_text p{
        line-height: 0.18rem;
        padding-left: 0.26rem;
        margin-bottom: 0.2rem;
    }
    .shopDetail_text span:nth-of-type(2){
        width: 90%;
        color: #6a6a6a;
    }
    .shopDetail_text span:nth-of-type(1){
        width: 0.2rem;
        height: 0.18rem;
        color: #fff;
        margin-left:-0.26rem;
        border-radius: 0.02rem;
        line-height: 0.17rem;
        text-align: center;
        display: inline-block;
        margin-right: 0.05rem;
        float: left;
    }
    .shopDetail_text{
        background: #fff;
        padding:0.2rem 0.15rem 0.02rem 0.15rem;
        margin-bottom: 0.12rem;
    }
    .shopDetail{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #e8e8e8;
        z-index: 202;
    }
    .title{
        height: 0.45rem;
        line-height: 0.45rem;
        font-size: 0.16rem;
        color: #222;
        border-bottom: 1px solid #f0f0f0;
        background: #fff;
        padding-left: 0.15rem;
    }

</style>
