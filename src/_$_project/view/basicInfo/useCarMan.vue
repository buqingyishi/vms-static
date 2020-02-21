<!--  -->
<template>
  <div class="container useCarMan">
    <topTitle :titleName="'用车人'" :iconName="'md-person'"></topTitle>
    <div class="content">
      <!-- <Menu mode="horizontal" active-name="1" class="nav">
        <Menu-item name="1">全部</Menu-item>
        <Menu-item name="2">用车单位/部门</Menu-item>
      </Menu>-->
      <Tabs value="name1" :animated="false">
        <TabPane label="用车人" name="name1">
          <div class="operation">
            <div class="left">
              <Button type="primary" class="button" @click="modal4 = true">新增</Button>
              <Button type="primary" class="button" @click="modal4 = true">编辑</Button>
              <Button type="error" class="button">删除</Button>
              <Button type="primary" class="button" @click="modal4 = true">批量导入</Button>
              <Input
                v-model="value"
                class="search_content"
                placeholder="搜索用车人/单位/手机号码"
                style="width:200px;margin-left:30px;"
              ></Input>
              <Button type="primary" style="width:60px;margin-left:20px;">搜索</Button>
            </div>
            <div class="right">
              <Button type="primary" class="button">导出</Button>
              <ButtonGroup>
                <Button icon="md-sync"></Button>
                <Button icon="ios-keypad"></Button>
              </ButtonGroup>
            </div>
          </div>
          <Table border ref="selection" :columns="columns4" :data="data1">
            <template slot-scope="{ row, index }" slot="action">
              <Button
                type="primary"
                size="default"
                style="margin-right: 5px;"
                @click="detail(index)"
              >详情</Button>
              <Button type="error" size="default" style @click="remove(index)">编辑</Button>
            </template>
          </Table>
        </TabPane>
        <TabPane label="用车单位/部门" name="name2">
          <div class="operation">
            <div class="left">
              <Button type="primary" class="button" @click="modal4 = true">新增</Button>
              <Button type="error" class="button">删除</Button>
              <Input
                v-model="value"
                class="search_content"
                placeholder="搜索用车人/单位/手机号码"
                style="width:200px;margin-left:30px;"
              ></Input>
              <Button type="primary" style="width:60px;margin-left:20px;">搜索</Button>
            </div>
            <div class="right">
              <Button type="primary" class="button">导出</Button>
              <ButtonGroup>
                <Button icon="md-sync"></Button>
                <Button icon="ios-keypad"></Button>
              </ButtonGroup>
            </div>
          </div>
          <Table border ref="selection" :columns="columns5" :data="data2">
            <template slot-scope="{ row, index }" slot="action">
              <Button
                type="primary"
                size="default"
                style="margin-right: 5px;"
                @click="detail(index)"
              >详情</Button>
              <Button type="error" size="default" style @click="remove(index)">编辑</Button>
            </template>
          </Table>
        </TabPane>
      </Tabs>

      <Page :total="100" style="text-align:center;margin-top:30px;" />
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import topTitle from "@$@/components/universal/title"
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    topTitle
  },
  data() {
    //这里存放数据
    return {
      columns4: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "姓名",
          width: 100,
          key: "name"
        },
        {
          title: "手机号码",
          key: "phoneNumber"
        },
        {
          title: "部门",
          key: "department"
        },
        {
          title: "允许订车",
          key: "dingChe"
        },
        {
          title: "允许审批",
          key: "apply"
        },
        {
          title: "备注",
          key: "remark"
        },
        {
          title: "操作",
          slot: "action",
          width: 180,
          align: "center"
        }
      ],
      columns5: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "用车部门",
          width: 100,
          key: "department"
        },
        {
          title: "分组",
          key: "grouping"
        },
        {
          title: "发票抬头",
          key: "invoice"
        },
        {
          title: "地址",
          key: "address"
        },
        {
          title: "操作",
          slot: "action",
          width: 180,
          align: "center"
        }
      ],
      data1: [
        {
          name: "慧红",
          phoneNumber: "13266101017",
          department: "技术部",
          dingChe: "是",
          apply: "否",
          remark: "---"
        },
        {
          name: "豪哥",
          phoneNumber: "13266107777",
          department: "市场部",
          dingChe: "是",
          apply: "否",
          remark: "---"
        },
        {
          name: "田哥",
          phoneNumber: "13233461017",
          department: "技术部",
          dingChe: "是",
          apply: "否",
          remark: "---"
        },
        {
          name: "慧红",
          phoneNumber: "13277961017",
          department: "技术部",
          dingChe: "是",
          apply: "否",
          remark: "---"
        }
      ],
      data2: [
        {
          department: "技术部",
          grouping: "你好组",
          invoice: "广东省东莞市",
          address: "广东省东莞市南城区",
        },
        {
          department: "技术部",
          grouping: "你好组",
          invoice: "广东省东莞市",
          address: "广东省东莞市南城区",
        },
        {
          department: "技术部",
          grouping: "你好组",
          invoice: "广东省东莞市",
          address: "广东省东莞市南城区",
        },
        {
          department: "技术部",
          grouping: "你好组",
          invoice: "广东省东莞市",
          address: "广东省东莞市南城区",
        },
      ],
      model1: "",
      modal4: false,
      value: "",
      showStar: false,

      formValidate: {
        name: "",
        mail: "",
        city: "",
        gender: "",
        interest: [],
        date: "",
        time: "",
        desc: ""
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur"
          }
        ],
        mail: [
          {
            required: true,
            message: "Mailbox cannot be empty",
            trigger: "blur"
          },
          { type: "email", message: "Incorrect email format", trigger: "blur" }
        ],
        city: [
          {
            required: true,
            message: "Please select the city",
            trigger: "change"
          }
        ],
        gender: [
          { required: true, message: "Please select gender", trigger: "change" }
        ],
        interest: [
          {
            required: true,
            type: "array",
            min: 1,
            message: "Choose at least one hobby",
            trigger: "change"
          },
          {
            type: "array",
            max: 2,
            message: "Choose two hobbies at best",
            trigger: "change"
          }
        ],
        date: [
          {
            required: true,
            type: "date",
            message: "Please select the date",
            trigger: "change"
          }
        ],
        time: [
          {
            required: true,
            type: "string",
            message: "Please select time",
            trigger: "change"
          }
        ],
        desc: [
          {
            required: true,
            message: "Please enter a personal introduction",
            trigger: "blur"
          },
          {
            type: "string",
            min: 20,
            message: "Introduce no less than 20 words",
            trigger: "blur"
          }
        ]
      }
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    clickStar() {
      this.showStar = !this.showStar;
    },
    // 详情
    detail() {
      window.console.log(11111);
      this.$router.push({ path: "/driverDetail" });
      // $app.routeIn({path:'/carDetail'})
    }
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
@import url("../../css/diaodu.less");
</style>
<style>
.useCarMan .ivu-modal-body {
  padding: 0 16px !important;
}
.content .ivu-tabs-bar {
  margin-bottom: 0;
}
.ivu-menu{
  z-index: 10;
}
</style>