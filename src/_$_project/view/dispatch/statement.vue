<!--  -->
<template>
  <div class="container">
    <topTitle :titleName="'报表'" :iconName="'md-stats'"></topTitle>
    <div class="data_show">
      <div class="item">
        <div class="left">
          <img src="../../img/userInfo.png" alt />
        </div>
        <div class="right">
          <div class="data_one">数据显示</div>
          <div class="data_number">100,500</div>
        </div>
      </div>
      <div class="item">
        <div class="left">
          <img src="../../img/message.png" alt />
        </div>
        <div class="right">
          <div class="data_one">数据显示</div>
          <div class="data_number">97,320</div>
        </div>
      </div>
      <div class="item">
        <div class="left">
          <img src="../../img/data.png" alt />
        </div>
        <div class="right">
          <div class="data_one">数据显示</div>
          <div class="data_number">267,910</div>
        </div>
      </div>
      <div class="item last">
        <div class="left">
          <img src="../../img/execute.png" alt />
        </div>
        <div class="right">
          <div class="data_one">数据显示</div>
          <div class="data_number">45,320</div>
        </div>
      </div>
    </div>
    <div class="content">
      <Tabs value="name1" :animated="false">
        <TabPane label="按日期" name="name1">
          <!-- <div class="operation">
            <div class="left">
              <Row style="display:inline-block;vertical-align: middle;margin-left:10px">
                <Col span="12">
                  <Date-picker type="date" size="small" placeholder="选择日期" style="width: 150px;"></Date-picker>
                </Col>
              </Row>
              <span class="end-of" style="margin-left:13px">至</span>
              <Row style="display:inline-block;vertical-align: middle;margin-left:13px">
                <Col span="12">
                  <Date-picker type="date" size="small" placeholder="选择日期" style="width: 150px;"></Date-picker>
                </Col>
              </Row>
            </div>
            <div class="right">
              <Button type="primary" class="button">导出</Button>
            </div>
          </div>-->
          <div id="myChart"></div>
          <div style="padding:0 20px">
            <Table class="table" :columns="columns1" style="margin-top:20px;" :data="data1"></Table>
          </div>
          <Page :total="100" style="text-align:center;margin-top:30px;margin-bottom:30px" />
        </TabPane>
        <TabPane label="按司机" name="name2">
          <div class="operation">
            <div class="left">
              <Row style="display:inline-block;vertical-align: middle;margin-left:10px">
                <Col span="12">
                  <Date-picker type="date" size="small" placeholder="选择日期" style="width: 150px;"></Date-picker>
                </Col>
              </Row>
              <span class="end-of" style="margin-left:13px">至</span>
              <Row style="display:inline-block;vertical-align: middle;margin-left:13px">
                <Col span="12">
                  <Date-picker type="date" size="small" placeholder="选择日期" style="width: 150px;"></Date-picker>
                </Col>
              </Row>
            </div>
            <div class="right">
              <Button type="primary" class="button">导出</Button>
            </div>
          </div>
        </TabPane>
        <TabPane label="按车辆" name="name3">
          <div class="operation">
            <div class="left">
              <Row style="display:inline-block;vertical-align: middle;margin-left:10px">
                <Col span="12">
                  <Date-picker type="date" size="small" placeholder="选择日期" style="width: 150px;"></Date-picker>
                </Col>
              </Row>
              <span class="end-of" style="margin-left:13px">至</span>
              <Row style="display:inline-block;vertical-align: middle;margin-left:13px">
                <Col span="12">
                  <Date-picker type="date" size="small" placeholder="选择日期" style="width: 150px;"></Date-picker>
                </Col>
              </Row>
            </div>
            <div class="right">
              <Button type="primary" class="button">导出</Button>
            </div>
          </div>
        </TabPane>
        <TabPane label="按用车单位" name="name4">
          <div class="operation">
            <div class="left">
              <Row style="display:inline-block;vertical-align: middle;margin-left:10px">
                <Col span="12">
                  <Date-picker type="date" size="small" placeholder="选择日期" style="width: 150px;"></Date-picker>
                </Col>
              </Row>
              <span class="end-of" style="margin-left:13px">至</span>
              <Row style="display:inline-block;vertical-align: middle;margin-left:13px">
                <Col span="12">
                  <Date-picker type="date" size="small" placeholder="选择日期" style="width: 150px;"></Date-picker>
                </Col>
              </Row>
            </div>
            <div class="right">
              <Button type="primary" class="button">导出</Button>
            </div>
          </div>
        </TabPane>
      </Tabs>
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
      columns1: [
        {
          title: "日期",
          key: "date"
        },
        {
          title: "未分配司机",
          key: "undistributed"
        },
        {
          title: "未执行任务",
          key: "noExecute"
        },
        {
          title: "执行任务",
          key: "execute"
        },
        {
          title: "合计",
          key: "total"
        }
      ],
      data1: [
        {
          date: "2019-11-01",
          undistributed: 18,
          noExecute: 10,
          execute: 0,
          total: "100"
        },
        {
          date: "2019-11-01",
          undistributed: 18,
          noExecute: 10,
          execute: 0,
          total: "100"
        },
        {
          date: "2019-11-01",
          undistributed: 18,
          noExecute: 10,
          execute: 0,
          total: "100"
        },
        {
          date: "2019-11-01",
          undistributed: 18,
          noExecute: 10,
          execute: 0,
          total: "100"
        },
        {
          date: "2019-11-01",
          undistributed: 18,
          noExecute: 10,
          execute: 0,
          total: "100"
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
    // 初始化echarts实例
    let myChart = this.$echarts.init(document.getElementById("myChart"));
    // 绘制图表
    myChart.setOption({
      xAxis: {
        type: "category",
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
      },
      backgroundColor: "transparent",
      yAxis: {
        type: "value"
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: "line",
          smooth: true
        },
        {
          data: [1200, 932, 300, 820, 1000, 800, 1320],
          type: "line",
          smooth: true
        }
      ],
      grid: {
        top: "50px",
        left: "50px",
        right: "15px",
        bottom: "50px"
      }
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
.container {
  width: 100%;
  height: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.data_show {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  .item {
    flex: 1;
    background-color: #fff;
    margin-right: 2%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 30px;
    box-sizing: border-box;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    // cursor: pointer;
    .left {
      img {
        width: 55px;
        height: 55px;
      }
    }
    .right {
      .data_one {
        font-size: 16px;
        color: rgba(0, 0, 0, 0.45);
        margin-bottom: 8px;
      }
      .data_number {
        font-size: 20px;
        font-weight: 700;
        color: #666;
      }
    }
  }
  .last {
    margin-right: 0%;
  }
}
// .operation {
//   line-height: 65px;
//   padding-left: 3px;
//   box-sizing: border-box;
//   position: relative;
//   border-bottom: 1px solid #ddd;
//   .left {
//     .button {
//       margin-left: 20px;
//     }
//   }
//   .right {
//     position: absolute;
//     top: 50%;
//     transform: translateY(-50%);
//     right: 20px;
//     .button {
//       margin-right: 20px;
//     }
//   }
// }
#myChart {
  width: 98%;
  height: 300px;
  // margin-top: 20px;
  margin: 20px auto 0;
}
.content {
  background-color: #fff;
}
</style>