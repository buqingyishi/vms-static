<!-- 角色管理的查看、编辑、新增的模态框 -->
<template>
  <Modal
    v-model="lookAttribute.showModal"
    width="800"
    :title="lookAttribute.title"
    @on-ok="save"
    @on-cancel="closeModal"
    ok-text="保存"
    cancel-text="取消"
    class="addDriver"
  >
    <Form
      ref="formValidate"
      :model="list"
      :rules="ruleValidate"
      :disabled="lookAttribute.disabled"
      :label-width="110"
      label-position="right"
    >
      <Row>
        <Col span="12">
          <FormItem label="昵称" prop="nickName">
            <Input v-model="list.nickName" :placeholder="list.nickName?list.nickName:'请输入手机号码'"></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="手机号码" prop="tel">
            <Input v-model="list.tel" :placeholder="list.tel?list.dattele:'请输入手机号码'"></Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="性别" prop="sex">
            <Select v-model="list.sex">
              <Option value="1">男</Option>
              <Option value="2">女</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="年龄" prop="tel">
            <Input v-model="list.tel" :placeholder="list.tel?list.tel:'请输入年龄'"></Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="司机姓名" prop="realName">
            <Input v-model="list.realName" :placeholder="list.realName?list.realName:'请输入司机姓名'"></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="身份证号码" prop="identityCard">
            <Input v-model="list.identityCard" :placeholder="list.identityCard?list.identityCard:'请输入身份证号码'"></Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="身份证正面" prop="idCardFront">
            <Upload
                :before-upload="upload_idCardFront"
                :show-upload-list="false"
                action="//jsonplaceholder.typicode.com/posts/"
                style="display: inline-block;"
                multiple
                type="drag"
              >
                <!-- <div style="width: 58px;height:58px;line-height: 58px;display:inline-block">
              <Icon type="ios-camera" size="20"></Icon>
                </div>-->
                <img
                  class="idCard"
                  :src="idCardFront"
                  v-show="idCardFront != ''"
                />
                <div style="padding: 30px 0;" v-show="idCardFront == ''">
                    <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                    <p>点击上传</p>
                </div>
              </Upload>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="身份证反面" prop="idCardBack">
            <Upload
                :before-upload="upload_idCardReverseSide"
                :show-upload-list="false"
                action="//jsonplaceholder.typicode.com/posts/"
                style="display: inline-block;"
                multiple
                type="drag"
              >
                <!-- <div style="width: 58px;height:58px;line-height: 58px;display:inline-block">
              <Icon type="ios-camera" size="20"></Icon>
                </div>-->
                <!-- <img
                  class="idCard"
                  :src="basicInfo.head_url?basicInfo.head_url:'http://img4.imgtn.bdimg.com/it/u=3484406514,2022419876&fm=26&gp=0.jpg'"
                /> -->
                <img
                  class="idCard"
                  :src="idCardReverseSide"
                  v-show="idCardReverseSide != ''"
                />
                <div style="padding: 30px 0;" v-show="idCardReverseSide == ''">
                    <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                    <p>点击上传</p>
                </div>
              </Upload>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="年龄" prop="tel">
            <Input v-model="list.tel" :placeholder="list.tel?list.tel:'请输入年龄'"></Input>
          </FormItem>
          <!-- <FormItem label="手机号码" prop="avatar">
            <Upload
              :before-upload="upload_handleUpload"
              :show-upload-list="false"
              action="//jsonplaceholder.typicode.com/posts/"
              style="display: inline-block;width:150px;"
            >
              <img
                class="avatar"
                :src="basicInfo.head_url?basicInfo.head_url:'http://img0.imgtn.bdimg.com/it/u=1770426075,1829303505&fm=26&gp=0.jpg'"
              />
            </Upload>
          </FormItem> -->
        </Col>
        <Col span="12">
          <FormItem label="专用标签" prop="specialLabel">
            <Input
              v-model="list.specialLabel"
              :placeholder="list.specialLabel?list.specialLabel:'请输入标签'"
            ></Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="紧急联系人" prop="emergencyName">
            <Input
              v-model="list.emergencyName"
              :placeholder="list.emergencyName?list.emergencyName:'请输入紧急联系人'"
            ></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="紧急联系电话" prop="emergencyTel">
            <Input
              v-model="list.emergencyTel"
              :placeholder="list.emergencyTel?list.emergencyTel:'请输入紧急联系电话'"
            ></Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="驾照年审日期" prop="licenseVerifyTime">
            <DatePicker type="date" width="120" placeholder="Select date" v-model="list.licenseVerifyTime"></DatePicker>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="驾照到期日期" prop="licenseExpiryDate">
            <DatePicker type="date" placeholder="Select date" v-model="list.licenseExpiryDate"></DatePicker>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="驾驶证首页" prop="carModal">
            <Upload
              :before-upload="upload_licenseFront"
              :show-upload-list="false"
              action="//jsonplaceholder.typicode.com/posts/"
              style="display: inline-block;width:300px;"
              multiple
                type="drag"
            >
              <!-- <div style="width: 58px;height:58px;line-height: 58px;display:inline-block">
              <Icon type="ios-camera" size="20"></Icon>
              </div>-->
              <img
                  class="idCard"
                  :src="licenseFront"
                  v-show="licenseFront != ''"
                />
                <div style="padding: 30px 0;" v-show="licenseFront == ''">
                    <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                    <p>点击上传</p>
                </div>
            </Upload>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="驾驶证副页" prop="drivingLicence">
            <Upload
              :before-upload="upload_licenseReverseSide"
              :show-upload-list="false"
              action="//jsonplaceholder.typicode.com/posts/"
              style="display: inline-block;"
              multiple
                type="drag"
            >
              <!-- <div style="width: 58px;height:58px;line-height: 58px;display:inline-block">
              <Icon type="ios-camera" size="20"></Icon>
              </div>-->
              <img
                  class="idCard"
                  :src="licenseReverseSide"
                  v-show="licenseReverseSide != ''"
                />
                <div style="padding: 30px 0;" v-show="licenseReverseSide == ''">
                    <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                    <p>点击上传</p>
                </div>
            </Upload>
          </FormItem>
        </Col>
      </Row>
      <FormItem label="备注" prop="remark">
        <Input v-model="list.remark" :placeholder="list.remark?list.remark:'请填写更多备注信息'"></Input>
      </FormItem>
    </Form>
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
          titile: ""
        };
      }
    },
    list: {
      type: Object,
      default() {
        return {
          roleName: "",
          roleCode: "",
          roleType: null,
          desp: "",
          remark: ""
        };
      }
    }
  },
  data() {
    //这里存放数据
    return {
      param: {
        desp: "",
        remark: "",
        roleName: "",
        roleCode: "",
        roleType: null,
        desp: ""
      },
      basicInfo: {
        head_url: "",
        nickname: "",
        num: ""
      },
      idCardFront:"",//身份证正面
      idCardReverseSide:"",//身份证反面
      licenseFront:"",//驾驶证首页
      licenseReverseSide:"",//驾驶证副页
      imgFile: null, //图片文件
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
          }
        ],
        roleType: [
          {
            required: true,
            message: "角色类型不能为空",
            trigger: "blur"
          }
        ]
      }
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
    save() {
      Object.keys(this.param).forEach(key => {
        this.param[key] = this.list[key];
      });
      console.log(this.param);
      if (this.list.id) {
        this.param.id = this.list.id;
        // 编辑
        $ajax.modifyRoleInfo(this.param, res => {
          console.log(res);
          // 编辑成功,调用父组件的方法,刷新table数据
          this.$parent.roleList();
        });
      } else {
        // 新增
        $ajax.addRoleInfo(this.param, res => {
          console.log(res);
          $app.toast("新增成功", true, () => {
            // 新增成功,调用父组件的方法,刷新table数据
            this.$parent.roleList();
          });
        });
      }
    },
    cancel() {},
    closeModal() {
      this.$emit("func", false);
    },
    upload_handleUpload(file) {
      console.log(file);
      this.imgFile = file;
      this.basicInfo.head_url = window.URL.createObjectURL(file);
      console.log(this.basicInfo.head_url);
      return;
    },
    // 身份证正面
    upload_idCardFront(file){
      console.log(file);
      this.upload_idCardFront = window.URL.createObjectURL(file);
      console.log(this.upload_idCardFront);
      return;
    },
    // 身份证反面
    upload_idCardReverseSide(file){
      console.log(file);
      this.idCardReverseSide = window.URL.createObjectURL(file);
      console.log(this.idCardReverseSide);
      return;
    },
    // 驾驶证首页
    upload_licenseFront(file){
      console.log(file);
      this.licenseFront = window.URL.createObjectURL(file);
      console.log(this.licenseFront);
      return;
    },
    // 驾驶证副页
    upload_licenseReverseSide(file){
      console.log(file);
      this.licenseReverseSide = window.URL.createObjectURL(file);
      console.log(this.licenseReverseSide);
      return;
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
.addDriver .ivu-date-picker{
  width: 100%;
}
.addDriver .ivu-upload{
  width: 100%;
}
.avatar {
  width: 150px;
  height: 150px;
  display: inline-block;
  vertical-align: baseline;
  border-radius: 10px;
}
.idCard {
  width: 280px;
  height: 160px;
  display: inline-block;
  border-radius: 10px;
}
</style>