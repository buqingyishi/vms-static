<template>
  <div class="user-avatar-dropdown">
    <div class="item" @click="goUrgency('紧急调派')">
      <div class="urgency detail">紧急调派</div>
      <div class="urgency_number detail_number">2</div>
    </div>
    <div class="item last" @click="goNoSent('未派订单')"> 
      <div class="order detail">未派订单</div>
      <div class="order_number detail_number">10</div>
    </div>
    <!-- <div class="item">
          <div class="driver detail">未派司机</div>
          <div class="driver_number detail_number">9</div>
        </div>
        <div class="item" style="border:none">
          <div class="car detail">未派车辆</div>
          <div class="car_number detail_number">8</div>
    </div>-->
    
    <Dropdown trigger="hover">
        <i class="iconfont icon-xingxing"></i>
        <DropdownMenu slot="list">
            <DropdownItem @click.native="goCollect('/dataCenter')">
              <Icon type="ios-podium-outline" style="margin-right:20px;color:#3c96f8" size="18"></Icon>数据中心
            </DropdownItem>
            <DropdownItem @click.native="goCollect('/dispatch')">
              <Icon type="ios-options" style="margin-right:20px;color:#3c96f8" size="18"></Icon>调度
            </DropdownItem>
            <DropdownItem @click.native="goCollect('/car')">
              <Icon type="ios-car" style="margin-right:20px;color:#3c96f8" size="18"></Icon>车辆
            </DropdownItem>
            <DropdownItem @click.native="goCollect('/driver')">
              <Icon type="md-person" style="margin-right:20px;color:#3c96f8" size="18"></Icon>司机
            </DropdownItem>
            <DropdownItem @click.native="goCollect('/useCarMan')">
              <Icon type="md-person" style="margin-right:20px;color:#3c96f8" size="18"></Icon>用车人
            </DropdownItem>
        </DropdownMenu>
    </Dropdown>

    <Badge :count="10" type="error" :offset="position">
      <Icon type="ios-notifications-outline" @click="goMessage" class="lingdang" size="23" />
    </Badge>
    <Dropdown @on-click="handleClick">
      <Badge :dot="false">
        <Avatar :src="$store.state.F_cat.userImg" style="border:1px solid #ccc;" />
      </Badge>
      <!-- <Icon :size="18" type="md-arrow-dropdown"></Icon> -->
      <span class="name" style="margin-left:8px">{{userInfo.realName}}</span>
      <DropdownMenu slot="list">
        <DropdownItem name="message">
          预 警
          <Badge style="margin-left: 10px" :count="0"></Badge>
        </DropdownItem>
        <DropdownItem name="logout">退出登录</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
import "./user.less";
import SockJS from 'sockjs-client'
import Stomp from 'webstomp-client'
// import Stomp from '../../../../_$_project/js/app/stomp'
export default {
  name: "User",
  data() {
    let data = {
      position: [22, 28],
      openCollectList:false,
      stompClient: null,
      userInfo:{},
    };

    let tool = {};
    return Object.assign(data, tool);
  },
  mounted(){
    // this.initWebSocket()
  },
  created() {
    let userInfo = JSON.parse(localStorage.getItem('userInfo')) 
    this.userInfo = userInfo
    console.log(userInfo)
  },
  methods: {
    logout() {
      let token = localStorage.getItem('token')
      $app.confirm("退出当前账号？", "温馨提示", {
        yesFun: () => {
          // $app.loginOutClear(() => {
          //   // $app.toast('成功退出',true,()=>{
          //   //   this.$router.replace({name:'login'});
          //   // },1000);
          //   window.location.reload(true); //这个页面，刷页面 万物初始
          // });
          $ajax.logout('',res=>{
            $app.toast('成功退出',true,()=>{
              localStorage.removeItem('token')
              this.$router.replace({name:'login'});
            },2000);
          })
        }
      });
    },
    message() {
      let {
        $route: { name }
      } = this;
      if (name != "home") {
        this.$router.push({ name: "home" });
      }
    },
    handleClick(name) {
      switch (name) {
        case "logout":
          this.logout();
          break;
        case "message":
          this.message();
          break;
      }
    },
    // 消息
    goMessage() {
      window.console.log("1111");
      this.$router.push({ path: "/message" });
    },
    // 紧急调派
    goUrgency(){
      this.$router.push({path:'/urgencyTask'});
    },
    // 未派订单
    goNoSent(){
      this.$router.push({path:'/noSentOrder'});
    },
    // 收藏的跳转
    goCollect(url){
      window.console.log(url)
      this.$router.push({path:url})
    },

    // initWebSocket() {
    //   this.connection()
    //   // 需要有一个失败重连得到问题
    // },
//     connection() {
//       console.log(Stomp)
//       // 更换that指针
//       const socket = new WebSocket('ws://192.168.137.1:8090/user/webSocket/endpoint?token='+ "c3385808-0976-46ef-8dd1-554e2a27e177")
//       this.stompClient = Stomp.over(socket)
// //建立连接，订阅主题
//       this.stompClient.connect({},(frame) => {
//         console.log("成功了吗")
//         this.stompClient.subscribe('/topic/'+0, (val) => {
//           let data = JSON.parse(val.body)
//           console.log(data.msg)
//           // this.list1 = JSON.parse(val.body)
//           console.log('-------++++++++++++++++++++++++++++++------------')
// //下面会报错，应该是json的问题，但是数据可以接收到
//         })
//       })
//       // 回调函数 3 end
//     }
  }
};
</script>
<style >
.iconfont {
  font-size: 18px !important;
}
.lingdang {
  font-weight: bold !important;
  color: #999999;
  margin-left: 30px;
  margin-right: 30px;
}
.demo-badge-alone {
  background: #5cb85c !important;
}
.user-avatar-dropdown .ivu-badge-count {
  width: 20px;
  height: 15px;
  line-height: 12px;
  padding: 0 1px 0 0;
}
.icon-xingxing:hover{
  color: red;
}
</style>