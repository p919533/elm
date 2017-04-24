<template>
    <div id="orderDetail">
        <section class="order_title">
            <img src="../assets/image/order_pic01.png" alt="">
            <h2>订单已取消</h2>
            <p>系统取消了订单，理由是"超过15分钟未支付"</p>
            <p>再来一单</p>
        </section>
        <section class="order_store">
            <div class="order_store_title">
                <img src="../assets/image/order_pic01.png" alt="">
                <h3>快乐柠檬（迪美店）</h3>
            </div>
            <ul class="order_store_list">
                <li>
                    <p class="store_name">手榨香柠蜜香红茶-（热杯）</p>
                    <div class="store_number">
                        <span>X1</span>
                        <span>¥12</span>
                    </div>
                </li>
                <li>
                    <p class="store_name">手榨香柠蜜香红茶-（热杯）</p>
                    <div class="store_number">
                        <span>X1</span>
                        <span>¥12</span>
                    </div>
                </li>
                <li>
                    <p class="store_name">手榨香柠蜜香红茶-（热杯）</p>
                    <div class="store_number">
                        <span>X1</span>
                        <span>¥12</span>
                    </div>
                </li>
                <li>
                    <p class="store_name">手榨香柠蜜香红茶-（热杯）</p>
                    <div class="store_number">
                        <span>X1</span>
                        <span>¥12</span>
                    </div>
                </li>
                <li>
                    <p class="store_name">手榨香柠蜜香红茶-（热杯）</p>
                    <div class="store_number">
                        <span>X1</span>
                        <span>¥12</span>
                    </div>
                </li>
            </ul>
            <div class="order_store_deliver">
                <span>配送费</span>
                <span>5</span>
            </div>
            <div class="order_store_sum">实付289.00</div>
        </section>
        <section class="order_distribution info">
            <div class="title">配送信息</div>
            <ul>
                <li>
                    <p class="item_left">送达时间：</p>
                    <div class="item_right">
                        <p>尽快送达</p>
                    </div>
                </li>
                <li>
                    <p class="item_left">送达地址：</p>
                    <div class="item_right">
                        <p>徐 女士</p>
                        <p>15800319949</p>
                        <p>人民公园南京西路231号</p>
                    </div>
                </li>
                <li>
                    <p class="item_left">配送方式：</p>
                    <div class="item_right">
                        <p>蜂鸟专送</p>
                    </div>
                </li>
            </ul>
        </section>
        <section class="order_info info">
            <div class="title">订单信息</div>
            <ul>
                <li>
                    <p class="item_left">订单号：</p>
                    <div class="item_right">
                        <p>1202110398310861800</p>
                    </div>
                </li>
                <li>
                    <p class="item_left">支付方式：</p>
                    <div class="item_right">
                        <p>在线支付</p>
                    </div>
                </li>
                <li>
                    <p class="item_left">下单时间：</p>
                    <div class="item_right">
                        <p>2017-02-19 16:03</p>
                    </div>
                </li>
            </ul>
        </section>
    </div>
</template>

<script>

export default {
  name: 'orderDetail',
  data () {
    return {
      msg: '555555555555555'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #orderDetail{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #e8e8e8;
        z-index: 202;
    }
    .order_title{
        padding: 0.15rem 0 0.2rem 0;
        background: #fff;
        text-align: center;
    }
    .order_title img{
        width: 0.7rem;
        height: 0.7rem;
        border-radius: 100%;
        border: 0.08rem solid #f5f5f5;
    }
    .order_title h2{
        color: #333;
        font-size: 0.18rem;
        margin-top: 0.02rem
    }
    .order_title p:nth-of-type(1){
        width: 52%;
        margin: 0.05rem auto 0.08rem auto;
        color: #999;
        font-size: 0.12rem;
    }
    .order_title p:nth-of-type(2){
        width: 0.74rem;
        height: 0.24rem;
        color: #3190e8;
        line-height: 0.22rem;
        border: 1px solid #3190e8;
        font-size: 0.12rem;
        border-radius: 0.03rem;
        margin: 0px auto;
    }
    .order_store{
        background: #fff;
        margin-top: 0.12rem;
    }
    .order_store_title{
        height: 0.45rem;
        line-height: 0.45rem;
        border-bottom: 1px solid #f2f2f2;
    }
    .order_store_title img{
        width: 0.28rem;
        height: 0.28rem;
        float: left;
        margin: 0.08rem 0.05rem 0 0.1rem;
    }
    .order_store_title h3{
        font-size: 0.16rem;
    }
    .order_store_list li{
        height: 0.44rem;
        line-height: 0.44rem;
        display: flex;
        padding: 0 0.12rem;
        color: #666;
    }
    .order_store_list li .store_name{
        width: 70%;
        float: left;
    }
    .order_store_list li .store_number{
        width: 30%;
        float: right;
        display: flex;
        text-align: right;
    }
    .order_store_list li .store_number span{
        width: 50%;
        display: inline-block;
    }
    .order_store_list li .store_number span:nth-of-type(1){
        color: #ccc;
    }
    .order_store_deliver{
        height: 0.44rem;
        line-height: 0.44rem;
        border: 1px solid #f5f5f5;
        border-left:none;
        border-right:none;
        color:#666;
        overflow: hidden;
        padding: 0 0.1rem;
    }
    .order_store_deliver span{
        display: block;
    }
    .order_store_deliver span:nth-of-type(1){
        float: left;
    }
    .order_store_deliver span:nth-of-type(2){
        float: right;
    }
    .order_store_sum{
        color: #fb6b23;
        font-weight: bold;
        height: 0.44rem;
        line-height: 0.44rem;
        text-align: right;
        padding-right: 0.1rem;
    }
    .info{
        background: #fff;
        margin-top: 0.1rem;
        overflow: hidden;
    }
    .info .title{
        height: 0.45rem;
        line-height: 0.45rem;
        border-bottom: 1px solid #f2f2f2;
        font-size: 0.16rem;
        padding-left: 0.1rem;
    }
    .info ul li{
        padding-left: 0.85rem;
        overflow: hidden;
        color: #666;
    }
    .info ul li .item_left{
        height: 0.44rem;
        line-height: 0.44rem;
        margin-left: -0.75rem;
        float: left;
    }
    .info ul li .item_right p{
        line-height: 0.26rem;
    }
    .info ul li .item_right p:nth-of-type(1){
        margin-top: 0.1rem;
    }
</style>
