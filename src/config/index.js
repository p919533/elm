/*图片路径*/
export const imgBaseUrl =  'https://fuss10.elemecdn.com';

/*获取本地存储*/
export const getStore = (name)=>{
    if(!name) return;
    return localStorage.getItem(name)
}

/*存储本地数据*/
export const setStore = (name,value)=>{
    if(!name) return;
    if(typeof value !== 'string'){
        value = JSON.stringify(value);
    }
    return localStorage.setItem(name,value)
}

/*删除本地数据*/
export const removeStore = (name)=>{
    if(!name) return
    return localStorage.removeItem(name)
}

/*处理图片url*/
export const getImgPath = (url)=>{
    let str = ''
    if(!url){
        return 'http://test.fe.ptdev.cn/elm/elmlogo.jpeg'
    }
    if(url.indexOf('jpeg') != -1){
        str = '.jpeg'
    }
    else{
        str = '.png'
    }
    return '/' + url.substr(0,1) + '/' + url.substr(1,2) + '/' + url.substr(3) + str;
}
