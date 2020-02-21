<!--  -->
<template>
  <div class="container">
    <topTitle :titleName="'费用类型'" :iconName="'logo-usd'"></topTitle>
    <div class="content">
      <Button type="primary" style="margin-top:10px">添加费用类型</Button>
      <Table :columns="columns1" :data="data1" style="margin-top:20px">
        <template slot-scope="{ row, index }" slot="action">
          <Button type="primary" size="default" style="margin-right:10px" @click="detail(index)">查看</Button>
          <Button type="error" size="default" @click="remove(index)">删除</Button>
        </template>
      </Table>
      <Page :total="100" show-total style="text-align:right;margin-top:30px" />
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import topTitle from "@$@/components/universal/title"; //标题组件
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
          title: "类型名称",
          key: "typeName"
        },
        {
          title: "收支类型",
          key: "paymentType"
        },
        {
          title: "操作",
          slot: "action",
          align: "center"
        }
      ],
      data1: [
        {
          typeName: "其他收入",
          paymentType: "收入",
        },
        {
          typeName: "保养",
          paymentType: "支出",
        },
        {
          typeName: "维修",
          paymentType: "支出",
        },
        {
          typeName: "其他收入",
          paymentType: "收入",
        },
      ]
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
@import url("../../css/costType.less");
</style>