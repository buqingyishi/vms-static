<!--  -->
<template>
  <div class="modal">
    <Modal v-model="lookAttribute.showModal" width="800" :title="lookAttribute.title" @on-cancel="closeModal('list')">
      <Form
        ref="list"
        :model="list"
        :rules="ruleValidate"
        :disabled="lookAttribute.disabled"
        :label-width="80"
      >
        <FormItem label="用户名" prop="userName">
          <Input v-model="list.userName" placeholder="请输入用户名"></Input>
        </FormItem>
        <!-- <FormItem label="密码" prop="password">
          <Input type="password" v-model="list.password" placeholder="请输入密码"></Input>
        </FormItem>-->
        <FormItem label="所属部门" prop="departName">
          <Input
            v-model="list.departName"
            search
            enter-button="选择"
            placeholder="请选择部门"
            @on-search="selectDepartment"
          />
          <Modal v-model="modal" title="部门" @on-ok="ok" @on-cancel="closeTreeModal">
            <tree :treeData="treeData" :allSelect="true" :selectData="selectData"></tree>
          </Modal>
        </FormItem>
        <!-- <FormItem label="用户类型" prop="userType">
          <Select v-model="list.userType" placeholder="请选择角色">
            <Option value="1">普通用户</Option>
            <Option value="2">企业客户</Option>
          </Select>
        </FormItem> -->
        <FormItem label="手机号" prop="tel">
          <Input v-model="list.tel" placeholder="请输入手机号"></Input>
        </FormItem>
        <FormItem label="员工编号" prop="userCode">
          <Input v-model="list.userCode" placeholder="请输入员工编号" maxlength="20"></Input>
        </FormItem>
        <!-- <FormItem label="角色描述" prop="desc">
          <Input
            v-model="list.desc"
            type="textarea"
            :autosize="{minRows: 2,maxRows: 5}"
            placeholder="请输入角色描述"
          ></Input>
        </FormItem> -->
        <FormItem label="年龄" prop="age">
          <Input v-model="list.age" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入年龄"></Input>
        </FormItem>
        <FormItem label="昵称" prop="nickName">
          <Input v-model="list.nickName" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入昵称"></Input>
        </FormItem>
        <FormItem label="真实姓名" prop="realName">
          <Input v-model="list.realName" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入真实姓名"></Input>
        </FormItem>
        <FormItem label="性别" prop="sex">
          <Select v-model="list.sex" placeholder="请选择性别">
            <Option value="0">女</Option>
            <Option value="1">男</Option>
          </Select>
        </FormItem>
      </Form>
      <p slot="footer">
        <Button type="primary" v-show="lookAttribute.title != '查看'" @click="save('list')">保存</Button>
        <Button @click="clear('list')" v-show="lookAttribute.title != '查看'" style="margin-left: 8px">清空</Button>
        <Button @click="goback" v-show="lookAttribute.title == '查看'" style="margin-left: 8px">返回</Button>
      </p>
    </Modal>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import dispose from "@$@/js/app/disposeTreeData"; //处理树形数据
import tree from "@$@/components/Tree/Tree"; //树形控件
import findChildren from "@$@/js/app/findChildren"; //解决多层部门的问题选中之前选中的,再次打开的时候默认选上
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    tree
  },
  props: {
    lookAttribute: {
      type: Object,
      default() {
        return {
          showModal: false,
          title: "",
          disabled: false
        };
      }
    },
    list: {
      type: Object,
      default() {
        return {
          userName: "",
          password: "",
          departName: "",
          tel: "",
          userType: null,
          status: "stop",
          id: null,
          userCode: null,
          phoneNumber: null,
          sex: null,
          age: null,
          nickName: "",
          realName: ""
        };
      }
    }
  },
  data() {
    //这里存放数据
    return {
      // 表单验证
      ruleValidate: {
        userName: [
          {
            required: true,
            message: "用户名不能为空",
            // trigger: "string"
          }
        ],
        realName: [
          {
            required: true,
            message: "真实姓名不能为空",
            // trigger: "string"
          }
        ],
        departName: [
          {
            required: true,
            message: "部门不能为空",
            trigger: "click"
          }
        ],
        tel: [
          {
            required: true,
            message: "手机号码不能为空",
            trigger: "blur"
          }
        ],
        userCode: [
          {
            required: true,
            message: "员工编号不能为空",
            trigger: "blur"
          }
        ],
        desc: [
          {
            required: true,
            message: "角色描述不能为空",
            trigger: "blur"
          }
        ],
        userType: [
          {
            required: true,
            message: "角色不能为空",
            trigger: "string"
          }
        ]
      },
      treeData: [],
      departName:"",
      modal: false,
      departmentId: null,
      param: {
        userName: "",
        password: "",
        departName: "",
        departId:null,
        tel: "",
        // userType: "",
        status: "stop",
        id: null,
        userCode: null,
        phoneNumber: null,
        sex: null,
        age: null,
        nickName: "",
        realName: ""
      }
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    save(name) {
      console.log(this.list);
      this.$refs[name].validate(valid => {
        if (valid) {
          Object.keys(this.param).forEach(key => {
            this.param[key] = this.list[key];
          });
          this.param.departId = this.departmentId
          console.log(this.param.departId)
          // 编辑
          if (this.list.id) {
            $ajax.updateUserInfo(this.param, res => {
              console.log(res);
              $app.toast(res.msg, true, () => {
                this.lookAttribute.showModal = false;
                this.departmentId = null
                this.$emit('fatherMethod');
              });
            });
          } else {
            // this.param.userType = this.param.userType == "1" ? 1 : 2;
            this.param.sex = this.param.sex == "1" ? 1 : 0;
            this.param.departId = this.departmentId;
            // 新增
            $ajax.addUserInfo(this.param, res => {
              console.log(res);
              $app.toast(res.msg, true, () => {
                this.lookAttribute.showModal = false;
                this.departmentId = null
                this.$emit('fatherMethod');
              });
            });
          }
        }
      });
    },
    clear(name) {
      this.$refs[name].resetFields();
    },
    closeModal(name) {
      this.$refs[name].resetFields();
    },
    // 获取部门
    selectDepartment() {
      this.modal = true;
      if(this.list.departId){
        this.departmentId = this.list.departId
      }
      $ajax.getDepartments({}, resData => {
        let data = dispose.disposeTreeData(resData.data);
        if(this.departmentId){
          //树形结构展示的时候要显示当前的部门
          findChildren(data,this.departmentId)
        }
        this.treeData = data;
      });
    },
    // 选中树节点
    selectData(data, list) {
      //   设置成单选
      for (let index = 0; index < data.length; index++) {
        if (list.title == data[index].title) {
          data[index].checked = true;
        } else {
          data[index].checked = false;
        }
      }
      this.departName = list.title
      this.departmentId = list.id;
    },
    ok() {
      this.treeData = []
      this.list.departName = this.departName
    },
    goback(){
      this.lookAttribute.showModal = false
    },
    closeTreeModal() {
      this.modal = false
      this.treeData = []//解决第一次选中的部门,再关闭模态框,再次打开选择部门的时候会某人先选择上次选中的部门再跳回去默认选择的
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
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
</style>