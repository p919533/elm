<template>
    <div id="profile">
        <myHeader head-title="我的" bLand='false'></myHeader>
        <div class="profile_main">
            <section class="profile_user">
                <div class="profile_login">
                    <img src="../assets/image/user.png" alt="">
                    <div class="profile_login_text">
                        <p>立即登陆</p>
                        <p>登陆后可享受更多权限</p>
                    </div>
                </div>
                <div class="profile_price">
                    <div>
                        <span><b>0</b>元</span><span>余额</span>
                    </div>
                    <div>
                        <span><b>0</b>个</span><span>优惠</span>
                    </div>
                    <div>
                        <span><b>0</b>分</span><span>积分</span>
                    </div>
                </div>
            </section>
            <section class="profile_item">
                <li>
                    <span><i class="fa fa-camera-retro"></i></span><span>我的订单</span>
                </li>
                <li>
                    <span></span><span>积分商城</span>
                </li>
                <li>
                    <span></span><span>饿了吗会员</span>
                </li>
            </section>
            <section class="profile_item">
                <li>
                    <span></span><span>服务中心</span>
                </li>
                <li>
                    <span></span><span>下载饿了吗APP</span>
                </li>
            </section>
        </div>
        <myFooter/>
    </div>
</template>

<script>
    import myHeader from './Header'
    import myFooter from './Footer'
    export default {
        name: 'home',
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

<style scoped>
    .profile_main{
        padding-top: 0.48rem;
    }
    .profile_login{
        background: #3190e8;
        overflow: hidden;
        padding: 0.25rem 0.2rem 0.25rem 1rem;
    }
    .profile_login img{
        width: 0.7rem;
        height: 0.7rem;
        margin-left: -0.8rem;
        float: left;
    }
    .profile_login_text{
        color: #fff;
        padding-top: 0.12rem;
    }
    .profile_login_text p:nth-of-type(1){
        font-size: 0.18rem;
        margin-bottom: 0.05rem;
    }
    .profile_price{
        height: 0.75rem;
        background: #fff;
        display: flex;
    }
    .profile_price div{
        width: 33.33%;
        text-align: center;
        border-right: 1px solid #f1f1f1;
    }
    .profile_price div:last-of-type{
        border-right: none;
    }
    .profile_price div span{
        width: 100%;
        display: block;
        color: #666;
    }
    .profile_price div span:nth-of-type(1){
        margin: 0.12rem 0 0rem 0;
    }
    .profile_price div span:nth-of-type(2){
        font-size: 0.12rem;
    }
    .profile_price div span:nth-of-type(1) b{
        font-size: 0.22rem;
        padding: 0px 0.02rem;
        color: #ff9900;
    }
    .profile_price div:nth-of-type(2) span:nth-of-type(1) b{
        color: #ff5f3e;
    }
    .profile_price div:nth-of-type(3) span:nth-of-type(1) b{
        color: #6ac20b;
    }
    .profile_item{
        margin-top: 0.1rem;
    }
    .profile_item li{
        height: 0.49rem;
        line-height: 0.49rem;
        border-bottom: 1px solid #e8e8e8;
        background: #fff;
        padding-left: 0.55rem;
    }
    #profile section:nth-of-type(2) li:nth-of-type(1) span:nth-of-type(1){
        background: #1c8eec;
    }
    #profile section:nth-of-type(2) li:nth-of-type(2) span:nth-of-type(1){
        background: #fd7b53;
    }
    #profile section:nth-of-type(2) li:nth-of-type(3) span:nth-of-type(1){
        background: #35a3ff;
    }
    #profile section:nth-of-type(3) li:nth-of-type(1) span:nth-of-type(1){
        background: #94d94a;
    }
    #profile section:nth-of-type(3) li:nth-of-type(2) span:nth-of-type(1){
        background: #ffb906;
    }
    .profile_item li span:nth-of-type(1){
        width: 0.3rem;
        height: 0.3rem;
        background: #000;
        margin-left: -0.4rem;
        margin-top: 0.09rem;
        float: left;
        display: inline-block;
    }
</style>
