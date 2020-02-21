<!--  -->
<template>
  <div class="container">
    <topTitle :titleName="'财务结算'" :iconName="'logo-usd'"></topTitle>
    <div class="content">
      <Tabs value="name1" :animated="false">
        <TabPane label="全部费用" name="name1" style="padding:15px">
          <div class="search_content">
            <div class="left">
              <Button type="primary">添加费用</Button>
              <Button type="error" style="margin-left:30px">导出</Button>
              <Input v-model="searchContent" class="input_box" placeholder="搜索司机/订单/车辆"></Input>
              <Button type="primary" style="width:60px;margin-left:20px;">搜索</Button>
            </div>
            <div class="right">
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
              <span class="yesterday item" :class="date == 0?'active':''" @click="date = 0">昨天</span>
              <span class="today item" :class="date == 1?'active':''" @click="date = 1">今天</span>
              <span class="tomorrow item" :class="date == 2?'active':''" @click="date = 2">明天</span>
            </div>
          </div>
          <Table border :columns="columns6" :loading="loading" :data="data5">
            <template slot-scope="{ row, index }" slot="action">
              <Button
                type="primary"
                size="default"
                style="margin-right:10px"
                @click="detail(index)"
              >查看</Button>
              <Button type="error" size="default" @click="remove(index)">结清</Button>
            </template>
          </Table>
        </TabPane>
        <TabPane label="订单收入" name="name2" style="padding:15px">
          <div class="search_content">
            <div class="left">
              <Button type="primary">添加费用</Button>
              <Button type="error" style="margin-left:30px">导出</Button>
              <Input v-model="searchContent" class="input_box" placeholder="搜索司机/订单/车辆"></Input>
              <Button type="primary" style="width:60px;margin-left:20px;">搜索</Button>
            </div>
            <div class="right">
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
              <span class="yesterday item" :class="date == 0?'active':''" @click="date = 0">昨天</span>
              <span class="today item" :class="date == 1?'active':''" @click="date = 1">今天</span>
              <span class="tomorrow item" :class="date == 2?'active':''" @click="date = 2">明天</span>
            </div>
          </div>
          <Table border :columns="columns6" :loading="loading" :data="data5">
            <template slot-scope="{ row, index }" slot="action">
              <Button
                type="primary"
                size="default"
                style="margin-right:10px"
                @click="detail(index)"
              >查看</Button>
              <Button type="error" size="default" @click="remove(index)">结清</Button>
            </template>
          </Table>
        </TabPane>
        <TabPane label="订单支出" name="name3" style="padding:15px">
          <div class="search_content">
            <div class="left">
              <Button type="primary">添加费用</Button>
              <Button type="error" style="margin-left:30px">导出</Button>
              <Input v-model="searchContent" class="input_box" placeholder="搜索司机/订单/车辆"></Input>
              <Button type="primary" style="width:60px;margin-left:20px;">搜索</Button>
            </div>
            <div class="right">
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
              <span class="yesterday item" :class="date == 0?'active':''" @click="date = 0">昨天</span>
              <span class="today item" :class="date == 1?'active':''" @click="date = 1">今天</span>
              <span class="tomorrow item" :class="date == 2?'active':''" @click="date = 2">明天</span>
            </div>
          </div>
          <Table border :columns="columns6" :loading="loading" :data="data5">
            <template slot-scope="{ row, index }" slot="action">
              <Button
                type="primary"
                size="default"
                style="margin-right:10px"
                @click="detail(index)"
              >查看</Button>
              <Button type="error" size="default" @click="remove(index)">结清</Button>
            </template>
          </Table>
        </TabPane>
        <TabPane label="非订单收入" name="name4" style="padding:15px">
          <div class="search_content">
            <div class="left">
              <Button type="primary">添加费用</Button>
              <Button type="error" style="margin-left:30px">导出</Button>
              <Input v-model="searchContent" class="input_box" placeholder="搜索司机/订单/车辆"></Input>
              <Button type="primary" style="width:60px;margin-left:20px;">搜索</Button>
            </div>
            <div class="right">
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
              <span class="yesterday item" :class="date == 0?'active':''" @click="date = 0">昨天</span>
              <span class="today item" :class="date == 1?'active':''" @click="date = 1">今天</span>
              <span class="tomorrow item" :class="date == 2?'active':''" @click="date = 2">明天</span>
            </div>
          </div>
          <Table border :columns="columns6" :loading="loading" :data="data5">
            <template slot-scope="{ row, index }" slot="action">
              <Button
                type="primary"
                size="default"
                style="margin-right:10px"
                @click="detail(index)"
              >查看</Button>
              <Button type="error" size="default" @click="remove(index)">结清</Button>
            </template>
          </Table>
        </TabPane>
        <TabPane label="非订单支出" name="name5" style="padding:15px">
          <div class="search_content">
            <div class="left">
              <Button type="primary">添加费用</Button>
              <Button type="error" style="margin-left:30px">导出</Button>
              <Input v-model="searchContent" class="input_box" placeholder="搜索司机/订单/车辆"></Input>
              <Button type="primary" style="width:60px;margin-left:20px;">搜索</Button>
            </div>
            <div class="right">
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
              <span class="yesterday item" :class="date == 0?'active':''" @click="date = 0">昨天</span>
              <span class="today item" :class="date == 1?'active':''" @click="date = 1">今天</span>
              <span class="tomorrow item" :class="date == 2?'active':''" @click="date = 2">明天</span>
            </div>
          </div>
          <Table border :columns="columns6" :loading="loading" :data="data5">
            <template slot-scope="{ row, index }" slot="action">
              <Button
                type="primary"
                size="default"
                style="margin-right:10px"
                @click="detail(index)"
              >查看</Button>
              <Button type="error" size="default" @click="remove(index)">结清</Button>
            </template>
          </Table>
        </TabPane>
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
      loading: true,
      date: 0,
      searchContent: "",
      columns6: [
        {
          title: "类型",
          key: "type"
        },
        {
          title: "收/付款人",
          key: "gatheringOrPay",
          type: "html"
        },
        {
          title: "车辆",
          key: "car"
        },
        {
          title: "金额",
          key: "money",
          sortable: true
        },
        {
          title: "日期",
          key: "date",
          sortable: true
        },
        {
          title: "是否结清",
          key: "ifSettle",
          type: "html",
          filters: [
            {
              label: "未结清",
              value: 1
            },
            {
              label: "已结清",
              value: 2
            }
          ],
          filterMultiple: false,
          filterMethod(value, row) {
            console.log(value);
            console.log(row);
            if (value === 1) {
              return row.ifSettle == "未结清";
            } else if (value === 2) {
              return row.ifSettle == "已结清";
            }
          }
        },
        {
          title: "操作",
          slot: "action",
          align: "center"
        }
      ],
      data5: [
        {
          type: "订单支出",
          gatheringOrPay:
            "<span style='color:#1190fc'>一颗牙疼</span><br><span>13266101017<span>",
          car: "测A88888",
          money: "-10.00",
          date: "2016-10-04",
          ifSettle: "<span style='color:#ff0000'>未结清<span>"
        },
        {
          type: "订单支出",
          gatheringOrPay:
            "<span style='color:#1190fc'>一颗牙疼</span><br><span>13266101017<span>",
          car: "测A88888",
          money: "10.00",
          date: "2016-10-02",
          ifSettle: "<span style='color:#ff0000'>未结清<span>"
        },
        {
          type: "订单支出",
          gatheringOrPay:
            "<span style='color:#1190fc'>一颗牙疼</span><br><span>13266101017<span>",
          car: "测A88888",
          money: "-9.00",
          date: "2016-10-01",
          ifSettle: "<span style='color:#1190fc'>已结清<span>"
        },
        {
          type: "订单支出",
          gatheringOrPay:
            "<span style='color:#1190fc'>一颗牙疼</span><br><span>13266101017<span>",
          car: "测A88888",
          money: "12.00",
          date: "2016-10-03",
          ifSettle: "<span style='color:#1190fc'>已结清<span>"
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
  created() {
    this.loading = false;
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
@import url("../../../_$_project/css/settlement.less");
.ivu-btn-primary {
  background-color: #1190fc;
}
</style>