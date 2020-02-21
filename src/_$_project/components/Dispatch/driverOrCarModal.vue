<!--  -->
<template>
  <div class="carTeamModal">
    <Modal
      v-model="lookAttribute.showModal"
      width="800"
      :title="lookAttribute.title"
      @on-cancel="cancel"
    >
      <!-- <Form
        :model="list"
        :disabled="lookAttribute.disabled"
        :label-width="80"
      >
        <FormItem label="司机姓名" prop="driverName">
          <Input v-model="list.driverName" placeholder="司机姓名"></Input>
        </FormItem>
        <FormItem label="手机号码" prop="driverTel">
          <Input v-model="list.driverTel" placeholder="手机号码"></Input>
        </FormItem>
        <FormItem label="车牌号码" prop="carNo">
          <Input v-model="list.carNo" placeholder="车牌号码"></Input>
        </FormItem>
      </Form>
      <p slot="footer">
        <Button type="primary" @click="okay">确定</Button>
      </p>-->
      <Table border :columns="tableTitle" :data="tableData"></Table>
    </Modal>
  </div>
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
          title: "",
          disabled: false
        };
      }
    },
    list: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    //这里存放数据
    return {
      tableTitle: [
        {
          title: "司机姓名",
          key: "driverName"
        },
        {
          title: "手机号码",
          key: "driverTel"
        },
        {
          title: "车牌号码",
          key: "carNo"
        }
      ],
      tableData:[],
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    "lookAttribute.showModal"(){
      if(this.lookAttribute.showModal == true){
        this.tableData = this.list
      }
    }
  },
  //方法集合
  methods: {
    okay() {
      this.lookAttribute.showModal = false;
    },
    clear(name) {
      this.$refs[name].resetFields();
    },
    // 关闭Modal
    cancel() {
      
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