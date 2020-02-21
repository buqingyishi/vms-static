<!--  -->
<template>
  <div class="amap-page-container">
    <el-amap-search-box
      class="search-box"
      :search-option="searchOption"
      :on-search-result="onSearchResult"
    ></el-amap-search-box>
    <el-amap vid="amapDemo" :plugin="plugin" :center="mapCenter" :zoom="12" class="amap-demo">
      <el-amap-marker
        v-for="item in markers"
        :position="item.position"
        :events="item.events"
        :icon="item.icon"
        :extData="item.extData"
      ></el-amap-marker>
    </el-amap>
    <!-- <div class="toolbar">
      <span v-if="loaded">location: lng = {{ lng }} lat = {{ lat }}</span>
      <span v-else>正在定位</span>
    </div> -->
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: {
    locationType: {
      type: Number,
      default() {
        return null;
      }
    }
  },
  data() {
    let self = this;
    //这里存放数据
    return {
      lng: 0,
      lat: 0,
      loaded: false,
      plugin: [
        {
          pName: "Geolocation",
          events: {
            init(o) {
              // o 是高德地图定位插件实例
              o.getCurrentPosition((status, result) => {
                if (result && result.position) {
                  self.lng = result.position.lng;
                  self.lat = result.position.lat;
                  self.mapCenter = [self.lng, self.lat];
                  self.loaded = true;
                  self.$nextTick();
                }
              });
            }
          }
        }
      ],
      markers: [],
      searchOption: {
        city: "东莞",
        citylimit: true
      },
      mapCenter: [121.59996, 31.197646],
      positionType: null,
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
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
    select(e) {
      this.showIndex = e;
    },

    // addMarker: function() {
    //   let lng = 121.5 + Math.round(Math.random() * 1000) / 10000;
    //   let lat = 31.197646 + Math.round(Math.random() * 500) / 10000;
    //   this.markers.push([lng, lat]);
    // },
    onSearchResult(pois) {
      console.log(pois);
      let latSum = 0;
      let lngSum = 0;
      if (pois.length > 0) {
        let obj = {};
        obj.longitude = pois[0].lng;
        obj.latitude = pois[0].lat;
        obj.name = pois[0].name;
        obj.type = this.locationType;
        this.$emit("getLocation", obj);
        pois.forEach(poi => {
          console.log(poi);
          let { lng, lat } = poi;
          lngSum += lng;
          latSum += lat;

          // this.marker.push([poi.lng,poi.lat])
          // console.log(this.marker)
          this.markers.push({
            position: [pois[0].lng, pois[0].lat],
            content: pois[0].address,
            extData: pois[0].name,
            icon: "",
            events: {
              // click: e => {
              //   console.log(e);
              //   let obj = {};
              //   obj.longitude = e.lnglat.lng;
              //   obj.latitude = e.lnglat.lat;
              //   obj.name = e.target.Uh.extData;
              //   obj.type = this.locationType;
              //   this.$emit("getLocation", obj);
              //   this.markers = [];
              // },
              dragend: e => {
                console.log("---event---: dragend");
                this.markers[0].position = [e.lnglat.lng, e.lnglat.lat];
              }
            },
            visible: true,
            draggable: false,
            template: "<span>1</span>"
          });
        });
        let center = {
          lng: lngSum / pois.length,
          lat: latSum / pois.length
        };
        this.mapCenter = [center.lng, center.lat];
      }
    },
    clickMaker() {
      console.log("哈哈哈哈");
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    // var map = new AMap.Map("container", {
    //   resizeEnable: true,
    //   zoom: 11,
    //   center: [116.397428, 39.90923]
    // });
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
@import url("../../css/positionInfo.less");
.amap-page-container {
  width: 100%;
  height: 400px;
  margin: auto auto;
}
.amap-demo {
  height: 400px;
}

.search-box {
  position: absolute;
  top: 25px;
  left: 20px;
}

.amap-page-container {
  position: relative;
}
</style>