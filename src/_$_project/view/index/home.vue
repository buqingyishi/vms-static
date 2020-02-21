<!--  -->
<template>
  <div class="container" id="home">
    <div class="car_select_Info" id="car_select_Info" ref="element">
      <div
        class="car"
        @click="select(0)"
        :style="{backgroundColor:(selectIndex == 0?'#1190fc':'#ffffff'),color:(selectIndex == 0?'#ffffff':'#222222')}"
      >车辆</div>
      <div
        class="driver"
        @click="select(1)"
        :style="{backgroundColor:(selectIndex == 1?'#1190fc':'#ffffff'),color:(selectIndex == 1?'#ffffff':'#222222')}"
      >驾驶员</div>
      <div class="carSearch" v-show="selectIndex == 0">
        <Select
          v-model="carStatus"
          size="small"
          style="width:90px;margin-left:30px;"
          placeholder="车辆状态"
          class="options"
          @on-change="selectCarStatus"
        >
          <Option v-for="(item,i) in carStatusList" :value="item.value" :key="i">{{ item.label }}</Option>
        </Select>
        <span class="line"></span>
        <Select
          v-model="carType"
          size="small"
          style="width:100px;"
          placeholder="车辆类型"
          class="options"
          @on-change="selectCarType"
        >
          <Option v-for="(item,i) in carTypeList" :value="item.value" :key="i">{{ item.label }}</Option>
        </Select>
        <span class="line"></span>
        <Select
          v-model="carTeam"
          size="small"
          style="width:100px;"
          placeholder="所属车队"
          class="options"
          @on-change="selectCarTeam"
        >
          <Option v-for="(item,i) in carTeamList" :value="item.value" :key="i">{{ item.label }}</Option>
        </Select>
        <span class="line"></span>
        <span class="apply_time">预约时间 :</span>
        <Row style="display:inline-block;vertical-align: middle;margin-left:10px">
          <Col span="12">
            <Date-picker
              type="datetime"
              size="small"
              placeholder="选择日期"
              style="width: 150px;"
              @on-change="selectStartTime"
            ></Date-picker>
          </Col>
        </Row>
        <span class="end-of" style="margin-left:13px">至</span>
        <Row style="display:inline-block;vertical-align: middle;margin-left:13px">
          <Col span="12">
            <Date-picker
              type="datetime"
              size="small"
              placeholder="选择日期"
              style="width: 150px;"
              @on-change="selectEndTime"
            ></Date-picker>
          </Col>
        </Row>
      </div>

      <div class="driverSearch" v-show="selectIndex == 1">
        <Select
          v-model="driverStatus"
          size="small"
          style="width:90px;margin-left:30px;"
          placeholder="司机状态"
          class="options"
          @on-change="selectDriverStatus"
        >
          <Option v-for="(item,i) in carStatusList" :value="item.value" :key="i">{{ item.label }}</Option>
        </Select>
        <!-- <span class="line"></span>
        <Select
          v-model="carType"
          size="small"
          style="width:100px;"
          placeholder="车辆类型"
          class="options"
          @on-change="selectCarType"
        >
          <Option v-for="(item,i) in carTypeList" :value="item.value" :key="i">{{ item.label }}</Option>
        </Select>-->
        <span class="line"></span>
        <Select
          v-model="driverTeam"
          size="small"
          style="width:100px;"
          placeholder="所属车队"
          class="options"
        >
          <Option v-for="(item,i) in carTeamList" :value="item.value" :key="i">{{ item.label }}</Option>
        </Select>
        <span class="line"></span>
        <span class="apply_time">预约时间 :</span>
        <Row style="display:inline-block;vertical-align: middle;margin-left:10px">
          <Col span="12">
            <Date-picker
              type="datetime"
              size="small"
              placeholder="选择日期"
              style="width: 150px;"
              @on-change="selectStartTime"
            ></Date-picker>
          </Col>
        </Row>
        <span class="end-of" style="margin-left:13px">至</span>
        <Row style="display:inline-block;vertical-align: middle;margin-left:13px">
          <Col span="12">
            <Date-picker
              type="datetime"
              size="small"
              placeholder="选择日期"
              style="width: 150px;"
              @on-change="selectEndTime"
            ></Date-picker>
          </Col>
        </Row>
      </div>

      <div class="right">
        <Input
          v-model="value"
          class="search_content"
          placeholder=" 司机/订单/车辆"
          style="width:200px;margin-left:10px;"
          size="small"
        ></Input>
        <Button type="primary" size="small" class="search" @click="searchData">搜索</Button>
      </div>
    </div>
    <div class="carInfo" id="carInfo">
      <div class="carStatus">
        车辆状态 -- 
        <span v-show="carStatus == 1">空闲</span>
        <span v-show="carStatus == 2">使用中</span>
        <span v-show="carStatus == 3">维修</span>
        <span v-show="carStatus == 4">证件不全</span>
        <span v-show="carStatus == 5">停用</span>
        <span v-show="carStatus == 6">报废</span>
        <span v-show="carStatus == null">全部</span>
        <span class="car_number">共{{carList.length}}辆车</span>
      </div>
      <div class="manyCar" v-show="selectIndex == 0">
        <Scroll :height="$app.winHeight-270">
          <ul>
            <li @click="openDispatchModal(item,'car')" v-for="item in carList">
              <img src="../../img/home/车 拷贝 5@2x.png" alt />
              <div class="use_people" v-show="item.carTag != ''">{{item.carTag}}</div>
              <div class="defaultDriver">{{item.aliasName}}</div>
              <div class="car_detail">
                <span class="car_number">{{item.plateNo}}</span>
                <span class="car_info" style="color:#30ce69" v-show="item.status ==1">空闲</span>
                <span class="car_info" style="color:#fb9005" v-show="item.status ==2">使用中</span>
                <span class="car_info" style="color:#3e9dff" v-show="item.status ==3">维修</span>
                <span class="car_info" style="color:#303fff" v-show="item.status ==4">证件不全</span>
                <span class="car_info" style="color:#ff0000" v-show="item.status ==5">停用</span>
                <span class="car_info" style="color:#666666" v-show="item.status ==6">报废</span>
              </div>
            </li>
          </ul>
        </Scroll>
      </div>
      <div class="manyCar driver" v-show="selectIndex == 1">
        <Scroll :height="$app.winHeight-270">
          <ul>
            <li @click="openDispatchModal(item,'driver')" v-for="item in driverList">
              <img src="../../img/home/boy.png" alt />
              <div class="car_detail">
                <span class="driver_people">{{item.realName}}</span>
                <span class="car_info" style="color:#21B945">{{item.status}}</span>
              </div>
              <div class="car_number">{{item.tel}}</div>
            </li>
          </ul>
        </Scroll>
      </div>
      <div class="bottom" :class="showBottom == true?'show':'hide'">
        <div class="top" :style="{height:(showBottom == true?'0px':'30px')}">
          <div class="unfold_shrink">
            <img
              src="../../img/home/down.png"
              style="cursor: pointer;"
              v-show="showBottom == true"
              @click="showBottom = false"
              alt
            />
            <img
              src="../../img/home/up.png"
              style="cursor: pointer;"
              v-show="showBottom == false"
              @click="showBottom = true"
              alt
            />
          </div>
        </div>
        <div class="content" :style="{height:$app.winHeight-320+'px'}" v-show="showBottom == true">
          <div>
            <Menu mode="horizontal" active-name="1" class="nav" @on-select="OrderStatus">
              <Menu-item name="1">
                <Badge type="success" :offset="position">全部订单</Badge>
              </Menu-item>
              <Menu-item name="2">
                <Badge :count="8" type="success" :offset="position">未派订单</Badge>
              </Menu-item>
              <!-- <Menu-item name="3">
                <Badge :count="1" type="success" :offset="position">异常订单</Badge>
              </Menu-item>
              <Menu-item name="4">
                <Badge :count="9" type="success" :offset="position">已经出车</Badge>
              </Menu-item>-->
              <Menu-item name="5">
                <Badge :count="2" type="success" :offset="position1">审核中</Badge>
              </Menu-item>
            </Menu>
            <div class="time">
              <span class="text_one">申请时间 :</span>
              <Row style="display:inline-block;vertical-align: middle;margin-left:10px">
                <Col span="12">
                  <Date-picker type="date" placeholder="选择日期" style="width: 200px"></Date-picker>
                </Col>
              </Row>
              <span class="end-of">至</span>
              <Row style="display:inline-block;vertical-align: middle;margin-left:13px">
                <Col span="12">
                  <Date-picker type="date" placeholder="选择日期" style="width: 200px"></Date-picker>
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
            <div class="all_order">
              <Table border :columns="taskListTitle" :data="taskListData" style="width:100%">
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
              <page
                :total="taskTotal"
                :size="[7,14,20]"
                :switchPageIndex="switchPageIndex"
                :switchPageSize="switchPageSize"
              ></page>
            </div>
          </div>
        </div>
      </div>
    </div>
    <dispatchModal
      :look-attribute="modalAttribute"
      @refreshData="getTaskList(param)"
      :list="rowList"
    ></dispatchModal>
    <driverOrCarModal :look-attribute="modalAttribute2" :list="rowList2"></driverOrCarModal>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import dispatchModal from "@$@/components/Dispatch/dispatchModal";
import driverOrCarModal from "@$@/components/Dispatch/driverOrCarModal";
import page from "@$@/components/Page/page"; //分页
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    page,
    dispatchModal,
    driverOrCarModal
  },
  data() {
    //这里存放数据
    return {
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
        endTime: "",
        pageIndex: 1,
        pageSize: 7,
        startTime: "",
        taskCode: "",
        useCarName: ""
      },
      // 审核中的任务列表
      applyParam: {
        applyType: null,
        applyUserId: null,
        companyId: null,
        departId: null,
        endTime: "",
        pageIndex: 1,
        pageSize: 10,
        queryChildren: null,
        realName: "",
        startTime: "",
        status: 0,
        useUserTel: "",
        userCode: ""
      },
      carStatusList: [
        {
          value: "",
          label: "全部"
        },
        {
          value: 1,
          label: "空闲"
        },
        {
          value: 2,
          label: "使用中"
        },
        {
          value: 3,
          label: "维修"
        },
        {
          value: 4,
          label: "证件不全"
        },
        {
          value: 5,
          label: "停用"
        },
        {
          value: 6,
          label: "报废"
        }
      ],
      carTypeList: [
        {
          value: "",
          label: "全部车辆"
        },
        {
          value: 1,
          label: "自有车辆"
        },
        {
          value: 2,
          label: "外包车辆"
        }
      ],
      carTeamList: [
        {
          value: "allTeam",
          label: "全部车队"
        },
        {
          value: "firstTeam",
          label: "第一车队"
        },
        {
          value: "secondTeam",
          label: "第二车队"
        }
      ],
      driverStatusList: [
        {
          value: "",
          label: "全部"
        },
        {
          value: 0,
          label: "请假/不可工作"
        },
        {
          value: 1,
          label: "空闲"
        },
        {
          value: 2,
          label: "繁忙"
        }
      ],
      selectIndex: 0,
      selectTimeIndex: 0,
      position: [5, 60],
      position1: [5, 45],
      selectOrderStatus: 1,
      showBottom: false,

      carParam: {
        pageIndex: 1,
        pageSize: 10,
        aliasName: "",
        carName: "",
        carTag: "",
        seats: "",
        platNo: "",
        status: "",
        ownType: ""
      },
      carList: [],
      carListTotal: null,
      driverParam: {
        carTeamId: null,
        companyId: null,
        departId: null,
        driverIds: [],
        key: "",
        pageIndex: 1,
        pageSize: 10,
        status: 1,
        workStatus: null
      },
      driverList: [],
      driverListTotal: null,

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
          width:200
        }
      ],
      taskListData: [],
      taskTotal: null,
      // 搜索参数(车辆)
      carStatus: null,
      carType: "",
      carTeam: "",
      appointmentStartTime: "",
      appointmentEndTime: "",
      // 搜索参数(司机)
      driverStatus: null,
      driverTeam: "",
      // 搜索内容
      value:"",

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
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
  },
  //方法集合
  methods: {
    // 获取任务列表
    getTaskList() {
      $ajax.queryTaskList(this.param, res => {
        this.taskListData = res.data;
        this.taskTotal = res.total;
      });
    },
    // 获取任务列表的(审核中的状态)
    getTaskListApply() {
      $ajax.queryApplyList(this.applyParam, res => {
        this.taskListData = res.data;
        this.taskTotal = res.total;
      });
    },
    // 获取车辆列表
    getCarList() {
      $ajax.getCarBaseInfoPage(this.carParam, res => {
        this.carList = res.data;
      });
    },
    // 获取驾驶员列表
    getDriverList() {
      $ajax.queryPageDriverList(this.driverParam, res => {
        this.driverList = res.data;
        this.driverListData = res.total;
      });
    },
    // 选择车辆状态
    selectCarStatus(value) {
      this.carParam.status = this.carStatus;
      this.getCarList();
    },
    // 选择车辆类型
    selectCarType(value) {
      this.carParam.ownType = this.carType;
      this.getCarList();
    },
    // 选择车辆开始时间
    selectStartTime(date) {
      console.log("哈哈哈");
      this.appointmentStartTime = date;
      if (this.selectIndex == 0) {
        //车辆
        if (this.appointmentStartTime != "" && this.appointmentEndTime != "") {
          $ajax.getAvailableCars(
            {
              applyType: 1,
              exceptStartTime: this.appointmentStartTime,
              exceptEndTime: this.appointmentEndTime
            },
            res => {
              console.log(res);
              this.carList = res.data;
            }
          );
        } else if (
          this.appointmentStartTime == "" &&
          this.appointmentEndTime == ""
        ) {
          this.getCarList();
        }
      } else {
        //驾驶员
        if (this.appointmentStartTime != "" && this.appointmentEndTime != "") {
          $ajax.getAvailableDriver(
            {
              exceptStartTime: this.appointmentStartTime,
              exceptEndTime: this.appointmentEndTime
            },
            res => {
              console.log(res);
              this.driverList = res.data;
            }
          );
        } else if (
          this.appointmentStartTime == "" &&
          this.appointmentEndTime == ""
        ) {
          this.getDriverList();
        }
      }
    },
    // 选择车辆结束时间
    selectEndTime(date) {
      this.appointmentEndTime = date;
      if (this.selectIndex == 0) {
        if (this.appointmentStartTime != "" && this.appointmentEndTime != "") {
          $ajax.getAvailableCars(
            {
              applyType: 1,
              exceptStartTime: this.appointmentStartTime,
              exceptEndTime: this.appointmentEndTime
            },
            res => {
              console.log(res);
              this.carList = res.data;
            }
          );
        } else if (
          this.appointmentStartTime == "" &&
          this.appointmentEndTime == ""
        ) {
          this.getCarList();
        }
      }else{
        if (this.appointmentStartTime != "" && this.appointmentEndTime != "") {
          $ajax.getAvailableDriver(
            {
              exceptStartTime: this.appointmentStartTime,
              exceptEndTime: this.appointmentEndTime
            },
            res => {
              console.log(res);
              this.driverList = res.data;
            }
          );
        } else if (
          this.appointmentStartTime == "" &&
          this.appointmentEndTime == ""
        ) {
          this.getDriverList();
        }
      }
    },
    // 选择驾驶员状态
    selectDriverStatus(value) {
      this.driverParam.workStatus = value;
      this.getDriverList();
    },
    // 搜索
    searchData() {
      // this.carParam.ownType = this.carTeam
      this.getCarList();
    },
    // 分页页码
    switchPageIndex(index) {
      console.log(index);
      this.param.pageIndex = index;
      this.getTaskList(this.param);
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
    // 分页条数
    switchPageSize(pageSize) {
      console.log(pageSize);
      this.param.pageSize = pageSize;
      this.getTaskList(this.param);
    },
    // 车辆与驾驶员切换()
    select(e) {
      console.log(e);
      this.selectIndex = e;
      if (e == 1) {
        this.getDriverList();
      }
    },
    // 时间切换(近三天,一周,下周)
    selectTime(e) {
      this.selectTimeIndex = e;
    },
    // 切换订单状态
    OrderStatus(name) {
      console.log(name);
      this.selectOrderStatus = parseInt(name);
      if (name == 2) {
        this.param.status = 0;
        this.getTaskList();
      } else if (name == 5) {
        this.getTaskListApply();
      }else if(name == 1){
        this.param.status = null;
        this.getTaskList();
      }
    },
    // 打开模态框
    openDispatchModal(data,type) {
      console.log(data)
      console.log(type)
      let obj = {}
      if(type == 'car'){
        obj.plateNo = data.plateNo
        obj.carTag = data.carTag
        obj.carQuantity = 1
        obj.carId = data.id
      }else{
        obj.driverId = data.id
        obj.driverName = data.driverName
        obj.tel = data.tel
        obj.realName = data.realName
        obj.carQuantity = 1
      }
      this.modalAttribute.showModal = true;
      this.modalAttribute.title = "指派";
      this.modalAttribute.disabled = false;
      this.rowList = obj
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getCarList();
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
@import url("../../css/home.less");
</style>
<style >
.options .ivu-select-selection {
  background-color: #f7f7f7;
}
.options .ivu-select-selection .ivu-select-placeholder {
  color: #666666;
  font-size: 12px;
}
.bottom .ivu-tabs-bar {
  margin-bottom: 5px !important;
}
.vm-collapse-item__header {
  height: 0px !important;
}
.ivu-btn-primary {
  background-color: #1190fc;
}
.driverSearch,
.carSearch {
  display: inline-block;
}
.ivu-select {
  text-align: left;
}
</style>