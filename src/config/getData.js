import axios from 'axios'

/*
    热门城市
*/
export const hot = ()=>{
    return axios.get('/v1/cities?type=hot')
}

/*
    当前定位
*/
export const guess = ()=>{
    return axios.get('/v1/cities?type=guess')
}

/*
    按字母排序
*/
export const group = ()=>{
    return axios.get('/v1/cities?type=group')
}


/*
    city获取当前所在城市
*/
 export const citiesId = (cityId)=>{
     return axios.get('/v1/cities/'+cityId)
 }

/*
    city获取搜索地址
*/
export const searchAddress = (cityId,keyword)=>{
    return axios.get('/v1/pois?type=search&city_id'+cityId+'&keyword='+keyword)
}

/*
    获取搜索地址
*/
export const searchRestaurants= (geohash,value)=>{
    return axios.get('/v4/restaurants',{ params:
        {
            "type"     : "search",
            "extras[]" : "restaurant_activity",
            "geohash"  : geohash,
            "keyword"  : value

        }
    })
}

/*
    home获取标题
*/
export const cityName = (geohash)=>{
    return axios.get('/v2/pois/'+geohash)
}

/*
    获取home页面食品分类列表
*/
export const msiteFoodTypes = (geohash)=>{
    return axios.get('/v2/index_entry?geohash='+geohash+'&group_type=1&flags[]=F')
}

/*
    获取home商铺列表
*/
export const shopList = (latitude,longitude,offset)=>{
    let params =  'latitude='+latitude+'&longitude='+longitude+'&offset='+offset+'&limit=20&extras[]=activities&keyword=&'
        params += 'restaurant_category_id=&'
        params += 'restaurant_category_ids[]=&'
        params += 'order_by=&'
        params += 'delivery_mode[]='
    return axios.get('/shopping/restaurants?'+params)
}

/*
    获取screen页面的配送方式活动列表==>配送方式
*/
export const foodActivity = (latitude,longitude)=>{
    return axios.get('/shopping/v1/restaurants/activity_attributes?',{ params : {
        latitude : latitude,
        longitude: longitude,
        kw       : ''
    }})
}

/*
    获取screen页面的商家属性活动列表 ==> 商家属性
*/
export const foodDelivery = (latitude,longitude)=>{
    return axios.get('/shopping/v1/restaurants/delivery_modes?',{ params : {
        latitude : latitude,
        longitude: longitude,
        kw       : ''
    }})
}

/*
    获取screen页面的 category 种类列表
*/
export const foodCategory = (latitude,longitude)=>{
    return axios.get('/shopping/v2/restaurant/category?',{ params : {
        latitude : latitude,
        longitude: longitude,
        kw       : ''
    }})
}


/*
    获取screen页面的商家列表
*/

export const screenList = (latitude , longitude , offset , restaurant_category_id , categoryIds , orderBy , deliveryModes , support_ids )=>{
    var params =  "latitude="+latitude+"&longitude="+longitude+"&"
        params += "offset="+offset+"&"
        params += "limit=20&"
        params += "extras[]=activities&"
        params += "keyword=&"
        params += "restaurant_category_id="+restaurant_category_id+"&"
        params += "restaurant_category_ids[]="+categoryIds+"&"
        params += "order_by="+orderBy+"&"
        params += "delivery_mode[]="+deliveryModes+""
    if(support_ids){
        for(let i=0; i<support_ids.length; i++){
            if(support_ids[i].status){
                params += "&support_ids[]=" + support_ids[i].id
            }
        }
    }
    return axios.get('/shopping/restaurants?'+params)
}
/*
    获取shop页面商铺详情
*/
export const shopDetails = ( shopId , latitude , longitude)=>{
    let params ='latitude='+ latitude +'&longitude='+ longitude +'&'+
                'extras[]=activities&extras[]=album&extras[]=license&'+
                'extras[]=identification&extras[]=statistics'
    return axios.get('/shopping/restaurant/'+ shopId + '?'+ params )
}


/*
    获取shop页面的商家属性活动列表
*/
export const foodMenu = (shopId) => {
    return axios.get( '/shopping/v2/menu?restaurant_id='+ shopId )
}

/*
    获取shop商铺评价分类
*/
export const ratingsTags = (shopId)=>{
    return axios.get('/ugc/v2/restaurants/' + shopId + '/ratings/tags')
}

/*
    获取shop商铺评价分数
*/
export const ratingsScores = (shopId)=>{
    return axios.get('/ugc/v2/restaurants/' + shopId + '/ratings/scores')
}

/*
    获取shop商铺评价列表
*/
export const ratingsList = (offset = 0 ,tag_name = '')=>{
    return axios.get("/ugc/v2/restaurants/834828/ratings?",{
        params:{
            has_content : true , offset : offset , limit : 10 , tag_name : tag_name
        }
    })
}

/*
    获取shopDetail商家页面的信息
*/
export const shopDetailList = (shopId,latitude,longitude)=>{
    let params =  shopId+'?latitude='+latitude+'&longitude='+longitude+'&'
        params += 'extras[]=activities&extras[]=album&extras[]=license&'
        params += 'extras[]=identification&extras[]=statistics'
    return axios.get('/shopping/restaurant/'+ params)
}

/*
    获取付款页面的信息
*/
export const checkout = (geohash,entities)=>{
    return axios.post('/v1/carts/checkout',{
        come_from : "web",
        entities  : entities,
        geohash   : geohash
    })
}
