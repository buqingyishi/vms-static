<!-- 角色管理的查看、编辑、新增的模态框 -->
<template>
    <Modal
      v-model="lookAttribute.showModal"
      width="800"
      :title="lookAttribute.title"
      @on-cancel="closeModal('formValidate')"
    >
      <Form ref="formValidate" :model="list" :rules="ruleValidate" :disabled="lookAttribute.disabled" :label-width="80">
        <FormItem label="角色名称" prop="roleName">
          <Input v-model="list.roleName" :placeholder="list.roleName?list.roleName:'请输入角色名称'"></Input>
        </FormItem>
        <FormItem label="角色标识" prop="roleCode">
          <Input v-model="list.roleCode" :placeholder="list.roleCode?list.roleCode:'请输入角色标识'"></Input>
        </FormItem>
        <FormItem label="角色类型" prop="roleType">
          <!-- <Input v-model="list.roleType" :placeholder="list.roleType?list.roleType:'请选择角色类型'"></Input> -->
          <Select v-model="list.roleType">
                <Option :value="1">平台角色</Option>
                <Option :value="2">公司角色</Option>
            </Select>
        </FormItem>
        <FormItem label="角色描述" prop="desp">
          <Input
            v-model="list.desp"
            type="textarea"
            :autosize="{minRows: 2,maxRows: 5}"
            :placeholder="list.desp?list.desp:'请输入角色描述'"
          ></Input>
        </FormItem>
        <FormItem label="备注" prop="remark">
          <Input v-model="list.remark" :placeholder="list.remark?list.remark:'请填写备注'"></Input>
        </FormItem>
      </Form>
      <p slot="footer">
        <Button @click="clear('formValidate')" v-show="lookAttribute.title != '查看'" >清空</Button>
        <Button type="primary" v-show="lookAttribute.title != '查看'" style="margin-left: 8px" @click="save('formValidate')">保存</Button>
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
          showModal:false,
          disabled:false,
          titile:""
        };
      }
    },
    list:{
      type:Object,
      default(){
        return {
          roleName: "",
          roleCode: "",
          roleType:null,
          desp: "",
          remark:"",
        }
      }
    }
  },
  data() {
    //这里存放数据
    return {
      param:{
        desp:"",
        remark:"",
        roleName:"",
        roleCode:"",
        roleType:null,
        desp:""
      },
      // 表单验证
      ruleValidate: {
        roleName: [
          {
            required: true,
            message: "角色名称不能为空",
            trigger: "blur"
          }
        ],
        roleCode: [
          {
            required: true,
            message: "角色标识不能为空",
            trigger: "blur"
          },
        ],
        roleType: [
          {
            required: true,
            message: "角色类型不能为空",
            trigger: "blur"
          },
        ],
      },
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    // lookAttribute(newV, oldV) {
    //   console.log(newV, oldV);
    //   console.log("这是新居")
    //   // this.currentModal = newV;
    // }
  },
  //方法集合
  methods: {
    save(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          Object.keys(this.param).forEach(key => {
            this.param[key] = this.list[key];
          });
          // 编辑
          if (this.list.id) {
            this.param.id = this.list.id
            // 编辑
            $ajax.modifyRoleInfo(this.param,res=>{
              console.log(res)
              // 编辑成功,调用父组件的方法,刷新table数据
              this.$refs[name].resetFields();
              this.$emit("fatherMethod")
            })
          } else {
            // 新增
            $ajax.addRoleInfo(this.param,res=>{
              console.log(res)
              $app.toast("新增成功",true,()=>{
                // 新增成功,调用父组件的方法,刷新table数据
                this.$refs[name].resetFields();
                this.$emit("fatherMethod")
              })
            })
          }
        }
      });
    },
    closeModal(name) {
      this.$emit("func", false);
      this.$refs[name].resetFields();
    },
    goback(){
      this.lookAttribute.showModal = false
    },
    clear(name) {
      this.$refs[name].resetFields();
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    
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
</style>