<!--  -->
<template>
  <div class="container userManage">
    <topTitle :titleName="'员工管理'" :iconName="'ios-podium-outline'"></topTitle>
    <div class="content">
      <div class="search_content">
        <div class="left">
          <Button type="primary" icon="md-add" class="button" @click="addData">添加</Button>
        </div>
        <div class="right">
          <div class="search_condition">
            <div class="search_type">
              <span class="describe">用户类型 ：</span>
              <Select v-model="value1" style="width:200px">
                <Option :value="1">普通用户</Option>
                <Option :value="2">企业客户</Option>
              </Select>
            </div>
            <div class="search_type">
              <span class="describe">状态 ：</span>
              <Select v-model="value2" style="width:200px">
                <Option :value="0">停用</Option>
                <Option :value="1">正常</Option>
              </Select>
            </div>
            <div class="search_type">
              <span class="describe">用户名 ：</span>
              <Input v-model="value3" placeholder="请输入用户名" style="width: 200px" />
            </div>
            <Button type="primary" class="search" icon="ios-search" @click="searchData">搜索</Button>
            <Button icon="ios-trash" @click="resetData" style="margin-left:5px">清空</Button>
          </div>
        </div>
      </div>
      <Table
        border
        :columns="userInfoTitle"
        :data="userInfoList"
        style="margin-top:20px"
        class="table"
      >
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
      <modal :lookAttribute="lookInfo" @change="getData" :list="rowList" @fatherMethod="getUserInfoList(param)"></modal>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import topTitle from "@$@/components/universal/title";
import page from "@$@/components/Page/page"; //分页
import modal from "@$@/components/Management/user/userModal"; //弹窗
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
        departId: null,
        realName: "",
        telNo: "",
        userCode: "",
        userName: ""
      },

      // 表格
      userInfoTitle: [
        {
          type: "index",
          width: 70,
          title: "序号",
          align: "center"
        },
        {
          title: "用户名",
          key: "userName",
        },
        {
          title: "用户类型",
          key: "userType",
          width: 130,
          filters: [
            {
              label: "普通用户",
              value: 1
            },
            {
              label: "企业客户",
              value: 2
            }
          ],
          filterMultiple: false,
          filterMethod(value, row) {
            if (value === 1) {
              return row.userType = 1;
            } else if (value === 2) {
              return row.userType = 2;
            }
          },
          render: (h, params) => {
            let text = params.row.userType == 1 ? "普通用户" : "企业客户";
            return h("span", text);
          }
        },
        {
          title: "员工编号",
          key: "userCode",
        },
        {
          title: "姓名",
          key: "realName",
          width: 120
        },
        {
          title: "性别",
          key: "sex",
          width: 80,
          render: (h, params) => {
            let text = params.row.sex == 1 ? "男" : "女";
            return h("span", text);
          }
        },
        {
          title: "所属部门",
          key: "departName",
          width: 150
        },
        {
          title: "手机号",
          key: "tel",
          width: 130
        },
        // {
        //   title: "创建时间",
        //   key: "createTime",
        //   width: 270
        // },
        {
          title: "状态",
          key: "status",
          width: 100,
          filters: [
            {
              label: "停用",
              value: 0
            },
            {
              label: "正常",
              value: 1
            }
          ],
          filterMultiple: false,
          filterMethod(value, row) {
            if (value === 0) {
              return row.status == 0;
            } else if (value === 1) {
              return row.status == 1;
            }
          },
          render: (h, params) => {
            return h("i-switch", {
              props: {
                value: params.row.status == 1 ? true : false,
                size:"large"
              },
              scopedSlots:{
                open:() => {return h('span','正常')},
                close:() => {return h('span','停用')},
              },
              on: {
                //操作事件
                input: function(event) {
                  //这里会起到监听的作用
                  if (event) {
                    params.row.status = true;
                  } else {
                    params.row.status = false;
                  }
                },
                "on-change": () => {
                  //值发生了改变调用方法
                  // this.functionFun(); // 方法自定义
                  let obj = {};
                  obj.status = params.row.status == true ? 1 : 0;
                  obj.userId = params.row.id;
                  $ajax.updateUserStatus(obj, res => {
                    console.log(res);
                    this.getUserInfoList(this.param)
                  });
                }
              }
            });
          }
        },
        {
          title: "操作",
          slot: "action",
          align: "center",
        }
      ],
      userInfoList: [],
      total: null,
      // 模态框的显示隐藏
      modal: false,
      
      lookInfo: {
        showModal: false,
        title: "",
        disabled: false
      },
      rowList: {},

      // 搜索
      value1:null,
      value2:null,
      value3:""
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 获取员工信息列表
    getUserInfoList(param) {
      $ajax.queryUserInfoList(param, res => {
        console.log(res);
        this.userInfoList = res.data;
        this.total = res.total;
      });
    },
    // 添加数据
    addData() {
      this.lookInfo.showModal = true;
      this.lookInfo.title = "新增";
      this.lookInfo.disabled = false;
      this.rowList = {};
    },
    // 查看数据
    lookData(row, index) {
      console.log(row);
      row.userType = row.userType == 1?'1':'2'
      this.rowList = row;
      this.lookInfo.showModal = true;
      this.lookInfo.title = "查看";
      this.lookInfo.disabled = true;
    },
    // 编辑数据
    updateData(row, index) {
      console.log(row);
      row.userType = row.userType == 1?'1':'2'
      row.sex = row.sex == 1?'1':'0'
      this.rowList = JSON.parse(JSON.stringify(row)); //解决修改数据的时候,表格也跟着变化的问题
      this.lookInfo.showModal = true;
      this.lookInfo.title = "编辑";
      this.lookInfo.disabled = false;
    },
    // 删除数据
    deleteData(row, index) {
      let obj = {}
      obj.yesFun = () =>{
        $ajax.deleteUserInfo(row.id, res => {
        $app.toast(res.msg, true, () => {
          this.getUserInfoList(this.param);
        });
      });
      }
      $app.confirm("确定要删除吗","提示",obj) 
    },
    // 搜索
    searchData() {
      let obj = {};
      obj.userName = this.value3;
      obj.status = this.value2
      obj.userType = this.value1
      $ajax.queryUserInfoList(obj, res => {
        console.log(res);
        this.userInfoList = res.data;
        this.total = res.total;
      });
    },
    // 重置
    resetData(){
      this.value1 = null
      this.value2 = null
      this.value3 = ""
      // this.getUserInfoList()
    },
    // 点击搜索的x按钮
    clearData() {
      this.getUserInfoList();
    },
    // 分页页码
    switchPageIndex(index){
      console.log(index)
      this.param.pageIndex = index
      this.getUserInfoList(this.param)

    },
    // 分页条数
    switchPageSize(pageSize){
      console.log(pageSize)
      this.param.pageSize = pageSize
      this.getUserInfoList(this.param)
    },
    // 接收子组件传过来的值(解决第一次点击之后再次点击无法弹出modal框的问题)
    getData(data) {
      console.log(data);
      this.lookInfo.showModal = data;
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getUserInfoList(this.param);
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
<style>
.userManage .ivu-input-icon {
  right: 60px !important;
}
.ivu-select {
  text-align: left;
}
</style>