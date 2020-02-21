<!--  -->
<template>
  <div class="container">
    <topTitle :titleName="'司机管理'"></topTitle>
    <div class="content">
      <div class="search_content operation">
        <div class="left">
          <Button type="primary" class="button" @click="addDriver">添加</Button>
        </div>
        <div class="right">
          <div class="search_condition">
            <div class="search_type">
              <span class="describe">状态 ：</span>
              <Select v-model="value1" style="width:200px">
                <Option :value="0">停用</Option>
                <Option :value="1">正常</Option>
                <Option :value="2">待提交资料</Option>
                <Option :value="3">待审核</Option>
              </Select>
            </div>
            <div class="search_type">
              <span class="describe">工作状态 ：</span>
              <Select v-model="value2" style="width:200px">
                <Option :value="0">请假</Option>
                <Option :value="1">空闲</Option>
                <Option :value="2">繁忙</Option>
              </Select>
            </div>
            <div class="search_type">
              <span class="describe">关键字 ：</span>
              <Input v-model="value3" placeholder="用户名 / 真实姓名 / 电话号码" style="width: 230px" />
            </div>
            <Button type="primary" class="search" icon="ios-search" @click="searchData">搜索</Button>
            <Button icon="ios-trash" @click="resetData" style="margin-left:5px">重置</Button>
          </div>
        </div>
      </div>
      <Table border ref="selection" class="table" :columns="tableTitle" :data="tableData">
        <template slot-scope="{ row, index }" slot="action">
          <div
                class="update"
                style="display:inline-block;cursor: pointer;margin-left:10px;"
                @click="lookData(row.id)"
              >
                <Icon type="ios-eye" color="#409EFF" />
                <span style="color:#409EFF">查看</span>
              </div>
              <div
                class="update"
                style="display:inline-block;cursor: pointer;margin-left:10px;"
                @click="updateData(row)"
              >
                <Icon type="md-color-filter" color="#409EFF" />
                <span style="color:#409EFF">编辑</span>
              </div>
              <div
                class="update"
                style="display:inline-block;cursor: pointer;margin-left:10px;"
                @click="bindData(row.id)"
              >
                <Icon type="md-settings" color="#409EFF" />
                <span style="color:#409EFF">绑定</span>
              </div>
              <div
                class="update"
                style="display:inline-block;cursor: pointer;margin-left:10px;"
                @click="deleteDriver(row.id)"
              >
                <Icon type="ios-trash" color="#409EFF" />
                <span style="color:#409EFF">删除</span>
              </div>
          <!-- <Button
            type="primary"
            size="default"
            style="margin-right: 5px;"
            @click="lookData(row.id)"
          >查看</Button>
          <Button
            type="primary"
            size="default"
            style="margin-right: 5px;"
            @click="bindData(row.id)"
          >绑定</Button>
          <Button
            type="error"
            size="default"
            @click="deleteDriver(row.id)"
          >删除</Button> -->
        </template>
      </Table>
      <page :total="total" :switchPageIndex="switchPageIndex" :switchPageSize="switchPageSize"></page>
      <bindCarModal :lookAttribute="modalAttribute" :carList="carList" @switchPageIndex="bindData($event,param)" @switchPageSize="bindData($event,param)" @fatherMethod="getDriverList(param)"></bindCarModal>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import topTitle from "@$@/components/universal/title";
import page from "@$@/components/Page/page"; //分页
import bindCarModal from "@$@/components/Management/driver/bindCarModal"; //绑定车辆模态框
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    topTitle,
    page,
    bindCarModal
  },
  data() {
    //这里存放数据
    return {
      param: {
        pageIndex: 1,
        pageSize: 10,
        departId: null,
        companyId: null,
        key: "",
        status: null,
        workStatus: null
      },
      tableTitle: [
        {
          type: "index",
          width: 70,
          title: "序号",
          align: "center"
        },
        {
          title: "司机编号",
          key: "driverCode",
          // width: 180
          maxWidth:180,
          minWidth:50
        },
        {
          title: "司机姓名",
          key: "realName",
          // width: 100
          maxWidth:100,
          minWidth:50
        },
        {
          title: "账户名",
          key: "driverName",
          // width: 120
          maxWidth:120,
          minWidth:50
        },
        {
          title: "电话",
          key: "tel",
          // width: 140,
          maxWidth:140,
          minWidth:50
        },
        {
          title: "头像",
          key: "avatar",
          // width: 110,
          maxWidth:110,
          minWidth:50,
          render:(h,params) =>{
            return h('div',{
              attrs:{
                style:'width:60px;height:60px;'
              },
            },[
              h('img',{
                props:{
                  type:'primary',
                  size:'small'
                },
                attrs:{
                  src:params.row.avatar,style:'width:50px;height:50px;padding-top:5px'
                }
              })
            ])
          }
        },
        {
          title: "车牌号",
          key: "bindCarNo",
          // width: 120,
          maxWidth:120,
          minWidth:50
        },
        {
          title: "车辆编号",
          key: "bindCarCode",
          // width: 150,
          maxWidth:150,
          minWidth:50
        },
        {
          title: "车辆名称",
          key: "bindCarName",
          // width: 100,
          maxWidth:100,
          minWidth:50
        },
        {
          title: "车队",
          key: "carTeamName",
          // width: 100
          maxWidth:100,
          minWidth:50
        },
        {
          title: "工作状态",
          key: "workStatus",
          // width: 100,
          maxWidth:100,
          minWidth:50,
          render: (h, params) => {
            let text = params.row.workStatus;
            if (text == 0) {
              text = "请假";
            } else if (text == 1) {
              text = "空闲";
            } else if (text == 2) {
              text = "繁忙";
            }
            return h("span", text);
          }
        },
        {
          title: "状态",
          key: "status",
          // width: 80,
          maxWidth:80,
          minWidth:50,
          render: (h, params) => {
            let text = params.row.status;
            if (text == 0) {
              text = "停用";
            } else if (text == 1) {
              text = "正常";
            } else if (text == 2) {
              text = "待提交资料";
            } else if (text == 3) {
              text = "待审核";
            }
            return h("span", text);
          }
        },
        {
          title: "操作",
          slot: "action",
          align: "center"
        }
      ],
      tableData: [],
      total: null,
      // 规则
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
      },

      // 搜索
      value1: "",
      value2: "",
      value3: "",

      // 绑定模态框属性
      modalAttribute: {
        showModal: false,
        carTotal:null,
        driverId:null,
      },
      carList:[],
      carParam:{
        boundDriver:1,
        pageIndex:1,
        pageSize:10
      }
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 获取司机列表
    getDriverList(param) {
      $ajax.queryPageDriverList(param, res => {
        console.log(res);
        this.tableData = res.data;
        this.total = res.total;
      });
    },
    // 添加司机
    addDriver() {
      this.$router.push({
        name: "addOrUpdateDriver",
        params: { titleName: "添加司机" }
      });
    },
    // 查看司机
    lookData(id) {
      console.log(id);
      this.$router.push({ path: "/driverManageDetail", query: { id: id } });
    },
    // 编辑司机
    updateData(row){
      console.log(row)
      let list = row
      list.sex = list.sex.toString()
      list.age = list.age.toString()
      this.$router.push({name:'addOrUpdateDriver',params:{titleName:'编辑司机',driverInfo:list}})
    },
    // 绑定车辆
    bindData(id) {
      console.log(id)
      this.carParam.pageSize = id.pageSize?id.pageSize:10
      this.carParam.pageIndex = id.pageIndex?id.pageIndex:1
      $ajax.getCarBaseInfoPage(this.carParam, res => {
        console.log(res);
        this.carList = res.data
        this.modalAttribute.carTotal = res.total
        this.modalAttribute.driverId = id.driverId?id.driverId:id
        this.modalAttribute.showModal = true
      });
    },
    // 删除司机
    deleteDriver(id){
      let obj = {}
      obj.yesFun = ()=>{
        $ajax.deleteDriverInfo(id,res=>{
          $app.toast(res.msg,true,()=>{
            this.getDriverList(this.param)
          })
        })
      }
      $app.confirm("确定要删除该司机吗","温馨提示",obj)
    },
    // 搜索
    searchData() {
      let obj = {};
      obj.status = this.value1;
      obj.workStatus = this.value2;
      obj.key = this.value3;
      $ajax.queryPageDriverList(obj, res => {
        console.log(res);
        this.tableData = res.data;
        this.total = res.total;
      });
    },
    // 重置
    resetData() {
      this.value1 = null;
      this.value2 = null;
      this.value3 = "";
    },
    ok() {
      this.$Message.info("Clicked ok");
    },
    cancel() {
      this.$Message.info("Clicked cancel");
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
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getDriverList(this.param);
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
@import url("../../../css/companyManage/user.less");
.table table{
  width: 100% !important;
}
.operation {
  line-height: 65px;
  // padding-left: 20px;
  box-sizing: border-box;
}
.nav {
  height: 40px;
  line-height: 40px;
}
</style>
<style>
.ivu-menu {
  z-index: 10;
}
</style>