<template>
    <header>
        <slot name="loca"></slot>
        <slot name="search"></slot>
        <div class="head_go" v-if="!goBack"><i @click="$router.go(-1)" class="fa fa-angle-left fa-2x"></i></div>
        <div class="head_login" v-if="bLand">
            <!-- <i class="fa fa-search"></i> -->
            <span class="login_span">登陆/注册</span>
        </div>
        <div class="title">
            <span class="title_text">{{headTitle}}</span>
        </div>
    </header>
</template>

<script>

export default {
    data () {
        return {
        }
    },
    props:['headTitle','goBack' ,'bLand']
}
</script>

<style scoped>
    header{
        width: 100%;
        height: 0.48rem;
        line-height: 0.48rem;
        background-color: #3190e8;
        position: fixed; left: 0; top: 0;
        z-index: 100;
        color: #fff;
    }
    .head_logo{
        font-size: 0.16rem;
        position: absolute; left:0.1rem;
    }
    .head_go{
        position: absolute; left:0.1rem; top:0.05rem;
    }
    .login_span{
        font-size: 0.14rem;
        position: absolute; right:0.1rem;
    }
    .title span{
        width: 60%;
        text-align: center;
        font-size: 0.18rem;
        font-weight: bold;
        position: absolute; left: 20%;
    }
</style>
