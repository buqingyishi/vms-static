<!--  -->
<template>
  <div class="carInsuranceModal">
    <Modal v-model="lookAttribute.showModal" width="1000" :title="lookAttribute.title">
      <Form
        ref="insurance"
        :model="list"
        :rules="insurancerule"
        :label-width="140"
        style="margin-top:20px;"
      >
        <Row>
          <Col span="12">
            <FormItem label="保险公司:" prop="insuranceCompany">
              <Input v-model="list.insuranceCompany" placeholder="请输入保险公司"></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="保险单号:" prop="insuranceNo">
              <Input v-model="list.insuranceNo" placeholder="请输入保险单号"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="保险公司电话:" prop="insuranceTel">
              <Input v-model="list.insuranceTel" placeholder="请输入保险公司电话"></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="保险金额:" prop="insuranceAmount">
              <Input v-model="list.insuranceAmount" placeholder="请输入保险金额"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="保险类型:" prop="type">
              <Select v-model="list.type" disabled>
                <Option :value="1">强险</Option>
                <Option :value="2">商业险</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="保险状态:" prop="status">
              <Select v-model="list.status">
                <Option :value="1">在保</Option>
                <Option :value="2">过期</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="保险单开始日:" prop="startTime">
              <DatePicker
                @on-change="list.startTime=$event"
                type="date"
                placeholder="请选择日期"
                :value="list.startTime"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="保险单到期日:" prop="endTime">
              <DatePicker
                @on-change="list.endTime=$event"
                type="date"
                placeholder="请选择日期"
                :value="list.endTime"
              ></DatePicker>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="保险单图片:" prop="pic">
              <Upload
                :before-upload="upload_insurancePic"
                :show-upload-list="false"
                action="//jsonplaceholder.typicode.com/posts/"
                style="display: inline-block;"
                multiple
                type="drag"
              >
                <img class="idCard" :src="list.pic" v-show="list.pic != ''" />
                <div style="padding: 30px 0;width:280px" v-show="list.pic == '' || list.pic == undefined">
                  <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                  <p>点击上传</p>
                </div>
              </Upload>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="备注:" prop="remark">
              <Input v-model="list.remark" type="textarea" placeholder="请填写备注"></Input>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <p slot="footer">
        <Button type="primary" @click="save('insurance')">保存</Button>
        <Button @click="clear('insurance')" style="margin-left: 8px">清空</Button>
      </p>
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
      type: Object,
      default() {
        return {
          carId: null,
          createUserName: "",
          endTime: "",
          id: null,
          insuranceAmount: null,
          insuranceCompany: "",
          insuranceNo: "",
          insuranceTel: "",
          pic: "",
          remark: "",
          startTime: "",
          status: null,
          type: null
        };
      }
    }
  },
  data() {
    //这里存放数据
    return {
      param: {
        carId: null,
          createUserName: "",
          endTime: "",
          id: null,
          insuranceAmount: null,
          insuranceCompany: "",
          insuranceNo: "",
          insuranceTel: "",
          pic: "",
          remark: "",
          startTime: "",
          status: null,
          type: null
      },
      // 车辆保险规则
      insurancerule: {
        endTime: [
          {
            required: true,
            message: "请选择日期",
            trigger: "blur",
            type: "string"
          }
        ],
        startTime: [
          {
            required: true,
            message: "请选择日期",
            trigger: "blur",
            type: "string"
          }
        ],
        insuranceAmount: [
          {
            required: true,
            message: "请输入保险金额",
            trigger: "blur"
          }
        ],
        insuranceCompany: [
          {
            required: true,
            message: "请输入保险公司",
            trigger: "blur"
          }
        ],
        insuranceTel: [
          {
            required: true,
            message: "请输入保险公司电话",
            trigger: "blur"
          }
        ],
        status: [
          {
            required: true,
            message: "请选择保险状态",
            trigger: "change",
            type: "number"
          }
        ],
        type: [
          {
            required: true,
            message: "请选择保险类型",
            trigger: "change",
            type: "number"
          }
        ]
      }
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 车辆保险单
    upload_insurancePic(file) {
      let obj = new FormData();
      obj.append("file", file, file.name);
      $ajax.uploadImage(obj, res => {
        console.log(res);

        this.$set(this.list,'pic',res.data)//解决赋值之后不显示的问题
      });
    },
    save(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.param = this.list
          console.log(this.param);
          if (this.lookAttribute.title == '编辑') {
            // 编辑
            let obj = {};
            obj.carInsurance = this.param;
            $ajax.updateCarInfo(obj, res => {
              console.log(res);
              $app.toast(res.msg, true, () => {
                // this.queryCarInsurance(this.carId, 1);
                this.lookAttribute.showModal = false;
                this.$emit("updateData");
              });
            });
          } else {
            // 新增
            this.param.carId = this.list.carId;
            $ajax.addCarInsuranceRecord(this.param, res => {
              console.log(res);
              $app.toast(res.msg, true,()=>{
                this.lookAttribute.showModal = false;
                this.$emit("updateData");
              });
            });
          }
        }
      });
    },
    clear(name) {
      this.$refs[name].resetFields();
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