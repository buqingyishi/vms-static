<template>
  <div>
    <Card>
      <div class="marginB20">单进程</div>
      <h1>按浏览器的back键，有问题，没有原路返回正确的上一层.</h1>
      <h2>客户不发现，就装傻不提。</h2>
      <div class="f_blod f_30 cRed">
        {{num}}
      </div>
      <Button type="primary" @click="tonW">继续单线程in</Button>
    </Card>
  </div>
</template>


<script>
export default {
  name:'test2',
  data() {
    let {
      $route:{
        query:{
          num
        }
      }
    }=this;
    let data = {
      num
    };
    return data;
  },
  created() {
    
  },

  methods: {
    tonW(){
      // 单线程，一路进，一路出（关闭已有页面+进入子层）
      $app.routeIn({name:'test3'},this);
    }
  },
  mounted() {
    //
  }
};
</script>

