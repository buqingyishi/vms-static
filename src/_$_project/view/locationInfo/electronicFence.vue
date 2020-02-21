<!--  -->
<template>
<div class='container'>
    <topTitle :title-name="'电子围栏'" :icon-name="'md-film'"></topTitle>
    <div class="content">
      <div class="operation">
        <div class="left">
          <Button type="primary" class="button" @click="addRail">添加围栏</Button>
          
        </div>
        <div class="right">
          <Input
            v-model="value"
            class="search_content"
            placeholder="搜索围栏名称"
            style="width:200px;margin-left:30px;"
          ></Input>
          <Button type="primary" style="width:60px;margin-left:20px;">搜索</Button>
        </div>
      </div>
      <Table :columns="columns1" :data="data1" border="true">
        <template slot-scope="{ row, index }" slot="action">
          <Button type="primary" size="default" style="margin-right: 5px" @click="hint(index)">查看</Button>
          <Button type="error" size="default" style="margin-right: 5px" @click="hint(index)">编辑围栏</Button>
          <Button type="error" size="default" style="margin-right: 5px" @click="hint(index)">编辑车辆</Button>
        </template>
      </Table>
    </div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import topTitle from "@$@/components/universal/title";
export default {
//import引入的组件需要注入到对象中才能使用
components: {
    topTitle
},
data() {
//这里存放数据
return {
    columns1: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "围栏名称",
          key: "railName",
          width:150
        },
        {
          title: "分组",
          key: "grouping"
        },
        {
          title: "中心地址",
          key: "centerAddress"
        },
        {
          title: "半径(米)",
          key: "radius"
        },
        {
          title: "报警",
          key: "police",
          width:100
        },
        {
          title: "操作",
          slot: "action",
          align: "center"
        }
      ],
      data1: [
        {
          railName: "一号位",
          grouping: "A组",
          centerAddress: "翻身地区",
          radius: "100米",
          police: "是",
        },
        {
          railName: "一号位",
          grouping: "A组",
          centerAddress: "翻身地区",
          radius: "100米",
          police: "是",
        },
        {
          railName: "一号位",
          grouping: "A组",
          centerAddress: "翻身地区",
          radius: "100米",
          police: "是",
        },
      ]
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
  // 添加围栏
  addRail(){
    this.$router.push({path:'/addRail'})
  }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
  
},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
.container {
  width: 100%;
  height: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.operation {
  line-height: 65px;
  padding-left: 3px;
  box-sizing: border-box;
  position: relative;
  .left {
    .button {
      margin-left: 20px;
    }
  }
  .right{
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            right: 20px;
            .button{
                margin-right:20px;
            }
        }
}
.content {
  background-color: #fff;
}
</style>