<!-- 绑定车辆 -->
<template>
  <Modal v-model="lookAttribute.showModal" title="绑定车辆" width="940" @on-ok="bindCar" @on-cancel="cancel">
    <Table :columns="tableTitle" :data="carList" ></Table>
    <page :total="carList.length" :switchPageIndex="switchPageIndex" :switchPageSize="switchPageSize"></page>
  </Modal>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import page from "@$@/components/Page/page"; //分页
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    page
  },
  props: {
    lookAttribute: {
      type: Object,
      default() {
        return {
          showModal: false,
          carTotal:null,
          driverId:null
        };
      }
    },
    carList:{
      type:Array,
      default(){return []}
    },
    
  },
  data() {
    //这里存放数据
    return {
      // 表格信息
      tableTitle: [
        {
          width: 80,
          title: "请选择",
          align: "center",
          key: "checkBox",
          render: (h, params) => {
            return h("div", [
              h("Checkbox", {
                props: {
                  value: params.row.checkBox
                },
                on: {
                  "on-change": e => {
                    if (e == false) {
                      this.carList.disabled = true;
                    }
                    console.log()
                    this.carId = params.row.id
                    this.carCode = params.row.carCode
                    this.carName = params.row.carName
                    this.carNo = params.row.plateNo
                    this.carList.forEach(items => {
                      //先取消所有对象的勾选，checkBox设置为false
                      this.$set(items, "checkBox", false);
                    });
                    this.carList[params.index].checkBox = e; //再将勾选的对象的checkBox设置为true
                  }
                }
              })
            ]);
          }
        },
        {
          title: "车辆名称",
          key: "carName"
        },
        {
          title: "车辆编号",
          key: "carCode"
        },
        {
          title: "车牌号码",
          key: "plateNo"
        },
        {
          title: "车辆标签",
          key: "carTag"
        },

        {
          title: "车辆座次",
          key: "seats",
          width:100,
        },
        {
          title: "车辆类型",
          key: "carTypeName",
        },
        {
          title: "车辆拥有类型",
          key: "ownType",
          render:(h,params) =>{
              let text = params.row == 1?"自有车辆":"外部车辆"
              return h('span',text)
          }
        }
      ],
      // tableData: this.carList,
      carId:null
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    bindCar() {
        let obj = {}
        obj.carId = this.carId
        obj.driverId = this.lookAttribute.driverId
        obj.carName = this.carName
        obj.carCode = this.carCode
        obj.carNo = this.carNo
        $ajax.bindCar(obj,res=>{
            console.log(res)
            // console.log(this.tableData)
            $app.toast(res.msg,true,()=>{
                this.$emit('fatherMethod')
            })
        })
    },
    // 分页页码
    switchPageIndex(index) {
      console.log(index);
      let data = {}
      data.driverId = this.lookAttribute.driverId
      data.pageIndex = index
      // this.param.pageIndex = index;
      this.$emit('switchPageIndex',data)
      // this.getDriverList(this.param);
    },
    // 分页条数
    switchPageSize(pageSize) {
      console.log(pageSize);
      let data = {}
      data.driverId = this.lookAttribute.driverId
      data.pageSize = pageSize
      console.log(data)
      this.$emit('switchPageSize',data)
      // this.param.pageSize = pageSize;
      // this.getDriverList(this.param);
    },
    cancel() {}
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