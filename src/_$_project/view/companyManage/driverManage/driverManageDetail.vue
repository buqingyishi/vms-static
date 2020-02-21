<template>
  <div class="container">
    <div class="title">
      <Icon class="title_icon icon" type="md-person" size="18" />
      <span class="title_name">车辆详情</span>
      <Icon
        class="no_star icon"
        @click="clickStar"
        v-if="showStar == false"
        type="md-star-outline"
        size="20"
        color="#c4c4c4"
      />
      <Icon
        class="yes_star icon"
        @click="clickStar"
        v-if="showStar == true"
        type="md-star"
        size="20"
        color="#f5ba03"
      />
    </div>
    <div class="content">
      <div class="userInfo">
        <img :src="driverInfo.avatar" alt />
        <div class="information">
          <div class="name">
            {{driverInfo.realName}}
            <span class="small_name">({{driverInfo.nickName}})</span>
            <Icon class="yes_star icon" type="md-star" size="20" color="#f5ba03" />
            <span class="grade">4.50</span>
          </div>
          <div class="phone">电话 : {{driverInfo.tel}}</div>
          <div class="driver_type">外援司机</div>
          <div v-show="driverInfo.workStatus == 0" style="color:#f3b803">请假</div>
          <div v-show="driverInfo.workStatus == 1" style="color:#21b945">空闲</div>
          <div v-show="driverInfo.workStatus == 2" style="color:#d40d2c">繁忙</div>
        </div>
        <Button type="primary" class="redact" @click="updateData">编辑</Button>
        <Button type="default" class="return" @click="goBack">返回</Button>
      </div>
      <Tabs size="small" class="tab" :animated="false">
        <TabPane label="司机信息" class="driverInfo">
          <div class="driver_name">
            司机姓名
            <span>{{driverInfo.realName}}</span>
          </div>
          <div class="driver_number">
            司机编号
            <span>{{driverInfo.driverCode}}</span>
          </div>
          <div class="driver_phone">
            电话
            <span>{{driverInfo.tel}}</span>
          </div>
          <div class="driver_team">
            车队
            <span>{{driverInfo.carTeamName}}</span>
          </div>
          <div class="driver_license">
            驾照类型
            <span>未设置</span>
          </div>
          <div class="license_img">
            <div class="img">证件图片</div>
            <div class="item">
              <div class="content_box">
                <div class="box">
                  <img
                    :src="driverInfo.idCardFront"
                    alt
                  />
                </div>
                <div class="describe">身份证正面</div>
              </div>
              <div class="content_box">
                <div class="box">
                  <img
                    :src="driverInfo.idCardBack"
                    alt
                  />
                </div>
                <div class="describe">身份证反面</div>
              </div>
              <div class="content_box">
                <div class="box">
                  <img
                    :src="driverInfo.licensePic"
                    alt
                  />
                </div>
                <div class="describe">驾驶证首页</div>
              </div>
              <div class="content_box">
                <div class="box">
                  <img
                    :src="driverInfo.licenseBack"
                    alt
                  />
                </div>
                <div class="describe">驾驶证副页</div>
              </div>
            </div>
          </div>
        </TabPane>
        <TabPane label="车辆信息" class="carInfo">
          <div class="carInfo_top">
            <div class="car_detail">
              <img src="../../../img/car.png" alt />
            </div>
            <div class="information">
              <div class="name">
                {{driverInfo.bindPlateNo}}
                <span class="small_name">&nbsp;{{driverInfo.specialLabel}}</span>
              </div>
              <div class="phone">{{driverInfo.bindCarTypeId}}</div>
              <div class="driver_type">{{driverInfo.carType}}</div>
              <div class="task" v-show="driverInfo.carStatus == 0" style="color:#21b945">空闲</div>
              <div class="task" v-show="driverInfo.carStatus == 1" style="color:#d40d2c">使用中</div>
            </div>
          </div>
          <div class="driver_name">
            车辆ID
            <span>{{driverInfo.bindCarId}}</span>
          </div>
          <div class="driver_number">
            车牌号码
            <span>{{driverInfo.bindPlateNo}}</span>
          </div>
          <div class="driver_phone">
            别名
            <span>{{driverInfo.nickName}}</span>
          </div>
          <div class="driver_team">
            车辆座次
            <span>{{driverInfo.carSeat}}</span>
          </div>
          <div class="driver_license">
            型号
            <span>{{driverInfo.bindCarTypeName}}</span>
          </div>
          <div class="driver_license">
            车型号
            <span>--</span>
          </div>
          <div class="driver_license">
            发动机号
            <span>--</span>
          </div>
          <div class="driver_license">
            违章查询车辆类型
            <span>未知</span>
          </div>
          <div class="driver_license">
            备注
            <!-- <span>奥迪A6</span> -->
          </div>
          <!-- <div class="license_img">
            <div class="img">证件图片</div>
            <div class="item">
              <div class="content_box">
                <div class="box">
                  <img
                    src="http://img3.imgtn.bdimg.com/it/u=3066957021,2966164816&fm=26&gp=0.jpg"
                    alt
                  />
                </div>
                <i class="describe">身份证正面</i>
              </div>
              <div class="content_box">
                <div class="box">
                  <img
                    src="http://img3.imgtn.bdimg.com/it/u=3066957021,2966164816&fm=26&gp=0.jpg"
                    alt
                  />
                </div>
                <i class="describe">身份证反面</i>
              </div>
              <div class="content_box">
                <div class="box">
                  <img
                    src="http://img3.imgtn.bdimg.com/it/u=3066957021,2966164816&fm=26&gp=0.jpg"
                    alt
                  />
                </div>
              </div>
            </div>
          </div> -->
        </TabPane>
        <TabPane label="位置跟踪" class="position">
          <div class="amap-wrapper">
            <el-amap class="amap-box" :vid="'amap-vue'">
              <el-amap-marker
                vid="component-marker"
                icon="./img/_logo.png"
                :position="componentMarker.position"
                :content-render="componentMarker.contentRender"
              ></el-amap-marker>
              <el-amap-marker
                v-for="(marker, index) in markers"
                :key="index"
                :position="marker.position"
                :events="marker.events"
                :visible="marker.visible"
                :draggable="marker.draggable"
                :vid="index"
              ></el-amap-marker>
            </el-amap>
          </div>
        </TabPane>
        <TabPane label="附加信息" class="addInfo">
          <div class="driver_name">
            紧急联系人
            <span>{{driverInfo.emergencyName}}</span>
          </div>
          <div class="driver_number">
            紧急联系人电话
            <span>{{driverInfo.emergencyTel}}</span>
          </div>
          <div class="driver_phone">
            备注
            <span>{{driverInfo.remark}}</span>
          </div>
          <div class="driver_team">
            创建者
            <span>{{driverInfo.createUserName}} {{driverInfo.createTime}}</span>
          </div>
          <div class="driver_license">
            最后更新者
            <span>{{driverInfo.updateUserName}} {{driverInfo.updateTime}}</span>
          </div>
        </TabPane>
        <TabPane label="操作记录" class="history">
          <div class="left">
            <Input v-model="value" placeholder="操作人" style="width: 120px" />
            <Row style="display:inline-block;vertical-align: middle;margin-left:10px">
              <Col span="12">
                <Date-picker type="date" placeholder="开始日期" style="width: 150px"></Date-picker>
              </Col>
            </Row>
            <span class="end-of">至</span>
            <Row style="display:inline-block;vertical-align: middle;margin-left:13px;">
              <Col span="12">
                <Date-picker type="date" placeholder="结束日期" style="width: 150px"></Date-picker>
              </Col>
            </Row>
            <Button type="primary" style="margin-left:10px">搜索</Button>
          </div>
          <div class="right">
            <ButtonGroup>
              <Button icon="md-sync"></Button>
              <Button icon="ios-keypad"></Button>
            </ButtonGroup>
          </div>
          <Table highlight-row ref="currentRowTable" style="margin-top:20px" :columns="columns3" :data="data1"></Table>
        </TabPane>
      </Tabs>
    </div>
    <driverInfoModal :lookAttribute="lookInfo"></driverInfoModal>
  </div>
</template>


<script>
import driverInfoModal from "@$@/components/Management/driver/driverInfoModal"
export default {
  name: "carB",
  components: {
    driverInfoModal
  },
  data() {
    let data = {
      showStar: false,
      markers: [
        {
          position: [113.75179, 23.02067],
          events: {
            click: () => {
              alert("click marker");
            },
            dragend: e => {
              console.log("---event---: dragend");
              this.markers[0].position = [e.lnglat.lng, e.lnglat.lat];
            }
          },
          visible: true,
          draggable: false,
          template: "<span>1</span>"
        }
      ],
      componentMarker: {
        position: [121.5273285, 31.21315058],
        contentRender: (h, instance) =>
          h(
            exampleComponents,
            {
              style: { backgroundColor: "#fff" },
              props: { text: "father is here" }
            },
            ["xxxxxxx"]
          )
      },
      value: "",
      columns3: [
        {
          type: "index",
          width: 80,
          align: "center",
          title:"序号"
        },
        {
          title: "操作人",
          key: "name"
        },
        {
          title: "操作类型",
          key: "type"
        },
        {
          title: "操作描述",
          key: "describe"
        },
        {
          title: "备注",
          key: "remark "
        },
        {
          title: "操作IP",
          key: "IP"
        },
        {
          title: "操作时间",
          key: "time"
        }
      ],
      data1: [
        {
          name: "刘伟",
          type: "更新",
          describe: "编辑司机资料，操作ID：8409",
          remark: "okok",
          IP:"113.110.20.107",
          time:"2019-08-20 15:03:57"
        },
        {
          name: "刘伟",
          type: "更新",
          describe: "编辑司机资料，操作ID：8409",
          remark: "okok",
          IP:"113.110.20.107",
          time:"2019-08-20 15:03:57"
        },
        {
          name: "刘伟",
          type: "更新",
          describe: "编辑司机资料，操作ID：8409",
          remark: "okok",
          IP:"113.110.20.107",
          time:"2019-08-20 15:03:57"
        },
        {
          name: "刘伟",
          type: "更新",
          describe: "编辑司机资料，操作ID：8409",
          remark: "okok",
          IP:"113.110.20.107",
          time:"2019-08-20 15:03:57"
        },
      ],
      lookInfo: {
        showModal: false,
        title: "",
        disabled: false
      },

      driverInfo:{},
    };
    return data;
  },
  created() {
    console.log(this.$route.query.id)
    let id = this.$route.query.id
    this.getDriverInfo(id)
  },

  methods: {
    // 获取司机信息
    getDriverInfo(id){
      $ajax.queryDriverInfo(id,res=>{
        console.log(res)
        this.driverInfo = res.data
      })
    },
    
    clickStar() {
      this.showStar = !this.showStar;
    },
    handleClearCurrentRow() {
      this.$refs.currentRowTable.clearCurrentRow();
    },
    updateData(){
      this.driverInfo.sex = this.driverInfo.sex.toString()
      this.driverInfo.age = this.driverInfo.age.toString()
      this.$router.push({name:'addOrUpdateDriver',params:{titleName:'编辑司机',driverInfo:this.driverInfo}})
    },
    // 返回上一级
    goBack(){
      this.$router.go(-1)
    }
  },
  mounted() {
    //
  }
};
</script>
<style lang="less">
@import url("../../../css/carDetail.less");
</style>

