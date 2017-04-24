<template>
    <div>
        <head-top :head-title='"确认订单"'></head-top>
        <div class="orderConfirm" v-if="showLoading">
            <div class="address">
                <img src="../assets/image/add.png" alt="">
                <div class="address_right">
                    <p><span>赵本山</span><span>157510124548</span></p>
                    <p>北京市市辖区西城区</p>
                </div>
            </div>
            <div class="serviceTime">
                <p>送达时间</p>
                <section class="serviceTime_right">
                    <p><span>尽快送达</span>|<span>预计{{checkoutData.delivery_reach_time}}</span></p>
                    <p v-if="checkoutData.cart.is_deliver_by_fengniao">蜂鸟专送</p>
                </section>
            </div>
            <div class="payment">
                <p><span>支付方式</span><span>在线支付</span></p>
                <p><span>红包</span><span>暂时只在饿了么APP中支持</span></p>
            </div>
            <div class="store">
                <div class="store_title">
                    <img :src="imgBaseUrl+checkoutData.cart.restaurant_info.image_path" />
                    <h3>{{checkoutData.cart.restaurant_info.name}}</h3>
                </div>
                <ul class="store_list">
                    <li v-for = "item in checkoutData.cart.group[0]">
                        <p class="store_name">{{item.name}}</p>
                        <div class="store_number">
                            <span>x {{item.quantity}}</span>
                            <span>¥ {{item.price}}</span>
                        </div>
                    </li>
                </ul>
                <div class="store_deliver">
                    <span>配送费</span>
                    <span>{{checkoutData.cart.extra[1].price}}</span>
                </div>
                <div class="store_deliver">
                    <span>待支付</span>
                    <span>¥ {{checkoutData.cart.total}}</span>
                </div>
            </div>
            <div class="message">
                <p><span>订单备注</span><span>口味、偏好等</span></p>
                <p><span>发票抬头</span><span>不需要开发票</span></p>
            </div>
            <div class="confrim_bot">
                <span>待支付¥ {{checkoutData.cart.total}}</span>
                <span>提交订单</span>
            </div>
        </div>

        <myLoading v-if="!showLoading"></myLoading>
    </div>
</template>

<script>
    import headTop from './Header'
    import myLoading from './loading'
    import {imgBaseUrl , getImgPath } from '../config/index'
    import { checkout } from '../config/getData'
    import {mapState , mapMutations } from 'vuex'
    export default {
        data () {
            return {
                geohash      : this.$route.query.geohash ,
                shopId       : this.$route.query.shopId ,
                imgBaseUrl   : imgBaseUrl ,
                getImgPath   : getImgPath,
                checkoutData : null,
                showLoading  : false,
                newArr       : []
            }
        },
        mounted(){
            //初始化cartList数据
            this.INIT_CART()
            Object.values(this.shopCart).forEach(categoryId=>{
                Object.values(categoryId).forEach(itemId=>{
                    Object.values(itemId).forEach(item=>{
                        this.newArr.push({
                            attrs       : [],
                            extra       : {},
                            id          : item.id,
                            name        : item.name,
                            packing_fee : item.packing_fee,
                            price       : item.price,
                            quantity    : item.num,
                            sku_id      : item.sku_id,
                            specs       : [item.specs],
                            stock       : item.stock
                        })
                    })
                })
            })
            checkout(this.geohash,[this.newArr]).then((res)=>{
                this.checkoutData = res.data;
                this.showLoading = true;
            })
        },
        computed:{
            ...mapState([
                'cartList'
            ]),
            shopCart(){
                return Object.assign( {} , this.cartList[this.shopId] )
            }
        },
        methods:{
            ...mapMutations([
                'INIT_CART'
            ])

        },
        components:{
            headTop , myLoading
        }
    }
</script>
<style scoped>
    .confrim_bot span:nth-of-type(2){
        width: 38%;
        height: 100%;
        background: #58d178;
        text-align: center;
    }
    .confrim_bot span:nth-of-type(1){
        width: 62%;
        padding-left: 0.2rem;
    }
    .confrim_bot span{
        font-size: 0.18rem;
        color: #fff;
        display: inline-block;
    }
    .confrim_bot{
        width: 100%;
        height: 0.54rem;
        line-height: 0.54rem;
        background: #4e4e4e;
        display: flex;
        position: fixed; bottom: 0px;
    }
    .address_right p:nth-of-type(1) span:nth-of-type(1){
        margin-right: 0.2rem;

    }
    .address_right p:nth-of-type(1) span{
        font-size: 0.16rem;
    }
    .address_right p:nth-of-type(2){
        color: #999;
    }
    .address_right p:nth-of-type(1){
        margin-bottom: 0.05rem;
        color: #222;
    }
    .address img{
        width: 0.24rem;
        height: 0.24rem;
        float: left;
        margin-top: 0.1rem;
        margin-left: -0.35rem;
    }
    .address{
        overflow: hidden;
        padding: .15rem 0 0.2rem 0;
        padding-left: 0.5rem;
        margin-bottom: 0.1rem;
        background:#fff url("../assets/image/hua.png") repeat-x bottom;
        background-size: 32px 4px;
    }
    .message p:nth-of-type(1){
        border-bottom: 1px solid #f2f2f2;
    }
    .message p span:nth-of-type(1){
        float: left;
    }
    .message p span:nth-of-type(2){
        float: right;
        color:#999;
    }
    .message p{
        height: 0.45rem;
        line-height: 0.45rem;
    }
    .message{
        width: 100%;
        background: #fff;
        margin-top: 0.1rem;
        padding: 0 0.1rem;
    }
    .payment p:nth-of-type(1){
        border-bottom: 1px solid #f2f2f2;
    }
    .payment p span:nth-of-type(1){
        float: left;
    }
    .payment p span:nth-of-type(2){
        float: right;
        color:#999;
    }
    .payment p{
        height: 0.45rem;
        line-height: 0.45rem;
    }
    .payment{
        width: 100%;
        background: #fff;
        margin-top: 0.1rem;
        padding: 0 0.1rem;
    }
    .serviceTime > section p:nth-of-type(2){
        width: 0.7rem;
        height: 0.2rem;
        background: #3190e8;
        border-radius: 0.03rem;
        text-align: center;
        color: #fff;
        float: right;
        margin-top: 0.1rem;
    }
    .serviceTime > section p:nth-of-type(1) span:nth-of-type(2){
        margin-left: 0.1rem;
    }
    .serviceTime > section p:nth-of-type(1) span:nth-of-type(1){
        margin-right: 0.1rem;
    }
    .serviceTime > section{
        color: #999;
    }
    .serviceTime > p{
        font-size: 0.18rem;
        font-weight: bold;
    }
    .serviceTime{
        width: 100%;
        overflow: hidden;
        background: #fff;
        display: flex;
        -webkit-align-items: center;
        align-items: center;
        -webkit-justify-content: space-between;
        justify-content: space-between;
        padding: 0.15rem 0.12rem 0.15rem 0.1rem;
        border-left: 5px solid #3190e8;
    }
    .store{
        background: #fff;
        margin-top: 0.12rem;
    }
    .store_title{
        height: 0.45rem;
        line-height: 0.45rem;
        border-bottom: 1px solid #f2f2f2;
    }
    .store_title img{
        width: 0.28rem;
        height: 0.28rem;
        float: left;
        margin: 0.08rem 0.05rem 0 0.1rem;
    }
    .store_title h3{
        font-size: 0.16rem;
    }
    .store_list li{
        height: 0.44rem;
        line-height: 0.44rem;
        display: flex;
        padding: 0 0.12rem;
        color: #666;
    }
    .store_list li .store_name{
        width: 70%;
        float: left;
    }
    .store_list li .store_number{
        width: 30%;
        float: right;
        display: flex;
        text-align: right;
    }
    .store_list li .store_number span:nth-of-type(2){
        color: #ff6600;
    }
    .store_list li .store_number span{
        width: 50%;
        display: inline-block;
    }

    .store_deliver{
        height: 0.44rem;
        line-height: 0.44rem;
        border: 1px solid #f5f5f5;
        border-left:none;
        border-right:none;
        color:#666;
        overflow: hidden;
        padding: 0 0.1rem;
    }
    .store_deliver span{
        display: block;
    }
    .store_deliver span:nth-of-type(1){
        float: left;
    }
    .store_deliver span:nth-of-type(2){
        float: right;
        color: #ff6600;
    }
    .store_sum{
        color: #fb6b23;
        font-weight: bold;
        height: 0.44rem;
        line-height: 0.44rem;
        text-align: right;
        padding-right: 0.1rem;
    }
    .orderConfirm{
        padding: 0.58rem 0 0.54rem 0;
    }
</style>
