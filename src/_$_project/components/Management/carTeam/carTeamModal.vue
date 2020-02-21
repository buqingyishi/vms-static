<!--  -->
<template>
  <div class="carTeamModal">
    <Modal v-model="lookAttribute.showModal" width="800" :title="lookAttribute.title" @on-cancel="cancel('list')">
      <Form
        ref="list"
        :model="list"
        :rules="ruleValidate"
        :disabled="lookAttribute.disabled"
        :label-width="100"
      >
        <FormItem label="车队名称" prop="carTeamName">
          <Input v-model="list.carTeamName" placeholder="请输入车队名称"></Input>
        </FormItem>
        <FormItem label="车队负责人" prop="headName">
          <Input v-model="list.headName" placeholder="请输入车队负责人"></Input>
        </FormItem>
      </Form>
      <p slot="footer">
        <Button type="primary" @click="save('list')">保存</Button>
        <Button @click="clear('list')" style="margin-left: 8px">清空</Button>
      </p>
    </Modal>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
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
          carTeamName:"",
          headName:"",
        };
      }
    }
  },
  data() {
    //这里存放数据
    return {
      // 表单验证
      ruleValidate: {
        carTeamName: [
          {
            required: true,
            message: "车队名称不能为空",
            trigger: "blur"
          }
        ],
        headName: [
          {
            required: true,
            message: "车队负责人不能为空",
            trigger: "blur"
          }
        ],
      },
      param: {
        carTeamName:"",
        headName:"",
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
      console.log(this.list.userType);
      this.$refs[name].validate(valid => {
        if (valid) {
          Object.keys(this.param).forEach(key => {
            this.param[key] = this.list[key];
          });
          // 编辑
          if (this.list.id) {
            $ajax.modifyCarTeam(this.list, res => {
              console.log(res);
              $app.toast(res.msg, true, () => {
                this.lookAttribute.showModal = false;
                this.$refs[name].resetFields();
                this.$emit('fatherMethod');
              });
            });
          } else {
            // 新增
            $ajax.addCarTeam(this.param, res => {
              console.log(res);
              $app.toast(res.msg, true, () => {
                this.lookAttribute.showModal = false;
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
    // 关闭Modal
    cancel(name){
      console.log("哈哈哈")
      console.log(name)
      this.$refs[name].resetFields();
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