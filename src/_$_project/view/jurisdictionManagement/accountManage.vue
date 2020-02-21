<!--  -->
<template>
  <div class="container">
    <topTitle :titleName="'账户管理'"></topTitle>
    <div class="content">
      <div class="search_content">
        <div class="left">
          <Button type="primary" icon="md-add" class="button" @click="addData">添加</Button>
        </div>
        <div class="right">
          <div class="search_condition">
            <div class="search_type">
              <span class="describe">姓名 ：</span>
              <Input v-model="value1" placeholder="请输入真实姓名" style="width: 200px" />
            </div>
            <div class="search_type">
              <span class="describe">用户名 ：</span>
              <Input v-model="value2" placeholder="请输入真实姓名" style="width: 200px" />
            </div>
            <div class="search_type">
              <span class="describe">职位 ：</span>
              <Input v-model="value3" placeholder="请输入职位" style="width: 200px" />
            </div>
            <Button type="primary" class="search" icon="ios-search" @click="searchData">搜索</Button>
            <Button icon="ios-trash" @click="resetData" style="margin-left:5px">清空</Button>
          </div>
          <!-- <ButtonGroup class="function">
            <Button icon="md-sync"></Button>
            <Button icon="ios-keypad"></Button>
          </ButtonGroup> -->
        </div>
      </div>
      <Table border :columns="tableTitle" :height="$app.winHeight-290" :data="tableData" style="margin-top:20px">
        <template slot-scope="{ row, index }" slot="action">
          <div
            class="update"
            style="display:inline-block;cursor: pointer;"
            @click="lookData(row,index)"
          >
            <Icon type="ios-eye" color="#409EFF" />
            <span style="color:#409EFF">查看</span>
          </div>
          <div
            class="update"
            style="display:inline-block;cursor: pointer;margin-left:10px;"
            @click="updateData(row,index)"
          >
            <Icon type="md-color-filter" color="#409EFF" />
            <span style="color:#409EFF">编辑</span>
          </div>
          <div
            class="delete"
            style="margin-left:10px;display:inline-block;cursor: pointer;"
            @click="deleteData(row,index)"
          >
            <Icon type="ios-trash" color="#409EFF" />
            <span style="color:#409EFF">删除</span>
          </div>
        </template>
      </Table>
      <page :total="total" :switchPageIndex="switchPageIndex" :switchPageSize="switchPageSize"></page>
      <modal :lookAttribute="modalAttribute" :list="rowList" @fatherMethod="getAccountList"></modal>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import topTitle from "@$@/components/universal/title";
import page from "@$@/components/Page/page"; //分页
import modal from "@$@/components/Management/account/accountModal";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    topTitle,
    page,
    modal
  },
  data() {
    //这里存放数据
    return {
      param: {
        pageIndex: 1,
        pageSize: 10,
        companyId: null,
        departId: null,
        enabled: null,
        position: "",
        queryChildren: "",
        realName: "",
        userName: ""
      },

      // 搜索
      value1:"",
      value2:"",
      value3:"",

      // 表格
      tableTitle: [
        {
          type: "index",
          width: 70,
          title: "序号",
          align: "center"
        },
        {
          title: "用户名",
          key: "userName",
          width:130
        },
        {
          title: "姓名",
          key: "realName",
          width:100
        },
        {
          title: "职位",
          key: "position",
          width:120,
        },
        {
          title: "邮箱",
          key: "email"
        },
        {
          title: "电话",
          key: "tel",
          width:150
        },
        {
          title: "地址",
          key: "address"
        },
        {
          title: "创建时间",
          key: "createTime"
        },
        {
          title: "备注",
          key: "remark"
        },
        {
          title: "状态",
          key: "enabled",
          width:100,
          render: (h, params) => {
            return h("i-switch", {
              props: {
                value: params.row.enabled == 1 ? true : false,
                size:"large"
              },
              scopedSlots:{
                open:() => {return h('span','开启')},
                close:() => {return h('span','关闭')},
              },
              on: {
                //操作事件
                input: function(event) {
                  //这里会起到监听的作用
                  if (event) {
                    params.row.enabled = true;
                  } else {
                    params.row.enabled = false;
                  }
                },
                "on-change": () => {
                  //值发生了改变调用方法
                  // this.functionFun(); // 方法自定义
                  let id = params.row.id;
                  console.log(params.row.enabled)
                  if(params.row.enabled == true){
                      $ajax.enableAdministrator(id,res=>{
                          console.log(res)
                          this.getAccountList()
                      })
                  }else{
                      $ajax.disableAdministrator(id,res=>{
                          console.log(res)
                          this.getAccountList()
                      })
                  }
                }
              }
            });
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

      // 模态框参数
      modalAttribute:{
        showModal:false,
        disabled:false,
        title:""
      },
      rowList:{}
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 获取账户列表
    getAccountList() {
      $ajax.accountList(this.param, res => {
        console.log(res);
        this.tableData = res.data;
        this.total = res.total;
      });
    },
    // 添加数据
    addData() {
        this.modalAttribute.showModal = true;
        this.modalAttribute.title = "增加";
        this.modalAttribute.disabled = false;
    },
    // 搜索数据
    searchData(){
        let obj = {};
        obj.realName = this.value1;
        obj.userName = this.value2;
        obj.position = this.value3;
        $ajax.accountList(obj, res => {
          console.log(res);
          this.tableData = res.data;
          this.total = res.total;
        });
    },
    // 清空数据
    resetData(){
      this.value1 = ""
      this.value2 = ""
      this.value3 = ""
    },
    // 查看数据
    lookData(row){
        this.rowList = row
        this.modalAttribute.showModal = true;
        this.modalAttribute.title = "查看";
        this.modalAttribute.disabled = true;
    },
    // 编辑数据
    updateData(row){
        this.rowList = JSON.parse(JSON.stringify(row)) //解决修改数据的时候,表格也跟着变化的问题
        this.modalAttribute.showModal = true;
        this.modalAttribute.title = "编辑";
        this.modalAttribute.disabled = false;
    },
    // 删除数据
    deleteData(row){
      let obj = {}
      obj.yesFun = () => {
        $ajax.deleteAdministrator(row.id,res=>{
          console.log(res)
          $app.toast(res.msg,true,() => {
            this.getAccountList(this.param)
          })
        })
      }
      $app.confirm("确定要删除吗","提示",obj)
    },
    // 分页页码
    switchPageIndex(index){
      console.log(index)
      this.param.pageIndex = index
      this.getAccountList(this.param)

    },
    // 分页条数
    switchPageSize(pageSize){
      console.log(pageSize)
      this.param.pageSize = pageSize
      this.getAccountList(this.param)
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getAccountList();
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
</style>