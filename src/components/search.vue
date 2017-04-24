<template>
    <div class="pb">
        <head-top head-title="搜索"></head-top>
        <div class="search">
            <div class="search_title">
                <input type="text" v-model='searchValue' @keyup.enter='searchTarget' @input="checkInput">
                <button type="button" @click="searchTarget">搜索</button>
            </div>
            <section class="search_list" v-if='searchList.length'>
                <h4 class="business">商家</h4>
                <ul>
                    <li v-for='item in searchList'>
                        <img :src=" imgBaseUrl + item.image_path" >
                        <section>
                            <div class="search_list_top">
                                <div class="search_list_title">{{item.name}}</div>
                                <div class="search_list_news">月售{{item.month_sales}}单</div>
                                <div class="search_list_express">
                                    <span>¥{{item.delivery_fee}}起送</span>
                                    <span>距离{{item.distance}}</span>
                                </div>
                            </div>
                            <div class="search_list_bot">
                                <p v-for='activity in item.restaurant_activity'>
                                    <em :style="{backgroundColor: '#' + activity.icon_color}">{{activity.icon_name}}</em>
                                    <span>{{activity.name}}</span><span>(手机客户端专享)</span>
                                </p>
                            </div>
                        </section>
                    </li>
                </ul>
            </section>
            <section class="search_history" v-if="searchHistory.length!=0 && showHistory">
                <div class="title_restaurant">搜索历史</div>
                <ul class="history_list">
                    <li v-for="(item,index) in searchHistory"><span>{{item}}</span><i class="fa fa-close" @click='deleteHistory(index)'></i></li>
                </ul>
                <div class="clear_history" @click='clearHistory'>清空搜索历史</div>
            </section>
            <div class="search_none" v-if='searchNone'>很抱歉！无搜索结果</div>
        </div>
        <myFooter></myFooter>
    </div>
</template>

<script>
    import headTop from './Header'
    import myFooter from './Footer'
    import {imgBaseUrl,setStore,getStore} from '../config/index'
    import {searchRestaurants} from '../config/getData'
    export default {
        data () {
            return {
                geohash      : '',
                searchValue  : '',
                searchList   : '',      //列表数据
                searchHistory: [],      //存储本地搜索历史
                imgBaseUrl   : imgBaseUrl,
                showHistory  : true ,   //显示历史记录
                searchNone   : false    //隐藏搜索为空提示
            }
        },
        components: {
            headTop,
            myFooter
        },
        mounted(){
            this.geohash = this.$route.query.geohash ;
            if(getStore('searchHistory')){
                this.searchHistory = JSON.parse(getStore('searchHistory'));
            }

        },
        methods : {
            clearHistory(){
                this.searchHistory = []
                setStore('searchHistory',this.searchHistory)
            },
            deleteHistory(index){    //点击删除历史记录
                this.searchHistory.splice(index,1)
                setStore('searchHistory',this.searchHistory)
            },
            checkInput(){       //初始化
                if(this.searchValue === ''){
                    this.searchList = [];
                    this.showHistory = true;
                    this.searchNone = false;
                }
            },
            searchTarget(){
                if(getStore('searchHistory')){
                    let checkrepeat = false ;
                    this.searchHistory.forEach(item=>{
                        if(item == this.searchValue){
                            checkrepeat = true;
                        }
                    })
                    if(!checkrepeat){
                        this.searchHistory.push(this.searchValue)
                    }
                }else{
                    this.searchHistory[0] = this.searchValue
                }
                this.showHistory = false ;
                setStore('searchHistory',this.searchHistory)

                searchRestaurants(this.geohash,this.searchValue).then(res=>{
                    res.data.length==0 ?　this.searchNone = true :this.searchNone = false
                    this.searchList = res.data;
                })
            }
        }
    }
</script>
<style scoped>
    .search_history{
        background: #fff;
    }
    .search{
        padding-bottom: 0.58rem;
    }
    .clear_history{
        height: 0.46rem;
        line-height: 0.46rem;
        background-color: #fff;
        color: #3190e8;
        font-size: 16px;
        font-weight: bold;
        text-align: center;
    }
    .history_list li i{
        position: absolute; right: 0.05rem;
        height: 100%;
        text-align: right;
        padding: 0.15rem 0.1rem 0 0.1rem;
    }
    .history_list li span{
        font-size: 0.16rem;
    }
    .history_list li{
        position: relative;
        padding: 0 0.12rem;
        height: 0.46rem;
        line-height: 0.46rem;
        border-bottom: 1px solid #e8e8e8;
    }
    .title_restaurant{
        width: 100%;
        margin: 0px auto;
        color: #666;
        padding: 0.12rem 0.12rem;
        font-size: 0.16rem;
        font-weight: bold;
        background: #f2f2f2;
    }
    .search_none{
        background: #fff;
        height: 0.5rem;
        line-height: 0.5rem;
        font-size: 0.15rem;
        text-align: center;
    }
    .search_list_bot em{
        width: 0.18rem;
        height:0.18rem;
        line-height: 0.18rem;
        text-align: center;
        border-radius: 0.02rem;
        margin-right: 0.05rem;
        display: inline-block;
        color: #fff;
    }
    .search_list_bot span{
        font-size: 0.12rem;
    }
    .search_list_bot p{
        font-size: 0.12rem;
        margin-top : 0.1rem;
        display:block;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
    }
    .search_list_top{
        overflow: hidden;
        padding-bottom: 0.1rem;
        border-bottom: 1px solid #e8e8e8;
    }
    .search_list{
        background: #fff;
    }

    .search_list li{
        margin: 0px auto;
        overflow: hidden;
        padding: 0.1rem 0.1rem 0.1rem 0.78rem;
        border-bottom: 1px solid #e8e8e8;
    }
    .search_list li img{
        width: 0.6rem;
        height: 0.6rem;
        overflow: hidden;
        margin-left: -0.68rem;
        float: left;
    }

    .search_list li section{
        width: 100%;
    }
    .search_list_title{
        color: #222;
    }


    .search_list_news{
        font-size: 0.12rem;
        height: 0.2rem;
        line-height: 0.2rem;
        margin: 0.04rem 0px 0.02rem 0;
    }

    .search_list_express{
        color: #666;
    }

    .search_list_express span{
        font-size: 0.12rem;
        color: #666;
    }
    .search_list_express span:nth-of-type(1){
        margin-right: 0.1rem;
    }

    .business{
        width: 100%;
        margin: 0px auto;
        color: #666;
        padding: 0.12rem 0.12rem;
        font-size: 0.16rem;
        font-weight: bold;
        background: #f2f2f2;
    }
    .search_title{
        width: 100%;
        margin: 0px auto;
        height: 0.55rem;
        padding: 0.1rem 0.12rem;
        background: #fff;
    }
    .search_title input{
        width: 78%;
        height: 0.35rem;
        text-indent: 0.1rem;
        border: 1px solid #dedede;
        background: #f5f5f5;
        border-radius: 0.03rem;
    }
    .search_title button{
        float: right;
        width: 0.68rem;
        height: 0.35rem;
        background: #3190e8;
        border-radius: 0.03rem;
        color: #fff;
    }

</style>
