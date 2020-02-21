<!--  -->
<template>
  <Modal
    class="dispatchModal"
    v-model="lookAttribute.showModal"
    width="1100"
    style="display: flex;flex-direction: row;"
  >
    <div slot="header">
      <span style="font-size:17px">{{lookAttribute.title}}</span>
      <span style="font-size:17px;margin-left:20px">{{topTitle}}</span>
      <Tag color="success" style="margin-left: 10px;margin-top: -2px;" v-show="topTap">{{topTap}}</Tag>
    </div>
    <div slot="footer" class="footer">
      <div class="hint">注 : 如需要自动计算费用......</div>
      <Button type="primary" size="default" @click="remind('确定要指派给该司机吗?')">直接指派</Button>
      <Button type="default" size="default" @click="remind('确定要推送订单吗?')">推送订单</Button>
      <Button type="primary" size="default" @click="save">保存</Button>
    </div>
    <div class="left">
      <Tabs value="name1" style="margin-top:10px" :animated="false">
        <TabPane label="用车信息" name="name1">
          <Form :model="list" :rules="useCarRule" :label-width="80" label-position="top">
            <div class="use_car_title">用车人信息</div>
            <Row>
              <Col span="12">
                <FormItem label="用车人" prop="useUserName">
                  <Input v-model="list.useUserName" placeholder="请输入用车人"></Input>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="部门" prop="applyDepart">
                  <Input v-model="list.applyDepart" placeholder="请输入部门"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem label="电话" prop="useUserTel">
                  <Input v-model="list.useUserTel" placeholder="请输入用车人电话"></Input>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="类型" prop="useCarType">
                  <Select transfer v-model="list.useCarType">
                    <Option :value="1">第一车队</Option>
                    <Option :value="2">第二车队</Option>
                  </Select>
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
                    class="input_content"
                    icon="md-locate"
                  />
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="终点" prop="destinationName">
                  <Input
                    v-model="list.destinationName"
                    placeholder="请输入"
                    class="input_content"
                    icon="md-locate"
                  />
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem label="出发时间" :label-width="150" prop="startTime">
                  <Date-picker transfer type="datetime" :value="list.startTime" placeholder="选择日期"></Date-picker>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="结束时间" :label-width="150" prop="endTime">
                  <Date-picker transfer type="datetime" :value="list.endTime" placeholder="选择日期"></Date-picker>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </TabPane>
        <TabPane label="费用信息" name="name2">
          <!-- <div class="journey_info">
            <div class="item">
              <div class="use_car_left">
                <div class="detail">费用信息 :</div>
                <Input
                  v-model="value"
                  placeholder="请输入"
                  style="width: 200px;padding-top:7px"
                  class="input_content"
                />
              </div>
              <div class="use_car_right">
                <div class="detail">费用代号 :</div>
                <Input
                  v-model="value"
                  placeholder="请输入"
                  style="width: 200px;padding-top:7px"
                  class="input_content"
                />
              </div>
            </div>
            <div class="item">
              <div class="use_car_left">
                <div class="detail">结算部门 :</div>
                <Select v-model="model1" style="width:200px;padding-top:7px">
                  <Option
                    v-for="item in cityList"
                    :value="item.value"
                    :key="item.value"
                  >{{ item.label }}</Option>
                </Select>
              </div>
              <div class="use_car_right">
                <div class="detail">司机费用 :</div>
                <Input
                  v-model="value"
                  placeholder="请输入"
                  style="width: 200px;padding-top:7px"
                  class="input_content"
                />
              </div>
            </div>
            <div class="item">
              <div class="use_car_left">
                <div class="detail">用车费用 :</div>
                <Input
                  v-model="value"
                  placeholder="请输入"
                  style="width: 200px;padding-top:7px"
                  class="input_content"
                />
              </div>
            </div>
          </div>-->
          <Form :model="list" :label-width="80" label-position="top">
            <Row>
              <Col span="12">
                <FormItem label="任务编号" prop="taskCode">
                  <Input v-model="list.taskCode" placeholder="请输入任务编号"></Input>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="任务费用" prop="taskAmount">
                  <Input v-model="list.taskAmount" placeholder="请输入任务费用"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem label="结算部门" prop="applyDepart">
                  <Input v-model="list.applyDepart" placeholder="请输入结算部门"></Input>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="司机费用" prop="driverAmount">
                  <Input v-model="list.driverAmount" placeholder="请输入司机费用"></Input>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </TabPane>
        <TabPane label="同乘人信息" name="name3">
          <!-- <div class="use_car_form">
            <div class="use_car_title">同乘人信息</div>
            <div class="item">
              <div class="use_car_left">
                <div class="detail">姓名 :</div>
                <Input
                  v-model="value"
                  placeholder="请输入"
                  style="width: 200px;padding-top:7px"
                  class="input_content"
                />
              </div>
              <div class="use_car_right">
                <div class="detail">联系电话 :</div>
                <Input
                  v-model="value"
                  placeholder="请输入"
                  style="width: 200px;padding-top:7px"
                  class="input_content"
                />
              </div>
            </div>
            <div class="add_people">
              <Icon type="ios-add-circle-outline" size="15" style="font-weight:bold" />
              <span class="add_man">添加同乘人</span>
            </div>
          </div>-->
          <Form ref="formDynamic" :model="formDynamic" :label-width="80">
            <Row>
              <Col span="12">
                <FormItem
                  v-for="(item, index) in formDynamic.items"
                  v-if="item.status"
                  :key="index"
                  :label="'姓名 ' + item.index"
                  :prop="'items.' + index + '.value'"
                  :rules="{required: true, message: 'Item ' + item.index +' can not be empty', trigger: 'blur'}"
                >
                  <Input type="text" v-model="item.value" placeholder="请输入同乘人姓名"></Input>
                  <Button @click="handleRemove(index)" style="opacity:0;margin-top:10px">Delete</Button>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem
                  v-for="(item, index) in formDynamic.items"
                  v-if="item.status"
                  :key="index"
                  :label="'电话 ' + item.index"
                  :prop="'items.' + index + '.value'"
                  :rules="{required: true, message: 'Item ' + item.index +' can not be empty', trigger: 'blur'}"
                >
                  <Input type="text" v-model="item.value" placeholder="请输入同乘人号码"></Input>
                  <Button @click="handleRemove(index)" style="margin-top:10px">删除</Button>
                </FormItem>
              </Col>
            </Row>
            <FormItem>
              <Row>
                <Col span="12">
                  <Button type="dashed" @click="handleAdd" icon="md-add">添加同乘人</Button>
                </Col>
              </Row>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="handleSubmit('formDynamic')">Submit</Button>
              <Button @click="handleReset('formDynamic')" style="margin-left: 8px">Reset</Button>
            </FormItem>
          </Form>
        </TabPane>
      </Tabs>
    </div>
    <!-- <div class="right" v-show="driverOrCar == 0">
      <div class="right_title">司机信息</div>
      <div class="right_content">
        <div class="nav">
          <Input
            suffix="ios-search"
            placeholder="搜索司机/电话号码"
            size="default"
            style="width: 200px;"
            class="serach_content"
          />
        </div>
        <Table
          :columns="driverInfo"
          highlight-row
          class="table"
          :data="driverList"
          @on-current-change="selectData"
        ></Table>
      </div>
    </div> -->
    <div class="right" v-show="driverOrCar == 1">
      <div class="right_title">车辆信息</div>
      <div class="right_content">
        <div class="nav">
          <!-- <Select v-model="model1" size="small" style="width:90px;margin-left:24px" placeholder="车型">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Select v-model="model1" size="small" style="width:90px;margin-left:24px" placeholder="座次">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>-->
          <Input
            suffix="ios-search"
            placeholder="搜索车牌号码/车辆编号"
            size="default"
            style="width: 200px;"
            class="serach_content"
          />
        </div>
        <Table
          :columns="carInfo"
          highlight-row
          class="table"
          :data="carList"
          @on-current-change="selectData"
        ></Table>
      </div>
    </div>
    <div class="right" v-show="driverOrCar == 3">
      <Tabs value="name1" @on-click="switchTabs" style="margin-top:10px" :animated="false">
        <TabPane label="司机列表" name="name1">
          <div class="right_content">
            <Table
              :columns="driverListTitle"
              highlight-row
              class="table"
              :data="driverListData"
              @on-current-change="selectData"
            ></Table>
          </div>
        </TabPane>
        <TabPane label="车辆列表" name="name2">
          <div class="right_content">
            <Table
              :columns="carListTitle"
              highlight-row
              class="table"
              :data="carListData"
              @on-current-change="selectData"
            ></Table>
          </div>
        </TabPane>
      </Tabs>
    </div>
    <Modal v-model="modal2" title="小强管车" @on-ok="ok" @on-cancel="cancel">
      <p style="margin-top:15px">{{content}}</p>
    </Modal>
  </Modal>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
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
    topTitle: String,
    topTap: String,
    list: {
      type: Object,
      default() {
        return {
          // useUserName:"",
        };
      }
    }
  },
  data() {
    //这里存放数据
    return {
      param: {
        pageIndex: 1,
        pageSize: 10,
        exceptStartTime: "",
        exceptEndTime: ""
      },
      model1: "",
      model: "",
      modal2: false,
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
      // 可用司机
      driverListTitle: [
        {
          title: "司机姓名",
          key: "driverName"
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
          key: "matchRate"
        }
      ],
      driverListData: [],
      driverListTotal: null,
      // 可用车辆
      carListTitle: [
        {
          title: "车牌号",
          key: "plateNo"
        },
        {
          title: "座次",
          key: "seats"
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
          key: "matchRate"
        }
      ],
      carListData: [],
      carListTotal: null,
      driverInfo: [
        {
          // type: "index",
          width: 80,
          title: "请选择",
          align: "center",
          key: "checkBox",
          render: (h, params) => {
            return h("div", [
              h("Checkbox", {
                props: {
                  value: params.row.checkBox
                },
                on: {
                  "on-change": e => {
                    if (e == false) {
                      this.driverList.disabled = true;
                    }
                    this.driverList.forEach(items => {
                      //先取消所有对象的勾选，checkBox设置为false
                      this.$set(items, "checkBox", false);
                    });
                    this.driverList[params.index].checkBox = e; //再将勾选的对象的checkBox设置为true
                  }
                }
              })
            ]);
          }
        },
        {
          title: "司机姓名",
          key: "driverName",
          width: 100
        },
        {
          title: "手机号码",
          key: "phoneNumber"
        },
        {
          title: "车队",
          key: "carTeam"
        },
        {
          title: "状态",
          key: "status",
          type: "html",
          width: 110
        }
      ],
      carInfo: [
        {
          type: "index",
          width: 35
        },
        {
          title: "车辆编号",
          key: "carIndex",
          width: 100
        },
        {
          title: "车牌号",
          key: "carNumber"
        },
        {
          title: "车辆类型",
          key: "carType"
        },
        {
          title: "状态",
          key: "status",
          type: "html",
          width: 110
        }
      ],
      driverList: [
        {
          driverName: "一颗牙疼",
          phoneNumber: "13266101017",
          carTeam: "第一车队",
          status: "<span style='color:red'>任务中</span>"
        },
        {
          driverName: "Tim",
          phoneNumber: "15899936452",
          carTeam: "第一车队",
          status: "<span style='color:#2DB123'>空闲</span>"
        }
      ],
      carList: [
        {
          carIndex: "TJ00001",
          carNumber: "粤S08885",
          carType: "自有车辆",
          status: "<span style='color:red'>任务中</span>"
        },
        {
          carIndex: "TJ01101",
          carNumber: "粤SPNN47",
          carType: "外包车辆",
          status: "<span style='color:#2DB123'>空闲</span>"
        }
      ],

      content: "",

      useCarRule: {
        useUserName: [
          {
            required: true,
            message: "请输入用车人姓名",
            trigger: "blur"
          }
        ],
        useUserTel: [
          {
            required: true,
            message: "请输入用车人电话",
            trigger: "blur"
          }
        ],
        useCarType: [
          {
            required: true,
            message: "请选择用车类型",
            trigger: "blur"
          }
        ],
        applyDepart: [
          {
            required: true,
            message: "请选择部门",
            trigger: "blur"
          }
        ],
        departureName: [
          {
            required: true,
            message: "请选择起点",
            trigger: "blur"
          }
        ],
        destinationName: [
          {
            required: true,
            message: "请选择终点",
            trigger: "blur"
          }
        ],
        startTime: [
          {
            required: true,
            message: "请选择开始时间",
            trigger: "change",
            type: "string"
          }
        ],
        endTime: [
          {
            required: true,
            message: "请选择结束",
            trigger: "blur",
            type: "string"
          }
        ]
      },
      //添加同乘人
      index: 1,
      formDynamic: {
        items: [
          {
            value: "",
            index: 1,
            status: 1
          }
        ]
      }
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    "lookAttribute.showModal"() {
      console.log(this.list);
      console.log(this.lookAttribute.showModal);
      if (
        this.list.exceptStartTime &&
        this.list.exceptEndTime &&
        this.lookAttribute.showModal == true
      ) {
        this.param.exceptStartTime = this.list.exceptStartTime;
        this.param.exceptEndTime = this.list.exceptEndTime;
        this.getDriverList();
      }
    }
  },
  //方法集合
  methods: {
    // 切换右边的tap栏
    switchTabs(name) {
      console.log(name);
      let param = {};
      param.pageIndex = 1;
      param.pageSize = 10;
      if (name == "name1") {
        this.getDriverList();
      } else {
        this.getCarList();
      }
    },
    // 获取可用司机列表
    getDriverList() {
      $ajax.getAvailableDriver(this.param, res => {
        console.log(res);
        this.driverListData = res.data;
        this.driverListTotal = res.total;
      });
    },
    // 获取可用车辆列表
    getCarList() {
      $ajax.getAvailableCars(this.param, res => {
        this.carData = res.data;
        this.carTotal = res.total;
      });
    },
    changeModal(e) {
      this.switchInfo = e;
    },
    save() {
      window.console.log("11111");
      $app.toast("保存成功", true);
    },
    // 推送和指派
    remind(content) {
      this.modal2 = true;
      this.content = content;
    },
    ok() {
      this.$Message.success("通知成功");
    },
    cancel() {
      this.$Message.info("取消成功");
    },
    selectData(currentRow, oldCurrentRow) {
      console.log(currentRow, oldCurrentRow);
    },

    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    handleAdd() {
      this.index++;
      this.formDynamic.items.push({
        value: "",
        index: this.index,
        status: 1
      });
    },
    handleRemove(index) {
      this.formDynamic.items[index].status = 0;
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
    width: 500px;
    display: inline-block;
    height: inherit;
    padding-right: 15px;
    .top_nav {
      border-bottom: 1px solid #dddddd;
      padding: 16px 0;
      box-sizing: border-box;
      .default {
        margin-left: 16px;
      }
    }
    .use_car_form,
    .journey_info {
      .item {
        display: flex;
        justify-content: space-around;
        margin-bottom: 5px;
        .use_car_left,
        .use_car_right {
          flex: 1;
          .detail {
            color: #666666;
            font-size: 14px;
            .important {
              color: red;
              padding-right: 3px;
            }
          }
        }
      }
    }
    .journey_info {
      .use_car_title {
        padding: 16px 0 7px 0;
      }
    }
    .add_people {
      margin-top: 8px;
      color: #1190fc;
      font-size: 14px;
      margin-bottom: 10px;
    }

    .use_car_title {
      color: #222222;
      font-size: 16px;
      padding: 5px 0 10px 0;
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
.dispatchModal .ivu-form-label-top .ivu-form-item-label {
  /* width: 70px !important; */
  color: #666666;
  text-align: left;
  padding-left: 15px;
}
</style>
