<!--  -->
<template>
  <div class="container car">
    <topTitle :titleName="'车辆管理'" :iconName="'ios-car'"></topTitle>
    <div class="content">
      <div class="search_content">
        <div class="left">
          <div class="search_type">
              <Select v-model="param.seats"  placeholder="车辆座次" style="width:120px">
                <Option :value="2">2</Option>
                <Option :value="3">3</Option>
                <Option :value="4">4</Option>
                <Option :value="5">5</Option>
                <Option :value="6">6</Option>
                <Option :value="7">7</Option>
                <Option :value="8">8</Option>
                <Option :value="9">9</Option>
              </Select>
          </div>
          <div class="search_type">
              <Select v-model="param.ownType" placeholder="拥有类型" style="width:120px">
                <Option :value="1">自有车辆</Option>
                <Option :value="2">外部车辆</Option>
              </Select>
            </div>
            <div class="search_type">
              <Select v-model="param.boundDriver" placeholder="绑定司机" style="width:120px">
                <Option :value="1">自有车辆</Option>
                <Option :value="2">外部车辆</Option>
              </Select>
            </div>
            <div class="search_type">
              <Select v-model="param.status" placeholder="状态" style="width:120px">
                <Option :value="1">空闲</Option>
                <Option :value="2">使用中</Option>
                <Option :value="3">维修</Option>
                <Option :value="4">证件不全</Option>
                <Option :value="5">停用</Option>
                <Option :value="6">报废</Option>
              </Select>
            </div>
            <div class="allButton">
              <Button type="primary" icon="md-add" class="search" @click="addCar">添加</Button>
            </div>
        </div>
        <div class="right">
          <div class="search_condition">
            <!-- <div class="search_type">
              <span class="describe">车辆别名 ：</span>
              <Input v-model="param.aliasName" placeholder="请输入车辆别名" style="width: 230px" />
            </div> -->
            <Input v-model="param.carName" placeholder="车辆别名/车辆名称/车辆标签" style="width: 300px;margin-right:15px" />
            <!-- <div class="search_type">
              <span class="describe">车辆标签 ：</span>
              <Input v-model="param.carTag" placeholder="请输入车辆标签" style="width: 230px" />
            </div> -->
            <Button type="primary" icon="ios-search" @click="searchData">搜索</Button>
            <Button icon="ios-trash" @click="resetData" style="margin-left:5px">重置</Button>
          </div>
        </div>
      </div>
      <Table border ref="selection" :height="$app.winHeight-330" :columns="tableTitle" :data="tableData" class="table">
        <template slot-scope="{ row, index }" slot="action">
          <div
            class="update"
            style="display:inline-block;cursor: pointer;"
            @click="detailData(row.id)"
          >
            <Icon type="ios-eye" color="#409EFF" />
            <span style="color:#409EFF">查看</span>
          </div>
          <div
            class="update"
            style="display:inline-block;cursor: pointer;margin-left:10px;"
            @click="updateData(row.id)"
          >
            <Icon type="md-color-filter" color="#409EFF" />
            <span style="color:#409EFF">编辑</span>
          </div>
          <div
            class="delete"
            style="margin-left:10px;display:inline-block;cursor: pointer;"
           @click="deleteData(row.id)"
          >
            <Icon type="ios-trash" color="#409EFF" />
            <span style="color:#409EFF">删除</span>
          </div>
          <!-- <Button type="primary" size="default" style="margin-right:10px" @click="detailData(row.id)">详情</Button>
          <Button type="primary" size="default" style="margin-right:10px" @click="updateData(row.id)">编辑</Button>
          <Button type="error" size="default" @click="deleteData(row.id)">删除</Button> -->
          <!-- <Button type="primary" size="default" @click="remove(index)">行程报表</Button> -->
        </template>
      </Table>
      <page :total="total" :switchPageIndex="switchPageIndex" :switchPageSize="switchPageSize"></page>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import topTitle from "@$@/components/universal/title";
import page from "@$@/components/Page/page"; //分页
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    topTitle,
    page
  },
  data() {
    //这里存放数据
    return {
      param:{
        pageIndex:1,
        pageSize:10,
        aliasName:"",
        carName:"",
        carTag:"",
        seats:"",
        platNo:"",
        status:"",
        ownType:"",
      },
      tableTitle: [
        {
          type: "index",
          width: 70,
          title: "序号",
          align: "center"
        },
        {
          title: "车辆编号",
          key: "carCode",
          // width:120,
          maxWidth:120,
        },
        {
          title: "车牌号",
          key: "plateNo",
          width:110
        },
        {
          title: "车辆名称",
          key: "carName",
          // width:120
          maxWidth:120,
        },
        {
          title: "车辆标签",
          key: "carTag",
          width:120
        },
        {
          title: "车辆类型",
          key: "ownType",
          width:100,
          render:(h,params) => {
            let text = params.row.ownType == 1?'自有车辆':'外包车辆'
            return h('span',text)
          }
        },
        {
          title: "车辆座次",
          key: "seats",
          width:100
        },
        {
          title: "车辆图片",
          key: "mainPic",
          render:(h,params) =>{
            return h('div',{
              attrs:{
                style:'width:100px;height:60px;'
              },
            },[
              h('img',{
                props:{
                  type:'primary',
                  size:'small'
                },
                attrs:{
                  src:params.row.mainPic,style:'width:100px;height:60px;'
                }
              })
            ])
          }
        },
        // {
        //   title: "车辆描述",
        //   key: "carSampleDesp",
        //   width:200,
        // },
        {
          title: "是否绑定司机",
          key: "boundDriver",
          width:100,
          render:(h,params) => {
            let text = params.row.ownType == true?'是':'否'
            return h('span',text)
          }
        },
        {
          title: "状态",
          key: "status",
          width: 100,
          render:(h,params) => {
            if(params.row.status == 1){
              // text = "空闲"
              return h('p',[
                h('span',{'style':{'color':'#30ce69','font-size':'25px','vertical-align':'middle'}},'●'),
                h('span',{'class':'db'},' 空闲')
              ])
              
            }else if(params.row.status == 2){
              return h('p',[
                h('span',{'style':{'color':'#fb9005','font-size':'25px','vertical-align':'middle'}},'●'),
                h('span',{'class':'db'},' 使用中')
              ])
            }else if(params.row.status == 3){
              return h('p',[
                h('span',{'style':{'color':'#3e9dff','font-size':'25px','vertical-align':'middle'}},'●'),
                h('span',{'class':'db'},' 维修中')
              ])
            }else if(params.row.status == 4){
              return h('p',[
                h('span',{'style':{'color':'#303fff','font-size':'25px','vertical-align':'middle'}},'●'),
                h('span',{'class':'db'},' 证件不全')
              ])
            }else if(params.row.status == 5){
              return h('p',[
                h('span',{'style':{'color':'#ff0000','font-size':'25px','vertical-align':'middle'}},'●'),
                h('span',{'class':'db'},' 停用')
              ])
            }else if(params.row.status == 6){
              return h('p',[
                h('span',{'style':{'color':' #666666','font-size':'25px','vertical-align':'middle'}},'●'),
                h('span',{'class':'db'},' 报废')
              ])
            }
            
          }
        },
        {
          title: "操作",
          slot: "action",
          align: "center",
        }
      ],
      tableData: [],
      total:null,

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
    // 获取车辆列表
    getCarList(param){
      $ajax.getCarBaseInfoPage(param,res=>{
        console.log(res)
        this.tableData = res.data
        this.total = res.total
      })
    },
    // 搜索数据
    searchData(){
      this.getCarList(this.param)
    },
    // 重置数据
    resetData(){
      this.param.aliasName = ""
      this.param.carName = ""
      this.param.carTag = ""
      this.param.seats = ""
      this.param.ownType = ""
      this.param.status = ""
      this.getCarList(this.param)
    },
    // 详情
    detailData(id) {
      window.console.log(id);
      this.$router.push({ path: "/carManageDetail",query:{id:id} });
    },
    // 编辑数据
    updateData(id){
      console.log(id)
      this.$router.push({ path: "/carManageAdd",query:{carId:id} });
    },
    // 删除车辆
    deleteData(id){
      let obj = {}
      obj.yesFun = ()=>{
        $ajax.deleteCar(id,res=>{
        $app.toast(res.msg,true,()=>{
          this.getCarList(this.param)
        })
      })
      }
      $app.confirm("确定要删除该司机吗?",'温馨提示',obj)
    },
    // 新增车辆
    addCar() {
      this.$router.push({ path: "/carManageAdd" });
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
    this.getCarList(this.param)
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
// @import url("../../css/diaodu.less");
// @import url("../../css/car.less");
@import url("../../../css/companyManage/user.less");
</style>
<style>
.car .ivu-modal-body {
  padding: 0 16px !important;
}
.ivu-menu {
  z-index: 10;
}
.table{
  width: 100% !important;
}
.ivu-select-placeholder{
  text-align: left;
}
.db{
  display: inline-block;
  vertical-align: middle;
  margin-top: 2px;
  margin-left: 2px;
}
</style>