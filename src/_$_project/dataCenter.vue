<!--  -->
<template>
  <div class="container">
    <topTitle :titleName="'数据中心'" :iconName="'ios-podium-outline'"></topTitle>
    <div class="data_show">
      <div class="item item_one">
        <div class="left">
          <img src="./img/data-center/bg_on.png" alt />
        </div>
        <div class="right">
          <div class="data_number">100,500</div>
          <div class="data_one">数据显示</div>
        </div>
      </div>
      <div class="item item_two">
        <div class="left">
          <img src="./img/data-center/bg_two.png" alt />
        </div>
        <div class="right">
          <div class="data_number">97,320</div>
          <div class="data_one">数据显示</div>
        </div>
      </div>
      <div class="item item_three">
        <div class="left">
          <img src="./img/data-center/bg_three.png" alt />
        </div>
        <div class="right">
          <div class="data_number">267,910</div>
          <div class="data_one">数据显示</div>
        </div>
      </div>
      <div class="item item_four">
        <div class="left">
          <img src="./img/data-center/bg_four.png" alt />
        </div>
        <div class="right">
          <div class="data_number">45,320</div>
          <div class="data_one">数据显示</div>
        </div>
      </div>
      <div class="item item_five">
        <div class="left">
          <img src="./img/data-center/bg_five.png" alt />
        </div>
        <div class="right">
          <div class="data_number">45,320</div>
          <div class="data_one">数据显示</div>
        </div>
      </div>
      <div class="item last">
        <div class="left">
          <img src="./img/data-center/bg_six.png" alt />
        </div>
        <div class="right">
          <div class="data_number">45,320</div>
          <div class="data_one">数据显示</div>
        </div>
      </div>
    </div>
    <div class="data_center">
      <div class="left">
        <div id="myChart"></div>
      </div>
      <div class="right">
        <div id="myChartTwo"></div>
      </div>
    </div>
    <div class="data_bottom">
      <div id="myChartThree"></div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import topTitle from "./components/universal/title";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    topTitle
  },
  data() {
    //这里存放数据
    return {};
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // 初始化echarts实例
    let myChart = this.$echarts.init(document.getElementById("myChart"));
    let myChartTwo = this.$echarts.init(document.getElementById("myChartTwo"));
    let myChartThree = this.$echarts.init(document.getElementById("myChartThree"));
    // 绘制图表
    myChart.setOption({
      title: {
        text: "某站点用户访问来源",
        subtext: "纯属虚构",
        x: "center",
        y: "20"
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: "vertical",
        left: "20",
        data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"],
        y: "20"
      },
      series: [
        {
          name: "访问来源",
          type: "pie",
          radius: "55%",
          center: ["50%", "60%"],
          data: [
            { value: 335, name: "直接访问" },
            { value: 310, name: "邮件营销" },
            { value: 234, name: "联盟广告" },
            { value: 135, name: "视频广告" },
            { value: 1548, name: "搜索引擎" }
          ],
          
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        }
      ]
    });
    myChartTwo.setOption({
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: "bar",
          color: "#319aff"
        }
      ]
    });
    myChartThree.setOption({
      title: {
        text: "堆叠区域图"
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#6a7985"
          }
        }
      },
      legend: {
        data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"]
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
        }
      ],
      yAxis: [
        {
          type: "value"
        }
      ],
      series: [
        {
          name: "邮件营销",
          type: "line",
          stack: "总量",
          areaStyle: {},
          data: [120, 132, 101, 134, 90, 230, 210],
          color:"#74afd2",
        },
        {
          name: "联盟广告",
          type: "line",
          stack: "总量",
          areaStyle: {},
          data: [220, 182, 191, 234, 290, 330, 310],
          color:"#7d52c0",
        },
        {
          name: "视频广告",
          type: "line",
          stack: "总量",
          areaStyle: {},
          data: [150, 232, 201, 154, 190, 330, 410],
          color:"#57c0ff",
        },
        {
          name: "直接访问",
          type: "line",
          stack: "总量",
          areaStyle: { normal: {} },
          data: [320, 332, 301, 334, 390, 330, 320],
          color:"#6caef4"
        },
        {
          name: "搜索引擎",
          type: "line",
          stack: "总量",
          label: {
            normal: {
              show: true,
              position: "top"
            }
          },
          areaStyle: { normal: {} },
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          color:"#545cc0"
        }
      ]
    });
  },
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
@import url("./css/dataCenter.less");
</style>