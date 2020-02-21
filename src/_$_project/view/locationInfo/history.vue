<!--  -->
<template>
  <div class="container">
    <topTitle :title-name="'历史记录'" :icon-name="'md-pie'"></topTitle>
    <div class="content">
      <div class="operation">
        <div class="left">
          <Input
            v-model="value"
            class="search_content"
            placeholder="搜索车牌号"
            style="width:200px;margin-left:30px;"
          ></Input>
          <Button type="primary" style="width:60px;margin-left:20px;">搜索</Button>
        </div>
        <div class="right">
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
          <span
            class="three_day item"
            @click="selectTime(0)"
            :style="{backgroundColor:(selectTimeIndex == 0?'#018ef5':'#ffffff'),color:(selectTimeIndex == 0?'#ffffff':'#018ef5')}"
          >近三天</span>
          <span
            class="week item"
            @click="selectTime(1)"
            :style="{backgroundColor:(selectTimeIndex == 1?'#018ef5':'#ffffff'),color:(selectTimeIndex == 1?'#ffffff':'#018ef5')}"
          >本周</span>
          <span
            class="next_week item"
            @click="selectTime(2)"
            :style="{backgroundColor:(selectTimeIndex == 2?'#018ef5':'#ffffff'),color:(selectTimeIndex == 2?'#ffffff':'#018ef5')}"
          >下周</span>
        </div>
      </div>
      <Table :columns="columns1" :data="data1" border="true">
        <template slot-scope="{ row, index }" slot="action">
          <!-- <Button type="primary" size="default" style="margin-right: 5px" @click="hint(index)">查看车辆</Button>
          <!-- <Button type="error" size="default" style="margin-right: 5px" @click="hint(index)">编辑围栏</Button> -->
          <Button type="error" size="default" style="margin-right: 5px" @click="hint(index)">删除</Button> 
        </template>
      </Table>
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
          title: "车牌号",
          key: "carNumber",
          width: 150
        },
        {
          title: "里程数(km)",
          key: "mileage"
        },
        {
          title: "行车时间",
          key: "driveTime"
        },
        {
          title: "总时长",
          key: "totalTime"
        },
        {
          title: "油耗(L)",
          key: "fuelConsumption",
        },
        {
          title: "平均油耗(L/100km)",
          key: "averageFuelConsumption",
        },
        {
          title: "最高速度(km/h)",
          key: "maxSpeed",
        },
        {
          title: "平均速度(km/h)",
          key: "averageSpeed",

        },
        {
          title: "驾驶行为",
          key: "driveBehavior",
        },
        {
          title: "故障码",
          key: "faultCode",
        },
        {
          title: "操作",
          slot: "action",
          align: "center",
        }
      ],
      data1: [
        {
          carNumber: "粤S05D75",
          mileage: "11",
          driveTime: "50分钟",
          totalTime: "1小时",
          fuelConsumption: "1",
          averageFuelConsumption: "2",
          maxSpeed: "5",
          averageSpeed: "5",
          driveBehavior: "安全",
          faultCode: "004",
        },
        {
          carNumber: "粤S05D75",
          mileage: "11",
          driveTime: "50分钟",
          totalTime: "1小时",
          fuelConsumption: "1",
          averageFuelConsumption: "2",
          maxSpeed: "5",
          averageSpeed: "5",
          driveBehavior: "安全",
          faultCode: "004",
        },
        {
          carNumber: "粤S05D75",
          mileage: "11",
          driveTime: "50分钟",
          totalTime: "1小时",
          fuelConsumption: "1",
          averageFuelConsumption: "2",
          maxSpeed: "5",
          averageSpeed: "5",
          driveBehavior: "安全",
          faultCode: "004",
        },
      ],
      selectTimeIndex:0
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
      selectTime(e) {
      this.selectTimeIndex = e;
    },
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
  padding: 0 20px;
  box-sizing: border-box;
}
.operation {
  line-height: 65px;
  padding-left: 3px;
  box-sizing: border-box;
  position: relative;
  .left {
    .button {
      margin-left: 20px;
    }
  }
  .right {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 20px;
    .button {
      margin-right: 20px;
    }
    .item {
      width: 60px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      display: inline-block;
      vertical-align: middle;
      border: 1px solid #018ef5;
      cursor: pointer;
    }

    .three_day {
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
      margin-left: 40px;
    }

    .week,
    .next_week {
      background-color: #fff;
      color: #018ef5;
      border-left: 0;
    }

    .next_week {
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
    }
  }
}
.content {
  background-color: #fff;
}
</style>