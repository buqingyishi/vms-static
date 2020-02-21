<template>
  <div class="container">
    <topTitle :titleName="'排班'" :iconName="'ios-briefcase-outline'"></topTitle>
    <div class="box">
      <Tabs value="name1" :animated="false" @on-click="clickTab">
        <TabPane label="按司机" name="name1" :class="clickName == 'name1'?'aaa':''">
          <div class="left">
            <Button
              type="primary"
              style="margin-left:10px;margin-top:10px;margin-bottom:10px"
              class="button"
              @click="addTask"
            >添加排班</Button>
            <Collapse v-model="value1" class="panel" simple>
              <Panel name="1" class="panel_list">
                搜索司机
                <Icon
                  type="md-contacts"
                  size="19"
                  style="float:right;padding-top:8px;transform:none;"
                />
                <p slot="content" style="margin-top:10px">
                  <Icon type="md-contacts" size="19" />
                  <Input suffix="ios-search" search v-model="driverName"  placeholder="司机姓名" @on-search="searchDriver" style="width: 200px;margin-left:10px;"/>
                </p>
              </Panel>
              <Panel :name="item.carTeamName" v-for="(item,index) in carTeam">
                {{item.carTeamName}}
                <Icon type="ios-car" size="19" style="float:right;padding-top:8px;transform:none;" />
                <p slot="content" style="margin-left:15px">
                  <RadioGroup v-model="vertical" vertical @on-change="selectDriver">
                    <Radio :label="i.id" v-for="i in item.drivers">
                      <Icon type="social-apple"></Icon>
                      <span>{{i.driverName}} ({{i.tel}})</span>
                    </Radio>
                  </RadioGroup>
                </p>
              </Panel>
            </Collapse>
          </div>
          <div class="right">
            <full-calendar :config="config" :events="events"></full-calendar>
          </div>
        </TabPane>
        <TabPane label="按车辆" name="name2" :class="clickName == 'name2'?'aaa':''">
          <div class="left">
            <Button
              type="primary"
              style="margin-left:10px;margin-top:10px;margin-bottom:10px"
              class="button"
              @click="addTask"
            >添加排班</Button>
            <Collapse v-model="value1" class="panel" simple>
              <Panel name="1" class="panel_list">
                搜索车辆
                <Icon
                  type="md-car"
                  size="19"
                  style="float:right;padding-top:8px;transform:none;"
                />
                <p slot="content" style="margin-top:10px">
                  <Icon type="md-car" size="19" />
                  <!-- <Select
                    v-model="carNo"
                    filterable
                    remote
                    :remote-method="remoteMethod2"
                    :loading="loading2"
                    style="width:200px;margin-left:10px"
                    @on-change="selectCar"
                  >
                    <Option
                      v-for="(option, index) in options2"
                      :value="option.value"
                      :key="index"
                    >{{option.label}}</Option>
                  </Select> -->
                  <Input suffix="ios-search" search v-model="carNo"  placeholder="车牌号码" @on-search="searchCar" style="width: 200px;margin-left:10px;"/>
                </p>
              </Panel>
              <Panel :name="item.carTeamName" v-for="(item,index) in carTeam2">
                {{item.carTeamName}}
                <Icon type="ios-car" size="19" style="float:right;padding-top:8px;transform:none;" />
                <p slot="content" style="margin-left:15px">
                  <RadioGroup v-model="vertical" vertical  @on-change="selectCar">
                    <Radio :label="i.id" v-for="i in item.cars">
                      <Icon type="social-apple"></Icon>
                      <span>{{i.plateNo}} ({{i.carName}})</span>
                    </Radio>
                  </RadioGroup>
                </p>
              </Panel>
            </Collapse>
          </div>
          <div class="right">
            <full-calendar :config="config" :events="events"></full-calendar>
          </div>
        </TabPane>
      </Tabs>
    </div>
    <dispatchModal
      :look-attribute="modalAttribute"
      @refreshData="getTaskList(param)"
      :list="rowList"
    ></dispatchModal>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import dispatchModal from "@$@/components/Dispatch/dispatchModal";
import topTitle from "@$@/components/universal/title";

// import FullCalendar from "@fullcalendar/vue";
// import { Calendar } from "@fullcalendar/core";

import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";

import "fullcalendar/dist/fullcalendar.css";
import { FullCalendar } from "vue-full-calendar";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    FullCalendar,
    topTitle,
    dispatchModal
  },
  data() {
    //这里存放数据
    return {
      clickName:"name1",
      value1: "1",
      value2: "5",
      showModal: false,
      vertical: "",
      config: {
        buttonText: { today: "今天", month: "月", week: "周", day: "日" },
        locale: "zh-cn",
        editable: false, //是否允许修改事件
        selectable: false,
        eventLimit: 4, //事件个数
        allDaySlot: false, //是否显示allDay
        defaultView: "month", //显示默认视图
        eventClick: this.eventClick, //点击事件
        dayClick: this.dayClick //点击日程表上面某一天
      },
      events: [],

      driverName:"",
      carNo: "",
      loading1: false,
      loading2: false,
      options1: [],
      options2: [],
      carTeam:[],
      carTeam2:[],
      param:{
        accordingTimeType:1,
        accordingType:1,
        carId:null,
        driverId:null,
        fromTime:"",
      },
      // 调度框属性
      modalAttribute: {
        showModal: false,
        disabled: false,
        title: ""
      },
      rowList:{},
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 接受子组件传过来的值
    getData(data) {
      this.showModal = data;
    },
    // 获取排班
    getSchedule(){
      $ajax.getScheduling(this.param,res=>{
        console.log(res)
        let data = res.data
        for (let index = 0; index < data.length; index++) {
          for (let i = 0; i < data[index].dayTasks.length; i++) {
            this.events.push({
              title:data[index].dayTasks[i].useCarName + ' '+ data[index].dayTasks[i].plateNo,
              start:data[index].dayTasks[i].exceptStartTime,
              end:data[index].dayTasks[i].exceptEndTime,
              color:data[index].allTaskEnd?'green':'red'
            })
          }
        }
      })
    },
    // 搜索司机姓名
    searchDriver(){
      this.vertical = ""
      $ajax.queryTeamAndDriver('?driverName='+this.driverName,res=>{
        console.log(res)
        this.carTeam = res.data
      })
    },
    // 选中司机姓名
    selectDriver(id){
      console.log(id)
      this.param.driverId = id
      this.getSchedule()
    },
    // 搜索车牌号码
    searchCar(){
      this.vertical = ""
      $ajax.queryTeamAndCar('?carNo='+this.carNo,res=>{
        console.log(res)
        this.carTeam2 = res.data
      })
    },
    // 选中司机姓名
    selectCar(id){
      console.log(id)
      this.param.carId = id
      this.getSchedule()
    },
    // 添加排班
    addTask(){
      this.modalAttribute.showModal = true;
      this.modalAttribute.title = "添加";
      this.modalAttribute.disabled = false;
    },
    // tabs栏切换
    clickTab(name){
      console.log(name)
      this.clickName = name
      if(name == 'name2'){
        this.param.accordingType = 2
        
      }else{
        this.param.accordingType = 1
        this.getSchedule()
      }
      console.log(this.clickName)
    },
    // 获取车队
    // getCarTeam(){
    //   $ajax.queryTeamAndDriver("",res=>{
    //     console.log(res)
    //     this.carTeam = res.data
    //   })
    // },
    // 车队切换
    // switchTeam(value){
    //   console.log(value)
    //   for (let index = 0; index < this.carTeam.length; index++) {
    //     if(this.carTeam[index].carTeamName == value[1]){
    //       console.log(this.carTeam[index])
    //       $app.showLoading = false;
    //       $ajax.queryAllCarTeamList(value[1],res=>{
    //         console.log(res)
    //       })
    //     }
    //   }
    // }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
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
@import url("../../css/composing.less");
// @import "~@fullcalendar/core/main.css";
// @import "~@fullcalendar/daygrid/main.css";

// @import "~@fullcalendar/timeline/main.css";
// @import "~@fullcalendar/resource-timeline/main.css";
</style>
<style>
.box .ivu-date-picker-rel {
  opacity: 0 !important;
}
/* .box .ivu-select-dropdown {
  display: block !important;
  margin-top: -30px;
  width: 250px !important;
} */
.ivu-collapse-content {
  margin-left: 15px;
  padding: 0;
}
.box .ivu-input {
  background-color: #f5f5f5;
}
.box .ivu-collapse-header {
  background-color: #ffffff;
}
.aaa{
  display: flex;
}
</style>

