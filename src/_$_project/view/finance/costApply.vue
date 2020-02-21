<!--  -->
<template>
  <div class="container">
    <topTitle :titleName="'费用审批'" :iconName="'logo-usd'"></topTitle>
    <div class="content">
      <Tabs value="name1" :animated="false">
        <TabPane label="全部审批" name="name1" style="padding:15px">
          <Table border :columns="columns1" :data="data1">
              <template slot-scope="{ row, index }" slot="action">
              <Button
                type="primary"
                size="default"
                style="margin-right:10px"
                @click="detail(index)"
              >查看</Button>
              <Button type="error" size="default" @click="remove(index)">删除</Button>
            </template>
          </Table>
        </TabPane>
        <TabPane label="待我审批" name="name2">标签二的内容</TabPane>
        <TabPane label="审批完成" name="name3">标签三的内容</TabPane>
        <TabPane label="其他审批" name="name4">标签三的内容</TabPane>
      </Tabs>
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
          title: "日期",
          key: "date"
        },
        {
          title: "申请人",
          key: "apply"
        },
        {
          title: "费用类型",
          key: "costType"
        },
        {
          title: "司机/车牌号",
          key: "driverOrcarNumber"
        },
        {
          title: "图片",
          key: "img"
        },
        {
          title: "费用",
          key: "cost"
        },
        {
          title: "审批状态",
          key: "applyStatus",
          type:"html"
        },
        {
          title: "操作",
          slot: "action",
          align:"center"
        },
      ],
      data1: [
        {
          date: "2016-10-03",
          apply: "一颗牙疼",
          costType: "支出",
          driverOrcarNumber: "王浩  13266101017",
          img:"",
          cost:"10.00",
          applyStatus:"<span style='color:#21b945'>已通过</span>"
        },
        {
          date: "2016-10-03",
          apply: "一颗牙疼",
          costType: "支出",
          driverOrcarNumber: "王浩  13266101017",
          img:"",
          cost:"10.00",
          applyStatus:"<span style='color:#F91111'>未通过</span>"
        },
        {
          date: "2016-10-03",
          apply: "一颗牙疼",
          costType: "支出",
          driverOrcarNumber: "王浩  13266101017",
          img:"",
          cost:"10.00",
          applyStatus:"<span style='color:#F91111'>未通过</span>"
        },
        {
          date: "2016-10-03",
          apply: "一颗牙疼",
          costType: "支出",
          driverOrcarNumber: "王浩  13266101017",
          img:"",
          cost:"10.00",
          applyStatus:"<span style='color:#F91111'>未通过</span>"
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
@import url("../../css/costApply.less");
</style>