<!--  -->
<template>
  <div class="container">
    <topTitle :titleName="'未派订单'" :iconName="'ios-pricetags-outline'"></topTitle>
    <div class="content">
      <div class="search_content operation">
        <div class="left">
          <div class="search_type">
            <Select v-model="taskStatus" style="width:120px;" placeholder="任务状态">
              <Option :value="0">创建未通知</Option>
              <Option :value="1">已通知</Option>
              <Option :value="2">部分确认</Option>
              <Option :value="3">全部确认</Option>
              <Option :value="4">部分出发</Option>
              <Option :value="5">全部出发</Option>
              <Option :value="6">进行中</Option>
              <Option :value="7">部分到达</Option>
              <Option :value="8">到达目的地</Option>
              <Option :value="9">已完成</Option>
              <Option :value="10">已取消</Option>
              <Option :value="11">已指派司机</Option>
            </Select>
          </div>
          <Input v-model="value" placeholder="车牌号/司机姓名" style="width: 230px;margin-right:15px" />
          <Button type="primary" class="search" icon="ios-search" @click="searchData">搜索</Button>
          <div class="allButton">
            <Button type="primary" class="button" @click="addTask">添加</Button>
            <!-- <Button type="primary" class="button" @click="addTask">导入</Button> -->
          </div>
        </div>
        <div class="right">
          <div class="search_type">
            <!-- <span class="describe">日期 ：</span> -->
            <Row style="display:inline-block;vertical-align: middle;margin-left:10px">
              <Col span="12">
                <Date-picker
                  transfer
                  clearable
                  @on-change="selectStartTime"
                  type="date"
                  placeholder="开始时间"
                  style="width: 150px"
                ></Date-picker>
              </Col>
            </Row>
            <span class="end-of" style="margin-left:13px">至</span>
            <Row style="display:inline-block;vertical-align: middle;margin-left:13px;">
              <Col span="12">
                <Date-picker
                  transfer
                  clearable
                  @on-change="selectEndTime"
                  type="date"
                  placeholder="结束时间"
                  style="width: 150px"
                ></Date-picker>
              </Col>
            </Row>
            <span
              class="three_day item"
              @click="selectTime(0)"
              :style="{backgroundColor:(selectTimeIndex == 0?'#1190fc':'#ffffff'),color:(selectTimeIndex == 0?'#ffffff':'#1190fc')}"
            >近三天</span>
            <span
              class="week item"
              @click="selectTime(1)"
              :style="{backgroundColor:(selectTimeIndex == 1?'#1190fc':'#ffffff'),color:(selectTimeIndex == 1?'#ffffff':'#1190fc')}"
            >本周</span>
            <span
              class="next_week item"
              @click="selectTime(2)"
              :style="{backgroundColor:(selectTimeIndex == 2?'#1190fc':'#ffffff'),color:(selectTimeIndex == 2?'#ffffff':'#1190fc')}"
            >下周</span>
          </div>
          <div class="export">
            <Button type="primary" class="button">导出</Button>
          </div>
        </div>
      </div>
      <Table
        border
        :columns="taskListTitle"
        :data="taskListData"
        :height="$app.winHeight-320"
        style="width:100%;margin-top:15px;margin-bottom:20px;"
      >
        <template slot-scope="{ row, index }" slot="carDriverInfo">
          <div
            class="update"
            style="display:inline-block;cursor: pointer;"
          >
            <span style="color:#409EFF" @click="driverCarDetail(row)">详情</span>
          </div>
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <div
            class="update"
            style="display:inline-block;cursor: pointer;"
            @click="lookData(row.taskId)"
          >
            <Icon type="ios-eye" color="#409EFF" />
            <span style="color:#409EFF">查看</span>
          </div>
          <div
            class="update"
            style="display:inline-block;cursor: pointer;margin-left:10px;"
            @click="updateData(row)"
            v-show="row.status == 0 || row.status == 11"
          >
            <Icon type="md-color-filter" color="#409EFF" />
            <span style="color:#409EFF">编辑</span>
          </div>
          <div
            class="delete"
            style="margin-left:10px;display:inline-block;cursor: pointer;"
            @click="cancelTask(row.taskId)"
            v-show="row.status == 0 || row.status == 11"
          >
            <Icon type="ios-close-circle" color="#409EFF" />
            <span style="color:#409EFF;vertical-align: middle">取消</span>
          </div>
        </template>
      </Table>
      <page :total="taskTotal" :switchPageIndex="switchPageIndex" :switchPageSize="switchPageSize"></page>
    </div>
    <dispatchModal :look-attribute="modalAttribute" @refreshData="getTaskList(param)" :list="rowList"></dispatchModal>
    <driverOrCarModal :look-attribute="modalAttribute2" :list="rowList2"></driverOrCarModal>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import topTitle from "@$@/components/universal/title";
import page from "@$@/components/Page/page"; //分页
import dispatchModal from "@$@/components/Dispatch/dispatchModal";
import driverOrCarModal from "@$@/components/Dispatch/driverOrCarModal";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    topTitle,
    page,
    dispatchModal,
    driverOrCarModal
  },
  data() {
    //这里存放数据
    return {
      taskStatus:null,
      taskKey:"",
      value:"",
      selectTimeIndex:0,
      param: {
        applyCarName: "",
        applyUserId: null,
        blnEmergency: null,
        carId: null,
        carNo: "",
        companyId: null,
        departId: null,
        driverId: null,
        driverName: "",
        taskKey:"",
        endTime: "",
        pageIndex: 1,
        pageSize: 10,
        startTime: "",
        taskCode: "",
        useCarName: "",
        status:0,
      },
      // 模态框属性
      modalAttribute: {
        showModal: false,
        disabled: false,
        title: ""
      },
      rowList: {},
       // 司机车辆信息框属性
      modalAttribute2: {
        showModal: false,
        disabled: false,
        title: ""
      },
      rowList2:[],
      taskListTitle: [
        {
          type: "index",
          width: 70,
          title: "序号",
          align: "center"
        },
        {
          title: "编号",
          key: "taskCode",
          resizable: true,
          width: 200
        },
        {
          title: "用车人",
          key: "applyCode",
          resizable: true,
          width: 190,
          render: (h, params) => {
            let text =
              params.row.useCarName + " (" + params.row.useCarTel + " )";
            return h("span", text);
          }
        },
        {
          title: "申请人",
          key: "applyUserName",
          resizable: true,
          width: 170,
          render: (h, params) => {
            if (params.row.applyUserName == null) {
            } else {
              let text =
                params.row.applyUserName +
                " (" +
                params.row.applyUserTel +
                " )";
              return h("span", text);
            }
          }
        },
        {
          title: "用车数量",
          key: "carQuantity",
          resizable: true,
          width: 100
        },
        {
          title: "行程",
          key: "exceptStartTime",
          resizable: true,
          render: (h, params) => {
            let startTime =
              "起点 : " +
              params.row.exceptStartTime +
              "  " +
              params.row.departureName;
            let endTime =
              "终点 : " +
              params.row.exceptEndTime +
              "  " +
              params.row.destinationName;
            return h("div", [
              h(
                "div",
                {
                  style: {
                    color: "#1190fc"
                  }
                },
                startTime
              ),
              h(
                "div",
                {
                  style: {
                    color: "#D40D2C"
                  }
                },
                endTime
              )
            ]);
          }
        },
        {
          title: "任务类型",
          key: "taskType",
          resizable: true,
          width: 100,
          render: (h, params) => {
            let text = "";
            if (params.row.taskType == 0) {
              text = "系统自动创建";
            } else if (params.row.taskType == 1) {
              text = "申请任务";
            } else if (params.row.taskType == 2) {
              text = "人工创建";
            }
            return h("span", text);
          }
        },
        {
          title: "是否紧急",
          key: "blnEmergency",
          resizable: true,
          width: 100,
          align: "center",
          render: (h, params) => {
            let text = "";
            if (params.row.blnEmergency == null) {
              text = "是";
              return h(
                "span",
                {
                  style: {
                    color: "#d40d67"
                  }
                },
                text
              );
            } else {
              text = "否";
              return h("span", text);
            }
          }
        },
        {
          title: "状态",
          key: "status",
          resizable: true,
          width: 110,
          render: (h, params) => {
            console.log(params.row);
            let text = "";
            if (params.row.status == 0) {
              text = "创建未通知";
            } else if (params.row.status == 1) {
              text = "已通知";
            } else if (params.row.status == 2) {
              text = "部分确认";
            } else if (params.row.status == 3) {
              text = "全部确认";
            } else if (params.row.status == 4) {
              text = "部分出发";
            } else if (params.row.status == 5) {
              text = "全部出发";
            } else if (params.row.status == 6) {
              text = "进行中";
            } else if (params.row.status == 7) {
              text = "部分到达";
            } else if (params.row.status == 8) {
              text = "到达目的地";
            } else if (params.row.status == 9) {
              text = "已完成";
            } else if (params.row.status == 10) {
              text = "已取消";
            } else if (params.row.status == 11) {
              text = "已指派司机";
            }
            return h("span", text);
          }
        },
        {
          title: "司机车辆信息",
          slot: "carDriverInfo",
          align: "center",
          width: 100
        },
        {
          title: "操作",
          slot: "action",
          align: "center",
          width:200,
        }
      ],
      taskListData: [],
      taskTotal: null
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 获取任务列表
    getTaskList() {
      $ajax.queryTaskList(this.param, res => {
        console.log(res);
        this.taskListData = res.data;
        this.taskTotal = res.total;
      });
    },
    // 开始时间
    selectStartTime(date){
      console.log(date)
      this.startTime = date
      this.param.startTime = date
      if(this.startTime != '' && this.endTime != ''){
        this.getTaskList(this.param)
      }else if(this.startTime == '' && this.endTime == ''){
        this.getTaskList(this.param)
      }
    },
    // 结束时间
    selectEndTime(date){
      console.log(date)
      this.endTime = date
      this.param.endTime = date
      if(this.startTime != '' && this.endTime != ''){
        this.getTaskList(this.param)
      }else if(this.startTime == '' && this.endTime == ''){
        this.getTaskList(this.param)
      }
    },
    // 搜索数据
    searchData() {
      // this.param.applyCarName = this.value1;
      this.param.taskKey = this.taskKey
      this.param.startTime = this.startTime;
      this.param.endTime = this.endTime;
      this.param.status = this.taskStatus;
      this.getTaskList(this.param);
    },
    addTask() {
      this.modalAttribute.showModal = true;
      this.modalAttribute.title = "添加";
      this.modalAttribute.disabled = false;
    },
    // 查看详情
    lookData(id) {
      console.log(id);
      $ajax.queryTaskInfo(id, res => {
        console.log(res);
        this.rowList = JSON.parse(JSON.stringify(res.data));
        this.modalAttribute.showModal = true;
        this.modalAttribute.title = "查看";
        this.modalAttribute.disabled = true;
      });
    },
    // 查看司机车辆信息
    driverCarDetail(row){
      console.log(row.taskDriverCars)
      if(row.taskDriverCars.length == 0){
        $app.toast("暂无司机车辆信息",false)
      }else{
        this.modalAttribute2.showModal = true;
        this.modalAttribute2.title = "查看";
        this.modalAttribute2.disabled = true;
        this.rowList2 = row.taskDriverCars
      }
    },
    // 编辑数据
    updateData(row) {
      console.log(row);
      this.rowList = JSON.parse(JSON.stringify(row));
      this.modalAttribute.showModal = true;
      this.modalAttribute.title = "编辑";
      this.modalAttribute.disabled = false;
    },
    // 取消任务
    cancelTask(taskId) {
      $ajax.cancelTask(taskId, res => {
        console.log(res);
        $app.toast(res.msg, true, () => {
          this.getTaskList(this.param);
        });
      });
    },
    // 分页页码
    switchPageIndex(index) {
      console.log(index);
      this.param.pageIndex = index;
      this.getDriverList(this.param);
    },
    // 分页条数
    switchPageSize(pageSize) {
      console.log(pageSize);
      this.param.pageSize = pageSize;
      this.getDriverList(this.param);
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getTaskList();
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
@import url("../../css/companyManage/user.less");
// @import url("../../css/orderStatus.less");
</style>
<style scoped>
.item {
  width: 60px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  display: inline-block;
  vertical-align: middle;
  border: 1px solid #018ef5;
  cursor: pointer;
}

.three_day {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  margin-left: 10px;
}

.week,
.next_week {
  background-color: #fff;
  color: #018ef5;
  border-left: 0;
}

.next_week {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
</style>