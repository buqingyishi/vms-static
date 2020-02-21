<!--  -->
<template>
  <div class="container">
    <topTitle :titleName="'审批'" :iconName="'ios-book'"></topTitle>
    <div class="content">
      <div class="operation">
        <div class="left">
          <Button type="primary" class="button" @click="modal2 = true">批量审批</Button>
          <Button type="primary" class="button">待我审批</Button>
          <Button type="primary" class="button">审批完成</Button>
          <Button type="primary" class="button">其它审批</Button>
        </div>
      </div>
      <Table :columns="columns1" :data="data1" :border="true">
        <template slot-scope="{ row, index }" slot="action">
          <Button
            type="primary"
            size="default"
            style="margin-right: 5px"
            @click="hint('success','已同意审批')"
          >同意</Button>
          <Button
            type="error"
            size="default"
            style="margin-right: 5px"
            @click="hint('error','已拒绝审批')"
          >拒绝</Button>
        </template>
      </Table>
    </div>
    <Modal v-model="modal2" title="小强管车" @on-ok="ok" @on-cancel="cancel">
      <p style="margin-top:5px">确定要审批吗?</p>
    </Modal>
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
          title: "日期",
          key: "date"
        },
        {
          title: "申请人",
          key: "apply",
          width:120
        },
        {
          title: "订单类型",
          key: "orderType",
          width:120
        },
        {
          title: "调度编号",
          key: "serialNumber"
        },
        {
          title: "行程",
          key: "journey",
          type: "html"
        },
        {
          title: "审批状态",
          key: "applyStatus",
          width:120
        },
        {
          title: "操作",
          slot: "action",
          align: "center"
        }
      ],
      data1: [
        {
          date: "2019-10-28 11:14:02",
          apply: "一颗牙疼",
          orderType: "普通",
          serialNumber:"1117833646262",
          journey: `<span style="color:#018EF5">起：11-02 10:20 黄花机场</span><br><span style="color:#D40D2C">终：11-02 12:20 长沙市政府</span>`,
          applyStatus: "已审批"
        },
        {
          date: "2019-10-28 11:14:02",
          apply: "一颗牙疼",
          orderType: "普通",
          serialNumber:"1117833646262",
          journey: `<span style="color:#018EF5">起：11-02 10:20 黄花机场</span><br><span style="color:#D40D2C">终：11-02 12:20 长沙市政府</span>`,
          applyStatus: "已审批"
        },
        {
          date: "2019-10-28 11:14:02",
          apply: "一颗牙疼",
          orderType: "普通",
          serialNumber:"1117833646262",
          journey: `<span style="color:#018EF5">起：11-02 10:20 黄花机场</span><br><span style="color:#D40D2C">终：11-02 12:20 长沙市政府</span>`,
          applyStatus: "已审批"
        }
      ],
      modal2: false
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    hint(type, content) {
      this.$Message[type]({
        background: true,
        content
      });
    },
    ok(){

    },
    cancel(){

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
      margin-left: 5px;
    }
  }
}
.content {
  background-color: #fff;
}
</style>