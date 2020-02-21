<template>
  <Modal v-model="lookAttribute.showModal" width="800" :title="lookAttribute.title" @on-cancel="closeModal('list')">
    <Form
      ref="list"
      :model="list"
      :disabled="lookAttribute.disabled"
      :rules="ruleValidate"
      :label-width="80"
    >
      <FormItem label="用户名" prop="userName">
        <Input v-model="list.userName" :placeholder="list.userName"></Input>
      </FormItem>
      <FormItem label="真实姓名" prop="realName">
        <Input v-model="list.realName" :placeholder="list.realName"></Input>
      </FormItem>
      <FormItem label="手机号码" prop="tel">
        <Input v-model="list.tel" :placeholder="list.tel"></Input>
      </FormItem>
      <FormItem label="职位" prop="position">
        <Input v-model="list.position" :placeholder="list.position"></Input>
      </FormItem>
      <FormItem label="邮箱" prop="email">
        <Input v-model="list.email" :placeholder="list.email"></Input>
      </FormItem>
      <!-- <FormItem label="电话" prop="tel">
        <Input type="number" v-model="list.tel" :placeholder="list.tel"></Input>
      </FormItem>-->
      <FormItem label="地址" prop="address">
        <Input v-model="list.address" :placeholder="list.address"></Input>
      </FormItem>
      <FormItem label="部门名称" prop="departName">
        <Input v-model="list.departName" :placeholder="list.departName"></Input>
      </FormItem>
      <!-- <FormItem label="创建人" prop="createUserName">
        <Input v-model="list.createUserName" :placeholder="list.createUserName"></Input>
      </FormItem> -->
      <FormItem label="描述" prop="desp">
        <Input v-model="list.desp" :placeholder="list.desp"></Input>
      </FormItem>
      <FormItem label="备注" prop="remark">
        <Input v-model="list.remark" :placeholder="list.remark"></Input>
      </FormItem>
    </Form>
    <p slot="footer">
      <Button @click="clear('list')" v-show="lookAttribute.title != '查看'" >清空</Button>
      <Button type="primary" v-show="lookAttribute.title != '查看'" style="margin-left: 8px" @click="save('list')">保存</Button>
      <Button @click="goback" v-show="lookAttribute.title == '查看'" style="margin-left: 8px">返回</Button>
    </p>
  </Modal>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
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
          userName: "",
          realName: "",
          position: "",
          email: "",
          tel: "",
          address: "",
          departName: "",
          createUserName: "",
          desp: "",
          remark: "",
          id: null
        };
      }
    }
  },
  data() {
    //这里存放数据
    return {
      param: {
        userName: "",
        realName: "",
        position: "",
        email: "",
        tel: "",
        address: "",
        departName: "",
        createUserName: "",
        desp: "",
        remark: "",
        id: null
      },
      // 模态框的显示隐藏
      modal: false,
      // 表单
      ruleValidate: {
        userName: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur"
          }
        ],
        realName: [
          {
            required: true,
            message: "真实姓名不能为空",
            trigger: "blur"
          }
        ],
        tel: [
          {
            required: true,
            message: "手机号不能为空",
            trigger: "blur"
          }
        ],
      }
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 保存
    save(name) {
      this.$refs[name].validate(valid => {
        console.log(valid);
        if (valid) {
          Object.keys(this.param).forEach(key => {
            this.param[key] = this.list[key];
          });
          if (this.list.id) {
            console.log("编辑");
            console.log(this.param);
            $ajax.updateAdministrator(this.param, res => {
              console.log(res);
              this.lookAttribute.showModal = false;
              $app.toast(res.msg, true, () => {
                this.$emit('fatherMethod');
              });
            });
          } else {
            console.log("增加");
            console.log(this.param);
            $ajax.addAdministrator(this.param, res => {
              console.log(res);
              this.lookAttribute.showModal = false;
              $app.toast(res.msg, true, () => {
                this.$emit('fatherMethod');
              });
            });
          }
        } else {
          // this.$Message.error("");
        }
      });
    },
    // 清空模态框的内容
    clear(name) {
      this.$refs[name].resetFields();
    },
    // 关闭模态框
    closeModal(name){
      this.$refs[name].resetFields();
    },
    goback(){
      this.lookAttribute.showModal = false
    },
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