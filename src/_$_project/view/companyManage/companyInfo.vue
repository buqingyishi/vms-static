<!--  -->
<template>
  <div class="container">
    <topTitle :titleName="'企业信息'" :iconName="'ios-podium-outline'"></topTitle>
    <div class="content">
      <div class="search_content">
        <div class="left">
          <Button type="primary" icon="md-add" class="button" @click="addData">添加</Button>
          
        </div>
        <div class="right">
          <Input
            v-model="value"
            placeholder="企业名称"
            style="width:200px;margin-left:30px;"
          ></Input>
          <Button type="primary" style="margin-left:20px;" icon="ios-search" @click="searchData">搜索</Button>
          <!-- <ButtonGroup class="function">
            <Button icon="md-sync"></Button>
            <Button icon="ios-keypad"></Button>
          </ButtonGroup> -->
        </div>
      </div>
      <Table border stripe :height="$app.winHeight-290" :columns="tableTitle" :data="tableData" style="margin-top:20px">
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
          <div
            class="delete"
            style="margin-left:10px;display:inline-block;cursor: pointer;"
            @click="jurisdictionSet(row,index)"
          >
            <Icon type="md-add" color="#409EFF" />
            <span style="color:#409EFF">权限</span>
          </div>
        </template>
      </Table>
      <page  :total="total" :switchPageIndex="switchPageIndex" :switchPageSize="switchPageSize"></page>
      <companyInfoModal :lookAttribute="modalAttribute" :list="rowList" @fatherMethod="comanyInfoList(param)"></companyInfoModal>
    </div>
    <Modal v-model="modal1" title="角色权限配置"  @on-ok="save" @on-cancel="cancel()">
      <tree :treeData="jurisdictionList" :allSelect="false" :selectData="selectData"></tree>
    </Modal>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import topTitle from "@$@/components/universal/title";
import page from "@$@/components/Page/page"; //分页
import tree from "@$@/components/Tree/Tree"; //树形控件
import companyInfoModal from "@$@/components/Management/company/companyInfoModal"
import disposeTreeData from "@$@/js/app/disposeTreeData"; //处理树形数据
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    topTitle,
    page,
    companyInfoModal,
    tree
  },
  data() {
    //这里存放数据
    return {
      param:{
        companyName:"",
        pageIndex:1,
        pageSize:10
      },

      // 表格数据
      tableTitle: [
        {
          type: "index",
          width: 70,
          title: "序号",
          align: "center"
        },
        {
          title: "企业名称",
          key: "companyName",
          resizable:true,
          width:150,
        },
        {
          title: "企业编号",
          key: "companyCode",
          resizable:true,
          width:200,
        },
        {
          title: "企业地址",
          resizable:true,
          key: "address"
        },
        {
          title: "企业邮箱",
          key: "email",
          resizable:true,
          width:180,
        },
        {
          title: "标题",
          key: "title",
          resizable:true,
        },
        {
          title: "创建时间",
          resizable:true,
          width:190,
          key: "createTime"
        },
        {
          title: "操作",
          resizable:true,
          slot: "action",
          align: "center"
        }
      ],
      tableData: [],
      total:null,
      
      // 搜索
      value:"",
      // 模态框属性
      modalAttribute:{
        showModal:false,
        disabled:false,
        title:""
      },
      rowList:{},

      // 权限设置
      modal1: false,
      jurisdictionList: [],

      // 角色赋值权限
      companyId: null,
      funIds: [],
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 企业信息列表
    comanyInfoList(param){
      $ajax.queryComanyInfoList(param,res=>{
        console.log(res)
        this.tableData = res.data
        this.total = res.total
      })
    },
    // 搜索数据
    searchData(){
      let obj = {}
      obj.companyName = this.value
      $ajax.queryComanyInfoList(obj,res=>{
        console.log(res)
        this.tableData = res.data
        this.total = res.total
      })
    },
    // 添加数据
    addData(){
      this.rowList = {}
      this.jurisdictionList = []
      this.modalAttribute.showModal = true;
      this.modalAttribute.title = "增加";
      this.modalAttribute.disabled = false;
    },
    // 查看数据
    lookData(row,index){
      console.log(row)
      this.rowList = row;
      this.modalAttribute.showModal = true;
      this.modalAttribute.title = "查看";
      this.modalAttribute.disabled = true;
    },
    // 编辑数据
    updateData(row){
      this.rowList = JSON.parse(JSON.stringify(row)); //解决修改数据的时候,表格也跟着变化的问题
      this.modalAttribute.showModal = true;
      this.modalAttribute.title = "编辑";
      this.modalAttribute.disabled = false;
    },
    // 删除数据
    deleteData(row){
      let obj = {}
      obj.yesFun = ()=>{
        $ajax.deleteComanyInfo(row.id,res=>{
        $app.toast(res.msg,true,()=>{
          this.comanyInfoList(this.param)
        })
      })
      }
      $app.confirm("确定要删除吗?","提示",obj)
    },
    // 权限设置
    jurisdictionSet(row) {
      console.log(row);

      this.companyId = row.id;

      $ajax.queryComanyInfo(this.companyId, res => {
        console.log(res);

        let data = disposeTreeData.disposeTreeData(res.data);
        console.log(data)
        this.modal1 = true;
        this.jurisdictionList = data;
      });
    },
    // 角色赋值权限
    selectData(data, obj) {
      console.log(obj);
      console.log(data);
      let arr = [];
      for (let i = 0; i < data.length; i++) {
        arr.push(data[i].id);
      }
      this.funIds = arr;
    },
    // 保存权限
    save(){
      if (this.funIds.length == 0) {
        $app.toast("请先选择", true);
      } else {
        let param = {};
        param.funIds = this.funIds;
        param.companyId = this.companyId;
        $ajax.functionForCompany(param, res => {
          $app.toast(res.msg, true);
        });
      }
    },
    cancel(){
      this.jurisdictionList = []
    },
    // 分页页码
    switchPageIndex(index){
      console.log(index)
      this.param.pageIndex = index
      this.comanyInfoList(this.param)

    },
    // 分页条数
    switchPageSize(pageSize){
      console.log(pageSize)
      this.param.pageSize = pageSize
      this.comanyInfoList(this.param)
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.comanyInfoList(this.param)
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