<!--  -->
<template>
  <Modal
    class="dispatchModal"
    v-model="lookAttribute.showModal"
    width="1100"
    style="display: flex;flex-direction: row;"
    @on-cancel="closeModal('useCar')"
  >
    <div slot="header">
      <span style="font-size:17px">{{lookAttribute.title}}</span>
      <span
        style="font-size:17px;margin-left:20px"
        v-show="lookAttribute.title == '指派'"
      >{{list.plateNo?list.plateNo:list.realName}}</span>
      <Tag
        color="success"
        style="margin-left: 10px;margin-top: -2px;"
        v-show="lookAttribute.title == '指派'"
      >{{list.carTag?list.carTag:list.tel}}</Tag>
    </div>
    <div slot="footer" class="footer">
      <div class="hint">注 : 如需要自动计算费用......</div>
      <Button type="default" size="default" @click="cancel('useCar')">取消</Button>
      <Button
        type="primary"
        size="default"
        @click="save('useCar')"
        v-show="lookAttribute.title != '查看'"
      >保存</Button>
      <Button
        type="primary"
        size="default"
        @click="saveInform"
        v-show="lookAttribute.title != '查看'"
      >保存并通知</Button>
    </div>
    <div class="left">
      <Tabs value="name1" style="margin-top:10px" :animated="false">
        <TabPane label="用车信息" name="name1">
          <Form
            ref="useCar"
            :model="list"
            :rules="useCarRule"
            :label-width="80"
            :disabled="lookAttribute.disabled"
            label-position="right"
            :class="driverInfo.length != 0 || carInfo.length != 0?'scroll':''"
          >
            <div class="use_car_title">用车信息</div>
            <Row>
              <Col span="12">
                <FormItem label="用车人" prop="useCarName">
                  <Select
                    v-model="list.useCarName"
                    filterable
                    remote
                    :remote-method="remoteMethod1"
                    :loading="loading1"
                    placeholder="请输入用车人"
                  >
                    <Option
                      v-for="(option, index) in options1"
                      :value="option.value"
                      :key="index"
                    >{{option.label}}</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="部门" prop="applyDepart">
                  <Input
                    class="gw"
                    v-model="list.applyDepart"
                    enter-button="选择"
                    search
                    placeholder="请选择部门"
                    @on-search="selectDepartment"
                  ></Input>
                  <Modal
                    v-model="modal"
                    title="部门"
                    @on-ok="saveTreeModal"
                    @on-cancel="closeTreeModal"
                  >
                    <tree :treeData="treeData" :allSelect="true" :selectData="selectData"></tree>
                  </Modal>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem label="电话" prop="useCarTel">
                  <Input class="gw" v-model="list.useCarTel" placeholder="请输入用车人电话"></Input>
                </FormItem>
              </Col>
              <Col span="12">
                <!-- <FormItem label="类型" prop="useCarType">
                  <Select class="gw" transfer v-model="list.useCarType">
                    <Option :value="1">第一车队</Option>
                    <Option :value="2">第二车队</Option>
                  </Select>
                </FormItem>-->
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem label="用车数量" prop="carQuantity">
                  <Input class="gw" v-model.number="list.carQuantity" placeholder="请输入用车人数量"></Input>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="用车人数" prop="useCarNum">
                  <Input
                    class="gw"
                    v-model.number="list.useCarNum"
                    :disabled="lookAttribute.title == '查看'?true:false"
                    placeholder="请输入用车人数"
                  ></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem
                  label="任务状态"
                  prop="status"
                  v-show="lookAttribute.title == '查看'?true:false"
                >
                  <Select
                    transfer
                    disabled
                    class="gw"
                    v-model="list.status"
                    :disabled="lookAttribute.title == '查看'?true:false"
                  >
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
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="紧急调派">
                  <RadioGroup v-model="list.blnEmergency">
                    <Radio :label="0">否</Radio>
                    <Radio :label="1">是</Radio>
                  </RadioGroup>
                </FormItem>
              </Col>
            </Row>

            <div class="use_car_title">行程信息</div>
            <Row>
              <Col span="12">
                <FormItem label="起点" prop="departureName">
                  <Input
                    v-model="list.departureName"
                    placeholder="请输入"
                    class="input_content gw"
                    icon="md-locate"
                    @on-click="(lookAttribute.title != '查看')?openStarMap(1):''"
                  />
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="终点" prop="destinationName">
                  <Input
                    v-model="list.destinationName"
                    placeholder="请输入"
                    class="input_content gw"
                    icon="md-locate"
                    @on-click="(lookAttribute.title != '查看')?openStarMap(2):''"
                  />
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem label="出发时间" prop="exceptStartTime">
                  <Date-picker
                    transfer
                    type="datetime"
                    class="gw"
                    @on-change="selectStartime"
                    :value="list.exceptStartTime"
                    v-model="list.exceptStartTime"
                    placeholder="选择日期"
                  ></Date-picker>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="结束时间" prop="exceptEndTime">
                  <Date-picker
                    transfer
                    type="datetime"
                    class="gw"
                    @on-change="selectEndTime"
                    :value="list.exceptEndTime"
                    v-model="list.exceptEndTime"
                    placeholder="选择日期"
                  ></Date-picker>
                </FormItem>
              </Col>
            </Row>
            <div class="use_car_title">司机/车辆信息</div>
            <Row class="addCarOrDriverInfo" v-show="driverInfo.length != 0 || carInfo.length != 0">
              <Col span="10">
                <FormItem label>
                  <p
                    class="addCarOrDriver"
                    style="margin-left:15px"
                    v-for="(item,i) in driverInfo"
                  >{{i+1}}. &nbsp;{{item.driverName}}({{item.driverTel}})</p>
                </FormItem>
              </Col>
              <Col span="2">
                <FormItem>
                  <Icon
                    type="ios-close-circle"
                    style="display:block;margin-top:7px;margin-bottom:20px"
                    v-for="(item,index) in driverInfo"
                    color="#c1c1c1"
                    @click="deleteDriver(index,item.driverId)"
                  />
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label>
                  <p class="addCarOrDriver" v-for="item in carInfo">{{item.carNo}}</p>
                </FormItem>
              </Col>
              <Col span="2">
                <FormItem>
                  <Icon
                    type="ios-close-circle"
                    style="display:block;margin-top:7px;margin-bottom:20px"
                    color="#c1c1c1"
                    v-for="(item,index) in carInfo"
                    @click="deleteCar(index,item.carId)"
                  />
                </FormItem>
              </Col>
            </Row>
          </Form>
        </TabPane>
        <TabPane
          label="费用信息"
          ref="tabs"
          :disabled="lookAttribute.title != '查看'?true:false"
          name="name2"
        >
          <Form :model="list" :disabled="lookAttribute.disabled" label-position="top">
            <Row>
              <Col span="12">
                <FormItem label="任务编号" prop="taskCode">
                  <Input class="gw task" v-model="list.taskCode" placeholder="请输入任务编号"></Input>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="任务费用" prop="taskAmount">
                  <Input class="gw task" v-model="list.taskAmount" placeholder="请输入任务费用"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem label="结算部门" prop="applyDepart">
                  <Input class="gw task" v-model="list.applyDepart" placeholder="请输入结算部门"></Input>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="司机费用" prop="driverAmount">
                  <Input class="gw task" v-model="list.driverAmount" placeholder="请输入司机费用"></Input>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </TabPane>
        <TabPane label="同乘人信息" name="name3">
          <Form
            ref="formDynamic"
            :model="formDynamic"
            :disabled="lookAttribute.disabled"
            :label-width="80"
          >
            <FormItem
              v-for="(item, index) in formDynamic.items"
              v-if="item.status"
              :key="index"
              :label-width="100"
              :label="'姓名/电话' + item.index"
              :prop="'items.' + index + '.passengerName'"
            >
              <Row>
                <Col span="10">
                  <Input class="gw" type="text" v-model="item.passengerName" placeholder="请输入姓名"></Input>
                </Col>
                <Col span="10">
                  <Input
                    class="gw"
                    style="margin-left:15px"
                    type="text"
                    v-model="item.passengerTel"
                    placeholder="请输入号码"
                  ></Input>
                </Col>
                <Col span="4">
                  <Icon
                    style="margin-left:30px"
                    type="ios-remove-circle-outline"
                    size="23"
                    color="#1e1e1e"
                    @click="deleteNameAndPhone(index)"
                  />
                </Col>
              </Row>
            </FormItem>
            <FormItem>
              <Button type="dashed" @click="handleAdd" style="margin-left:19px" icon="md-add">添加同乘人</Button>
            </FormItem>
          </Form>
        </TabPane>
      </Tabs>
    </div>
    <div
      class="right"
      v-show="lookAttribute.title == '编辑' || lookAttribute.title == '添加' || lookAttribute.title == '指派'"
    >
      <Tabs :value="name" style="margin-top:10px" :animated="false">
        <TabPane
          label="可用司机列表"
          name="name1"
          :disabled="list.driverId && lookAttribute.title == '指派'?true:false"
        >
          <div class="right_content">
            <Table
              :columns="driverListTitle"
              highlight-row
              stripe
              class="table"
              :data="driverListData"
              @on-select="checkDriverData"
              @on-select-cancel="cancelDriverData"
            ></Table>
            <page
              :total="driverListData.length"
              :switchPageIndex="switchDriverIndex"
              :switchPageSize="switchDriverSize"
            ></page>
          </div>
        </TabPane>
        <TabPane
          label="可用车辆列表"
          name="name2"
          :disabled="list.carId && lookAttribute.title == '指派'?true:false"
        >
          <div class="right_content">
            <Table
              :columns="carListTitle"
              highlight-row
              class="table"
              :data="carListData"
              @on-select="checkCarData"
              @on-select-cancel="cancelCarData"
            ></Table>
            <page
              :total="carListData.length"
              :switchPageIndex="switchCarIndex"
              :switchPageSize="switchCarSize"
            ></page>
          </div>
        </TabPane>
      </Tabs>
    </div>
    <div class="right" v-show="lookAttribute.title == '查看'">
      <Tabs value="name1" style="margin-top:10px" :animated="false">
        <TabPane label="指派任务信息" name="name1">
          <div class="right_content">
            <Table :columns="assignTitle" highlight-row class="table" :data="assignInfo"></Table>
          </div>
        </TabPane>
      </Tabs>
    </div>
    <Modal v-model="mapModal" width="650" title="地图" @on-ok="saveMap" @on-cancel="closeMap">
      <mapComponent @getLocation="getLocation" :location-type="locationType"></mapComponent>
    </Modal>
  </Modal>
</template>

<script>

//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import mapComponent from "../../components/electronicFence/map";
import dispose from "@$@/js/app/disposeTreeData"; //处理树形数据
import findChildren from "@$@/js/app/findChildren"; //解决多层部门的问题选中之前选中的,再次打开的时候默认选上
import page from "@$@/components/Page/page"; //分页
import tree from "@$@/components/Tree/Tree"; //树形控件
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    mapComponent,
    tree,
    page
  },
  props: {
    lookAttribute: {
      type: Object,
      default() {
        return {};
      }
    },
    driverOrCar: {
      type: Number,
      default() {
        return 3;
      }
    },
    list: {
      type: Object,
      default() {
        return {
          blnEmergency: 0
        };
      }
    }
  },
  data() {
    //这里存放数据
    return {
      param: {
        id: null,
        applyDepartId: null, //部门id
        applyDepart: "", //部门名称
        departureLat: null, //出发地纬度
        departureLng: null, //出发地经度
        departureName: "", //出发地
        destinationLat: null, //目的地纬度
        destinationLng: null, //目的地经度
        destinationName: "", //目的地
        exceptEndTime: "", //结束时间
        exceptStartTime: "", //出发时间
        useCarName: "", //用车人姓名
        useCarNum: "", //用车人数
        carQuantity: null, //用车数量
        useCarTel: "", //用车人手机号
        blnEmergency: 0, //是否紧急调派
        cars: [], //指派车辆
        drivers: [], //指派司机
        notifyDriver: false, //是否通知司机
        passengers: [], //乘车人信息
        remark: [] //备注
      },
      carOrDriverParam: {
        pageIndex: 1,
        pageSize: 10,
        exceptStartTime: "",
        exceptEndTime: ""
      },
      mapModal: false,
      value: "",
      switchInfo: 0,
      cityList: [
        {
          value: "财务部门",
          label: "财务部门"
        },
        {
          value: "人事部门",
          label: "人事部门"
        },
        {
          value: "技术部门",
          label: "技术部门"
        }
      ],
      locationType: null, //1代表起点,2代表终点
      // 可用司机
      driverListTitle: [
        {
          type: "selection",
          width: 80,
          title: "请选择",
          align: "center"
        },
        {
          title: "司机姓名",
          key: "realName"
        },
        {
          title: "司机电话",
          key: "tel"
        },
        {
          title: "默认车辆",
          key: "bindCarPlateNo"
        },
        {
          title: "匹配度",
          key: "matchRate",
          width: 80
        }
      ],
      driverListData: [],
      driverListTotal: null,
      driverInfo: [], //显示选中复选框的司机
      // 可用车辆
      carListTitle: [
        {
          type: "selection",
          width: 60,
          title: "请选择",
          align: "center"
        },
        {
          title: "车牌号",
          key: "plateNo"
        },
        {
          title: "座次",
          key: "seats",
          width: 60
        },
        {
          title: "车辆名称",
          key: "carName"
        },
        {
          title: "车辆标签",
          key: "carTag"
        },
        {
          title: "匹配度",
          key: "matchRate",
          width: 80
        }
      ],
      carListData: [],
      carListTotal: null,
      carInfo: [], //显示选中复选框的车辆
      assignTitle: [
        {
          title: "是否出发",
          key: "blnSetOut"
        },
        {
          title: "是否到达",
          key: "blnArrive"
        },
        {
          title: "是否已确认",
          key: "blnConfirm"
        },
        {
          title: "是否紧急调派",
          key: "blnEmergency"
        }
      ],
      assignInfo: [], //指派的信息

      // 用车信息规则
      useCarRule: {
        useCarName: [
          {
            required: true,
            message: "请输入用车人姓名",
            trigger: "blur"
          }
        ],
        useCarTel: [
          {
            required: true,
            message: "请输入用车人电话",
            trigger: "blur"
          }
        ],
        carQuantity: [
          {
            required: true,
            message: "请输入用车数量",
            trigger: "blur",
            type: "number"
          }
        ],
        useCarNum: [
          {
            required: true,
            message: "请输入用车人数",
            trigger: "blur",
            type: "number"
          }
        ],
        useCarType: [
          {
            required: true,
            message: "请选择用车类型",
            trigger: "change",
            type: "number"
          }
        ],
        applyDepart: [
          {
            required: true,
            message: "请选择部门",
            trigger: "click"
          }
        ],
        departureName: [
          {
            required: true,
            message: "请选择起点",
            trigger: "change",
            type: "string"
          }
        ],
        destinationName: [
          {
            required: true,
            message: "请选择终点",
            trigger: "change",
            type: "string"
          }
        ],
        exceptStartTime: [
          {
            required: true,
            message: "请选择出发时间",
            trigger: "blur",
            type: "string"
          }
        ],
        exceptEndTime: [
          {
            required: true,
            message: "请选择结束时间",
            trigger: "blur",
            type: "string"
          }
        ]
      },
      modal: false,
      treeData: [],
      applyDepart: "",
      departId: null,
      //添加同乘人
      index: 1,
      formDynamic: {
        items: [
          {
            passengerName: "",
            passengerTel: null,
            index: 1,
            status: 1
          }
        ]
      },
      name: "",

      // 用车人模糊搜索
      arrList: [
        "Alabama",
        "Alaska",
        "Arizona",
        "Arkansas",
        "California",
        "Colorado",
        "Connecticut",
        "Delaware",
        "Florida",
        "Georgia",
        "Hawaii",
        "Idaho",
        "Illinois",
        "Indiana",
        "Iowa",
        "Kansas",
        "Kentucky",
        "Louisiana",
        "Maine",
        "Maryland",
        "Massachusetts",
        "Michigan",
        "Minnesota",
        "Mississippi",
        "Missouri",
        "Montana",
        "Nebraska",
        "Nevada",
        "New hampshire",
        "New jersey",
        "New mexico",
        "New york",
        "North carolina",
        "North dakota",
        "Ohio",
        "Oklahoma",
        "Oregon",
        "Pennsylvania",
        "Rhode island",
        "South carolina",
        "South dakota",
        "Tennessee",
        "Texas",
        "Utah",
        "Vermont",
        "Virginia",
        "Washington",
        "West virginia",
        "Wisconsin",
        "Wyoming"
      ],

      model13: "",
      loading1: false,
      options1: [],
      locationData: {}
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    "lookAttribute.showModal"() {
      // 是否紧急调派(处理值是null的问题)
      this.list.blnEmergency =
        this.lookAttribute.title == "添加" || this.lookAttribute.title == "指派"
          ? 0
          : this.list.blnEmergency;
      if (
        this.lookAttribute.title == "指派" &&
        this.list.carId &&
        this.lookAttribute.showModal == true
      ) {
        this.name = "name1";
        this.carInfo.push({
          carId: this.list.carId,
          carNo: this.list.plateNo
        });
      } else if (
        this.lookAttribute.title == "指派" &&
        this.list.driverId &&
        this.lookAttribute.showModal == true
      ) {
        this.name = "name2";
        this.driverInfo.push({
          driverId: this.list.driverId,
          driverName: this.list.realName,
          driverTel: this.list.tel
        });
      }
      if (
        this.lookAttribute.showModal == true &&
        this.lookAttribute.title == "编辑"
      ) {
        this.assignInfo = this.list.passengers; //乘车人的信息
        console.log(this.assignInfo);
        for (let index = 0; index < this.list.taskDriverCars.length; index++) {
          this.driverInfo.push({
            driverId: this.list.taskDriverCars[index].driverId,
            driverName: this.list.taskDriverCars[index].driverName,
            driverTel: this.list.taskDriverCars[index].driverTel
          });
          this.carInfo.push({
            carId: this.list.taskDriverCars[index].carId,
            carNo: this.list.taskDriverCars[index].carNo
          });
        }
        this.carOrDriverParam.exceptStartTime = this.list.exceptStartTime;
        this.carOrDriverParam.exceptEndTime = this.list.exceptEndTime;
        this.getDriverList();
        this.getCarList();
      }
    }
  },
  //方法集合
  methods: {
    // 用车人的模糊搜索
    remoteMethod1(query) {
      console.log(query);
      if (query !== "") {
        this.loading1 = true;
        setTimeout(() => {
          this.loading1 = false;
          $app.showLoading = false;
          $ajax.queryUserInfoList(
            {
              key: query
            },
            res => {
              const list = res.data.map(item => {
                console.log(item);
                return {
                  value: item.tel,
                  label: item.userName
                };
              });
              this.options1 = list.filter(
                item =>
                  item.label.toLowerCase().indexOf(query.toLowerCase()) > -1
              );
              this.list.useCarTel = this.options1[0].value;
              console.log(this.options1);
            }
          );
        }, 200);
      } else {
        this.options1 = [];
      }
    },
    // 获取部门
    selectDepartment() {
      this.modal = true;
      $ajax.getDepartments({}, resData => {
        console.log(resData);
        let data = dispose.disposeTreeData(resData.data);
        if (this.list.departId) {
          //树形结构展示的时候要显示当前的部门
          findChildren(data,this.list.departId)
        }
        this.treeData = data;
      });
    },

    // 选中树节点
    selectData(data, list) {
      console.log(list);
      console.log(data);
      //   设置成单选
      for (let index = 0; index < data.length; index++) {
        if (list.title == data[index].title) {
          data[index].checked = true;
        } else {
          data[index].checked = false;
        }
      }
      this.departId = list.id;
      this.applyDepart = list.title;
      console.log(this.list.departId);
    },
    // 选择部门的确定按钮
    saveTreeModal() {
      this.list.applyDepart = this.applyDepart;
      this.list.departId = this.departId;
      this.treeData = [];
    },
    // 选择部门的取消按钮
    closeTreeModal() {
      this.treeData = []; //解决第一次选中的部门,再关闭模态框,再次打开选择部门的时候会某人先选择上次选中的部门再跳回去默认选择的
    },
    // 获取可用司机列表
    getDriverList() {
      $ajax.getAvailableDriver(this.carOrDriverParam, res => {
        console.log(res);
        let list = res.data;
        list.map((current, index) => {
          current.index = index;
          current._checked = false;
        });
        this.driverListData = list;
        this.driverListTotal = res.total;
      });
    },
    // 获取可用车辆列表
    getCarList() {
      this.carOrDriverParam.applyType = 1;
      $ajax.getAvailableCars(this.carOrDriverParam, res => {
        let list = res.data;
        list.map((current, index) => {
          current.index = index;
          current._checked = false;
        });
        this.carListData = list;
        this.carListTotal = res.total;
      });
    },

    // 起点打开地图
    openStarMap(type) {
      console.log(type);
      this.mapModal = true;
      this.locationType = type;
    },
    // 接受地图子组件传过来的位置信息
    getLocation(data) {
      console.log(data);
      this.locationData = data;
    },
    // 地图modal的确认按钮
    saveMap() {
      let data = this.locationData;
      if (data.type == 1) {
        //1是起点,2是终点
        this.list.departureName = data.name;
        this.list.departureLng = data.longitude;
        this.list.departureLat = data.latitude;
      } else {
        this.list.destinationName = data.name;
        this.list.destinationLng = data.longitude;
        this.list.destinationLat = data.latitude;
      }
      console.log("保存地图了");
    },
    // 地图modal的取消按钮
    closeMap() {
      console.log("关闭地图啦");
    },
    // 选择预计出发时间
    selectStartime(date) {
      this.list.exceptStartTime = date;
      this.carOrDriverParam.exceptStartTime = date;
      if (
        (this.lookAttribute.title == "添加" ||
          this.lookAttribute.title == "指派") &&
        this.list.exceptEndTime &&
        this.list.exceptStartTime
      ) {
        console.log(this.list.exceptEndTime);
        console.log(this.list.exceptStartTime);
        console.log("吉林秘密");
        this.getDriverList();
        this.getCarList();
      }
    },
    // 选择预计结束时间
    selectEndTime(date) {
      console.log(date);
      this.list.exceptEndTime = date;
      this.carOrDriverParam.exceptEndTime = date;
      if (
        (this.lookAttribute.title == "添加" ||
          this.lookAttribute.title == "指派") &&
        this.list.exceptEndTime &&
        this.list.exceptStartTime
      ) {
        this.getDriverList();
        this.getCarList();
      }
    },
    // 删除司机信息
    deleteDriver(index, driverId) {
      this.driverInfo.splice(index, 1);
      console.log(this.driverInfo);
      console.log(driverId);
      for (let i = 0; i < this.driverListData.length; i++) {
        if (this.driverListData[i].driverId == driverId) {
          console.log(this.driverListData[i]);
          this.$set(this.driverListData[i], "_checked", false);
        }
      }
    },
    // 删除车辆信息
    deleteCar(index, carId) {
      this.carInfo.splice(index, 1);
      console.log(this.carInfo);
      console.log(index);
      console.log(carId);
      for (let i = 0; i < this.carListData.length; i++) {
        if (this.carListData[i].carId == carId) {
          console.log(this.carListData[i]);
          this.$set(this.carListData[i], "_checked", false);
        }
      }
    },
    // 保存并通知
    saveInform() {},
    // 保存
    save(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          Object.keys(this.param).forEach(key => {
            this.param[key] = this.list[key];
          });
          this.param.id = this.list.taskId;
          this.param.drivers = this.driverInfo;
          this.param.cars = this.carInfo;
          if (this.formDynamic.items[0].passengerName != "") {
            //同乘人信息
            this.param.passengers = this.formDynamic.items;
          }
          if (this.lookAttribute.title == "编辑") {
            window.console.log(this.param);
            $ajax.modifyTask(this.param, res => {
              console.log(res);
              $app.toast(res.msg, true, () => {
                this.lookAttribute.showModal = false;
                this.$emit("refreshData");

                // 清空数据
                this.driverListData = [];
                this.carListData = [];
                this.driverInfo = [];
                this.carInfo = [];
                this.$refs[name].resetFields();
              });
            });
          } else if (this.lookAttribute.title == "指派") {
            //工作台车辆点的调度
            $ajax.addTask(this.param, res => {
              $app.toast(res.msg, true, () => {
                this.lookAttribute.showModal = false;
                this.$emit("refreshData");

                // 清空数据
                this.driverListData = [];
                this.carListData = [];
                this.driverInfo = [];
                this.carInfo = [];
                this.$refs[name].resetFields();
              });
            });
          } else {
            console.log("添加");
            console.log(this.list);
            $ajax.addTask(this.param, res => {
              console.log(res);
              $app.toast(res.msg, true, () => {
                this.lookAttribute.showModal = false;
                this.$emit("refreshData");

                // 清空数据
                this.driverListData = [];
                this.driverInfo = [];
                this.carInfo = [];
                this.carListData = [];
                this.$refs[name].resetFields();
              });
            });
          }
        } else {
          console.log("第一次验证失败");
        }
      });

      // $app.toast("保存成功", true);
    },
    // 取消
    cancel(name) {
      this.$refs[name].resetFields();
      this.lookAttribute.showModal = false;
    },
    // 选中的司机的复选框
    checkDriverData(selection, row) {
      console.log(this.driverInfo);
      console.log(row);
      if (
        selection.length > this.list.carQuantity ||
        this.driverInfo.length == this.list.carQuantity
      ) {
        $app.toast("选择司机人数不能大于用车人数", false, () => {
          for (let index = 0; index < this.driverListData.length; index++) {
            if (this.driverListData[index]._checked == false) {
              this.$set(this.driverListData[index], "_disabled", true);
            }
          }
        });
      } else {
        this.driverInfo.push({
          driverId: row.driverId,
          driverName: row.realName,
          driverTel: row.tel
        });
        this.$set(this.driverListData[row.index], "_checked", true);
        for (let index = 0; index < this.driverListData.length; index++) {
          if (this.driverListData[index]._checked == true) {
            this.$set(this.driverListData[index], "_disabled", false);
          }
        }
      }
    },
    // 取消选中的司机的复选框
    cancelDriverData(selection, row) {
      this.$set(this.driverListData[row.index], "_checked", false);
      for (let index = 0; index < this.driverListData.length; index++) {
        if (this.driverListData[index]._checked == false) {
          this.$set(this.driverListData[index], "_disabled", false);
        }
      }
      for (let index = 0; index < this.driverInfo.length; index++) {
        if (this.driverInfo[index].driverId == row.driverId) {
          this.driverInfo.splice(index, 1);
        }
      }
    },
    // 选中的车辆的复选框
    checkCarData(selection, row) {
      if (
        selection.length > this.list.carQuantity ||
        this.carInfo.length == this.list.carQuantity
      ) {
        $app.toast("选择车辆人数不能大于用车人数", false, () => {
          for (let index = 0; index < this.carListData.length; index++) {
            if (this.carListData[index]._checked == false) {
              this.$set(this.carListData[index], "_disabled", true);
            }
          }
        });
      } else {
        this.carInfo.push({
          carId: row.carId,
          carNo: row.plateNo
        });
        this.$set(this.carListData[row.index], "_checked", true);
        for (let index = 0; index < this.carListData.length; index++) {
          if (this.carListData[index]._checked == true) {
            this.$set(this.carListData[index], "_disabled", false);
          }
        }
      }
    },
    // 取消选中的车辆的复选框
    cancelCarData(selection, row) {
      this.$set(this.carListData[row.index], "_checked", false);
      for (let index = 0; index < this.carListData.length; index++) {
        if (this.carListData[index]._checked == false) {
          this.$set(this.carListData[index], "_disabled", false);
        }
      }
      for (let index = 0; index < this.carInfo.length; index++) {
        if (this.carInfo[index].driverId == row.driverId) {
          this.carInfo.splice(index, 1);
        }
      }
    },
    // 司机分页页码
    switchDriverIndex(index) {
      console.log(index);
      this.carOrDriverParam.pageIndex = index;
      this.getDriverList(this.carOrDriverParam);
    },
    // 司机分页条数
    switchDriverSize(pageSize) {
      console.log(pageSize);
      this.carOrDriverParam.pageSize = pageSize;
      this.getDriverList(this.carOrDriverParam);
    },
    // 车辆分页页码
    switchCarIndex(index) {
      console.log(index);
      this.carOrDriverParam.pageIndex = index;
      this.getCarList(this.carOrDriverParam);
    },
    // 车辆分页条数
    switchCarSize(pageSize) {
      console.log(pageSize);
      this.carOrDriverParam.pageSize = pageSize;
      this.getCarList(this.carOrDriverParam);
    },

    // 删除同乘人信息
    deleteNameAndPhone(index) {
      this.formDynamic.items[index].status = 0;
    },
    // 添加同乘人
    handleAdd() {
      this.index++;
      this.formDynamic.items.push({
        value: "",
        index: this.index,
        status: 1
      });
    },
    // 关闭调度框
    closeModal(name) {
      this.driverInfo = [];
      this.carInfo = [];
      this.$refs[name].resetFields();
      this.driverListData = [];
      this.carListData = [];
      this.list.applyDepart = "";
      this.list.departId = null;
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
.dispatchModal {
  background-color: #fff;
  .left {
    width: 540px;
    display: inline-block;
    // height: inherit;
    padding-right: 15px;
    height: 520px;
    .use_car_title {
      color: #222222;
      font-size: 16px;
      padding: 5px 0 10px 0;
    }
    .addCarOrDriver {
      color: #7199f1;
    }
  }
  .right {
    width: 550px;
    float: right;
    margin-left: 10px;
    .right_title {
      font-size: 16px;
      color: #666666;
      margin-top: 5px;
    }
    .right_content {
      border-left: 1px solid #dddddd;
      border-top: 1px solid #dddddd;
      border-right: 1px solid #dddddd;
      height: 450px;
      margin-top: 5px;
      .nav {
        // border-bottom: 1px solid #DDDDDD;
        position: relative;
        height: 50px;
        .serach_content {
          position: absolute;
          left: 20px;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
  .footer {
    position: relative;
    .hint {
      position: absolute;
      bottom: 0px;
      left: 0;
      color: #666666;
      font-size: 14px;
    }
  }
}
</style>
<style>
.dispatchModal .ivu-modal-body {
  padding: 0 16px 0 28px !important;
  box-sizing: border-box;
  display: flex;
  display: -webkit-flex;
  align-items: stretch;
}
.ivu-tabs-bar {
  margin-bottom: 10px !important;
}
.addCarOrDriverInfo .ivu-col-span-8 {
  text-align: center;
}
.addCarOrDriverInfo .ivu-form-item-content {
  margin-left: 0 !important;
}
.gw .ivu-input[disabled] {
  color: #333 !important;
  background-color: transparent !important;
  border-color: #eee;
}
.gw .ivu-select-selected-value {
  color: #333 !important;
  background-color: #fff !important;
  border-color: #eee;
}
.task .ivu-input {
  width: auto;
}
.scroll {
  overflow-y: scroll;
  height: 450px;
}
</style>
