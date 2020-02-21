<!--  -->
<template>
  <div class="container">
    <topTitle :titleName="'数据中心'" :iconName="'ios-podium-outline'"></topTitle>
    <div class="top">
      <div class="left">
        <div class="item">
          <div class="title">数据显示</div>
          <div class="content">
            <ul>
              <li class="one">
                <div class="small_box">
                  <img src="../../img/data-center/秒表.png" alt />
                </div>
                <span>数据一</span>
              </li>
              <li>
                <div class="small_box">
                  <img src="../../img/data-center/图表-折线图.png" alt />
                </div>
                <span>数据一</span>
              </li>
              <li>
                <div class="small_box">
                  <img src="../../img/data-center/书友.png" alt />
                </div>
                <span>数据一</span>
              </li>
              <li class="four">
                <div class="small_box">
                  <img src="../../img/data-center/talk.png" alt />
                </div>
                <span>数据一</span>
              </li>
              <li class="four">
                <div class="small_box">
                  <img src="../../img/data-center/指南针.png" alt />
                </div>
                <span>数据一</span>
              </li>
              <li class="four">
                <div class="small_box">
                  <img src="../../img/data-center/编辑.png" alt />
                </div>
                <span>数据一</span>
              </li>
              <li class="four">
                <div class="small_box">
                  <img src="../../img/data-center/增加用户.png" alt />
                </div>
                <span>数据一</span>
              </li>
              <li class="four">
                <div class="small_box">
                  <img src="../../img/data-center/设置.png" alt />
                </div>
                <span>数据一</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="itemTwo">
          <div class="title">数据显示</div>
          <div class="content">
            <ul>
              <li>
                <div class="data_hide">
                  <p class="content_title">车辆数据</p>
                  <p class="data">66</p>
                </div>
              </li>
              <li>
                <div class="data_hide">
                  <p class="content_title">车辆数据</p>
                  <p class="data">80</p>
                </div>
              </li>
              <li>
                <div class="data_hide">
                  <p class="content_title">车辆数据</p>
                  <p class="data">102</p>
                </div>
              </li>
              <li>
                <div class="data_hide">
                  <p class="content_title">车辆数据</p>
                  <p class="data">05</p>
                </div>
              </li>
              <!-- <li>
                        <p class="content_title">车辆数据</p>
                        <p class="data">66</p>
                    </li>
                    <li>
                        <p class="content_title">车辆数据</p>
                        <p class="data">66</p>
                    </li>
                    <li>
                        <p class="content_title">车辆数据</p>
                        <p class="data">66</p>
              </li>-->
            </ul>
          </div>
        </div>
      </div>

      <div class="right">
        <div class="title">数据显示</div>
      </div>
    </div>
    <div class="center">
      <div class="left">
        <div class="title">数据概览</div>
        <div id="myChart"></div>
      </div>
      <div class="right">
        <div class="report">
          <div class="title">效果报告</div>
          <div class="content">
            <div class="describe" style="margin-top:7px;">
              <div class="number">40%</div>
              <div class="data">签到率 (日同比下降11%)</div>
            </div>
            <Progress :percent="25" :hide-info="true" :stroke-width="10" />
            <div class="describe" style="margin-top:13px">
              <div class="number">35%</div>
              <div class="data">签到率 (日同比上升30%)</div>
            </div>
            <Progress :percent="25" :hide-info="true" :stroke-width="10" />
          </div>
        </div>
        <div class="monitoring">
          <div class="title">实时监控</div>
          <div class="content">
            <div class="describe" style="margin-top:7px;">
              <div class="number">40%</div>
              <div class="data">签到率 (日同比下降11%)</div>
            </div>
            <Progress :percent="60" :hide-info="true" :stroke-width="10" />
            <div class="describe" style="margin-top:13px">
              <div class="number">35%</div>
              <div class="data">签到率 (日同比上升30%)</div>
            </div>
            <Progress :percent="80" :hide-info="true" status="wrong" :stroke-width="10" />
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="left">
        <Table border :columns="columns5" :data="data5"></Table>
        <Page :total="100" style="padding:20px 0 10px 0;background-color:#fff" />
      </div>
      <div class="right">
        <div id="myChart2"></div>
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import topTitle from "@$@/components/universal/title";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    topTitle
  },
  data() {
    //这里存放数据
    return {
      columns5: [
        {
          title: "Date",
          key: "date",
          sortable: true
        },
        {
          title: "Name",
          key: "name"
        },
        {
          title: "Age",
          key: "age",
          sortable: true
        },
        {
          title: "Address",
          key: "address"
        }
      ],
      data5: [
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03"
        },
        {
          name: "Jim Green",
          age: 24,
          address: "London No. 1 Lake Park",
          date: "2016-10-01"
        },
        {
          name: "Joe Black",
          age: 30,
          address: "Sydney No. 1 Lake Park",
          date: "2016-10-02"
        },
        {
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park",
          date: "2016-10-04"
        },
        {
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park",
          date: "2016-10-04"
        },
        {
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park",
          date: "2016-10-04"
        }
      ]
    };
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
    let myChart = this.$echarts.init(document.getElementById("myChart"));
    let myChart2 = this.$echarts.init(document.getElementById("myChart2"));

    var colors = ["#5793f3", "#d14a61", "#675bba"];
    // 绘制图表
    myChart.setOption({
      color: colors,

      tooltip: {
        trigger: "none",
        axisPointer: {
          type: "cross"
        }
      },
      legend: {
        data: ["2015 降水量", "2016 降水量"]
      },
      grid: {
        top: 70,
        bottom: 50
      },
      xAxis: [
        {
          type: "category",
          axisTick: {
            alignWithLabel: true
          },
          axisLine: {
            onZero: false,
            lineStyle: {
              color: colors[1]
            }
          },
          axisPointer: {
            label: {
              formatter: function(params) {
                return (
                  "降水量  " +
                  params.value +
                  (params.seriesData.length
                    ? "：" + params.seriesData[0].data
                    : "")
                );
              }
            }
          },
          data: [
            "2016-1",
            "2016-2",
            "2016-3",
            "2016-4",
            "2016-5",
            "2016-6",
            "2016-7",
            "2016-8",
            "2016-9",
            "2016-10",
            "2016-11",
            "2016-12"
          ]
        },
        {
          type: "category",
          axisTick: {
            alignWithLabel: true
          },
          axisLine: {
            onZero: false,
            lineStyle: {
              color: colors[0]
            }
          },
          axisPointer: {
            label: {
              formatter: function(params) {
                return (
                  "降水量  " +
                  params.value +
                  (params.seriesData.length
                    ? "：" + params.seriesData[0].data
                    : "")
                );
              }
            }
          },
          data: [
            "2015-1",
            "2015-2",
            "2015-3",
            "2015-4",
            "2015-5",
            "2015-6",
            "2015-7",
            "2015-8",
            "2015-9",
            "2015-10",
            "2015-11",
            "2015-12"
          ]
        }
      ],
      yAxis: [
        {
          type: "value"
        }
      ],
      series: [
        {
          name: "2015 降水量",
          type: "line",
          xAxisIndex: 1,
          smooth: true,
          data: [
            2.6,
            5.9,
            9.0,
            26.4,
            28.7,
            70.7,
            175.6,
            182.2,
            48.7,
            18.8,
            6.0,
            2.3
          ]
        },
        {
          name: "2016 降水量",
          type: "line",
          smooth: true,
          data: [
            3.9,
            5.9,
            11.1,
            18.7,
            48.3,
            69.2,
            231.6,
            46.6,
            55.4,
            18.4,
            10.3,
            0.7
          ]
        }
      ]
    });


    var weatherIcons = {
      Sunny: "../../img/home/车 拷贝 3@2x.png",
      Cloudy: "../../img/home/车 拷贝 4@2x.png",
      Showers: "../../img/home/车 拷贝 5@2x.png",
    };
    myChart2.setOption({
      title: {
        text: "车辆调度系统",
        subtext: "虚构数据",
        left: "center"
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        // orient: 'vertical',
        // top: 'middle',
        bottom: 10,
        left: "center",
        data: ["西凉", "益州", "兖州", "荆州", "幽州"]
      },
      series: [
        {
          type: "pie",
          radius: "50%",
          center: ["50%", "50%"],
          selectedMode: "single",
          data: [
            {
              value: 1548,
              name: "幽州",
              label: {
                normal: {
                  formatter: [
                    "{title|{b}}{abg|}",
                    "  {weatherHead|车辆}{valueHead|驾驶员}{rateHead|占比}",
                    "{hr|}",
                    "  {Sunny|}{value|202}{rate|55.3%}",
                    "  {Cloudy|}{value|142}{rate|38.9%}",
                    "  {Showers|}{value|21}{rate|5.8%}"
                  ].join("\n"),
                  backgroundColor: "#eee",
                  borderColor: "#777",
                  borderWidth: 1,
                  borderRadius: 4,
                  rich: {
                    title: {
                      color: "#eee",
                      align: "center"
                    },
                    abg: {
                      backgroundColor: "#333",
                      width: "100%",
                      align: "right",
                      height: 25,
                      borderRadius: [4, 4, 0, 0]
                    },
                    Sunny: {
                      height: 30,
                      align: "left",
                      backgroundColor: {
                        image: weatherIcons.Sunny
                      }
                    },
                    Cloudy: {
                      height: 30,
                      align: "left",
                      backgroundColor: {
                        image: weatherIcons.Cloudy
                      }
                    },
                    Showers: {
                      height: 30,
                      align: "left",
                      backgroundColor: {
                        image: weatherIcons.Showers
                      }
                    },
                    weatherHead: {
                      color: "#333",
                      height: 24,
                      align: "left"
                    },
                    hr: {
                      borderColor: "#777",
                      width: "100%",
                      borderWidth: 0.5,
                      height: 0
                    },
                    value: {
                      width: 20,
                      padding: [0, 20, 0, 30],
                      align: "left"
                    },
                    valueHead: {
                      color: "#333",
                      width: 20,
                      padding: [0, 20, 0, 30],
                      align: "center"
                    },
                    rate: {
                      width: 40,
                      align: "right",
                      padding: [0, 10, 0, 0]
                    },
                    rateHead: {
                      color: "#333",
                      width: 40,
                      align: "center",
                      padding: [0, 10, 0, 0]
                    }
                  }
                }
              }
            },
            { value: 535, name: "荆州" },
            { value: 510, name: "兖州" },
            { value: 634, name: "益州" },
            { value: 735, name: "西凉" }
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
@import url("../../css/dataCenter2.less");
</style>
<style>
  .bottom #myChart2>div, .bottom #myChart2>div>canvas{
    width: 100% !important;
  }
</style>