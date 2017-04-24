<template>
    <div id="order">
        <myHeader head-title="我的订单"></myHeader>
        <ul>
            <li class="order_list">
                <img src="../assets/image/order_pic01.png" class="order_left">
                <section class="order_right">
                    <router-link to="/order/orderDetail">
                        <div class="order_item">
                            <div class="order_item_title">
                                <h4>快乐柠檬（迪美店）</h4>
                                <span>2017-02-19 16:03</span>
                            </div>
                            <div class="order_status">
                                订单已取消
                            </div>
                        </div>
                        <div class="order_basket">
                            <span>手榨香柠蜜香红茶-（热杯） 等10件商品</span>
                            <span>¥289.00</span>
                        </div>
                    </router-link>
                    <div class="order_again">
                        <router-link to="/shop" tag="span">再来一单</router-link>
                    </div>
                </section>
            </li>
        </ul>
        <myFooter></myFooter>
        <transition name="router-slid">
            <router-view></router-view>
        </transition>

    </div>
</template>

<script>
    import myHeader from './Header'
    import myFooter from './Footer'
    export default {
        name: 'order',
        data () {
            return {
            }
        },
        components: {
            myHeader,
            myFooter
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    .order_list{
        width: 100%;
        padding: 0.1rem 0.12rem 0 0.65rem ;
        background: #fff;
        margin-bottom: 0.1rem;
    }
    .order_list img{
        width: 0.45rem;
        margin-left: -0.55rem;
        float: left;
    }
    .order_item{
        height: 0.45rem;
    }
    .order_item_title{
        width: 70%;
        float: left;
    }
    .order_item_title h4{
        font-size: 0.16rem;
    }
    .order_item_title span{
        font-size: 0.12rem;
        color: #999;
    }
    .order_status{
        color: #333;
        line-height: 0.22rem;
        float: right;
    }
    .order_basket{
        height: 0.45rem;
        line-height: 0.45rem;
        border: 1px solid #f5f5f5;
        border-left: none;
        border-right: none;
        color: #666;
    }
    .order_basket span:nth-of-type(1){
        width: 70%;
        height: 0.45rem;
        overflow: hidden;
        white-space: normal;
        text-overflow: ellipsis;
        float: left;
    }
    .order_basket span:nth-of-type(2){
        color: #ff6600;
        float: right;
    }
    .order_again{
        padding:0.1rem 0;
        text-align: right;
    }
    .order_again span{
        width: 0.62rem;
        height: 0.22rem;
        line-height: 0.2rem;
        text-align: center;
        font-size: 0.12rem;
        color: #3190e8;
        display: inline-block;
        border: 1px solid #3190e8;
        border-radius: 0.03rem;
        margin-left: 0.1rem;
        /*float: right;*/
    }
    #order > ul{
        padding-top: 0.58rem;
    }
    .router-slid-enter-active, .router-slid-leave-active {
        transition: all .4s;
    }
    .router-slid-enter, .router-slid-leave-active {
        transform: translateX(100%);
    }
</style>
