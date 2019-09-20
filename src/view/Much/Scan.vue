<template>
  <div>
    <app-header :title="title" :isShow="true"></app-header>
    <div class="content">
      <div class="cargo">
        <div class="scan-wrapper">
          <div class="bg-img" :style="note"></div>
          <button class="btn" @click="visible=true">请点击按钮 扫码</button>
        </div>
      </div>
    </div>
    <ScanBarcode  :errorFun="errorFun" :scanVisible.sync="visible" @succsssFun="successFun"></ScanBarcode>
  </div>
</template>

<script>
import Vue from 'vue';
import { Toast } from 'vant';
Vue.use(Toast);
import Header from "../../components/header/Header";
import { ScanBarcode } from "@/components/index";
import { check } from "../../api/goods"
export default {
  data() {
    return {
      title: "统货扫码",
      visible:false,
      scanResult:'',
      note: {
        backgroundImage: "url(" + require("../../assets/image/scan.png") + ")",
        backgroundRepeat: "no-repeat"
      },
      goodsList:[],
    };
  },
  components: {
    "app-header": Header,
     ScanBarcode
  },
  mounted(){
      this.orderId = this.$route.params.orderId; 
  },
  methods: {
    errorFun(err) {
      this.scanResult = err;
      Toast('扫码失败，请重新扫码');
    },
    successFun(result) {
      this.visible = false;
      this.scanResult = result;
      
        // 验证二维码接口
        let params = {
          coding:this.scanResult
        }
        check(params).then(res =>{
          // debugger
           if(res.code == 0){
              Toast({
                message: "扫码成功",
                duration: 500
              });
              setTimeout(() => {  
                 this.$router.push({name: 'cargo', params: {idCode:this.scanResult,orderId:this.orderId}});      
                // this.$router.push({name: 'cargo', params: {idCode:this.scanResult,goodsList:this.goodsList}});       
              }, 650); 
           }
        })       
    }
  }
};
</script>


<style scoped lang='less'>
.cargo {
  width: 94%;
  height: 90%;
  margin: 0.3rem auto;
  background-color: #fff;
  position: relative;
  border: 0.01rem solid #e4e4e4;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .scan-wrapper {
    margin: 0 auto;

    .bg-img {
      width: 3rem;
      height: 3rem;
      background-size: contain;
      margin-bottom: -0.2rem;
    }
    .btn {
      width: 3rem;
      height: 0.8rem;
      line-height: 0.45rem;
      outline: none;
      border: none;
      background-color: #e3e3e3;
      font-size: 0.3rem;
      color: #838383;
      border-radius: 0.05rem;
      box-sizing: border-box;
      padding: 0.2rem;
      text-align: center;
    }
  }
}
</style>