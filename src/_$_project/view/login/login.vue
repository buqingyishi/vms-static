<!-- 登录界面 -->
<template>
  <div class="container">
    <div class="backgroundImg">
      <div class="left">
        <img src="../../img/login/logo.png" alt />
        <div class="title">车辆调度管理系统</div>
        <div class="company">广东亦强科技有限公司</div>
      </div>
      <div class="right">
        <div class="login_box">
          <div class="hint">登录后台账号</div>
          <div class="input_box">
            <div class="userName">
              <Icon type="md-person" size="25" />
              <input type="text" v-model="param.userName" placeholder="请输入登录账号" />
              <!-- <Input v-model="value" placeholder="请输入登录账号" style="width: 300px;display:inline-block" /> -->
            </div>
            <div class="password">
              <Icon type="md-lock" size="25" />
              <input type="password" v-model="param.password" placeholder="请输入您的密码" />
            </div>
          </div>
          <button class="login" @click="loginEnter">登录</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      param: {
        userName: "15916969133",
        password: "15916969133",
        userType: 3
      }
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    //   登录
    loginEnter() {
      $ajax.login(this.param, res => {
        console.log(res);
        $app.toast(res.msg, true, () => {
          if (res.code == 200) {
            // 把token还有登录类型存起来
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userInfo", JSON.stringify(res.data.userInfo));
            this.$router.push("/home");
          }
        });
      });
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
.container {
  width: 100%;
  height: 100%;
  .backgroundImg {
    width: 100%;
    height: 100%;
    background: url("../../img/login/bj.png");
    position: relative;
    .left {
      position: absolute;
      top: 28%;
      left: 20%;
      img {
        width: 310px;
        height: 93px;
      }
      .title {
        font-size: 40px;
        color: #ffffff;
        margin-left: 15px;
        margin-top: 20px;
      }
      .company {
        font-size: 16px;
        color: #ffffff;
        margin-left: 15px;
        margin-top: 10px;
      }
    }
    .right {
      width: 23%;
      height: 100%;
      background: rgba(27, 36, 38, 0.6);
      position: absolute;
      right: 0;
      .login_box {
        position: absolute;
        top: 30%;
        left: 50%;
        transform: translateX(-50%);
        width: 75%;
        .hint {
          color: #fff;
          font-size: 22px;
        }
        .input_box {
          margin-top: 25px;
          background-color: #fff;
          border-radius: 5px;
          .userName {
            .ivu-icon {
              vertical-align: middle;
              margin-left: 10px;
            }
            input {
              border: none;
              height: 50px;
              line-height: 50px;
              padding-left: 15px;
              display: inline-block;
              font-size: 16px;
            }
          }
          .password {
            border-top: 1px solid #dedede;
            .ivu-icon {
              vertical-align: middle;
              margin-left: 10px;
            }
            input {
              border: none;
              height: 50px;
              padding-left: 15px;
              line-height: 50px;
              display: inline-block;
              font-size: 16px;
            }
          }
        }
        .login {
          width: 100%;
          height: 40px;
          background-color: #0061ae;
          border: none;
          color: #ffffff;
          border-radius: 5px;
          margin-top: 30px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>