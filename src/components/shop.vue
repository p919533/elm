<template>
    <div>
        <section v-if='showLoading' class="shop">
            <div class="header" ref="shopheader">
                <div class="header_top_img"><img :src="imgBaseUrl+getImgPath(shopDetailData.image_path)"></div>
                <section>
                    <div class="header_top">
                        <img :src="imgBaseUrl+getImgPath(shopDetailData.image_path)">
                        <router-link to="/shop/shopDetail" tag="section">
                            <h3>{{shopDetailData.name}}</h3>
                            <p>商家配送／{{shopDetailData.order_lead_time}}分钟送达／配送费¥{{shopDetailData.float_delivery_fee}}</p>
                            <p class="ellipsis">公告：{{shopDetailData.promotion_info ? shopDetailData.promotion_info : '欢迎光临,用餐高峰期请提前下单,谢谢.'}}</p>
                            <i class="fa fa-angle-right"></i>
                        </router-link>
                    </div>
                    <div class="header_bot">
                        <p>
                            <em :style="{'backgroundColor':'#'+shopDetailData.activities[0].icon_color}">{{shopDetailData.activities[0].icon_name}}</em>
                            {{shopDetailData.activities[0].description}}
                        </p>
                    </div>
                </section>
            </div>
            <div class="tab" ref='shopTab'>
                <ul>
                    <li :class="{ on : changeShowType=='commodity' }" @click="changeShowType = 'commodity'">商品<span></span></li>
                    <li :class="{ on : changeShowType=='judgement' }" @click="changeShowType = 'judgement'">评价<span></span></li>
                </ul>
            </div>
            <div class="commodity" v-show='changeShowType=="commodity"'>
                <ul class="commodity_left" >
                    <li v-for="(item,index) in menuListData" :class="[menuIndex==index ? 'activity' : '']" @click="chooseMenu(index)">
                        <img  v-if="item.icon_url==''? false : true " :src="imgBaseUrl+getImgPath(item.icon_url)">
                        <span >{{item.name}}</span>
                        <em class="category_num" v-if="categoryNum[index] && item.type==1" >{{categoryNum[index]}}</em>
                    </li>
                </ul>
                <ul class="commodity_right" ref="menuFoodList">
                    <li v-for='item in menuListData'>
                        <header><h3>{{item.name}}</h3><span>{{item.description}}</span></header>
                        <section v-for='(foods,index) in item.foods'>
                            <img :src="foods.image_path != null ? imgBaseUrl+getImgPath(foods.image_path):'http://test.fe.ptdev.cn/elm/elmlogo.jpeg'">
                            <div class="commodity_description">
                                <h3>{{foods.name}}</h3>
                                <p>{{foods.description}}</p>
                                <p><span>月售{{foods.month_sales}}份</span><span>好评率{{foods.satisfy_rate}}%</span></p>
                                <div class="menu_detail_footer">
                                    <div class="food_price">
                                        <span>¥</span><span>{{foods.specfoods[0].original_price=="null" ? foods.specfoods[0].original_price :foods.specfoods[0].price}}</span>
                                    </div>
                                    <div class="cart_button">
                                        <span></span><span></span><span></span>
                                    </div>
                                </div>
                                <buyCart :foods='foods'></buyCart>
                            </div>
                        </section>
                    </li>

                </ul>
                <shop-cart
                    :shopCartData="shopCartData" :totalPrice="totalPrice" :totalCategory='totalCategory'
                    :dispatching='dispatching' :minimumOrderAmount='minimumOrderAmount'>
                </shop-cart>
            </div>
            <div class="judgement" v-show='changeShowType=="judgement"'>
                <header class="judgement_header">
                    <div class="judgement_header_left">
                        <h3>{{ratingsScoresData.overall_score.toFixed(1)}}</h3>
                        <p>综合评价</p>
                        <p>高于周边商家{{(ratingsScoresData.compare_rating*100).toFixed(1)}}%</p>
                    </div>
                    <div class="judgement_header_right">
                        <div>
                            <span>服务态度</span>
                            <rating-star :ratingStar="ratingsScoresData.service_score.toFixed(1)"></rating-star>
                        </div>
                        <div>
                            <span>菜品评价</span>
                            <rating-star :ratingStar="ratingsScoresData.food_score.toFixed(1)"></rating-star>
                        </div>
                        <div>
                            <span>送达时间</span>
                            <span class="time">{{ratingsScoresData.deliver_time}}分钟</span>
                        </div>
                    </div>
                </header>
                <ul class="judgement_tab">
                    <li v-for="(item,index) in ratingsTagsData" :class="{ unsatisfied : item.unsatisfied , tagActivity : index == ratingsIndex }" @click="ratingsTagsChange(index,item.name)">{{item.name}}({{item.count}})</li>
                </ul>
                <mt-loadmore :bottom-method="loadBottom" :auto-fill="false" :bottom-all-loaded="allLoaded" @bottom-status-change="handleBottomChange" ref='loadmore'>
                    <ul class="judgement_list">
                        <li v-for="item in ratingsData">
                            <img :src="getImgPath()" class="judgement_list_left">
                            <section class="judgement_list_right">
                                <div class="food_user">
                                    <section class="username_star">
                                        <p class="username">{{item.username}}</p>
                                        <rating-star :ratingStar="item.rating_star"></rating-star>
                                    </section>
                                    <time class="rated_at">{{item.rated_at}}</time>
                                </div>
                                <ul class="food_img_ul">
                                    <li v-for="(item, index) in item.item_ratings" :key="index">
                                        <img :src="imgBaseUrl+getImgPath(item.image_hash)" v-if="item.image_hash">
                                    </li>
                                </ul>
                                <ul class="food_name">
                                    <li v-for="tags in item.item_ratings">{{tags.food_name}}</li>
                                </ul>
                            </section>
                        </li>
                    </ul>
                </mt-loadmore>
            </div>
        </section>
        <transition name="router-slid">
            <router-view></router-view>
        </transition>
        <myLoading v-if="!showLoading"></myLoading>
    </div>
</template>

<script>
    import myLoading from './loading'
    import buyCart from './buyCart'
    import shopCart from './shopCart'
    import ratingStar from './ratingStar'
    import { Loadmore } from 'mint-ui';
    import { mapState , mapMutations } from 'vuex'
    import {imgBaseUrl , getImgPath , getStore , setStore } from '../config/index'
    import {shopDetails,foodMenu,ratingsTags,ratingsScores,ratingsList} from '../config/getData'
    export default {
        data () {
            return {
                geohash             : null,
                shopId              : null,
                imgBaseUrl          : imgBaseUrl,
                getImgPath          : getImgPath,
                changeShowType      : "commodity",  //tab切换
                ratingsIndex        : 0,            //评论筛选
                shopDetailData      : null,         //商品抬头
                ratingsData         : null,
                ratingsTagsData     : null,
                ratingsScoresData   : null,
                menuListData        : [],   //获取商铺食品列表
                shopListTop         : [],   //商品列表的高度集合
                menuIndex           : 0,
                showLoading         : false,
                categoryNum         : [],    //商品类型右上角已加入购物车的数量
                totalPrice          : 0,     //总共价格
                shopCartData        : [],     //购物车
                pageOffer           : 0 ,
                filterName          : null,
                allLoaded           : false,
                bottomStatus        : '',
                pageOffer           : 0
            }
        },
        created(){
            this.geohash = this.$route.query.geohash;
            this.shopId = this.$route.query.id;
        },
        mounted(){
            this.initData();
            this.INIT_CART();       //初始化cartList数据
            this.SHOPID(this.shopId);
        },
        computed:{
            ...mapState([
                'cartList'
            ]),
            shopCart(){
                return Object.assign( {} , this.cartList[this.shopId] )
            },
            totalCategory(){
                let num = 0
                this.shopCartData.forEach((item)=>{
                    num = item.num + num
                })
                return num;
            },
            //配送费
            dispatching(){
                if(this.shopDetailData){
                    return this.shopDetailData.float_delivery_fee ;
                }else{
                    return null
                }
            },
            //多少钱起送
            minimumOrderAmount(){
                if(this.shopDetailData){
                    return this.shopDetailData.float_minimum_order_amount - this.totalPrice ;
                }else{
                    return null
                }
            }
        },
        methods:{
            ...mapMutations([
                'SHOPID' , 'INIT_CART'
            ]),
            initCategoryNum(){
                let newArr = [] , foodIndex = 0 ;
                this.shopCartData = [];
                this.totalPrice = 0
                this.menuListData.forEach((item,index)=>{
                    let num = 0 , categoryId = item.foods[0].category_id;
                    if ( this.shopCart && this.shopCart[categoryId] ) {
                        Object.keys(this.shopCart[categoryId]).forEach(itemId => {
                            Object.keys(this.shopCart[categoryId][itemId]).forEach(foodId => {
                                let foodItem = this.shopCart[categoryId][itemId][foodId]
                                    num      = foodItem.num + num
                                if (item.type == 1) {
                                    this.totalPrice = Number(this.totalPrice + foodItem.price*foodItem.num)
                                    this.shopCartData[foodIndex]             = {};
                                    this.shopCartData[foodIndex].category_id = categoryId;
                                    this.shopCartData[foodIndex].item_id     = itemId;
                                    this.shopCartData[foodIndex].food_id     = foodId;
                                    this.shopCartData[foodIndex].num         = foodItem.num;
                                    this.shopCartData[foodIndex].price       = foodItem.price;
                                    this.shopCartData[foodIndex].name        = foodItem.name;
                                    this.shopCartData[foodIndex].specs       = foodItem.specs;
                                    foodIndex++
                                }
                            })
                        })
                        newArr[index] = num
                    }else{
                        newArr[index] = 0
                    }
                })
                this.categoryNum = newArr.concat([]);
            },
            chooseMenu(index){
                this.menuIndex = index;
                this.$refs.menuFoodList.scrollTop = this.shopListTop[index]
            },
            getFoodListHeight(){
                const oShopHeader   = this.$refs.shopheader.clientHeight;
                const oShopTab      = this.$refs.shopTab.clientHeight;
                const oMenuFoodList = this.$refs.menuFoodList;
                const listArr       = Array.from(oMenuFoodList.children);
                listArr.forEach((item, index) => {
                    this.shopListTop[index] = item.offsetTop - oShopHeader - oShopTab;
                });
                this.listenScroll(oMenuFoodList)
            },
            listenScroll(el){
                el.addEventListener('scroll',()=>{      // 鼠标滚动
                    currenIndex()
                },false)
                el.addEventListener('touchmove',()=>{       // 触碰
                    currenIndex()
                },false)
                const currenIndex = ()=>{
                    this.shopListTop.forEach((item,index)=>{
                        if(el.scrollTop >= item){
                            this.menuIndex = index;
                        }
                    })
                }
            },
            initData(){
                //商店详细 => 获取商铺食品列表
                shopDetails(this.shopId,'31.237129','121.489983').then(res=>{
                    this.shopDetailData = res.data
                    // 获取商家属性活动列表
                    return foodMenu(this.shopId)
                })
                .then((res)=>{
                    // 获取商家属性活动列表
                    this.menuListData = res.data;
                    //获取商铺评价分类
                    return ratingsTags(this.shopId)
                })
                .then(res=>{
                    //获取商铺评价分类
                    this.ratingsTagsData = res.data;
                    //获取商铺评价分数
                    return ratingsScores(this.shopId)
                })
                .then(res=>{
                    //获取商铺评价分数
                    this.ratingsScoresData = res.data
                    // 获取商铺评价列表
                    return ratingsList(this.pageOffer,"")
                })
                .then((res)=>{
                    // 获取商铺评价列表
                    this.ratingsData = res.data
                })
                .then(()=>{
                    this.showLoading = true;
                })

            },
            ratingsTagsChange(index,name){
                this.ratingsIndex = index;
                this.filterName   = name,
                ratingsList(this.pageOffer,name).then((res)=>{
                    this.ratingsData = res.data;
                })
            },
            loadBottom(){
                setTimeout(() => {
                    this.pageOffer = this.pageOffer + 20
                    ratingsList(this.pageOffer,this.filterName).then((res)=>{
                        res.data.forEach((item)=>{
                            this.ratingsData.push(item)
                        })
                    })
                    this.$refs.loadmore.onBottomLoaded();
                },1500)
            },
            handleBottomChange(status){
				this.bottomStatus = status;
			}
        },
        watch: {
            showLoading(value){
                if (value) {
                    this.$nextTick(() => {
                        this.getFoodListHeight();
                        this.initCategoryNum()
                    })
                }
            },
            shopCart:{
                deep: true,
                handler: function() {
                    this.initCategoryNum()
                }
            }

        },
        components:{
            myLoading , buyCart , shopCart , ratingStar , Loadmore
        }
    }
</script>
<style scoped>

    .router-slid-enter-active, .router-slid-leave-active {
        transition: all .4s;
    }
    .router-slid-enter, .router-slid-leave-active {
        transform: translateX(100%);
    }
    .food_img_ul{
        display: flex;
    }
    .food_img_ul li{
        width: 20%;
        margin-right: 10px;
        margin-top: 10px;
    }
    .food_name li{
        min-width: 20%;
        max-width: 45%;
        color: #999;
        font-size: 0.12rem;
        border: 1px solid #e8e8e8;
        margin:0.1rem 0.1rem 0rem 0rem;
        padding: 0 0.08rem;
        height: 0.28rem;
        line-height: 0.26rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        border-radius: 0.03rem;
    }
    .food_name{
        display: flex;
        flex-wrap: wrap;
    }

    .rated_at{
        float: right;
        color: #999;
    }
    .username_star p:nth-of-type(2){
        width: 1rem;
        height: 0.16rem;
        background: #ffaa0c;
    }
    .username{
        font-size: 0.14rem;
        margin-bottom: 0.05rem;
    }
    .username_star{
        float: left;
    }
    .food_user{
        font-size: 0.12rem;
        overflow: hidden;
        /*margin-bottom: 0.1rem;*/
    }
    .judgement_list > li > img{
        width: 0.45rem;
        height: 0.45rem;
        border-radius: 100%;
        margin-left: -0.55rem;
        float: left;
    }
    .judgement_list > li{
        width: 94%;
        margin: 0px auto;
        overflow: hidden;
        padding:0.1rem 0 0.1rem 0.55rem;
        border-top: 1px solid #f5f5f5;
    }
    .judgement_list{
        background: #fff;
    }
    .judgement_tab li.unsatisfied{
        background-color: #f5f5f5;
        color: #aaa;
    }
    .judgement_tab li.tagActivity{
        background-color: #3190e8;
        color: #fff;
    }
    .judgement_tab li{
        color: #6d7885;
        padding: .06rem .1rem;
        background-color: #ebf5ff;
        border-radius: 0.05rem;
        margin: 0.05rem .1rem .05rem 0;
    }
    .judgement_tab{
        background: #fff;
        margin-top: 0.12rem;
        display: flex;
        flex-wrap: wrap;
        padding: 0.05rem 0.12rem;
    }
    .judgement_header_right > div span.time{
        font-size: 12px;
        color: #9a9a9a !important;
    }
    .judgement_header_right > div span:nth-of-type(2){
        color: #f60;
    }

    .judgement_header_right > div span:nth-of-type(1){
        font-size: 0.12rem;
        margin-right: 0.1rem;
    }

    .judgement_header_right > div:last-of-type{
        margin-bottom: 0rem;
    }

    .judgement_header_right > div{
        display: flex;
        line-height: 0.2rem;
        height: 0.2rem;
        margin-bottom: 0.1rem;
    }
    .judgement_header_right{
        color: #666;
    }
    .judgement_header_left p:nth-of-type(2){
        color: #999;
        font-size: 0.12rem;
        transform:scale(0.9,0.9);
    }
    .judgement_header_left p:nth-of-type(1){
        font-size: 0.12rem;
        margin: 0.05rem 0 0.02rem 0;
    }

    .judgement_header_left h3{
        height: 0.28rem;
        line-height: 0.28rem;
        font-size: 0.28rem;
        color: #ff4600;
    }
    .judgement_header_left{
        width: 1.35rem;
        text-align: center;
        padding: 0.05rem 0 0.1rem 0;
        overflow: hidden;
        border-right: 1px solid #e8e8e8;
        margin-left: -1.5rem;
        float: left;
    }
    .judgement_header{
        padding: 0.15rem 0;
        background: #fff;
        padding-left: 1.5rem;
    }
    .judgement{
        overflow-y: auto;
    }

    .food_price span:nth-of-type(2){
        font-family: 'Arial';
        font-size: 0.18rem;
        font-weight: bold;
    }
    .food_price span:nth-of-type(1){
        font-size: 0.14rem;
        font-weight: bold;
    }
    .food_price span{
        color: #ff6000;
    }
    .menu_detail_footer{
        margin-top: 0.05rem;
    }
    .commodity_description p:nth-of-type(2) span{
        color: #333;
        font-size: 0.12rem;
        margin-right: 0.1rem;
    }
    .commodity_description p:nth-of-type(1){
        color:#a7a7a7;
        margin: 0.05rem 0;
        font-size: 0.12rem;
    }
    .commodity_description h3{
        font-size: 0.15rem;
        line-height: 0.2rem;
        font-weight: bold;
    }

    .commodity_right li section img{
        width: 0.45rem;
        height: 0.45rem;
        margin-left: -0.55rem;
        float: left;
    }
    .commodity_right li section{
        position: relative;
        padding:0.1rem 0.1rem 0.1rem 0.65rem;
        background: #fff;
        border-bottom: 1px solid #f6f6f6;
    }
    .commodity_right li header span{
        font-size: 0.12rem;
        color: #666;
    }
    .commodity_right li header h3{
        font-weight: bold;
        float: left;
        margin-right: 0.05rem;
    }
    .commodity_right li header{
        height: 0.44rem;
        line-height: 0.44rem;
        padding-left: 0.1rem;
        color: #333;
        display:block;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
    }
    .commodity_right{
        flex: 4;
        overflow-y: auto;
    }
    .commodity_left li em{
        width: 0.13rem;
        height: 0.13rem;
        line-height: 0.13rem;
        text-align: center;
        display: block;
        background: #ff461d;
        border-radius: 100%;
        font-size: 0.12rem;
        font-family: serif;
        color: #fff;
        position: absolute; top: 0.05rem; right: 0.05rem;
    }
    .commodity_left li span{
        display: inline-block;
        color: #666;
    }
    .commodity_left li.activity{
        background: #fff;
        border-left: 3px solid #3190e8;
    }
    .commodity_left li img{
        width: 0.14rem;
        height: 0.14rem;
    }
    .commodity_left li{
        position: relative;
        border-bottom: 1px solid #ededed;
        border-left: 3px solid #f8f8f8;
        padding: 0.2rem 0.1rem;
    }
    .commodity_left{
        width: 1rem;
        background: #f8f8f8;
        float: left;
        overflow-y: auto;
    }
    .commodity{
        display: flex;
        display:-webkit-flex;
        overflow-y: auto;
        padding-bottom: 0.54rem;
    }


    .tab li.on span{
        width: 100%;
        height: 3px;
        display: block;
        background:#3190e8;
        position: absolute; bottom:0px;
    }
    .tab li.on{
        color: #3190e8;

    }
    .tab li{
        width: 50%;
        text-align: center;
        float: left;
        position: relative;
    }
    .tab{
        height: 0.46rem;
        line-height: 0.46rem;
        background: #fff;
        border-bottom: 1px solid #e8e8e8;
    }
    .header{
        height: 1.23rem;
    }
    .header_top_img{
        height: 1.23rem;
        overflow: hidden;
    }
    .header_top_img img{
        z-index: 1;
        -webkit-filter: blur(10px);
        filter: blur(10px);
    }
    .header > section{
        width: 100%;
        padding: 0.12rem 0;
        position: absolute;
        top:0px;
        z-index: 14;
        background: rgba(119, 103, 137, 0.43);
    }

    .header_top{
        padding-left: 0.9rem;
    }
    .header_top img{
        width: .7rem;
        height: .7rem;
        float: left;
        margin-left: -0.8rem;
        background: #fff;
    }
    .header_top section{
        color:#fff;
    }
    .header_top section h3{
        font-size: 0.18rem;
        font-weight: bold;
        line-height: 0.24rem;
    }
    .header_top section > i{
        font-size: 28px;
        position: absolute;
        right: 10px;
        top: 45px;
    }
    .header_top section p{
        width: 85%;
        font-size: 0.12rem;
    }
    .header_top section p:nth-of-type(1){
        margin:0.06rem 0 0.07rem 0;
    }
    .header_bot{
        color: #fff;
        padding: 0.1rem 0.12rem 0 0.12rem;
    }
    .header_bot p{
        font-size: 0.12rem;
        line-height: 0.2rem;
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
    }

    .header_bot p em{
        width: 0.2rem;
        height: 0.2rem;
        line-height: 0.2rem;
        color: #fff;
        font-size: 0.12rem;
        background: #70bc46;
        display: block;
        font-style: normal;
        border-radius: 0.02rem;
        text-align: center;
        float: left;
        margin-right: 0.05rem;
    }
    .shop{
        display: flex;
        flex-direction: column;
        position: absolute;
        right: 0;
        left: 0;
        height: 100%;
    }

</style>
