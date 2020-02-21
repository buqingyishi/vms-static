<template>
  <div class="container">
    <div class="title">
      <!-- <Icon class="title_icon icon" type="ios-options" size="18" /> -->
      <i class="iconfont icon-dingwei title_icon icon"></i>
      <span class="title_name">定位监控</span>
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
      <div class="left">
        <Menu mode="horizontal" active-name="1" class="nav">
          <Menu-item name="1">全部</Menu-item>
          <Menu-item name="2">行驶</Menu-item>
          <Menu-item name="3">离线</Menu-item>
          <Menu-item name="4">静止</Menu-item>
        </Menu>
        <div class="search">
          <Input
            v-model="value"
            class="input_content"
            placeholder="搜索司机/订单/车辆"
            style="width:50%;margin-top: 24px;"
          ></Input>
          <Button type="primary" style="width:70px;margin-left:20px;margin-top: 24px;">搜索</Button>
        </div>
        <div class="search_content">
          <div class="car_number">车牌号</div>
          <div class="status">状态</div>
        </div>
        <div class="carInfo first">
          <div style="flex:1;height:20px;text-align:center;line-height:20px;">粤S42653</div>
          <div style="flex:1;height:20px;text-align:center;line-height:20px;color:#2DAD51">在线</div>
        </div>
        <div class="carInfo">
          <div style="flex:1;height:20px;text-align:center;line-height:20px;">粤S42653</div>
          <div style="flex:1;height:20px;text-align:center;line-height:20px;color:#2DAD51">在线</div>
        </div>
      </div>
      <div class="amap-wrapper">
        <el-amap class="amap-box" :vid="'amap-vue'">
          <el-amap-marker
            vid="component-marker"
            :position="componentMarker.position"
            :content-render="componentMarker.contentRender"
          ></el-amap-marker>
          <el-amap-marker
            v-for="(marker, index) in markers"
            :key="index"
            :icon="marker.icon"
            :position="marker.position"
            :events="marker.events"
            :visible="marker.visible"
            :draggable="marker.draggable"
            :vid="index"
          ></el-amap-marker>
        </el-amap>
        <div class="map_car_info">
          <div class="map_car_title">
            <span>车牌号 : 粤A-R6768</span>
            <Icon type="md-close" class="close" size="18" />
          </div>
          <div class="map_car_content">
            <ul>
              <li @click="select(0)" :style="{backgroundColor:(showIndex == 0?'#ffffff':'#eeeeee')}">概况</li>
              <li @click="select(1)" class="border" :style="{backgroundColor:(showIndex == 1?'#ffffff':'#eeeeee')}">司机</li>
              <li @click="select(2)" class="border" :style="{backgroundColor:(showIndex == 2?'#ffffff':'#eeeeee')}">当前</li>
              <li @click="select(3)" :style="{backgroundColor:(showIndex == 3?'#ffffff':'#eeeeee')}">记录</li>
            </ul>
            <div class="detail">
              <div class="one">
                <p class="item">
                  <Icon type="ios-pin" class="icon" size="20" />
                  <span>广东省深圳市福田区泰然六路红松大厦</span>
                </p>
                <p class="item">
                  <Icon type="ios-time-outline" class="icon" size="18" />
                  <span>最后更新 : 2019/08/20 08:30:20 (GPS)</span>
                </p>
              </div>
              <div class="two">
                <div class="left">
                  <p class="item">
                    <Icon type="md-film" class="icon" size="20" />
                    <span>慧通市场部</span>
                  </p>
                  <p class="item">
                    <Icon type="md-person" class="icon" size="20" />
                    <span>何司机</span>
                  </p>
                  <p class="item">
                    <Icon type="md-train" class="icon" size="20" />
                    <span>奥迪</span>
                  </p>
                </div>
                <div class="right">
                  <p class="item">
                    <Icon type="md-notifications" class="icon" size="20" />
                    <span>深圳市</span>
                  </p>
                  <p class="item">
                    <Icon type="md-phone-portrait" class="icon" size="20" />
                    <span>13266101017</span>
                  </p>
                  <p class="item">
                    <Icon type="ios-outlet" class="icon" size="20" />
                    <span>4座</span>
                  </p>
                </div>
                <!-- <p class="item">
                  <Icon type="md-film" class="icon" size="20" />
                  <span>慧通市场部</span>
                </p> -->
                <!-- <p class="item">
                  <Icon type="ios-time-outline" class="icon" size="18" />
                  <span>最后更新 : 2019/08/20 08:30:20(GPS)</span>
                </p>
                <p class="item">
                  <Icon type="ios-time-outline" class="icon" size="18" />
                  <span>最后更新 : 2019/08/20 08:30:20(GPS)</span>
                </p> -->
              </div>
            </div>
            <div class="car_status">
              <div class="left">
                <p class="car_condition item">车辆状态 : <span class="">空闲</span></p>
                <p class="road_haul item">行驶里程 : <span class="">2W.2KM</span></p>
              </div>
              <div class="right">
                <p class="car_electric item">电量 : <span class="">80%</span></p>
                <p class="car_maintain item">维修记录 : <span class="">无</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "accountInfo",
  components: {},
  data() {
    let data = {
      value: "",
      showStar: false,
      modal1: false,
      count: 1,
      showIndex:0,
      slotStyle: {
        padding: "2px 8px",
        background: "#eee",
        color: "#333",
        border: "1px solid #aaa"
      },
      zoom: 14,
      center: [121.5273285, 31.21515044],
      markers: [
        {
          position: [113.75179, 23.02067],
          events: {
            click: () => {
              this.modal1 = true;
            },
            dragend: e => {
              console.log("---event---: dragend");
              this.markers[0].position = [e.lnglat.lng, e.lnglat.lat];
            }
          },
          visible: true,
          draggable: false,
          template: "<span>1</span>",
          icon:"http://ku.90sjimg.com/element_origin_min_pic/18/08/12/09f17b81206f815a0fe0e7dbff60217b.jpg%21/fwfh/804x804/quality/90/unsharp/true/compress/true"
        }
      ],
      renderMarker: {
        position: [121.5273285, 31.21715058],
        contentRender: (h, instance) => {
          // if use jsx you can write in this
          // return <div style={{background: '#80cbc4', whiteSpace: 'nowrap', border: 'solid #ddd 1px', color: '#f00'}} onClick={() => ...}>marker inner text</div>
          return h(
            "div",
            {
              style: {
                background: "#80cbc4",
                whiteSpace: "nowrap",
                border: "solid #ddd 1px",
                color: "#f00"
              },
              on: {
                click: () => {
                  const position = this.renderMarker.position;
                  this.renderMarker.position = [
                    position[0] + 0.002,
                    position[1] - 0.002
                  ];
                }
              }
            },
            ["marker inner text"]
          );
        }
      },
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
      slotMarker: {
        position: [121.5073285, 31.21715058]
      }
    };
    return data;
  },
  created() {
    var map = new AMap.Map("container", {
      resizeEnable: true,
      zoom: 11,
      center: [116.397428, 39.90923]
    });
  },
  mounted() {},
  methods: {
    clickStar() {
      this.showStar = !this.showStar;
    },
    onClick() {
      this.count += 1;
    },
    ok() {
      this.$Message.info("Clicked ok");
    },
    cancel() {
      this.$Message.info("Clicked cancel");
    },
    select(e){
      this.showIndex = e
    }
  }
};
</script>
<style lang="less" scoped>
@import url("../../css/positionInfo.less");
.container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.ivu-menu-horizontal .ivu-menu-item,
.ivu-menu-horizontal .ivu-menu-submenu {
  width: 25%;
}
.ivu-menu-item {
  color: #666666 !important;
}
.ivu-menu-item:hover,
.ivu-menu-item-selected {
  color: #222222 !important;
  border-bottom: 2px solid #222222 !important;
}


</style>
<style>
.amap-icon img{
  width: 50px !important;
  height: 50px !important;
  border-radius: 50% !important;
}
</style>

