<!--  -->
<template>
<div class='container'>
    <topTitle :titleName="'设置'" :iconName="'md-settings'"></topTitle>
    <div class="content">
      <div class="operation">
            <div class="left">
              <Button type="primary" class="button" @click="modal4 = true">添加管理员</Button>
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
              <Button type="error" size="default" style @click="remove(index)">转移管理员权限</Button>
            </template>
          </Table>
    </div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import topTitle from '@$@/components/universal/title'
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
          title: "管理员姓名",
          width: 120,
          key: "name"
        },
        {
          title: "手机号码",
          key: "phoneNumber"
        },
        {
          title: "分组权限",
          key: "root"
        },
        {
          title: "默认分组",
          key: "grouping"
        },
        {
          title: "操作",
          slot: "action",
          width: 260,
          align: "center"
        }
      ],
      data1: [
        {
          name: "慧红",
          phoneNumber: "13266101017",
          root: "默认分组",
          grouping: "默认分组",
        },
        {
          name: "慧红",
          phoneNumber: "13266101017",
          root: "默认分组",
          grouping: "默认分组",
        },
        {
          name: "慧红",
          phoneNumber: "13266101017",
          root: "默认分组",
          grouping: "默认分组",
        },
      ],
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {

},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
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
}
.content {
  background-color: #fff;
}
</style>