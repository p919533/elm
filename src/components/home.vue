<template>
    <div class="pb">
        <head-top goBack='true'>
            <div class="link_search" slot="search">
                <i class="fa fa-search fa-2x"></i>
                <div class="home_title">
                    {{cityName}}
                </div>
            </div>
        </head-top>
        <div class="home_list">
            <div class="nav">
                <mt-swipe :auto="10000" >
                    <mt-swipe-item v-for="(item,index) in foodMenu">
                        <router-link :to="{path:'/screen',query:{geohash:geohash,title:foodItem.title,restaurant_category_id:getCategoryId(foodItem.link)}}" v-for='foodItem in item' tag="li">
                            <img :src="imgBaseUrl + foodItem.image_url" /><span>{{foodItem.title}}</span>
                        </router-link>
                    </mt-swipe-item>
                </mt-swipe>
            </div>
            <div class="goodsTitle">推荐商家</div>
            <mt-loadmore :bottom-method="loadBottom" :auto-fill="false" :bottom-all-loaded="allLoaded" @bottom-status-change="handleBottomChange" ref='loadmore'>
                <goodsList :goodsList="goodsList" :geohash="geohash"></goodsList>
                <div slot="bottom" class="mint-loadmore-bottom">
                    <span v-show="bottomStatus !== 'loading'" :class="{ 'rotate': bottomStatus === 'drop' }">↓</span>
                    <span v-show="bottomStatus == 'loading'">Loading...</span>
                </div>
            </mt-loadmore>
        </div>
        <myLoading v-if="showLoading"></myLoading>
        <my-footer :geohash = "geohash"></my-footer>
    </div>
</template>
<script>
    import headTop from './Header'
    import myFooter from './Footer'
    import myLoading from './loading'
    import ratingStar from './ratingStar'
    import goodsList from './goodsList'
    import { Loadmore, Swipe, SwipeItem } from 'mint-ui';
    import { imgBaseUrl, getImgPath } from '../config/index';
    import { cityName, msiteFoodTypes, shopList} from '../config/getData';
    import { mapState, mapMutations } from 'vuex'
    export default {
        data () {
            return {
                geohash         : "wtw3swd33xn",
                showLoading     : true ,
                cityName        : null,           //获取标题
                imgBaseUrl      : imgBaseUrl,   //图片域名地址
                getImgPath      : getImgPath,   //处理图片路径
                foodMenu        : [],          //食品分类列表
                goodsList       : [],
                allLoaded       : false,
                bottomStatus    : '',
                pageOffer       : 0
            }
        },
        mounted(){
             //初始化数据
            this.initData()
        },
        methods:{
            initData(){
                //获取标题
                cityName(this.geohash).then(res=>{
                    this.cityName = res.data.name;
                })
                //食品分类列表
                msiteFoodTypes(this.geohash).then((res)=>{
                    let foodMenuArr = [];
                    for (var i = 0; i < res.data.length/8; i++) {
                        foodMenuArr.push([]);
                        for(var j=i*8; j<(i+1)*8; j++){
                            foodMenuArr[i].push(res.data[j])
                        }
                    }
                    this.foodMenu = foodMenuArr;
                })

                //附近商家
                shopList('31.229809','121.460022',this.pageOffer).then((res)=>{
                    this.goodsList = res.data;
                }).then(()=>{
                    this.showLoading = false;
                })

            },
            loadBottom(){
                setTimeout(() => {
                    this.pageOffer = this.pageOffer+20
                    shopList('31.229809','121.460022',this.pageOffer).then((res)=>{
                        res.data.forEach((item)=>{
                            this.goodsList.push(item)
                        })
                    })

                    this.$refs.loadmore.onBottomLoaded();
                },1500)
            },
            handleBottomChange(status){
				this.bottomStatus = status;
			},
            getCategoryId(url){
        		let urlData = decodeURIComponent(url.split('=')[1].replace('&target_name',''));
        		if (/restaurant_category_id/gi.test(urlData)) {
        			return JSON.parse(urlData).restaurant_category_id.id
        		}else{
        			return ''
        		}
        	}
        },
        components: {
            headTop , myFooter , ratingStar , goodsList, Loadmore , myLoading , Swipe, SwipeItem
        }
    }
</script>

<style scoped>
    .link_search{
        width: 100%;
    }
    .link_search i{
        position: absolute; left: 10px; top:0.08rem;
    }
    .home_title{
        width: 50%;
        display: block;
        line-height: 0.24rem;
        font-size: 0.18rem;
        text-align: center;
        position: absolute; left: 25%; top:0px;
    }
    .home_list{
        padding: 0 0 0.58rem 0;
    }
    .nav{
        height: 2.1rem;
        overflow: hidden;
        background: #fff;
        margin: 0.1rem 0 0 0;
    }

    .nav li{
        width: 25%;
        height: 0.9rem;
        float: left;
        text-align: center;
        margin: 5px 0;
    }
    .nav li img{
        width: 60%;
        margin: 0px auto;
        display: block;
    }
    .nav li span{
        height: 20px;
        font-size: 0.13rem;
        line-height: 20px;
    }

    .goodsTitle{
        width: 100%;
        padding: 0 3%;
        height: .4rem;
        line-height: .4rem;
        border-bottom: 1px solid #e8e8e8;
        background: #fff;
        margin-top: 0.1rem;
    }

</style>
