<template>
    <div class="screen pb">
        <head-top :head-title="title"></head-top>
        <header class="screen_title">
            <div>
                <div @click="showTitle('food')" :class="{ bule:foodShow=='food' }">
                    <p>美食<i class="fa fa-caret-down"></i></p>
                </div>
                <transition name="screen">
                    <section v-show="foodShow=='food'">
                        <ul class="section_left">
                            <li v-for="(item,index) in foodCategoryArr" @click="foodSub(index)" :class="[dataIndex == index ? 'active':'']">
                                <p>
                                    <img :src="imgBaseUrl + getImgPath(item.image_url)" v-if="index!=0">
                                    <span :class="[index==0 ? 'activeLeft':'']">{{item.name}}</span>
                                </p>
                                <p><span>{{item.count}}</span></p>
                            </li>
                        </ul>
                        <ul class="section_right">
                            <li v-for="item in foodSubArr" @click='getScreen("",item.id,"null","null")' :class='[item.id==foodIndex?"choosed":""]'>
                                <span>{{item.name}}</span>
                                <span>{{item.count}}</span>
                            </li>
                        </ul>
                    </section>
                </transition>
            </div>
            <div>
                <div @click="showTitle('category')" :class="{ bule : foodShow=='category' }">
                    <p>排序<i class="fa fa-caret-down"></i></p>
                </div>
                <transition name="screen">
                    <section class="category" v-show="foodShow=='category'">
                    <ul>
                        <li @click='getScreen("",category_ids,"0","null")' :class='[categoryIndex==0 ? "on" : ""]'>
                            <img src="../assets/image/food_ioc01.png"><span>智能排序</span>
                        </li>
                        <li @click='getScreen("",category_ids,"5","null")' :class='[categoryIndex==5 ? "on" : ""]'>
                            <img src="../assets/image/food_ioc02.png"><span>距离最近</span>
                        </li>
                        <li @click='getScreen("",category_ids,"6","null")' :class='[categoryIndex==6 ? "on" : ""]'>
                            <img src="../assets/image/food_ioc03.png"><span>销量最高</span>
                        </li>
                        <li @click='getScreen("",category_ids,"1","null")' :class='[categoryIndex==1 ? "on" : ""]'>
                            <img src="../assets/image/food_ioc04.png"><span>起送价最低</span>
                        </li>
                        <li @click='getScreen("",category_ids,"2","null")' :class='[categoryIndex==2 ? "on" : ""]'>
                            <img src="../assets/image/food_ioc05.png"><span>配送速度最快</span>
                        </li>
                        <li @click='getScreen("",category_ids,"3","null")' :class='[categoryIndex==3 ? "on" : ""]'>
                            <img src="../assets/image/food_ioc06.png"><span>评分最高</span>
                        </li>
                    </ul>
                </section>
                </transition>
            </div>
            <div>
                <div @click="showTitle('filter')" :class="{ bule : foodShow=='filter' }">
                    <p>筛选<i class="fa fa-caret-down"></i></p>
                </div>
                <transition name="screen">
                    <section class="filter" v-show="foodShow=='filter'">
                        <dl>
                            <dt>配送方式</dt>
                            <dd v-for="(item,index) in filterTopArr" @click='setFilter(item.id)'>
                                <i class="fa fa-check" v-if='delivery_modes == item.id && bDeliveryModes'></i>
                                <img src="../assets/image/fen.png" v-if="item.text=='蜂鸟专送'">
                                <span :class="[delivery_modes==item.id && bDeliveryModes ? 'bule' : '' ]">{{item.text}}</span>
                            </dd>
                        </dl>
                        <dl>
                            <dt>商家属性 (可多选)</dt>
                            <dd v-for='(item,index) in filterBotArr' @click="businessChange(item.id,index)">
                                <i class="fa fa-check" v-if="support_ids[index].status"></i>
                                <em :style="{color:'#'+item.icon_color,borderColor:'#'+item.icon_color}">{{item.icon_name}}</em>
                                <span>{{item.name}}</span>
                            </dd>
                        </dl>
                        <div class="filter_bot"><span @click="clearAll">清空</span><span @click="getScreen('',category_ids,orderBy,delivery_modes,support_ids)">确认<em v-if='filterNum!=0'>({{filterNum}})</em></span></div>
                    </section>
                </transition>
            </div>
        </header>
        <div class="block"></div>
        <mt-loadmore :bottom-method="loadBottom" :auto-fill="false" :bottom-all-loaded="allLoaded" @bottom-status-change="handleBottomChange" ref='loadmore'>
            <goodsList :goodsList="goodsList" ></goodsList>
            <div slot="bottom" class="mint-loadmore-bottom">
                <span v-show="bottomStatus !== 'loading'" :class="{ 'rotate': bottomStatus === 'drop' }">↓</span>
                <span v-show="bottomStatus == 'loading'">Loading...</span>
            </div>
        </mt-loadmore>
        <div class="back_cover" v-show="foodShow" @click=" foodShow = null "></div>
        <myLoading v-if="showLoading"></myLoading>
    </div>
</template>

<script>
    import headTop from './Header'
    import goodsList from './goodsList'
    import myLoading from './loading'
    import { Loadmore } from 'mint-ui';
    import {imgBaseUrl,getImgPath} from '../config/index'
    import {foodActivity,foodDelivery,foodCategory,screenList} from '../config/getData'
    export default {
        data () {
            return {
                title                   : null,    //head标题
                dataIndex               : 1,
                imgBaseUrl              : imgBaseUrl,
                getImgPath              : getImgPath,
                showLoading             : true,
                foodShow                : null,
                foodCategoryArr         : null,       //美食筛选右边
                foodSubArr              : null,       //美食筛选左边
                filterTopArr            : null,       //筛选-配送方式
                filterBotArr            : null,       //筛选-商家属性
                goodsList               : null,       //商家列表
                restaurant_category_id  : null,       //获取商家id
                category_ids            : null,       //获取商家id列表
                orderBy                 : null,
                delivery_modes          : null,
                support_ids             : [],
                foodIndex               : 1  ,       //美食高亮
                categoryIndex           : '' ,       //排序高亮
                bDeliveryModes          : false,
                filterNum               : '' ,       //数字
                allLoaded               : false,
                bottomStatus            : '',
                pageOffer               : 0
            }
        },
        created(){
            this.title                  = this.$route.query.title
            this.restaurant_category_id = this.$route.query.restaurant_category_id
        },
        mounted(){
            this.initData()
        },
        methods : {
            initData(){
                //配送方式
                foodActivity("31.237129","121.489983").then(res=>{
                    for(let i=0; i<res.data.length; i++){
                        this.support_ids.push({ id : res.data[i].id , status : false })
                    }
                    this.filterBotArr = res.data;
                    //商家属性
                    return foodDelivery("31.237129","121.489983")
                })
                .then((res)=>{

                    //商家属性
                    this.filterTopArr = res.data
                    //美食请求数据
                    return foodCategory("31.237129","121.489983")

                })
                .then(res=>{
                    //美食请求数据
                    this.foodCategoryArr = res.data;
                    this.foodSubArr = res.data[this.dataIndex].sub_categories
                    //商家列表
                    return screenList('31.229809','121.460022',this.pageOffer,this.restaurant_category_id,'','','','')
                })
                .then(res=>{
                    //商家列表
                    this.goodsList = res.data;

                })
                .then(res=>{
                    this.showLoading = false
                })

            },
            //商家属性添加
            businessChange(id,index){
                this.support_ids.splice(index, 1, { id:id , status:!this.support_ids[index].status });
                this.filterNum = this.delivery_modes == null ? 0 : 1;
                this.support_ids.forEach(item=>{
                    if(item.status){
                        this.filterNum++
                    }
                })
            },
            //清空
            clearAll(){
                this.delivery_modes = ""
                this.filterNum = ""
                this.support_ids.forEach(item=>{
                    item.status = false

                })
            },
            setFilter(id){  //排序
                if(this.delivery_modes == null){
                    this.bDeliveryModes = true;
                    this.delivery_modes = id;
                    this.filterNum++
                }
                else if(this.delivery_modes == id){
                    this.bDeliveryModes = !this.bDeliveryModes;
                    if(!this.bDeliveryModes){
                        this.filterNum--
                        this.delivery_mode = null;
                    } else{
                        this.filterNum++
                    }
                }
                else{
                    this.delivery_modes = id
                }
            },
            getScreen(categoryId,categoryIds,orderBy,deliveryModes,support_ids){       //获取列表
                this.foodShow       = null
                this.foodIndex      = categoryIds=='' ? categoryId : categoryIds        //美食-选中
                this.categoryIndex  = orderBy                                   //排序-选中
                this.category_ids   = categoryIds
                this.orderBy        = orderBy

                //筛选列表
                screenList('31.229809','121.460022',this.pageOffer,categoryId,categoryIds,orderBy,deliveryModes,support_ids).then(res=>{
                    this.goodsList = res.data;
                })

            },
            foodSub(index){     //美食高亮
                if(index == 0){
                    this.foodShow = null
                    this.getScreen("","","","","")
                }else{
                    this.dataIndex = index;
                    this.foodSubArr = this.foodCategoryArr[index].sub_categories
                }

            },
            showTitle(name){
                if(this.foodShow != name){
                    this.foodShow = name
                }else{
                    this.foodShow = ''
                }

            },
            loadBottom(){
                setTimeout(() => {
                    this.pageOffer = this.pageOffer + 20
                    this.restaurant_category_id = this.category_ids == null ?　this.restaurant_category_id : ""
                    screenList(
                        '31.229809' , '121.460022' , this.pageOffer , this.restaurant_category_id , this.category_ids ,
                        this.orderBy , this.delivery_modes , this.support_ids
                    ).then(res=>{
                        res.data.forEach((item)=>{
                            this.goodsList.push(item)
                        })
                    })
                    this.$refs.loadmore.onBottomLoaded();
                },1500)
            },
            handleBottomChange(status){
				this.bottomStatus = status;
			}
        },
        components:{
            headTop , goodsList , myLoading
        }
    }
</script>
<style scoped>

    .opacity{
        opacity: 1 !important;
    }
    .choosed span{
        color: #3190e8;
    }

    .bule{
        color:#3190e8;
    }
    .bule i{
        color:#3190e8 !important;
    }
    .activeLeft{
        margin-left: -0.25rem;
    }
    .block{
        height : 0.42rem;
    }
    .screen-enter-active, .screen-leave-active {
        transition: all .3s;
        transform: translateY(0);
    }
    .screen-enter, .screen-leave-active {
        transform: translateY(-100%);
        opacity: 0;
    }
    .filter_bot span:nth-of-type(2){
        width: 48%;
        height: 0.42rem;
        background:#56d176;
        border: 1px solid #20a849;
        text-align: center;
        float: right;
        color: #fff;
    }
    .filter_bot span:nth-of-type(1){
        width: 48%;
        height: 0.42rem;
        color: #272727;
        background:#f5f5f5;
        border: 1px solid #ddd;
        text-align: center;
        float: left;
    }
    .filter_bot span{
        font-size: 0.16rem;
        line-height: 0.4rem;
        display: inline-block;
        border-radius: 0.03rem;
    }
    .filter_bot{
        width: 100%;
        padding: 0.1rem 0.15rem;
        background: #fafafa;
        overflow: hidden;
        border-top: 1px solid #eee;
        margin-top: 0.15rem;
    }
    .lan{
        color: #55a1ff !important;
        border: 1px solid #55a1ff !important;
    }
    .cheng{
        color: #ff4b02 !important;
        border: 1px solid #ff4b02 !important;
    }
    .sls{
        color: #44b5f1 !important;
        border: 1px solid #44b5f1 !important;
    }
    .filter dl dd img{
        width: 0.2rem;
        height: 0.2rem;
        margin: 0.05rem 0 0 0;
        float: left;
    }
    .filter dl dd i{
        position: absolute; top:0.04rem; left: 0.08rem;
        width: 0.22rem;
        height: 0.22rem;
        text-align: center;
        line-height: 0.22rem;
        background: #fff;
        font-size: 0.16rem;
        color: #3190e8;
    }
    .filter dl:nth-of-type(1) dd:nth-of-type(1) span{
        padding-left: 0.2rem;
    }
    .filter dl dd em{
        width: 0.18rem;
        height: 0.18rem;
        text-align: center;
        line-height: 0.16rem;
        color: #999;
        border: 1px solid #999;
        display: inline-block;
        font-size: 0.12rem;
        border-radius: 0.02rem;
        margin-right: 0.02rem;
    }
    .filter dl dd span{
        font-size: 0.12rem;
    }
    .filter dl dd:nth-of-type(3n){
        margin-right: 0px;
    }
    .filter dl dd{
        width: 1.08rem;
        height: 0.32rem;
        position: relative;
        line-height: 0.3rem;
        font-size: 0.13rem;
        border: 1px solid #ddd;
        padding-left: 0.1rem;
        float: left;
        border-radius: 0.03rem;
        margin-right: 0.1rem;
        margin-bottom: 0.1rem;
    }
    .filter dl dt{
        height: 0.35rem;
        line-height: 0.35rem;
        font-size: 0.12rem;
    }

    .filter dl{
        overflow: hidden;
        padding: 0px 0.15rem;
        margin-top: 0.05rem;
    }
    .filter{
        text-align: left;
        width: 100%;
        position: absolute; top: 0.42rem; left:0px; z-index: 1;
        min-height: 2.5rem;
        background: #fff;
    }
    .category ul li.on span{
        color: #3190e8;
        background: url('../assets/image/dui.png') no-repeat 96%;
        background-size:0.15rem;
    }
    .category ul li span{
        height: .48rem;
        line-height: .48rem;
        width: 100%;
        float: left;
        text-align: left;
        border-bottom: 1px solid #dcdcdc;
    }
    .category ul li img{
        width: 0.2rem;
        height: 0.2rem;
        float: left;
        margin-left: -0.35rem;
        margin-top: 0.15rem;
    }
    .category ul li:last-of-type span{
        border-bottom: none;
    }
    .category ul li{
        overflow: hidden;
        padding-left: 0.5rem;
    }
    .category{
        width: 100%;
        position: absolute; top: 0.42rem; left:0px;
        height: 2.9rem;
        background: #fff;
    }
    .section_right li span:nth-of-type(2){
        float: right;
    }
    .section_right li span:nth-of-type(1){
        float: left;
    }
    .section_right li{
        height: 0.43rem;
        line-height: 0.43rem;
        margin : 0 0.1rem;
        border-bottom: 1px solid #ddd;
    }
    .section_right{
        width: 50%;
        height: 100%;
        overflow-y: auto;
    }
    .section_left li.active{
        background: #fff;
    }
    .section_left li p span{
        float: left;
    }
    .section_left li p img{
        width: 0.2rem;
        height: 0.2rem;
        float: left;
        margin-top: 0.11rem;
        margin-left: -0.25rem;
    }
    .section_left li p:nth-of-type(2) span{
        color: #fff;
        background: #cdcdcd;
        height: 0.2rem;
        line-height: 0.2rem;
        padding:0 0.06rem;
        border-radius: 0.1rem;
        float: right;
        margin-top: 0.13rem;
        font-size: 0.12rem;
    }
    .section_left li p:nth-of-type(2){
        width: 40%;
        float: right;

    }
    .section_left li p:nth-of-type(1){
        width: 60%;
        float: left;
        padding-left: 0.25rem;
    }
    .section_left li{
        display: flex;
        padding: 0 0.1rem;
        border-bottom: 1px solid #fff;
    }
    .section_left{
        width: 50%;
        height: 100%;
        overflow: auto;
        background: #f1f1f1;
    }
    .screen_title{
        width: 100%;
        height: 0.42rem;
        line-height: 0.42rem;
        display: flex;
        background: #fff;
        border-bottom: 1px solid #e0e0e0;
        position: fixed; z-index:13;
    }
    .screen_title > div > div i{
        color: #666;
        margin-left: 0.1rem;
    }
    .screen_title > div:last-of-type > div{
        border-right: none;
    }
    .screen_title > div > div {
        height: 0.4rem;
        background: #fff;
        position: relative;
        z-index: 99;
        overflow: hidden;
    }
    .screen_title > div > div p{
        height: 0.24rem;
        line-height: 0.24rem;
        margin-top: 0.09rem;
        border-right: 1px solid #e4e4e4;
    }
    .screen_title > div{
        width: 33.33%;
        text-align: center;
    }
    .screen_title div:nth-of-type(1) section{
        width: 100%;
        background: #fff;
        display: flex;
        height: 3.5rem;
        position: absolute; top: 0.42rem; left: 0;
    }

    .back_cover{
        background: rgba(0, 0, 0, 0.3);
        position: fixed;
        left: 0px; top: 0.9rem; bottom: 0px; right: 0px;
    }

</style>
