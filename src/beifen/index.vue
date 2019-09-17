<template>
  <div class="home">首页
    <button @click="visible=true">开始扫描</button>
    <div>扫描结果：{{scanResult}}</div> 
    <ScanBarcode :errorFun='errorFun' :scanVisible.sync='visible' @succsssFun = successFun></ScanBarcode> 
  </div>
</template>

<script>
import { ScanBarcode } from "@/components/index";
export default {
  name: "index",
  components: {
    ScanBarcode
  },
  data(){
    return {
      visible:false,
      scanResult:''
    }
  },
  methods:{
    errorFun(err){
      this.scanResult = err;
    },
    successFun(result){
      this.visible = false;
      this.scanResult = result
    }
  }
};
</script>


<style lang="less" scoped>
</style>
// 