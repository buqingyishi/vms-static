<!--  -->
<template>
  <div class="container">
    <topTitle :titleName="'评价管理'"></topTitle>
    <div class="content">
      <div class="search_content">
        <div class="left">
          <div class="search_condition">
            <div class="search_type">
              <span class="describe">状态 ：</span>
              <Select v-model="value1" style="width:200px">
                <Option :value="0">未通过</Option>
                <Option :value="1">已通过</Option>
              </Select>
            </div>
            <div class="search_type">
              <span class="describe">用户名 ：</span>
              <Input v-model="value2" placeholder="请输入用户名" style="width: 200px" />
            </div>
            <Button type="primary" class="search" icon="ios-search" @click="searchData">搜索</Button>
            <Button icon="ios-trash" @click="resetData" style="margin-left:5px">重置</Button>
          </div>
        </div>
        <div class="right">
          <ButtonGroup class="function">
            <Button icon="md-sync"></Button>
            <Button icon="ios-keypad"></Button>
          </ButtonGroup>
        </div>
      </div>
      <Table border :columns="tableTitle" :data="tableData" style="margin-top:20px">
        <template slot-scope="{ row, index }" slot="action">
          <Button
            type="primary"
            size="default"
            style="margin-right: 5px"
            @click="audit(row,index)"
          >审核</Button>
          <!-- <Button type="error" size="default" style="margin-right: 5px" @click="hint(index)">删除</Button> -->
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
      tableTitle: [
        {
          type: "index",
          width: 70,
          title: "序号",
          align: "center"
        },
        {
          title: "用户名",
          key: "userName"
        },
        {
          title: "评价内容",
          key: "content"
        },
        {
          title: "评价时间",
          key: "createTime"
        },
        {
          title: "评价用户",
          key: "realName"
        },
        {
          title: "主题类型",
          key: "topicType",
          render:(h,params) =>{
            let text = params.row.topicType == 1?'用户用车评价':''
            return h('span',text)
          }
        },
        {
          title: "状态",
          key: "status",
          render: (h, params) => {
            let text = params.row.status == 0 ? "未通过" : "已通过";
            return h(
              "span",
              {
                style: {
                  color: params.row.status == 0 ? "#F91111" : "#21b945"
                }
              },
              text
            );
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
      value: "",
      param: {
        pageIndex: 1,
        pageSize: 10,
        status: null,
        topicCode: "",
        userName: ""
      },
      value1:null,
      value2:"",
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    //   评价列表
    getEvaluateList(param) {
      $ajax.queryPageEvaluateList(param, res => {
        console.log(res);
        this.tableData = res.data;
        this.total = res.total;
      });
    },
    // 审核
    audit(row, index) {
      let obj = {};
      let param = {};
      param.auditContent = row.content;
      param.id = row.id;
      param.status = row.status;
      
      $app.confirm("确定要审核吗", "提示", obj);
      obj.yesFun = () => {
        $ajax.auditEvaluate(param, res => {
          console.log(res);
          $app.toast(res.msg, true);
          this.getEvaluateList();
        });
      };
    },
    // 搜索
    searchData(){
        this.param.userName = this.value2
        this.param.status = this.value1
        $ajax.queryPageEvaluateList(this.param,res=>{
            console.log(res)
            this.tableData = res.data;
            this.total = res.total;
        })
    },
    // 清空搜索内容
    resetData(){
      this.value1 = null
      this.value2 = ""
      this.getEvaluateList()
    },
    // 分页页码
    switchPageIndex(index){
      console.log(index)
      this.param.pageIndex = index
      this.getEvaluateList(this.param)

    },
    // 分页条数
    switchPageSize(pageSize){
      console.log(pageSize)
      this.param.pageSize = pageSize
      this.getEvaluateList(this.param)
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getEvaluateList(this.param);
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
@import url("../../css/companyManage/evaluateManage.less");
</style>