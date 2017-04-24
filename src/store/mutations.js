import * as types from './mutations-types'
import { getStore , setStore } from '../config/index'



export default {
    [types.GEOHASH](state,geohash){
        state.geohash = geohash;
    },
    [types.SHOPID](state,shopId){
        console.log('shopId=',shopId)
        state.shopId = shopId;
    },
    // 商铺id,食品分类id,食品规格id,食品名字,食品价格
    [types.ADD_CART](state,{
        shopId , category_id ,item_id , food_id , name , specs , price , packing_fee , sku_id , stock
    }){
        let cart = state.cartList;
        if(cart[shopId] && cart[shopId][category_id] && cart[shopId][category_id][item_id] && cart[shopId][category_id][item_id][food_id]){
            cart[shopId][category_id][item_id][food_id]['num']++
        }
        else if(cart[shopId] && cart[shopId][category_id] && cart[shopId][category_id][item_id]){
            cart[shopId][category_id][item_id][food_id] = {}
            cart[shopId][category_id][item_id][food_id]['id'] = food_id;
            cart[shopId][category_id][item_id][food_id]['name'] = name;
            cart[shopId][category_id][item_id][food_id]['specs'] = specs;
            cart[shopId][category_id][item_id][food_id]['price'] = price;
            cart[shopId][category_id][item_id][food_id]['num']   = 1;
            cart[shopId][category_id][item_id][food_id]['packing_fee'] = packing_fee;
            cart[shopId][category_id][item_id][food_id]['sku_id'] = sku_id;
            cart[shopId][category_id][item_id][food_id]['stock'] = stock;
        }
        else if( cart[shopId] && cart[shopId][category_id] ){
            cart[shopId][category_id][item_id] = {}
            cart[shopId][category_id][item_id][food_id] = {}
            cart[shopId][category_id][item_id][food_id]['id'] = food_id;
            cart[shopId][category_id][item_id][food_id]['name'] = name;
            cart[shopId][category_id][item_id][food_id]['specs'] = specs;
            cart[shopId][category_id][item_id][food_id]['price'] = price;
            cart[shopId][category_id][item_id][food_id]['num']   = 1;
            cart[shopId][category_id][item_id][food_id]['packing_fee'] = packing_fee;
            cart[shopId][category_id][item_id][food_id]['sku_id'] = sku_id;
            cart[shopId][category_id][item_id][food_id]['stock'] = stock;
        }
        else if(cart[shopId]){
            cart[shopId][category_id] = {}
            cart[shopId][category_id][item_id] = {}
            cart[shopId][category_id][item_id][food_id] = {}
            cart[shopId][category_id][item_id][food_id]['id'] = food_id;
            cart[shopId][category_id][item_id][food_id]['name'] = name;
            cart[shopId][category_id][item_id][food_id]['specs'] = specs;
            cart[shopId][category_id][item_id][food_id]['price'] = price;
            cart[shopId][category_id][item_id][food_id]['num']   = 1;
            cart[shopId][category_id][item_id][food_id]['packing_fee'] = packing_fee;
            cart[shopId][category_id][item_id][food_id]['sku_id'] = sku_id;
            cart[shopId][category_id][item_id][food_id]['stock'] = stock;
        }
        else{
            cart[shopId] = {}
            cart[shopId][category_id] = {}
            cart[shopId][category_id][item_id] = {}
            cart[shopId][category_id][item_id][food_id] = {}
            cart[shopId][category_id][item_id][food_id]['id'] = food_id;
            cart[shopId][category_id][item_id][food_id]['name'] = name;
            cart[shopId][category_id][item_id][food_id]['specs'] = specs;
            cart[shopId][category_id][item_id][food_id]['price'] = price;
            cart[shopId][category_id][item_id][food_id]['num']   = 1;
            cart[shopId][category_id][item_id][food_id]['packing_fee'] = packing_fee;
            cart[shopId][category_id][item_id][food_id]['sku_id'] = sku_id;
            cart[shopId][category_id][item_id][food_id]['stock'] = stock;
        }
        state.cartList = Object.assign({},cart)
        setStore('buyCart',state.cartList)
    },
    // 商铺id,食品分类id,食品规格id,食品名字,食品价格
    [types.REMOVE_CART](state,{
        shopId , category_id , item_id , food_id , name ,  price , packing_fee , sku_id , stock
    }){
        let cart = state.cartList;
        if(cart[shopId] && cart[shopId][category_id] && cart[shopId][category_id][item_id] && cart[shopId][category_id][item_id][food_id]){
            cart[shopId][category_id][item_id][food_id]['num']--
            if( cart[shopId][category_id][item_id][food_id]['num'] == 0 ){
                delete cart[shopId][category_id][item_id][food_id]
            }
            state.cartList = Object.assign({},cart)
            setStore('buyCart',state.cartList)
        }
    },
    [types.CLEAR_CART](state,shopId){
        state.cartList[shopId] = {}
        setStore('buyCart',state.cartList)
    },
    [types.INIT_CART](state){
        let initCart = getStore('buyCart')
        if(initCart){
            state.cartList = JSON.parse(initCart)
        }
    }
}
