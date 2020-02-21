<!--  -->
<template>
  <div class="container">
    <topTitle :titleName="'财务报表'" :iconName="'logo-usd'"></topTitle>
    <div class="content">
      <Tabs value="name1" :animated="false">
        <TabPane label="按日期" name="name1" style="padding:15px">
          <div class="search_content">
            <div class="left">
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
              <span class="query item active">查询</span>
              <span class="lastMonth item" :class="date == 0?'active':''" @click="date = 0">上月</span>
              <span class="thisMonth item" :class="date == 1?'active':''" @click="date = 1">本月</span>
            </div>
            <div class="right">
              <Button type="primary" style="margin-right:30px">导出</Button>
            </div>
          </div>
          <div id="myChart"></div>
          <Table border :columns="columns1" :data="data1"></Table>
          <Page :total="100" show-total style="text-align:right;margin-top:20px"/>
        </TabPane>
        <TabPane label="按司机" name="name2">标签二的内容</TabPane>
        <TabPane label="按车辆" name="name3">标签三的内容</TabPane>
        <TabPane label="按客户" name="name4">标签三的内容</TabPane>
      </Tabs>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import topTitle from "@$@/components/universal/title"; //标题组件
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    topTitle
  },
  data() {
    //这里存放数据
    return {
      date: 0,
      columns1: [
        {
          title: "日期",
          key: "date"
        },
        {
          title: "应收",
          key: "receivable"
        },
        {
          title: "已收",
          key: "received"
        },
        {
          title: "未收",
          key: "uncollected"
        },
        {
          title: "应付",
          key: "copeWith"
        },
        {
          title: "已付",
          key: "paid"
        },
        {
          title: "未付",
          key: "unpaid"
        },
        {
          title: "利润",
          key: "profit"
        },
      ],
      data1: [
        {
          date: "2016-10-03",
          receivable: "¥0.00",
          received: "¥0.00",
          uncollected: "¥0.00",
          copeWith: "¥0.00",
          paid: "¥0.00",
          unpaid: "¥0.00",
          profit: "¥0.00",
        },
        {
          date: "2016-10-03",
          receivable: "¥0.00",
          received: "¥0.00",
          uncollected: "¥0.00",
          copeWith: "¥0.00",
          paid: "¥0.00",
          unpaid: "¥0.00",
          profit: "¥0.00",
        },
        {
          date: "2016-10-03",
          receivable: "¥0.00",
          received: "¥0.00",
          uncollected: "¥0.00",
          copeWith: "¥0.00",
          paid: "¥0.00",
          unpaid: "¥0.00",
          profit: "¥0.00",
        },
        {
          date: "2016-10-03",
          receivable: "¥0.00",
          received: "¥0.00",
          uncollected: "¥0.00",
          copeWith: "¥0.00",
          paid: "¥0.00",
          unpaid: "¥0.00",
          profit: "¥0.00",
        },
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
@import url("../../css/financeStatement.less");
</style>