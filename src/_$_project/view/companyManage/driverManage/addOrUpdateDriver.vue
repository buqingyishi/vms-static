<!--添加司机  -->
<template>
  <div class="container addOrUpdateDriver">
    <topTitle :titleName="titleName"></topTitle>
    <div class="content">
      <Form ref="param" :model="param" label-colon :rules="ruleValidate" :label-width="120">
        <Row>
          <Col span="12">
            <FormItem label="用户名" prop="driverName">
              <Input
                v-model="param.driverName"
                :placeholder="param.driverName?param.driverName:'请输入用户名'"
              ></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="真实姓名" prop="realName">
              <Input
                v-model="param.realName"
                :placeholder="param.realName?param.realName:'请输入司机姓名'"
              ></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="昵称" prop="nickName">
              <Input v-model="param.nickName" :placeholder="param.nickName?param.nickName:'请输入昵称'"></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="手机号码" prop="tel">
              <Input v-model="param.tel" :placeholder="param.tel?param.tel:'请输入手机号码'"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="年龄" prop="age">
              <Input v-model="param.age" :placeholder="param.age?param.age:'请输入年龄'"></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="性别" prop="sex">
              <Select v-model="param.sex">
                <Option value="1">男</Option>
                <Option value="2">女</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="所属车队" prop="carTeamName">
              <Select v-model="param.carTeamName"  @on-change="selectCarTeam" :label-in-value="true">
                <Option :value="item.id" :label="item.carTeamName" v-for="item in carTeamList">{{item.carTeamName}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="所属部门" prop="departName">
              <Input
                v-model="param.departName"
                search
                enter-button="选择"
                placeholder="请选择部门"
                @on-search="selectDepartment"
              />
              <Modal v-model="modal" title="部门" @on-ok="ok" @on-cancel="cancel">
                <tree :treeData="treeData" :allSelect="true" :selectData="selectData"></tree>
              </Modal>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="身份证号码" prop="identityCard">
              <Input
                v-model="param.identityCard"
                :placeholder="param.identityCard?param.identityCard:'请输入身份证号码'"
              ></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="专用标签" prop="specialLabel">
              <Input
                v-model="param.specialLabel"
                :placeholder="param.specialLabel?param.specialLabel:'请输入标签'"
              ></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="驾照年审日期" prop="licenseVerifyTime">
              <DatePicker
                @on-change="selectLicenseVerifyDate"
                type="date"
                placeholder="请选择日期"
                v-model="param.licenseVerifyTime"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="驾照到期日期" prop="licenseExpiryDate">
              <DatePicker
                @on-change="selectLicenseExpiryDate"
                type="date"
                placeholder="请选择日期"
                v-model="param.licenseExpiryDate"
              ></DatePicker>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
          <FormItem label="紧急联系人" prop="emergencyName">
              <Input
                v-model="param.emergencyName"
                :placeholder="param.emergencyName?param.emergencyName:'请输入紧急联系人'"
              ></Input>
            </FormItem>
          </Col>
          <Col span="12">
          <FormItem label="紧急联系电话" prop="emergencyTel">
              <Input
                v-model="param.emergencyTel"
                :placeholder="param.emergencyTel?param.emergencyTel:'请输入紧急联系电话'"
              ></Input>
            </FormItem>
          </Col>
        </Row>
        <FormItem label="头像" prop="avatar">
              <div>
                <Upload
                  :before-upload="upload_avatar"
                  :show-upload-list="false"
                  action="api/system/fileupload/uploadImage"
                  style="display: inline-block;width:150px;"
                  name="file"
                  multiple
                  type="drag"
                >
                  <img class="avatar" :src="param.avatar" v-show="param.avatar != ''" />
                  <div style="padding: 30px 0;" v-show="param.avatar == ''">
                    <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                    <p>点击上传</p>
                  </div>
                </Upload>
              </div>
            </FormItem>
        <Row>
          <Col span="12">
            <FormItem label="驾驶证主页" prop="licensePic">
              <Upload
                :before-upload="upload_licenseFront"
                :show-upload-list="false"
                action="//jsonplaceholder.typicode.com/posts/"
                style="display: inline-block;"
                multiple
                type="drag"
              >
                <!-- <div style="width: 58px;height:58px;line-height: 58px;display:inline-block">
              <Icon type="ios-camera" size="20"></Icon>
                </div>-->
                <img class="idCard" :src="param.licensePic" v-show="param.licensePic != ''" />
                <div style="padding: 30px 0;" v-show="param.licensePic == ''">
                  <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                  <p>点击上传</p>
                </div>
              </Upload>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="驾驶证副页" prop="licenseBack">
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
                <img class="idCard" :src="param.licenseBack" v-show="param.licenseBack != ''" />
                <div style="padding: 30px 0;" v-show="param.licenseBack == ''">
                  <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                  <p>点击上传</p>
                </div>
              </Upload>
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
                <img class="idCard" :src="param.idCardFront" v-show="param.idCardFront != ''" />
                <div style="padding: 30px 0;" v-show="param.idCardFront == ''">
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
                />-->
                <img class="idCard" :src="param.idCardBack" v-show="param.idCardBack != ''" />
                <div style="padding: 30px 0;" v-show="param.idCardBack == ''">
                  <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                  <p>点击上传</p>
                </div>
              </Upload>
            </FormItem>
          </Col>
        </Row>
        <FormItem label="备注" prop="remark">
          <Input v-model="param.remark" :placeholder="param.remark?param.remark:'请填写更多备注信息'"></Input>
        </FormItem>
      </Form>
      <p slot="footer" style="text-align:right;margin-top:50px;margin-bottom:30px">
        <Button type="primary" @click="save('param')">保存</Button>
        <Button @click="clear('param')" style="margin-left: 8px">重置</Button>
        <Button @click="goBlack" style="margin-left: 8px">返回</Button>
      </p>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import topTitle from "@$@/components/universal/title";
import dispose from "@$@/js/app/disposeTreeData"; //处理树形数据
import tree from "@$@/components/Tree/Tree"; //树形控件
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    topTitle,
    dispose,
    tree
  },
  data() {
    //这里存放数据
    return {
      titleName: "",
      param: {
        realName: "",
        nickName: "",
        driverName: "",
        carTeamId:null,
        carTeamName:"",
        departId: null,
        departName: "",
        tel: "",
        sex: "请选择",
        age: "",
        identityCard: "",
        avatar: "",
        licensePic: "",
        licenseBack: "",
        emergencyName: "",
        emergencyTel: "",
        specialLabel: "",
        idCardBack: "",
        idCardFront: "",
        licenseVerifyTime: "",
        licenseExpiryDate: "",
        remark: "",
        id: null
      },
      // 选择车队
      carTeamList:[],
      // 选择部门
      treeData: [],
      modal: false,
      departmentId: null,
      department: "",
      ruleValidate: {
        realName: [
          {
            required: true,
            message: "真实姓名不能为空",
            trigger: "blur"
          }
        ],
        driverName: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur"
          }
        ],
        tel: [
          {
            required: true,
            message: "手机号码不能为空",
            trigger: "blur"
          }
        ],
        sex: [
          {
            required: true,
            message: "性别不能为空",
            trigger: "change"
          }
        ],
        carTeamName: [
          {
            required: true,
            message: "车队名称不能为空",
            trigger: "change",
            type: 'number',
          }
        ],
        departName: [
          {
            required: true,
            message: "部门不能为空",
            trigger: "click"
          }
        ],
        identityCard: [
          {
            required: true,
            message: "身份证号码不能为空",
            trigger: "blur"
          }
        ],
        emergencyName: [
          {
            required: true,
            message: "紧急联系人不能为空",
            trigger: "blur"
          }
        ],
        emergencyTel: [
          {
            required: true,
            message: "紧急联系人电话不能为空",
            trigger: "blur"
          }
        ],
        licenseVerifyTime: [
          {
            required: true,
            message: "请选择驾照年审日期",
            type: "date",
            trigger: "change"
          }
        ],
        licenseExpiryDate: [
          {
            required: true,
            message: "请选择驾驶证到期日期",
            type: "date",
            trigger: "change"
          }
        ],
        idCardBack: [
          {
            required: true,
            message: "请上传图片",
            trigger: "blur"
          }
        ],
        idCardFront: [
          {
            required: true,
            message: "请上传图片",
            trigger: "blur"
          }
        ],
        licensePic: [
          {
            required: true,
            message: "请上传图片",
            trigger: "blur"
          }
        ]
        // licenseBack:[
        //   {
        //     required: true,
        //     message: "请上传图片",
        //     trigger: "blur"
        //   }
        // ]
      },

      basicInfo: {
        head_url: "",
        nickname: "",
        num: ""
      },
      iconUrl: "", //头像
      idCardFront: "", //身份证正面
      idCardReverseSide: "", //身份证反面
      licenseFront: "", //驾驶证首页
      licenseReverseSide: "", //驾驶证副页
      imgFile: null //图片文件
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    save(name) {
      console.log(name);
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.param.id) {
            console.log("编辑");
            console.log(this.param);
            $ajax.modifyDriverInfo(this.param, res => {
              console.log(res);
              $app.toast(res.msg, true);
            });
          } else {
            console.log("添加");
            $ajax.addDriverInfo(this.param, res => {
              console.log(res);
              $app.toast(res.msg, true);
            });
          }
        }
      });
    },
    clear(name) {
      this.$refs[name].resetFields();
    },
    upload_handleUpload(file) {
      console.log(file);
      this.imgFile = file;
      this.basicInfo.head_url = window.URL.createObjectURL(file);
      console.log(this.basicInfo.head_url);
      return;
    },
    // 获取车队列表
    getCarTeam(){
      $ajax.queryAllCarTeamList("",res=>{
        console.log(res)
        this.carTeamList = res.data
      })
    },
    // 选择车队名称
    selectCarTeam(data){
      console.log(data)
      this.param.carTeamId = data.value
    },
    // 获取部门
    selectDepartment() {
      this.modal = true;
      $ajax.getDepartments({}, resData => {
        console.log(resData);
        let data = dispose.disposeTreeData(resData.data);
        console.log(data);
        this.treeData = data;
      });
    },
    // 选中树节点
    selectData(data, list) {
      console.log(list);
      console.log(data);
      //   设置成单选
      for (let index = 0; index < data.length; index++) {
        if (list.title == data[index].title) {
          data[index].checked = true;
        } else {
          data[index].checked = false;
        }
      }
      this.param.departId = list.id;
      this.param.departName = list.title;
      console.log(this.param.departId);
    },
    // 驾照年审日期
    selectLicenseVerifyDate(date) {
      console.log(date);
      this.licenseVerifyTime = date;
    },
    // 驾照到期日期
    selectLicenseExpiryDate(date) {
      console.log(date);
      this.licenseExpiryDate = date;
    },
    // 头像
    upload_avatar(file) {
      let obj = new FormData();
      obj.append("file", file, file.name);
      $ajax.uploadImage(obj, res => {
        this.param.avatar = res.data;
      });
    },
    // 身份证正面
    upload_idCardFront(file) {
      let obj = new FormData();
      obj.append("file", file, file.name);
      $ajax.uploadImage(obj, res => {
        this.param.idCardFront = res.data;
      });
    },
    // 身份证反面
    upload_idCardReverseSide(file) {
      let obj = new FormData();
      obj.append("file", file, file.name);
      $ajax.uploadImage(obj, res => {
        this.param.idCardBack = res.data;
      });
    },
    // 驾驶证首页
    upload_licenseFront(file) {
      let obj = new FormData();
      obj.append("file", file, file.name);
      $ajax.uploadImage(obj, res => {
        this.param.licensePic = res.data;
      });
    },
    // 驾驶证副页
    upload_licenseReverseSide(file) {
      let obj = new FormData();
      obj.append("file", file, file.name);
      $ajax.uploadImage(obj, res => {
        this.param.licenseBack = res.data;
      });
    },
    goBlack() {
      this.$router.go(-1);
    },
    // 选择部门模态框的保存
    ok() {},
    // 选择部门模态框的取消
    cancel() {}
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    console.log(this.$route.params);
    this.titleName = this.$route.params.titleName;
    if (this.$route.params.driverInfo) {
      this.param = this.$route.params.driverInfo;
    }
    this.getCarTeam()
    console.log(this.param);
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
@import url("../../../css/companyManage/updateDriver.less");
.addOrUpdateDriver .ivu-date-picker {
  width: 99%;
}
.addOrUpdateDriver .ivu-upload {
  width: 60%;
}
.avatar {
  width: 150px;
  height: 150px;
  display: inline-block;
  border-radius: 10px;
}
.idCard {
  width: 280px;
  height: 180px;
  display: inline-block;
  border-radius: 10px;
}
</style>