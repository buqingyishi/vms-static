<!--  -->
<template>
  <div class="component_title">
    <!-- <Icon class="title_icon icon" :type="iconName" size="18" /> -->
    <span class="title_name">{{titleName}}</span>
    <Icon
      class="no_star icon"
      @click="clickStar('success')"
      v-if="showStar == false"
      type="md-star-outline"
      size="20"
      color="#c4c4c4"
    />
    <Icon
      class="yes_star icon"
      @click="clickStar('error')"
      v-if="showStar == true"
      type="md-star"
      size="20"
      color="#f5ba03"
    />
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: {
    titleName: String,
    iconName: String
  },
  data() {
    //这里存放数据
    return {
      showStar: false
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    clickStar(type) {
      this.showStar = !this.showStar;
      if (this.showStar == true) {
        this.$Message[type]({
          background: true,
          content: "收藏成功"
        });
      }else{
        this.$Message[type]({
          background: true,
          content: "已取消收藏"
        });
      }
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
.component_title {
  line-height: 45px;
  // border-left: 3px solid #1190fc;
  .title_name {
    font-size: 16px;
    color: #333333;
    vertical-align: middle;
    margin-left: 11px;
  }
  .icon {
    vertical-align: middle;
    cursor: pointer;
  }
  .icon {
    margin-left: 10px;
  }
}
</style>
<style>
.component_title::before{
  content:"";
  display: inline-block;
  width: 3px;
  height: 22px;
  background-color: #1190fc;
  vertical-align: middle;
}
</style>