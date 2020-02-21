<!--  -->
<template>
  <div class="container">
    <topTitle :titleName="'订单详情'" :iconName="''"></topTitle>
    <div class="top order_detail">
        <div class="left">
            <div class="border">
                <div class="circle">
                    <span class="text">审核通过</span>
                </div>
            </div>
        </div>
        <div class="right">
            <div class="item">
                <p class="apply_status">审核状态 : <span style="color:#1cba5f;margin-left:5px"> 审核通过</span> </p>
                <p class="task_status">任务状态 : <span style="color:#333333;margin-left:5px"> 待指派</span></p>
                <p class="use_car_people">用车人 : <span style="color:#333333;margin-left:5px"> 一颗牙疼</span></p>
                <p class="department">所属部门 : <span style="color:#333333;margin-left:5px"> 小强市场部</span></p>
            </div>
            <div class="item">
                <p class="staff_number">员工编号 : <span style="color:#333333;margin-left:5px"> B15642</span> </p>
                <p class="contact_info">联系方式 : <span style="color:#333333;margin-left:5px"> 13266101017</span></p>
                <p class="client">客户 : <span style="color:#333333;margin-left:5px"> 张总</span></p>
                <p class="use_car_time">用车申请时间 : <span style="color:#333333;margin-left:5px"> 2019/09/20</span></p>
            </div>
            <div class="item">
                <p class="car_type">车型 : <span style="color:#333333;margin-left:5px"> 奥迪</span> </p>
                <p class="seat">联系方式 : <span style="color:#333333;margin-left:5px"> 4座</span></p>
                <p class="car_grade">车辆等级 : <span style="color:#333333;margin-left:5px"> A级别</span></p>
                <p class="origin">起点 : <span style="color:#333333;margin-left:5px"> 商贸中心</span></p>
            </div>
            <div class="item">
                <p class="destination ">终点 : <span style="color:#333333;margin-left:5px"> 重庆解放碑广场</span> </p>
                <p class="distance">全程距离 : <span style="color:#333333;margin-left:5px"> 100.05km</span></p>
                <p class="start_time">开始时间 : <span style="color:#333333;margin-left:5px"> 2019-09-20 08:30</span></p>
                <p class="end_time">截止时间 : <span style="color:#333333;margin-left:5px"> 2019-09-20 12:30</span></p>
            </div>
        </div>
    </div>
    <div class="center">
      <Tabs value="name1" :animated="false">
        <TabPane label="查看轨迹" name="name1" style="padding:10px 15px;">
          <div class="map_box">
            <amap class="map"></amap>
          </div>
        </TabPane>
        <TabPane label="操作历史" name="name2" style="padding:10px 15px;">
          <Table border  :columns="columns1" :data="data1"></Table>
          <Page :total="100" show-total style="text-align:center;margin-top:30px" />
        </TabPane>
        <TabPane label="标签三" name="name3">标签三的内容</TabPane>
      </Tabs>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import topTitle from "@$@/components/universal/title";//标题组件
import amap from "@$@/components/electronicFence/map";//地图组件
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    topTitle,
    amap
  },
  data() {
    //这里存放数据
    return {
      columns1: [
        {
          title: "操作内容",
          key: "operationContent"
        },
        {
          title: "用户类型",
          key: "userType"
        },
        {
          title: "用户姓名",
          key: "userName"
        },
        {
          title: "操作时间",
          key: "operationTime"
        },
      ],
      data1: [
        {
          operationContent: "新建排班",
          userType: "管理员",
          userName: "一颗牙疼",
          operationTime: "2016-10-03 11:30:54"
        },
        {
          operationContent: "出发重庆",
          userType: "自由司机",
          userName: "Tim",
          operationTime: "2019-08-15 09:30:22"
        },
        {
          operationContent: "出发巴厘岛",
          userType: "管理员",
          userName: "Carrie",
          operationTime: "2019-12-03 04:30:17"
        },
        {
          operationContent: "新建排班",
          userType: "管理员",
          userName: "一颗牙疼",
          operationTime: "2016-10-03 11:30:54"
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
  created() {
    var map = new AMap.Map("container", {
      resizeEnable: true,
      zoom: 11,
      center: [116.397428, 39.90923]
    });
  },
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
@import url("../../css/orderDetail.less");
</style>
<style>
    .container .order_detail .left::after{
        width: 1px;
        content:"";
        height: 140px;
        background-color: #DDDDDD;
        position: absolute;
        right: 0;
    }
</style>