<!--  -->
<template>
  <div class="container">
    <topTitle :title-name="'提醒列表'" :icon-name="'ios-bulb'"></topTitle>
    <div class="content">
      <div class="operation">
        <div class="left">
          <Button type="primary" class="button" @click="modal4 = true">添加提醒</Button>
          <Button type="error" class="button" @click="remove(index)">批量提醒</Button>
          <Input
            v-model="value"
            class="search_content"
            placeholder="搜索手机号码"
            style="width:200px;margin-left:30px;"
          ></Input>
          <Button type="primary" style="width:60px;margin-left:20px;">搜索</Button>
        </div>
      </div>
      <Table :columns="columns1" :data="data1" border="true">
        <template slot-scope="{ row, index }" slot="action">
          <Button type="primary" size="default" style="margin-right: 5px" @click="hint(index)">提醒</Button>
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
          title: "提醒内容",
          key: "alertHint"
        },
        {
          title: "下次提醒日期",
          key: "nextTimeHint"
        },
        {
          title: "提醒周期",
          key: "howLong"
        },
        {
          title: "车牌号码",
          key: "carNumber"
        },
        {
          title: "是否发短信",
          key: "sendMsg"
        },
        {
          title: "操作",
          slot: "action",
          align: "center"
        }
      ],
      data1: [
        {
          alertHint: "需要交保险",
          nextTimeHint: "2019-10-28 11:14:02",
          howLong: "两个月",
          carNumber: "粤S05778",
          sendMsg: "是",
        },
        {
          alertHint: "需要交保险",
          nextTimeHint: "2019-10-28 11:14:02",
          howLong: "两个月",
          carNumber: "粤S05778",
          sendMsg: "是",
        },
        {
          alertHint: "需要交保险",
          nextTimeHint: "2019-10-28 11:14:02",
          howLong: "两个月",
          carNumber: "粤S05778",
          sendMsg: "是",
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
    hint(index) {
     this.$Message.success('提醒成功');    
    }
  },
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
}
.content {
  background-color: #fff;
}
</style>