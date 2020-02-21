<!--  -->
<template>
  <div class="container">
    <topTitle :titleName="'部门管理'" :iconName="'ios-podium-outline'"></topTitle>
    <div class="content">
      <div class="function_button">
        <Button type="primary" class="button" @click="add">添加</Button>
        <Button type="primary" class="button" @click="update">编辑</Button>
        <Button type="error" class="button" @click="deleteData">删除</Button>
      </div>
      <div class="manageInfo">
        <div class="left">
          <tree :treeData="treeData" :allSelect="true" :clickData="clickData" :checkBox="false"></tree>
        </div>
        <div class="right">
          <!-- 为点击编辑显示的表单 -->
          <Form
            :model="param"
            :rules="ruleValidate"
            :label-width="80"
            :disabled="disabled"
            v-show="addjurisdiction == false"
          >
            <FormItem label="上级部门" prop="parentId">
              <Input v-model="param.parentId" placeholder="请输入上级部门" disabled></Input>
            </FormItem>
            <FormItem label="部门编号" prop="id" v-show="disabled == true">
              <Input v-model="param.id" placeholder="请输入部门id" disabled></Input>
            </FormItem>
            <FormItem label="部门名称" prop="departName">
              <Input v-model="param.departName" placeholder="请输入部门名称"></Input>
            </FormItem>
            <FormItem label="描述"  prop="departDesp">
              <Input
                v-model="param.departDesp"
                type="textarea"
                :autosize="{minRows: 2,maxRows: 5}"
                placeholder="请输入部门描述"
              ></Input>
            </FormItem>
            <FormItem v-show="disabled == false">
              <Button type="primary" @click="refreshData('param')">更新</Button>
              <Button @click="disabledInfo" style="margin-left: 8px">取消</Button>
            </FormItem>
          </Form>
          <!-- 点击添加显示的表单 -->
          <Form
            ref="param"
            :model="param"
            :rules="ruleValidate"
            :label-width="80"
            v-show="addjurisdiction == true"
          >
            <FormItem label="上级部门">
              <Input v-model="param.parentId" placeholder="请输入上级部门ID" disabled></Input>
            </FormItem>
            <!-- <FormItem label="节点ID" v-show="param.level != 0 && update == true" prop="id">
              <Input v-model="param.id" placeholder="请输入节点ID" disabled></Input>
            </FormItem>-->
            <FormItem label="部门编号" prop="departmentCode">
              <Input v-model="param.departCode" placeholder="请输入部门编号"></Input>
            </FormItem>
            <FormItem label="部门名称" prop="departName">
              <Input v-model="param.departName" placeholder="请输入部门名称"></Input>
            </FormItem>
            <FormItem label="部门描述" prop="departDesp">
              <Input
                v-model="param.departDesp"
                type="textarea"
                :autosize="{minRows: 2,maxRows: 5}"
                placeholder="请输入部门描述"
              ></Input>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="handleSubmit('param')" v-show="updateData == false">保存</Button>
              <Button type="primary" @click="refreshData('param')" v-show="updateData == true">更新</Button>
              <Button @click="handleReset('param')"style="margin-left: 8px">取消</Button>
            </FormItem>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import topTitle from "@$@/components/universal/title";
import tree from "@$@/components/Tree/Tree";
import dispose from "@$@/js/app/disposeTreeData";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    topTitle,
    tree
  },
  data() {
    //这里存放数据
    return {
      // 树形数据
      treeData: [],
      param: {
        departName: "",
        departDesp: "",
        departCode:"",
        parentId: "",
        id: "",
        sort: ""
      }, //参数
      disabled: true, //点击编辑的时候修改成false
      addjurisdiction: false, //false的时候就查看数据,true的时候就是添加数据

      // 规则
      ruleValidate: {
        id: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur"
          }
        ],
        departName: [
          {
            required: true,
            message: "部门名称不能为空",
            trigger: "blur"
          }
        ],
        parentId: [
          {
            required: true,
            message: "父级节点不能为空",
            trigger: "blur"
          }
        ],
        sort: [
          {
            required: true,
            message: "排序不能为空",
            trigger: "blur"
          }
        ],
        departDesp: [
          {
            required: true,
            message: "部门描述不能为空",
            trigger: "blur"
          }
        ]
      },
      // 查看树形控件点击的数据
      parentId: "0",
      updateData: false
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 获取所有权限
    getDepartmentsList() {
      $ajax.getDepartments({}, resData => {
        let data = dispose.disposeTreeData(resData.data);
        console.log(data)
        this.treeData = data;
      });
    },
    clickData(data){
      console.log(data)
      let list = data[0]
      this.nodeKey = list.nodeKey
      console.log(this.nodeKey)
      if(data.length != 0 && this.addjurisdiction == false && list.nodeKey != 0){
        // 赋值在placeholder上(查看数据)
        this.param.parentId = list.parentId ? list.parentId.toString() : "0";
        this.param.id = list.id ? list.id.toString() : "节点ID";
        this.param.departName = list.title;
        this.param.sort = list.sort ? list.sort.toString() : null;
        this.param.perssionCode = list.jurisdiction;
        this.param.departDesp = list.departDesp;
        console.log("来这里am")
        
        console.log(list.departDesp)
      }else if(data.length != 0 && this.addjurisdiction == true && list.nodeKey != 0){
        
        this.param.parentId = list.parentId ? list.parentId.toString() : "0";
        console.log("来这里哈哈")
      }
    },
    // 添加权限
    add() {
      this.param.departName = "";
      this.param.departDesp = "";

      this.addjurisdiction = true;//等于true就是添加
      this.updateData = false; //等于false就只添加
    },
    // 编辑权限
    update() {
      this.disabled = false;
      this.updateData = true; //等于true就修改数据
    },
    // 保存
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.param.parentId = this.param.id
          delete this.param.id
          // 添加部门
          $ajax.addDepartments(this.param, res => {
            $app.toast(res.msg, true, () => {
              this.$refs[name].resetFields();
              this.getDepartmentsList();
            });
          });
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    // 更新数据
    refreshData(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          let param = {};
          param.departDesp = this.param.departDesp;
          param.departName = this.param.departName;
          param.id = this.param.id;
          // 添加权限
          $ajax.updateDepartments(param, res => {
            console.log(res);
            $app.toast(res.msg, true, () => {
              this.getDepartmentsList();
            });
          });
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    // 删除数据
    deleteData() {
      if (this.param.id == "" || this.param.id == "节点ID") {
        $app.toast("请先选择",true);
      }if(this.nodeKey == 0){
        $app.toast("公司名称不能删除",false);
      } else {
        let obj = {};
        obj.yesFun = () => {
          $ajax.deleteDepartments(this.param.id, res => {
            $app.toast(res.msg, true, () => {
              this.getDepartmentsList();
              this.param.parentId = "请输入父级节点";
              this.param.departName = "请输入部门名称";
            });
          });
        };
        $app.confirm("确定要删除吗", "提示", obj);
      }
    },
    // 取消
    handleReset(name) {
      //   this.$refs[name].resetFields();
      this.addjurisdiction = false;
    },
    disabledInfo(){
        this.disabled = true
    }

  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    // 获取所有权限
    this.getDepartmentsList();
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
@import url("../../css/jurisdictionManage/menu.less");
</style>