<template>
  <div>
    <Card>
      <Button type="error" @click="$app.routeIn({name:'test4'},$route)">在进下一层</Button>
    </Card>
  </div>
</template>


<script>
export default {
  name:'test3',
  data() {
    let data = {};
    return data;
  },
  created() {
    
  },

  methods: {
  },
  mounted() {
    //
  }
};
</script>

