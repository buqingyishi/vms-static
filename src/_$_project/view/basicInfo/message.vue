<!--  -->
<template>
  <div class="container">
    <topTitle :title-name="'消息列表'" :icon-name="'md-mail'"></topTitle>
    <div class="content">
      <Tabs value="name1" :animated="false">
        <TabPane label="全部消息" name="name1" style="padding: 0 20px;">
          <div class="operation">
            <div class="left">
              <Button type="primary" class="button" @click="modal4 = true">标为已读</Button>
              <Button type="error" class="button" @click="remove(index)">批量删除</Button>
              <Input
                v-model="value"
                class="search_content"
                placeholder="搜索日期 / 类型"
                style="width:200px;margin-left:30px;"
              ></Input>
              <Button type="primary" style="width:60px;margin-left:20px;">搜索</Button>
            </div>
          </div>
          <Table :columns="columns1" :data="data1">
            <template slot-scope="{ row, index }" slot="action">
              <Button
                type="error"
                size="default"
                style="margin-right: 5px"
                @click="remove(index)"
              >删除</Button>
            </template>
          </Table>
        </TabPane>
        <TabPane label="未读消息" name="name2" style="padding: 0 20px;">
          <div class="operation">
            <div class="left">
              <Button type="error" class="button" @click="remove(index)">批量删除</Button>
              <Button type="primary" class="button" @click="modal4 = true">标位已读</Button>
            </div>
          </div>
          <Table :columns="columns1" :data="data1">
            <template slot-scope="{ row, index }" slot="action">
              <Button
                type="error"
                size="default"
                style="margin-right: 5px"
                @click="remove(index)"
              >删除</Button>
            </template>
          </Table>
        </TabPane>
        <TabPane label="已读消息" name="name3" style="padding: 0 20px;">
            <div class="operation">
            <div class="left">
              <Button type="error" class="button" @click="remove(index)">批量删除</Button>
            </div>
          </div>
          <Table :columns="columns1" :data="data1">
            <template slot-scope="{ row, index }" slot="action">
              <Button
                type="error"
                size="default"
                style="margin-right: 5px"
                @click="remove(index)"
              >删除</Button>
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
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "时间",
          key: "time"
        },
        {
          title: "标题",
          key: "title"
        },
        {
          title: "类型",
          key: "type"
        },
        {
          title: "操作",
          slot: "action",
          align: "center"
        }
      ],
      data1: [
        {
          time: "2019-10-28 11:14:02",
          title: "我需要一台车",
          type: "外包车辆"
        },
        {
          time: "2019-10-28 11:14:02",
          title: "我需要一台车",
          type: "自由车辆"
        },
        {
          time: "2019-10-28 11:14:02",
          title: "我需要一台车",
          type: "外包车辆"
        },
        {
          time: "2019-10-28 11:14:02",
          title: "我需要二台车",
          type: "外包车辆"
        }
      ]
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    remove(index) {
      this.data1.splice(index, 1);
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
      margin-right: 20px;
    }
  }
}
.content {
  background-color: #fff;
}
</style>