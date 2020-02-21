<!--  -->
<template>
  <div class="container">
    <topTitle :titleName="'菜单管理'" :iconName="'ios-podium-outline'"></topTitle>
    <div class="content">
      <div class="function_button">
        <Button type="primary" class="button" @click="add">添加</Button>
        <Button type="primary" class="button" @click="update">编辑</Button>
        <Button type="error" class="button" @click="deleteData">删除</Button>
      </div>
      <div class="manageInfo">
        <div class="left">
          <Tree :data="treeData" @on-select-change="clickTree"></Tree>
        </div>
        <div class="right">
          <!-- 为点击添加显示的表单 -->
          <Form
            :model="param"
            :rules="ruleValidate"
            @on-select-change="clickTree"
            :label-width="80"
            :disabled="disabled"
            v-show="addjurisdiction == false"
          >
            <FormItem label="父级节点">
              <Input v-model="param.parentId" :placeholder="param.parentId" disabled></Input>
            </FormItem>
            <FormItem label="节点ID" v-show="level == 3 || level == 2 || level == 1" prop="id">
              <Input v-model="param.id" :placeholder="param.id" disabled></Input>
            </FormItem>
            <FormItem label="标题" prop="funcName">
              <Input v-model="param.funcName" :placeholder="param.funcName"></Input>
            </FormItem>
            <FormItem label="类型" prop="type">
              <RadioGroup v-model="param.type">
                <Radio label="menu">菜单</Radio>
                <Radio label="radio">按钮</Radio>
                <Radio label="port">接口</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="地址" v-show="level == 2 || level == 1">
              <Input v-model="param.path" :placeholder="param.path"></Input>
            </FormItem>
            <FormItem label="图标" v-show="level == 2 || level == 1">
              <Input v-model="param.icon" :placeholder="param.icon"></Input>
            </FormItem>
            <FormItem label="排序" v-show="level == 2 || level == 1">
              <Input v-model="param.sort" :placeholder="param.sort"></Input>
            </FormItem>
            <FormItem label="权限标识" v-show="level == 3">
              <Input v-model="param.perssionCode" :placeholder="param.perssionCode"></Input>
            </FormItem>
            <FormItem v-show="disabled == false">
              <Button type="primary" @click="refreshData('param')">更新</Button>
              <Button @click="handleReset('param')" style="margin-left: 8px">取消</Button>
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
            <FormItem label="父级节点">
              <Input v-model="param.parentId" :placeholder="parentId" disabled></Input>
            </FormItem>
            <FormItem label="节点ID" v-show="param.level != 0 && updateData == true" prop="id">
              <Input v-model="param.id" placeholder="请输入节点ID" disabled></Input>
            </FormItem>
            <FormItem label="标题" prop="funcName">
              <Input v-model="param.funcName" placeholder="请输入标题"></Input>
            </FormItem>
            <FormItem label="类型" prop="type">
              <RadioGroup v-model="param.type">
                <Radio label="menu">菜单</Radio>
                <Radio label="radio" v-show="updateData == false || param.level == 3">按钮</Radio>
                <Radio label="port" v-show="updateData == false || param.level == 3">接口</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem
              label="地址"
              v-show="(param.type == 'port' && updateData == false) || (param.level != 0 && updateData == true )"
            >
              <Input v-model="param.path" placeholder="请输入地址"></Input>
            </FormItem>
            <FormItem
              label="图标"
              v-show="(param.type == 'menu' && updateData == false) || (param.level != 0 && updateData == true )"
            >
              <Input v-model="param.icon" placeholder="请输入图标"></Input>
            </FormItem>
            <FormItem
              label="排序"
              v-show="(param.type == 'menu' && updateData == false) || (param.level != 0 && updateData == true )"
            >
              <Input v-model="param.sort" placeholder="请输入排序"></Input>
            </FormItem>
            <FormItem label="权限标识">
              <Input v-model="param.perssionCode" placeholder="请输入权限标识"></Input>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="handleSubmit('param')" v-show="updateData == false">保存</Button>
              <Button type="primary" @click="refreshData('param')" v-show="updateData == true">更新</Button>
              <Button @click="handleReset" style="margin-left: 8px">取消</Button>
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
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    topTitle
  },
  data() {
    //这里存放数据
    return {
      // 树形数据
      treeData: [],
      param: {
        funcName: "请输入标题",
        parentId: "请输入父级节点",
        path: "",
        perssionCode: "",
        type: "",
        desp: "",
        enabled: "",
        icon: "",
        enabled: "",
        id: "",
        level: null,
        sort: ""
      }, //参数
      level: 0, //层级
      addlevel: 0, //添加
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
        funcName: [
          {
            required: true,
            message: "标题不能为空",
            trigger: "blur"
          }
        ],
        type: [
          {
            required: true,
            message: "请选择类型",
            trigger: "change"
          }
        ]
      },
      // 查看树形控件点击的数据
      parentId: null,
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
    getAll() {
      $ajax.getAlljurisdiction("", resData => {
        console.log("12121313");
        console.log(resData);
        let data = this.disposeTreeData(resData.data);
        console.log(data);
        this.treeData = data;
      });
    },
    // 处理树形控件的数据
    disposeTreeData(tree = []) {
      let arr = [];
      if (!!tree && tree.length !== 0) {
        tree.forEach(item => {
          let obj = {};
          // 你所需要的参数
          obj.title = item.funcName;
          obj.parentId = item.parentId;
          obj.id = item.id; //ID
          obj.sort = item.sort; //排序
          obj.level = item.level; //层级
          obj.type = item.type; //类型
          obj.path = item.path; //路径
          obj.icon = item.icon; //图标
          obj.perssionCode = item.perssionCode; //权限标识

          obj.expand = true;
          obj.selected = false;
          obj.children = this.disposeTreeData(item.children); //递归调用
          arr.push(obj);
        });
      }
      return arr;
    },

    // 点击树节点触发
    clickTree(data) {
      console.log(data);
      // addjurisdiction == false 是点击树形控件查看数据    addjurisdiction == true 是添加数据
      if (data.length != 0 && this.addjurisdiction == false) {
        let list = data[0];
        // 赋值在placeholder上(查看数据)
        this.param.parentId = list.parentId.toString();
        this.param.level = list.level;
        this.param.id = list.id.toString();
        this.param.funcName = list.title;
        this.param.path = list.path;
        this.param.icon = list.icon;
        this.param.sort = list.sort.toString();
        this.param.type =
          list.type == 1 ? "menu" : list.type == 2 ? "radio" : "port";
        this.level = list.level;
        this.param.perssionCode = list.jurisdiction;
      } else if (data.length != 0 && this.addjurisdiction == true) {
        let list2 = data[0];
        this.updateData = true; //等于true就修改数据
        this.parentId = list2.parentId.toString();
        this.param.level = list2.level;

        this.param.parentId = list2.parentId.toString();
        this.param.level = list2.level;
        console.log(this.param.level);
        this.param.id = list2.id.toString();
        this.param.funcName = list2.title;
        this.param.path = list2.path;
        this.param.icon = list2.icon;
        this.param.sort = list2.sort.toString();
        this.param.type =
          list2.type == 1 ? "menu" : list2.type == 2 ? "radio" : "port";
        this.level = list2.level;
        this.param.perssionCode = list2.perssionCode;
      }
    },
    // 添加权限
    add() {
      console.log(this.level);
      this.param.type = "";
      this.param.funcName = "";
      this.param.sort = "";
      // this.param.level = null;
      this.addjurisdiction = true;
      this.level = this.addlevel;
      this.updateData = false; //等于false就只添加
    },
    // 编辑权限
    update() {
      this.disabled = false;
    },
    // 保存
    handleSubmit(name) {
      console.log(name);
      this.$refs[name].validate(valid => {
        if (valid) {
          // this.$Message.success("Success!");
          console.log(this.param.level);
          this.param.parentId = parseInt(this.parentId);
          this.param.sort = parseInt(this.param.sort);
          this.param.type =
            this.param.type == "menu" ? 1 : this.param.type == "radio" ? 2 : 3;
          console.log(this.param);

          // 添加权限
          $ajax.addJurisdiction(this.param, res => {
            console.log(res);
            $app.toast(res.msg, true, () => {
              this.getAll();
            });
          });
          console.log(this.param);
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    // 更新数据
    refreshData(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          // this.$Message.success("Success!");
          console.log(this.param.level);
          this.param.parentId = parseInt(this.parentId);
          this.param.sort = parseInt(this.param.sort);
          this.param.type =
            this.param.type == "menu" ? 1 : this.param.type == "radio" ? 2 : 3;
          console.log(this.param);

          // 添加权限
          $ajax.updateJurisdiction(this.param, res => {
            console.log(res);
            $app.toast(res.msg, true, () => {
              this.getAll();
            });
          });
          console.log(this.param);
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    // 删除数据
    deleteData() {
      console.log(this.param.id);
      if (this.param.id == "") {
        $app.toast("请先选择");
      } else {
        let obj = {};
        obj.yesFun = () => {
          $ajax.deleteJurisdiction(this.param.id, res => {
            console.log(res);
            $app.toast(res.msg, true, () => {
              this.getAll();
              this.level = 0
              this.param.parentId = "请选择父级ID"
              this.param.funcName = "请选择标题"
              this.param.type = ""
            });
          });
        };
        $app.confirm("确定要删除吗", "提示", obj);
      }
    },
    // 取消
    handleReset(name) {
      // this.$refs[name].resetFields();
      console.log(this.disabled)
      console.log(this.addjurisdiction)
      this.disabled = true
      this.addjurisdiction = false
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    // 获取所有权限
    this.getAll();
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