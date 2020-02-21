<!-- 司机信息的模态框 -->
<template>
  <Modal v-model="lookAttribute.showModal" width="1000" title="编辑" @on-ok="ok" @on-cancel="cancel">
    <Form
      ref="list"
      :model="list"
      :disabled="lookAttribute.disabled"
      :rules="ruleValidate"
      :label-width="80"
    >
      <Row>
        <Col span="12">
          <FormItem label="司机姓名" prop="realName">
            <Input v-model="list.realName" :placeholder="list.realName"></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="司机编号" prop="driverCode">
            <Input v-model="list.driverCode" :placeholder="list.driverCode"></Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="年龄" prop="age">
            <Input v-model="list.age" :placeholder="list.age"></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="手机号码" prop="tel">
            <Input v-model="list.tel" :placeholder="list.tel"></Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="性别" prop="sex">
            <Input v-model="list.sex" :placeholder="list.sex"></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="身份证号码" prop="idCardNumber">
            <Input v-model="list.idCardNumber" :placeholder="list.idCardNumber"></Input>
          </FormItem>
        </Col>
      </Row>
      <FormItem label="头像" prop="avatar">
        <div>
          <Upload
            :before-upload="upload_handleUpload"
            :show-upload-list="false"
            action="//jsonplaceholder.typicode.com/posts/"
            style="display: inline-block;width:150px;"
          >
            <!-- <div style="width: 58px;height:58px;line-height: 58px;display:inline-block">
              <Icon type="ios-camera" size="20"></Icon>
            </div>-->
            <img
              class="avatar"
              :src="basicInfo.head_url?basicInfo.head_url:'http://img0.imgtn.bdimg.com/it/u=1770426075,1829303505&fm=26&gp=0.jpg'"
            />
          </Upload>
        </div>
      </FormItem>
      <FormItem label="驾驶证" prop="licensePic">
        <Row>
          <Col span="12">
            <Upload
              :before-upload="upload_handleUpload"
              :show-upload-list="false"
              action="//jsonplaceholder.typicode.com/posts/"
              style="display: inline-block;width:300px;"
            >
              <!-- <div style="width: 58px;height:58px;line-height: 58px;display:inline-block">
              <Icon type="ios-camera" size="20"></Icon>
              </div>-->
              <img
                class="idCard"
                :src="basicInfo.head_url?basicInfo.head_url:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=132648020,3125775957&fm=26&gp=0.jpg'"
              />
            </Upload>
          </Col>
          <Col span="12">
            <Upload
              :before-upload="upload_handleUpload"
              :show-upload-list="false"
              action="//jsonplaceholder.typicode.com/posts/"
              style="display: inline-block;"
            >
              <!-- <div style="width: 58px;height:58px;line-height: 58px;display:inline-block">
              <Icon type="ios-camera" size="20"></Icon>
              </div>-->
              <img
                class="idCard"
                :src="basicInfo.head_url?basicInfo.head_url:'http://img4.imgtn.bdimg.com/it/u=3484406514,2022419876&fm=26&gp=0.jpg'"
              />
            </Upload>
          </Col>
        </Row>
      </FormItem>

      <FormItem label="身份证" prop="ID">
        <div>
          <Row>
            <Col span="12">
              <Upload
                :before-upload="upload_handleUpload"
                :show-upload-list="false"
                action="//jsonplaceholder.typicode.com/posts/"
                style="display: inline-block;"
              >
                <!-- <div style="width: 58px;height:58px;line-height: 58px;display:inline-block">
              <Icon type="ios-camera" size="20"></Icon>
                </div>-->
                <img
                  class="idCard"
                  :src="basicInfo.head_url?basicInfo.head_url:'http://img5.imgtn.bdimg.com/it/u=2237907703,817053460&fm=26&gp=0.jpg'"
                />
              </Upload>
            </Col>
            <Col span="12">
              <Upload
                :before-upload="upload_handleUpload"
                :show-upload-list="false"
                action="//jsonplaceholder.typicode.com/posts/"
                style="display: inline-block;"
              >
                <!-- <div style="width: 58px;height:58px;line-height: 58px;display:inline-block">
              <Icon type="ios-camera" size="20"></Icon>
                </div>-->
                <img
                  class="idCard"
                  :src="basicInfo.head_url?basicInfo.head_url:'http://img4.imgtn.bdimg.com/it/u=3484406514,2022419876&fm=26&gp=0.jpg'"
                />
              </Upload>
            </Col>
          </Row>
        </div>
      </FormItem>
      <!-- <FormItem label="描述" prop="desp">
        <Input v-model="list.desp" :placeholder="list.desp"></Input>
      </FormItem>
      <FormItem label="备注" prop="remark">
        <Input v-model="list.remark" :placeholder="list.remark"></Input>
      </FormItem>-->
    </Form>
    <p slot="footer">
      <Button type="primary" @click="save('list')">保存</Button>
      <Button @click="clear('list')" style="margin-left: 8px">清空</Button>
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
          realName: "",
          driverCode: "",
          tel: "",
          email: "",
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
        ]
      },

      basicInfo: {
        head_url: "",
        nickname: "",
        num: ""
      },
      imgFile: null //图片文件
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    save(name) {},
    clear(name) {},
    upload_handleUpload(file) {
      console.log(file);
      this.imgFile = file;
      this.basicInfo.head_url = window.URL.createObjectURL(file);
      console.log(this.basicInfo.head_url);
      return;
    },
    // 保存修改
    saveinfo() {
      let formData = new FormData();

      formData.append("headfile", this.imgFile);
      formData.append("nickname", this.basicInfo.nickname);
      formData.append("num", this.basicInfo.num);
    },
    ok() {
      this.$Message.info("Clicked ok");
    },
    cancel() {
      this.$Message.info("Clicked cancel");
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
.avatar {
  width: 150px;
  height: 150px;
  display: inline-block;
  vertical-align: baseline;
  border-radius: 10px;
}
.idCard {
  width: 270px;
  height: 180px;
  display: inline-block;
  vertical-align: baseline;
  border-radius: 10px;
}
</style>