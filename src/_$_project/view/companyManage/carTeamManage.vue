<!--  -->
<template>
  <div class="container">
    <topTitle :titleName="'车队管理'"></topTitle>
    <div class="content">
      <div class="search_content">
        <div class="left">
          <Button type="primary" icon="md-add" class="button" @click="addTeam">添加</Button>
        </div>
        <div class="right">
          <div class="search_condition">
            <div class="search_type">
              <Input v-model="value" placeholder="请输入企业名称" style="width: 200px" />
            </div>
            <Button type="primary" class="search" icon="ios-search" @click="searchTeam">搜索</Button>
          </div>
        </div>
      </div>
      <Table
        border
        :columns="tableTitle"
        :data="tableData"
        style="margin-top:20px"
        class="table"
      >
        <template slot-scope="{ row, index }" slot="action">
          <div
            class="update"
            style="display:inline-block;cursor: pointer;margin-left:10px;"
            @click="updateTeam(row,index)"
          >
            <Icon type="md-color-filter" color="#409EFF" />
            <span style="color:#409EFF">编辑</span>
          </div>
          <div
            class="delete"
            style="margin-left:10px;display:inline-block;cursor: pointer;"
            @click="deleteTeam(row.id)"
          >
            <Icon type="ios-trash" color="#409EFF" />
            <span style="color:#409EFF">删除</span>
          </div>
        </template>
      </Table>
      <page :total="total" :switchPageIndex="switchPageIndex" :switchPageSize="switchPageSize"></page>
      <carTeamModal :lookAttribute="modalAttribute" :list="rowList" @fatherMethod="getCarTeamList(param)"></carTeamModal>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import topTitle from "@$@/components/universal/title";
import page from "@$@/components/Page/page"; //分页
import carTeamModal from "@$@/components/Management/carTeam/carTeamModal"
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    topTitle,
    page,
    carTeamModal
  },
  data() {
    //这里存放数据
    return {
      param:{
        pageIndex:1,
        pageSize:10,
        companyId:null,
        carTeamName:"",
      },
      // 表格
      tableTitle: [
        {
          type: "index",
          width: 70,
          title: "序号",
          align: "center"
        },
        {
          title: "车队名称",
          key: "carTeamName",
          width: 130
        },
        {
          title: "车队负责人",
          key: "headName",
          width: 120
        },
        {
          title: "电话",
          key: "tel",
          width: 150
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
          title: "操作",
          slot: "action",
          align: "center"
        }
      ],
      tableData: [],
      total: null,

      // 模态框属性
      modalAttribute:{
        showModal:false,
        title:"",
        disabled:false,
      },
      rowList:{},

      // 搜索
      value:"",
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    getCarTeamList(param){
      $ajax.queryCarTeamList(param,res=>{
        console.log(res)
        this.tableData = res.data
        this.total = res.total
      })
    },
    // 添加车队
    addTeam(){
      this.modalAttribute.showModal = true;
      this.modalAttribute.title = "添加";
      this.modalAttribute.disabled = false;
    },
    // 编辑车队
    updateTeam(row){
      this.rowList = JSON.parse(JSON.stringify(row)) 
      this.modalAttribute.showModal = true;
      this.modalAttribute.title = "编辑";
      this.modalAttribute.disabled = false;
    },
    // 删除车队
    deleteTeam(id){
      let obj = {}
      obj.yesFun = ()=>{
        $ajax.deleteCarTeam(id,res=>{
          $app.toast(res.msg,true,()=>{
            this.getCarTeamList(this.param)
          })
        })
      }
      $app.confirm("确定要删除该车队吗","温馨提示",obj)
    },
    // 搜索车队
    searchTeam(){
      this.param.carTeamName = this.value
      $ajax.queryCarTeamList(this.param,res=>{
        console.log(res)
        this.tableData = res.data
        this.total = res.total
      })
    },
    // 分页页码
    switchPageIndex(index) {
      console.log(index);
      this.param.pageIndex = index;
      this.roleList(this.param);
    },
    // 分页条数
    switchPageSize(pageSize) {
      console.log(pageSize);
      this.param.pageSize = pageSize;
      this.roleList(this.param);
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getCarTeamList(this.param)
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