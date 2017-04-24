<template>
    <div>
        <div class="cart_button"  v-if='!foods.specifications.length'>
            <transition name="fadeRotate">
                <div class="cart_left" v-if="shopNum>0" @click="removeToCart(
                    foods.category_id,
                    foods.item_id,
                    foods.specfoods[0].food_id,
                    foods.specfoods[0].name,
                    '',
                    foods.specfoods[0].original_price=='null' ? foods.specfoods[0].original_price : foods.specfoods[0].price,
                    foods.specfoods[0].packing_fee,
                    foods.specfoods[0].sku_id,
                    foods.specfoods[0].stock
                )">
                    <i class="fa fa-minus"></i>
                </div>
            </transition>
            <div class="cart_num" v-if="shopNum>0">{{shopNum}}</div>
            <div class="cart_right" @click="addToCart(
                foods.category_id,
                foods.item_id,
                foods.specfoods[0].food_id,
                foods.specfoods[0].name,
                '',
                foods.specfoods[0].original_price=='null' ? foods.specfoods[0].original_price : foods.specfoods[0].price,
                foods.specfoods[0].packing_fee,
                foods.specfoods[0].sku_id,
                foods.specfoods[0].stock
            )">
                <i class="fa fa-plus"></i>
            </div>
        </div>
        <div class="specConter" v-else>
            <transition name="fadeRotate">
                <div class="cart_left" v-if="shopNum>0" @click="removeToCart(
                    foods.category_id,
                    foods.item_id,
                    foods.specfoods[0].food_id,
                    foods.specfoods[0].name,
                    '',
                    foods.specfoods[0].original_price=='null' ? foods.specfoods[0].original_price : foods.specfoods[0].price,
                    foods.specfoods[0].packing_fee,
                    foods.specfoods[0].sku_id,
                    foods.specfoods[0].stock
                )">
                    <i class="fa fa-minus"></i>
                </div>
            </transition>
            <div class="cart_num" v-if="shopNum>0" style="line-height:26px;">{{shopNum}}</div>
            <div class="show_chooselist" @click="specChange(foods.specfoods[0].food_id)">选规格</div>
            <div class="spec_bj" v-if="foodId==foods.specfoods[0].food_id" @click="specChange('')"></div>
            <div class="specContent" v-if="foodId==foods.specfoods[0].food_id">
                <i class="fa fa-times" @click="specChange('')"></i>
                <div class="specContent_title">
                    <h4>{{foods.name}}</h4>
                    <h5>规格</h5>
                </div>
                <div class="specContent_list">
                    <p v-for="item in foods.specifications[0].values" :class="{on:item==valuesName}" @click='specfoodsChange(item)'>{{item}}</p>
                </div>
                <div class="specContent_bot">
                    <span><em>￥</em>{{foods.specfoods[0].original_price=="null" ? foods.specfoods[0].original_price : foods.specfoods[0].price}}</span>
                    <span @click="addSpecCart(foods.category_id, foods.item_id, foods.specfoods[0].food_id, foods.specfoods[0].name, valuesName, foods.specfoods[0].price, foods.specfoods[0].packing_fee, foods.specfoods[0].sku_id, foods.specfoods[0].stock)">加入购物车</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapState,mapMutations} from 'vuex'
    import {getStore,setStore} from '../config/index'
    export default {
        data () {
            return {
                foodId      : null,
                bFoodId     : false,
                valuesName  : null
            }
        },
        props:[
            'foods'
        ],
        computed:{
            ...mapState([
                'shopId','cartList'
            ]),
            shopCart(){
                return Object.assign({},this.cartList)
            },
            shopNum(){
                let restaurant_id = this.foods.restaurant_id , category_id   = this.foods.category_id ,
                    item_id       = this.foods.item_id ,       food_id       = this.foods.specfoods[0].food_id
                if(this.shopCart[restaurant_id] && this.shopCart[restaurant_id][category_id] && this.shopCart[restaurant_id][category_id][item_id] && this.shopCart[restaurant_id][category_id][item_id][food_id]){
                    return this.shopCart[restaurant_id][category_id][item_id][food_id]['num']
                }else{
                    return 0;
                }
            }
        },
        mounted(){
        },
        methods:{
            ...mapMutations([
                'ADD_CART','REMOVE_CART'
            ]),

            addSpecCart(category_id, item_id, food_id, name, specs ,price, packing_fee, sku_id, stock){
                this.foodId = ''
                console.log('price=',price)
                this.ADD_CART({
                    shopId : this.shopId, category_id, item_id, food_id, name, specs , price, packing_fee, sku_id, stock
                })
            },
            addToCart(category_id, item_id, food_id, name, specs, price, packing_fee, sku_id, stock){
                console.log('price=',price)
                this.ADD_CART({
                    shopId : this.shopId, category_id, item_id, food_id, name, specs , price, packing_fee, sku_id, stock
                })
            },
            removeToCart(category_id, item_id, food_id, name, specs, price, packing_fee, sku_id, stock){
                console.log('price=',price)
                this.REMOVE_CART({
                    shopId : this.shopId, category_id, item_id, food_id, name, specs , price, packing_fee, sku_id, stock
                })
            },
            specChange(foodid){
                this.foodId = foodid
            },
            specfoodsChange(name){
                this.valuesName = name
            }
        },
    }
</script>
<style scoped>
    .specConter{
        /*width: 150px;*/
        line-height: 22px;
        display: flex;
        position: absolute;
        right: 0rem;
        bottom: .1rem;
        transition: all .4s linear;
    }
    .specContent i{
        font-size: 20px;
        position: absolute; right: .1rem; top:.1rem;
    }
    .specContent_bot span:nth-of-type(2){
        color: #fff;
        background: #3199e8;
        float: right;
        border-radius: 3px;
        padding: 0.05rem 0.1rem;
    }
    .specContent_bot span:nth-of-type(1) em{
        font-size: 14px;
    }
    .specContent_bot span:nth-of-type(1){
        float: left;
        color: #ff6000;
        font-size: 0.2rem;
    }
    .specContent_bot{
        width: 100%;
        padding:0 0.12rem;
        position: absolute; bottom: 0.1rem;
    }
    .specContent_list p.on{
        border-color: #3199e8;
        color: #3199e8;
    }
    .specContent_list p{
        font-size: 0.13rem;
        margin: 0.1rem 0.1rem 0 0;
        height: 0.32rem;
        line-height: 0.3rem;
        text-align: center;
        border: 1px solid #ddd;
        border-radius: 0.05rem;
        padding: 0 0.08rem;
    }
    .specContent_list{
        /*height: 200px;*/
        max-height: 3.8rem;
        min-height: 2.5rem;
        display: flex;
        flex-wrap: wrap ;
        padding:0 0.12rem;
        overflow-y: scroll;
        margin-bottom: 0.45rem;
    }
    .specContent_title h5{
        font-size: 0.15rem;
        padding:0 0.12rem;
        font-weight: bold;
    }
    .specContent_title h4{
        height: 0.44rem;
        line-height: 0.44rem;
        text-align: center;
        font-size: 0.16rem;
    }
    .specContent{
        width: 80%;
        background: #fff;
        position: fixed; top:50%; left: 50%; z-index: 999;
        transform: translate(-50%,-50%);
        border-radius: 0.05rem;
    }
    .spec_bj{
        width: 100%;
        height: 100%;
        position: fixed; top:0px; left: 0px;
        background: rgba(0, 0, 0, 0.5);
        z-index: 99;
    }
    .show_chooselist{
        color: #fff;
        width: 0.56rem;
        height: 0.26rem;
        line-height: 0.26rem;
        font-size: 0.13rem;
        text-align: center;
        background-color: #3190e8;
        border-radius: 0.13rem;
        margin: 0 0.1rem;
    }
    .fadeRotate-enter-active,.fadeRotate-leave-active{
        transform:translate3d(0,0,0);
     }
    .fadeRotate-enter,.fadeRotate-leave-active{
        transform:translate3d(40px,0,0);
        opacity: 0;
    }
    .fadeRotate-enter-active i,.fadeRotate-leave-active i{
        transform:rotate(0deg);
    }
    .fadeRotate-enter i,.fadeRotate-leave-active i{
        transform:rotate(180deg);
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
