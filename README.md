#前言
公司事情不多就写了一个vue案列主要页面首页，食品列表页，商家详情页，搜索页



# 技术栈
vue + vue-rotuer + vuex + webpack +axios + mint-ui + ES6 + http-proxy-middleware反向代理



# 项目运行
克隆，或者直接下载
git clone https://github.com/p919533/elm-


安装依赖
npm install
```

开启本地服务器
npm run dev

访问
http://localhost:8081

# 线上版本
npm run build



# 目标功能，页面
|-- 首页
|       |--  <img src="https://github.com/p919533/elm-/blob/master/psd/home.png" width="365" height="619"/>
|
|-- 食品列表页
|       |--  <img src="https://github.com/p919533/elm-/blob/master/psd/screen.png" width="365" height="619"/>
|       |--  <img src="https://github.com/p919533/elm-/blob/master/psd/screen01.png" width="365" height="619"/>
|       |--  <img src="https://github.com/p919533/elm-/blob/master/psd/screen02.png" width="365" height="619"/>
|       |--  <img src="https://github.com/p919533/elm-/blob/master/psd/screen03.png" width="365" height="619"/>
|
|-- 商家详情页
|       |--  <img src="https://github.com/p919533/elm-/blob/master/psd/shop.png" width="365" height="619"/>
|       |--  <img src="https://github.com/p919533/elm-/blob/master/psd/shop01.png" width="365" height="619"/>
|
|-- 搜索页
|       |--  <img src="https://github.com/p919533/elm-/blob/master/psd/search.png" width="365" height="619"/>
|       |--  <img src="https://github.com/p919533/elm-/blob/master/psd/search01.png" width="365" height="619"/>
|
|-- 确认订单
|       |--  <img src="https://github.com/p919533/elm-/blob/master/psd/orderConfirm.png" width="365" height="619"/>
|       |--  <img src="https://github.com/p919533/elm-/blob/master/psd/orderDetail.png" width="365" height="619"/>
|
|-- 我的
|       |--  <img src="https://github.com/p919533/elm-/blob/master/psd/profile.png" width="365" height="619"/>


# 项目布局
|-- build                            // webpack配置文件
|-- config                           // 项目打包路径
|-- psd                             // 项目截图
|-- src                              // 源码目录
|   |-- components                   // 组件
|		|-- header                   // 头部信息
|		|-- footer                   // 底部菜单
|		|-- loading                  // loading加载动画
|		|-- home                     // 主页
|		|-- goodsList                // home,screen商品列表组件
|       |-- order                    // 我的订单
|       |-- orderConfirm             // 商家信息
|       |-- orderDetail              // 购买订单
|       |-- profile                  // 我的
|       |-- ratingStar               // 评分组件
|       |-- screen                 	 // 商家列表
|       |-- search                   // 搜索页面
|       |-- shop                 	 // 商品详情页面
|       |-- shopCart                 // 商品详情页面
|       |-- buyCart                  // 商品详情数量
|       |-- orderConfirm             // 商家信息
|   |-- router                       // 路由配置
|       |-- index   
|                 
|   |-- config                      // 数据交互统一调配
|		|-- index.js                 // 处理图片路径
|		|-- getData.js               // 获取数据的统一，对接口进行统一管理
|
|   |-- store                        // vuex的状态管理
|       |-- action.js                // 配置actions
|       |-- getters.js               // 配置getters
|       |-- index.js                 // 创建store
|       |-- mutation-types.js        // 定义常量muations名
|       |-- mutations.js             // 配置mutations
|
|   |-- App.vue                      // 页面入口文件
|
|   |-- main.js                      // 程序入口文件，加载各种公共组件
|
|-- .babelrc                         // ES6语法编译配置
|-- .editorconfig                    // 代码编写规格
|-- .gitignore                       // 忽略的文件
|-- favicon.ico                      // 页面左上角小图标
|-- index.html                       // 入口html文件
|-- package.json                     // 项目及工具的依赖配置文件
|-- README.md                        // 说明


# 总结
如果觉得不错，请star一下吧
