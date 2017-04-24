<template>
    <div id="shopCart">
        <div class="bj" @click='showHidden' v-show='bShop' v-if="shopCartData.length>0"></div>
        <transition name="shop">
            <div class="cart_food_list" v-show='bShop' v-if="shopCartData.length>0">
                <header>
                    <h4>购物车</h4>
                    <span @click="empty"><i class="fa fa-trash-o"></i>清空</span>
                </header>
                <div class="cart_food_details">
                    <ul>
                        <li class="cart_food_li" v-for="item in shopCartData">
                            <div>{{item.name}}</div>
                            <div>￥{{item.price}}</div>
                            <div>
                                <div class="cart_button">
                                    <div class="cart_left" @click="removeToCart(item.category_id, item.item_id, item.food_id, item.name, item.price, item.packing_fee, item.sku_id, item.stock)">
                                        <i class="fa fa-minus"></i>
                                    </div>
                                    <div class="cart_num">{{item.num}}</div>
                                    <div class="cart_right" @click="addToCart(item.category_id, item.item_id, item.food_id, item.name ,item.price, item.packing_fee, item.sku_id, item.stock)">
                                        <i class="fa fa-plus"></i>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </transition>
        <div class="cart_container" @click="showHidden">
            <div class="cart_container_left">
                <div :class="{on : totalCategory > 0}">
                    <span><img src="../assets/image/cart.png" alt=""></span>
                    <span v-if="totalCategory>0">{{totalCategory}}</span>
                </div>
                <div class="cart_container_price">
                    <span><em>￥</em>{{totalPrice.toFixed(2)}}</span>
                    <span>配送费¥{{dispatching}}元</span>
                </div>
            </div>
            <div>
                <span v-if="minimumOrderAmount>0">还差{{minimumOrderAmount}}元起送</span>
                <router-link v-else :to="{path:'/orderConfirm',query:{ geohash : this.$route.query.geohash,shopId:this.shopId }}"  tag="span" :class="{activity:minimumOrderAmount < 0}">去结算</router-link>
                <!-- {{ minimumOrderAmount>0 ? "还差"+minimumOrderAmount+"元起送" : ""}} -->
            </div>
        </div>
    </div>
</template>
<script>
    import buyCart from './buyCart'
    import {mapState,mapMutations} from 'vuex'
    export default {
        data () {
            return {
                bShop       : false
            }
        },
        mounted(){
            console.log('shopCartData',this.shopCartData)
        },
        computed:{
            ...mapState([
                'shopId'
            ])
        },
        methods:{
            ...mapMutations([
                'ADD_CART' , 'REMOVE_CART' , 'CLEAR_CART'
            ]),
            showHidden(){
                this.bShop = !this.bShop
            },
            empty(){
                this.CLEAR_CART(this.shopId)
            },
            addToCart(category_id, item_id, food_id, name, price, packing_fee, sku_id, stock){
                this.ADD_CART({
                    shopId : this.shopId, category_id, item_id, food_id, name, price, packing_fee, sku_id, stock
                })
            },
            removeToCart(category_id, item_id, food_id, name, price, packing_fee, sku_id, stock){
                this.REMOVE_CART({
                    shopId : this.shopId, category_id, item_id, food_id, name, price, packing_fee, sku_id, stock
                })
            }
        },
        props:[
            'shopCartData','totalPrice' , 'totalCategory' , 'dispatching' , 'minimumOrderAmount'
        ]
    }
</script>
<style scoped>
    .shop-enter-active,.shop-leave-active{
        transition: all .3s ease-out;
    }
    .shop-enter,.shop-leave-active{
        transform: translateY(100%);
    }
    .bj{
        width: 100%;
        height: 100%;
        position: fixed; left: 0px; top:0px; right:0px; bottom: 0px;
        background: rgba(0, 0, 0, 0.5);
    }
    .cart_food_li{
        display: flex;
        padding: 0px 14px;
        height: 42px;
    }
    .cart_food_li > div:nth-of-type(1){
        flex: 5;
        line-height: 42px;
    }
    .cart_food_li > div:nth-of-type(2){
        flex: 2;
        color: #f60;
        font-size: 16px;
        line-height: 42px;
    }
    .cart_food_li > div:nth-of-type(3){
        flex: 3;
        position: relative;
    }
    #shopCart{
        width: 100%;
        position:fixed; bottom: 0px;
        z-index: 99;
    }
    .cart_container{
        width: 100%;
        height: 0.54rem;
        background: #454547;
        box-sizing:content-box;
        display: flex;
        position: relative; z-index: 999;
    }
    .cart_container_left{
        width: 66%;
        float: left;
    }
    .cart_container_left > div:nth-of-type(1){
        width: 0.68rem;
        height: 0.68rem;
        background: #3d3d3f;
        border: 0.06rem solid #464648;
        position: absolute; bottom: 0rem; left: 0.2rem;
        border-radius: 100%;
    }
    .on{
        background: #3190e8 !important;
    }
    .cart_container_left > div:nth-of-type(1) span:nth-of-type(1) img{
        width: 0.38rem;
        margin: 0.1rem 0 0 0.1rem;
    }
    .cart_container_left > div:nth-of-type(1) span:nth-of-type(2){
        width: 0.16rem;
        height: 0.16rem;
        color: #fff;
        background: #ff461d;
        border-radius: 100%;
        text-align: center;
        font-family: 'Arial';
        position: absolute; top:-0.08rem; right:-0.08rem;
    }
    .cart_container_price{
        position: absolute; bottom: 0.05rem; left: 0.95rem;
        color: #fff;
    }
    .cart_container_price span{
        width: 100%;
        display: block;
        font-size: 0.12rem;
    }
    .cart_container_price span:nth-of-type(1){
        font-size: 0.2rem;
        font-weight: bold;
        margin: 0.04rem 0 0.02rem 0;
        font-family: 'Arial';
    }
    .cart_container_price span:nth-of-type(1) em{
        font-size: 0.16rem;
        font-family: "微软雅黑";
    }
    .cart_container_price span:nth-of-type(2){
        padding-left: 0.04rem;
    }
    .cart_container > div:nth-of-type(2) span.activity{
        width: 100%;
        background: #58d178;
        font-size: 0.18rem;
        display: inline-block;
        font-weight: bold;
    }
    .cart_container > div:nth-of-type(2) span{
        font-size: 16px;
        font-weight: bold;
    }
    .cart_container > div:nth-of-type(2){
        width: 34%;
        height: 0.54rem;
        line-height: 0.54rem;
        font-size: 0.16rem;
        line-height: 0.54rem;
        color: #fff;
        text-align: center;
        background: #535356;
        float: right;
    }
    .cart_food_list{
        background: #fff;
        overflow: hidden;
        clear: both;
        position: relative; z-index: 99;
    }
    .cart_food_list header{
        width: 100%;
        height: 45px;
        line-height: 45px;
        padding: 0px 15px;
        background: #eceff1;
    }
    .cart_food_list header h4{
        float: left;
        font-size: 16px;
    }
    .cart_food_list header span{
        float: right;
    }
    .cart_food_list header span i{
        margin-right: 5px;
    }
    .cart_button{
        display: flex;
        position: absolute; right: 0rem; bottom: .1rem;
        transition: all .4s linear;
    }
    .cart_left ,.cart_right{
        width: 0.2rem;
        height: 0.2rem;
        margin: 0 0.1rem;
        line-height: 0.16rem;
        text-align: center;
        font-size: 0.12rem;
        border-radius: 100%;
        border: 2px solid #3190e8;
    }
    .cart_left{
        color: #3190e8;
        transition: all 0.3s linear;
    }
    .cart_left i{
        transition: all 0.3s linear;
    }

    .cart_num{
        line-height: 0.2rem;
        text-align: center;
        color: #666;
    }
    .cart_right{
        background: #3190e8;
        color: #fff;
    }
</style>
