<template lang="html">
    <div>
        <div class="gtBox fixedCenter" v-show="$store.state.F_cat.toastGlobal.show">
            <i class="iconfont icon-success f_70 marginB10 relative "
                :class="$store.state.F_cat.toastGlobal.good?'icondui cGreen':' iconcuo cCCC' "
                style="line-height:1.3;left:5px;top:-5px;"
            ></i>
            <div class="clearfix">
                {{$store.state.F_cat.toastGlobal.text}}
            </div>
        </div>
        <div class="gt fixedCenter" v-show="$store.state.F_cat.toastGlobal.show"></div>
        
    </div>
</template>

<style scoped lang="less">
    .gt{
        background: rgb(0, 0, 0);
        opacity: 0.3;
        position: fixed;
        z-index: 889988;
    }
    .gtBox{
        position: fixed;
        z-index: 889990;
        /*执行动画*/
        -webkit-animation: downUp 0.3s cubic-bezier(.15, .73, .37, 1.2);
        animation: downUp 0.3s cubic-bezier(.15, .73, .37, 1.2);

        width:380px; color:#444; 
        border-radius:5px; 
        box-shadow:0 0 10px rgba(0,0,0,0.3);
        top:30% !important;
        bottom:auto;
        background-color: white;

        padding: 35px 10px;
        font-size: 16px;
        line-height: 22px;
        text-align: center;
    }
</style>
<script>
    export default {
        data() {
            return {};
        }
    };
</script>
