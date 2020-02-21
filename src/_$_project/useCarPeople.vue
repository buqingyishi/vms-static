<!--  -->
<template>
  <div class="container useCarPeople">
    <div class="title">
      <Icon class="title_icon icon" type="ios-options" size="18" />
      <span class="title_name">司机管理</span>
      <Icon
        class="no_star icon"
        @click="clickStar"
        v-if="showStar == false"
        type="md-star-outline"
        size="20"
        color="#c4c4c4"
      />
      <Icon
        class="yes_star icon"
        @click="clickStar"
        v-if="showStar == true"
        type="md-star"
        size="20"
        color="#f5ba03"
      />
    </div>
    <div class="content">
      <Menu mode="horizontal" active-name="1" class="nav">
        <Menu-item name="1">全部</Menu-item>
        <Menu-item name="2">任务中</Menu-item>
        <Menu-item name="3">空闲</Menu-item>
      </Menu>
      <div class="operation">
        <div class="left">
          <Button type="primary" class="button" @click="modal4 = true">新增</Button>
          <Button type="primary" class="button" @click="modal4 = true">编辑</Button>
          <Button type="error" class="button">删除</Button>
          <Button type="primary" class="button" @click="modal4 = true">批量导入</Button>
          <Input
            v-model="value"
            class="search_content"
            placeholder="搜索司机/订单/车辆"
            style="width:200px;margin-left:30px;"
          ></Input>
          <Button type="primary" style="width:60px;margin-left:20px;">搜索</Button>
        </div>
        <div class="right">
          <Button type="primary" class="button">导出</Button>
          <ButtonGroup>
            <Button icon="md-sync"></Button>
            <Button icon="ios-keypad"></Button>
          </ButtonGroup>
        </div>
      </div>
      <Table border ref="selection" :columns="columns4" :data="data1">
        <template slot-scope="{ row, index }" slot="action">
            <Button type="default" size="default" style="margin-right: 5px;background-color:#f8f8f8" @click="detail(index)">详情</Button>
            <Button type="default" size="default" style="background-color:#f8f8f8" @click="remove(index)">备注</Button>
          </template>
      </Table>
      <Page :total="100" styles="color:#fafafa;float:right;margin-top:20px" />
    </div>
    <Modal
      class="addInfo"
      v-model="modal4"
      title="调度"
      width="1000"
      style="display: flex;flex-direction: row;"
    >
      <div slot="footer">
         <Button type="primary" size="default">直接指派</Button>
         <Button type="default" size="default">推送订单</Button>
        <Button  type="primary" size="default">保存</Button>
       </div>
      <div class="left">
        <!-- <div class="left_title">调度
        </div>-->
        <div class="useCarManInfo">
          用车人信息
          <div class="use_car_form">
            <div class="item">
              <span class="detail">用车人 :</span>
              <Input v-model="value" placeholder="请输入" class="input_content" />
              <span class="detailT short">部门 :</span>
              <Input v-model="value" placeholder="请输入" class="input_contentT" />
            </div>
            <div class="item">
              <span class="detail">用车人电话 :</span>
              <Input v-model="value" placeholder="请输入" class="input_content" />
            </div>
          </div>
        </div>
        <div class="farInfo">
          行程信息
          <div class="use_car_form">
            <div class="item">
              <span class="detail">起点 :</span>
              <Input v-model="value" placeholder="请输入" class="input_content" />
              <span class="detailT short">终点 :</span>
              <Input v-model="value" placeholder="请输入" class="input_contentT" />
            </div>
            <div class="item">
              <span class="detail">出发时间 :</span>
              <Input v-model="value" placeholder="请输入" class="input_content" />
              <span class="detailT">结束时间 :</span>
              <Input v-model="value" placeholder="请输入" class="input_contentT" />
            </div>
          </div>
        </div>
        <div class="otherInfo">
          附加信息
          <div class="use_car_form">
            <div class="item">
              <span class="detail">费用信息 :</span>
              <Input v-model="value" placeholder="请输入" class="input_content" />
              <span class="detailT">费用代号 :</span>
              <Input v-model="value" placeholder="请输入" class="input_contentT" />
            </div>
            <div class="item">
              <span class="detail">结算部门 :</span>
              <Input v-model="value" placeholder="请输入" class="input_content" />
              <span class="detailT">司机费用 :</span>
              <Input v-model="value" placeholder="请输入" class="input_contentT" />
            </div>
            <div class="item">
              <span class="detail">用车费用 :</span>
              <Input v-model="value" placeholder="请输入" class="input_content" />
            </div>
          </div>
        </div>
        <div class="hint">注 : 如需要自动计算费用......</div>
      </div>

      <div class="right">
        <div class="right_title">司机/车辆信息</div>
        <div class="right_content">
          <div class="nav">
            <Dropdown style="margin-left: 20px;" trigger="click">
              <Button type="default" size="small" style="color:#666666">
                司机车牌
                <Icon type="ios-arrow-down"></Icon>
              </Button>
              <DropdownMenu slot="list">
                <DropdownItem>驴打滚</DropdownItem>
                <DropdownItem>炸酱面</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Dropdown style="margin-left: 10px" trigger="click">
              <Button type="default" size="small" style="color:#666666">
                车型
                <Icon type="ios-arrow-down"></Icon>
              </Button>
              <DropdownMenu slot="list">
                <DropdownItem>驴打滚</DropdownItem>
                <DropdownItem>炸酱面</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Dropdown style="margin-left: 10px" trigger="click">
              <Button type="default" size="small" style="color:#666666">
                座次
                <Icon type="ios-arrow-down"></Icon>
              </Button>
              <DropdownMenu slot="list">
                <DropdownItem disabled>豆汁儿</DropdownItem>
                <DropdownItem>冰糖葫芦</DropdownItem>
                <DropdownItem divided>北京烤鸭</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Input
              suffix="ios-search"
              placeholder="搜索司机/车辆"
              size="small"
              style="width: 160px;margin-left: 20px"
            />
          </div>
        </div>
      </div>
    </Modal>
    
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      carStatus: [
        {
          value: "free",
          label: "空闲"
        },
        {
          value: "wait",
          label: "待出车"
        },
        {
          value: "use",
          label: "任务中"
        },
        {
          value: "apply",
          label: "申请"
        }
      ],
      columns4: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "司机编号",
          width: 100,
          key:"driverIndex"
        },
        {
          title: "司机姓名",
          key: "driverName"
        },
        {
          title: "电话",
          key: "phone"
        },
        {
          title: "车牌号",
          key: "carNumber",
        },
        {
          title: "星际",
          key: "star",
        },
        {
          title: "类型",
          key: "type",
        },
        {
          title: "车辆型号",
          key: "carType",
        },
        {
          title: "车队",
          key: "carTeam",
        },
        {
          title: "状态",
          key: "status",
        },
        {
          title: "操作",
          slot: "action",
          width: 180,
          align: "center"
        },
      ],
      data1: [
        {
          driverIndex: "XQ001",
          driverName: "一颗牙疼",
          phone: "15625568840",
          carNumber: "粤S08885",
          star:"5.0",
          type:"外援司机",
          carType:"奥迪A6",
          carTeam: "小强车队",
          status:"任务中",
        },
        {
          driverIndex: "XQ002",
          driverName: "Tim",
          phone: "13266101017",
          carNumber: "粤S06668",
          star:"3.0",
          type:"外援司机",
          carType:"思域",
          carTeam: "小强车队",
          status:"任务中",
        },
        {
          driverIndex: "XQ003",
          driverName: "Carrie",
          phone: "1589936252",
          carNumber: "粤S00000",
          star:"2.0",
          type:"外援司机",
          carType:"电动车",
          carTeam: "小强车队",
          status:"任务中",
        },
        {
          driverIndex: "XQ004",
          driverName: "一颗牙疼",
          phone: "15625568840",
          carNumber: "粤S08885",
          star:"1.0",
          type:"外援司机",
          carType:"奥迪A6",
          carTeam: "小强车队",
          status:"任务中",
        },
      ],
      model1: "",
      modal4: false,
      value: "",
      showStar: false,

      formValidate: {
        name: "",
        mail: "",
        city: "",
        gender: "",
        interest: [],
        date: "",
        time: "",
        desc: ""
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur"
          }
        ],
        mail: [
          {
            required: true,
            message: "Mailbox cannot be empty",
            trigger: "blur"
          },
          { type: "email", message: "Incorrect email format", trigger: "blur" }
        ],
        city: [
          {
            required: true,
            message: "Please select the city",
            trigger: "change"
          }
        ],
        gender: [
          { required: true, message: "Please select gender", trigger: "change" }
        ],
        interest: [
          {
            required: true,
            type: "array",
            min: 1,
            message: "Choose at least one hobby",
            trigger: "change"
          },
          {
            type: "array",
            max: 2,
            message: "Choose two hobbies at best",
            trigger: "change"
          }
        ],
        date: [
          {
            required: true,
            type: "date",
            message: "Please select the date",
            trigger: "change"
          }
        ],
        time: [
          {
            required: true,
            type: "string",
            message: "Please select time",
            trigger: "change"
          }
        ],
        desc: [
          {
            required: true,
            message: "Please enter a personal introduction",
            trigger: "blur"
          },
          {
            type: "string",
            min: 20,
            message: "Introduce no less than 20 words",
            trigger: "blur"
          }
        ]
      }
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
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
    clickStar() {
      this.showStar = !this.showStar;
    },
    // 详情
    detail(){
      window.console.log(11111)
      this.$router.push({path:'/driverDetail'})
      // $app.routeIn({path:'/carDetail'})
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
@import url("./css/diaodu.less");
@import url("./css/car.less");
</style>
<style>
.useCarPeople .ivu-modal-body {
  padding: 0 16px !important;
}
</style>