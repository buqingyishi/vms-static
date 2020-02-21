<!--  -->
<template>
  <div class="container roleManage">
    <topTitle :titleName="'角色管理'" :iconName="'ios-podium-outline'"></topTitle>
    <div class="content">
      <div class="search_content">
        <div class="left">
          <Button type="primary" icon="md-add" class="button" @click="addList">新增</Button>
        </div>
        <div class="right">
          <div class="search_condition">
            <div class="search_type">
              <span class="describe">角色名称 ：</span>
              <Input v-model="value1" placeholder="请输入角色名称" style="width: 200px" />
            </div>
            <div class="search_type">
              <span class="describe">角色类型 ：</span>
              <Select v-model="value2" style="width:200px">
                <Option
                  v-for="item in roleTypeList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
            </div>
            <Button type="primary" class="search" icon="ios-search" @click="searchData">搜索</Button>
            <Button icon="ios-trash" @click="resetData" style="margin-left:5px">清空</Button>
          </div>
        </div>
      </div>
      <Table
        border
        ref="selection"
        :columns="tableTitle"
        @on-select="selectRowData"
        :data="tableData"
        style="margin-top:20px"
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
            style="margin-left:10px;display:inline-block;cursor: pointer;"
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
      <page :total="total" :switchPageIndex="switchPageIndex" :switchPageSize="switchPageSize"></page>
      <modal :lookAttribute="lookInfo" @func="getData" :list="rowList" @fatherMethod="roleList"></modal>
    </div>
    <Modal v-model="modal1" title="角色权限配置" @on-ok="ok" @on-cancel="cancel">
      <tree :treeData="jurisdictionList" :allSelect="false" :selectData="selectData"></tree>
    </Modal>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import topTitle from "@$@/components/universal/title"; //头部
import tree from "@$@/components/Tree/Tree"; //树形控件
import page from "@$@/components/Page/page"; //分页
import modal from "@$@/components/Management/role/roleModal"; //分页
import disposeTreeData from "@$@/js/app/disposeTreeData"; //处理树形数据
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    topTitle,
    tree,
    page,
    modal
  },
  data() {
    //这里存放数据
    return {
      // 表格列表参数
      param: {
        pageIndex: 1,
        pageSize: 10,
        rolesName: "",
        roleType: "",
        companyId: null
      },

      // 搜索条件
      value1: "",
      value2: "",
      roleTypeList: [
        {
          value: 1,
          label: "平台角色"
        },
        {
          value: 2,
          label: "公司角色"
        }
      ],

      // 表格
      total: null,
      tableTitle: [
        {
          title: "角色名称",
          key: "roleName",
          width: 130
        },
        {
          title: "角色类型",
          key: "roleType",
          width: 130,
          render: (h, params) => {
            let text = params.row.roleType == 1 ? "平台角色" : "公司角色";
            return h("span", text);
          }
        },
        {
          title: "角色描述",
          key: "desp"
        },
        {
          title: "所属公司",
          key: "company"
        },
        {
          title: "创建人",
          key: "createUserName",
          width: 120
        },
        {
          title: "创建时间",
          key: "createTime"
        },
        {
          title: "备注",
          key: "remark",
          width: 120
        },
        {
          title: "操作",
          slot: "action",
          align: "center"
        }
      ],
      tableData: [],

      // 角色赋值权限
      roleId: null,
      funIds: [],

      // 模态框的显示隐藏
      lookInfo: {
        showModal: false,
        disabled: false,
        title: ""
      },
      rowList: {}, //查看的数据

      rootListId: [],
      // 权限设置
      modal1: false,
      jurisdictionList: []
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 角色列表
    roleList(param) {
      $ajax.queyrRolesList(param, res => {
        console.log(res);
        this.tableData = res.data;
        this.total = res.data.length;
      });
    },
    // 查看数据
    lookData(row) {
      console.log(row);

      let roleId = row.id;
      $ajax.queryRoleInfo(roleId, res => {
        let list = res.data;
        this.rowList = list;
        this.lookInfo.showModal = true;
        this.lookInfo.disabled = true;
        this.lookInfo.title = "查看";
      });
    },
    // 新增数据
    addList() {
      this.lookInfo.showModal = true;
      this.lookInfo.disabled = false;
      this.lookInfo.title = "新增";
      this.rowList = {};
    },
    // 删除数据
    deleteData(row) {
      console.log(row);
      let roleId = row.id;
      $ajax.deleteRoleInfo(roleId, res => {
        console.log(res);
        $app.toast(res.msg, true, () => {
          this.roleList(this.param);
        });
      });
    },
    // 编辑数据
    updateData(row) {
      console.log(row);
      this.lookInfo.showModal = true;
      this.lookInfo.disabled = false;
      this.lookInfo.title = "编辑";
      this.rowList = JSON.parse(JSON.stringify(row)); //解决修改数据的时候,表格也跟着变化的问题
    },
    // 搜索数据
    searchData() {
      let obj = {};
      obj.rolesName = this.value1;
      obj.rolesType = this.value2;
      $ajax.queyrRolesList(obj, res => {
        console.log(res);
        this.tableData = res.data;
        this.total = res.total;
      });
    },
    // 清空搜索数据
    resetData() {
      this.value1 = "";
      this.value2 = "";
    },
    // 权限设置
    jurisdictionSet(row) {
      console.log(row);
      this.roleId = row.id;

      $ajax.queyrFunIdByRoleId(this.roleId, res => {
        console.log(res);

        let data = disposeTreeData.disposeTreeData(res.data);
        console.log("哈哈哈哈")
        console.log(data)
        this.modal1 = true;
        this.jurisdictionList = data;
      });
    },
    // 选择表格的某一行数据
    selectRowData(selection) {
      console.log(selection);
      this.roleId = selection[0].id;
      $ajax.queyrFunIdByRoleId(this.roleId, res => {
        console.log(res);
        this.rootListId = res.data;
      });
    },
    // 角色赋值权限
    selectData(data, index) {
      console.log(index);
      console.log(data);
      let arr = [];
      for (let i = 0; i < data.length; i++) {
        arr.push(data[i].id);
      }
      this.funIds = arr;
    },
    // 赋值权限保存
    ok() {
      if (this.funIds.length == 0) {
        $app.toast("请先选择", true);
      } else {
        let param = {};
        param.funIds = this.funIds;
        param.roleId = this.roleId;
        $ajax.functionForRole(param, res => {
          $app.toast(res.msg, true);
        });
      }
    },
    cancel() {},
    // 分页页码
    switchPageIndex(index){
      console.log(index)
      this.param.pageIndex = index
      this.roleList(this.param)

    },
    // 分页条数
    switchPageSize(pageSize){
      console.log(pageSize)
      this.param.pageSize = pageSize
      this.roleList(this.param)
    },

    // 接收子组件传过来的值(解决第一次点击之后再次点击无法弹出modal框的问题)
    getData(data) {
      this.lookInfo.showModal = data;
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.roleList(this.param);
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
@import url("../../css/jurisdictionManage/role.less");
.ivu-btn-primary {
  background-color: #1190fc;
}
</style>
<style>
/* 搜索框X的图标 */
.roleManage .ivu-input-icon {
  right: 83px !important;
}
</style>