import App from '../App'
import Home from 'components/home'
import Search from 'components/search'
import Order from 'components/order'
import OrderDetail from 'components/orderDetail'
import Profile from 'components/profile'
import Shop from 'components/shop'
import OrderConfirm from 'components/orderConfirm'
import ShopDetail from 'components/shopDetail'
import Screen from 'components/screen'
export default [
    {
        path: '/home',
        component: Home
    },
    {
        path: '/search',
        component: Search
    },
    {
        path: '/order',
        component: Order,
        children : [
            {
                path: 'orderDetail',
                component: OrderDetail
            }
        ]
    },
    {
        path : '/orderConfirm',
        component: OrderConfirm
    },
    {
        path: '/profile',
        component: Profile
    },
    {
        path: '/screen',
        component: Screen
    },
    {
        path: '/shop',
        component: Shop,
        children : [
            {
                path : 'shopDetail',
                component: ShopDetail
            }
        ]
    },
    {
        path:'*',
        redirect:'/home'
    }
]
