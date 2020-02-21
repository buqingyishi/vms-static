<template>
  <div class="xxtt">
    <Modal v-model="lookAttribute.showModal" width="800" @on-cancel="closeModal('list')" :title="lookAttribute.title">
      <Tabs
        value="name1"
        :animated="false"
        @on-click="tabsChange"
        v-show="lookAttribute.title == '增加'"
      >
        <TabPane label="基础信息" name="name1">
          <Form
            ref="list"
            :model="list"
            :rules="ruleValidate"
            :label-width="80"
            style="margin-top:20px"
          >
            <FormItem label="企业名称" prop="companyName">
              <Input v-model="list.companyName" :placeholder="list.companyName"></Input>
            </FormItem>
            <FormItem label="企业编号" prop="companyCode">
              <Input v-model="list.companyCode" :placeholder="list.companyCode"></Input>
            </FormItem>
            <FormItem label="企业地址" prop="address">
              <Input v-model="list.address" :placeholder="list.address"></Input>
            </FormItem>
            <FormItem label="企业邮箱" prop="email">
              <Input v-model="list.email" :placeholder="list.email"></Input>
            </FormItem>
            <FormItem label="邮箱密码" prop="emailPwd">
              <Input type="password" v-model="list.emailPwd" :placeholder="list.emailPwd"></Input>
            </FormItem>
            <FormItem label="标题" prop="title">
              <Input v-model="list.title" :placeholder="list.title"></Input>
            </FormItem>
            <FormItem label="手机号码" prop="serviceTel">
              <Input v-model="list.serviceTel" :placeholder="list.serviceTel"></Input>
            </FormItem>
            <!-- <FormItem label="创建人" prop="createUserName">
              <Input v-model="list.createUserName" :placeholder="list.createUserName"></Input>
            </FormItem>
            <FormItem label="创建时间" prop="createTime">
              <Input v-model="list.createTime" :placeholder="list.createTime"></Input>
            </FormItem>-->
            <FormItem label="备注" prop="remark">
              <Input v-model="list.remark" :placeholder="list.remark"></Input>
            </FormItem>
          </Form>
        </TabPane>
        <TabPane label="初始权限" name="name2">
          <tree :treeData="jurisdictionList" :allSelect="false" :selectData="selectData"></tree>
        </TabPane>
      </Tabs>
      <Form
        ref="listUpdate"
        :model="list"
        :disabled="lookAttribute.disabled"
        :rules="ruleValidate"
        :label-width="80"
        v-show="lookAttribute.title == '编辑' || lookAttribute.title == '查看'"
      >
        <FormItem label="企业名称" prop="companyName">
          <Input class="gw" v-model="list.companyName" :placeholder="list.companyName"></Input>
        </FormItem>
        <FormItem label="企业编号" prop="companyCode">
          <Input class="gw" v-model="list.companyCode" :placeholder="list.companyCode"></Input>
        </FormItem>
        <FormItem label="企业地址" prop="address">
          <Input class="gw" v-model="list.address" :placeholder="list.address"></Input>
        </FormItem>
        <FormItem label="企业邮箱" prop="email">
          <Input class="gw" v-model="list.email" :placeholder="list.email"></Input>
        </FormItem>
        <FormItem label="邮箱密码" prop="emailPwd">
          <Input class="gw" type="password" v-model="list.emailPwd" :placeholder="list.emailPwd"></Input>
        </FormItem>
        <FormItem label="标题" prop="title">
          <Input class="gw" v-model="list.title" :placeholder="list.title"></Input>
        </FormItem>
        <FormItem label="手机号码" prop="serviceTel">
          <Input class="gw" v-model="list.serviceTel" :placeholder="list.serviceTel"></Input>
        </FormItem>
        <FormItem label="创建人" prop="createUserName" v-show="lookAttribute.title == '查看'">
          <Input class="gw" v-model="list.createUserName" :placeholder="list.createUserName"></Input>
        </FormItem>
        <FormItem label="创建时间" prop="createTime" v-show="lookAttribute.title == '查看'">
          <Input class="gw" v-model="list.createTime" :placeholder="list.createTime"></Input>
        </FormItem>
        <FormItem label="备注" prop="remark">
          <Input class="gw" v-model="list.remark" :placeholder="list.remark"></Input>
        </FormItem>
      </Form>
      <p slot="footer">
        <Button type="primary" v-show="lookAttribute.title != '查看'" @click="save('listUpdate')">保存</Button>
        <Button @click="clear('listUpdate')" v-show="lookAttribute.title != '查看'" style="margin-left: 8px">清空</Button>
        <Button @click="cancel" v-show="lookAttribute.title == '查看'" style="margin-left: 8px">返回</Button>
      </p>
    </Modal>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import tree from "@$@/components/Tree/Tree"; //树形控件
import disposeTreeData from "@$@/js/app/disposeTreeData"; //处理树形数据
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
          disabled: false,
          title: ""
        };
      }
    },
    list: {
      type: Object,
      default() {
        return {
          companyName: "",
          companyCode: "",
          address: "",
          email: "",
          serviceTel: "",
          createUserName: "",
          createTime: "",
          remark: "",
          id: null,
          emailPwd: "",
          title: "",
          fundIds: []
        };
      }
    }
  },
  data() {
    //这里存放数据
    return {
      param: {
        companyName: "",
        companyCode: "",
        address: "",
        email: "",
        serviceTel: "",
        createUserName: "",
        createTime: "",
        remark: "",
        id: null,
        emailPwd: "",
        title: "",
        fundIds: []
      },
      // 模态框的显示隐藏
      modal: false,
      // 表单
      ruleValidate: {
        companyName: [
          {
            required: true,
            message: "企业名称不能为空",
            trigger: "blur"
          }
        ],
        title: [
          {
            required: true,
            message: "标题不能为空",
            trigger: "blur"
          }
        ]
      },

      // 树形数据
      jurisdictionList: [],
      funIds: []
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    //保存
    save(name) {
      console.log("121321321");
      this.$refs[name].validate(valid => {
        if (valid) {
          Object.keys(this.param).forEach(key => {
            this.param[key] = this.list[key];
          });
          if (this.list.id) {
            console.log("编辑");
            console.log(this.param);
            $ajax.modifyComanyInfo(this.param, res => {
              console.log(res);
              $app.toast(res.msg, true, () => {
                this.lookAttribute.showModal = false;
                this.$emit("fatherMethod");
              });
            });
          } else {
            console.log("添加");
            $ajax.addComanyInfo(this.param, res => {
              console.log(res);
              $app.toast(res.msg, true, () => {
                this.lookAttribute.showModal = false;
                this.$emit("fatherMethod");
              });
            });
          }
        }
      });
    },
    // 清空模态框的内容
    clear(name) {
      this.$refs[name].resetFields();
    },
    cancel(){
      this.lookAttribute.showModal = false
    },
    closeModal(name) {
      console.log("999999")
      console.log(name)
      this.$refs[name].resetFields();
    },
    // tabs栏切换
    tabsChange(name) {
      console.log(name);
      if (name == "name2") {
        $ajax.getAlljurisdiction("", res => {
          console.log(res);

          let data = disposeTreeData.disposeTreeData(res.data);
          console.log(data);
          this.jurisdictionList = data;
        });
      }
    },
    // 角色赋值权限
    selectData(data, index) {
      console.log(index);
      console.log(data);
      let arr = [];
      for (let i = 0; i < data.length; i++) {
        arr.push(data[i].id);
      }
      this.list.fundIds = arr;
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

<style>
.gw .ivu-input[disabled] {
  color: #333 !important;
  background-color: transparent !important;
  border-color: #eee;
}
</style>