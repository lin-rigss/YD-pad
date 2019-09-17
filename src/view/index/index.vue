<template>
  <div class="home">
    <app-header :title="title" :isShow="false" :isquit='true'></app-header>
    <div class="content">
      <div class="wrapper">

       
          <ul class="part">
             <li class="part-img" @click="() => scan(1)">
              <div class="wrapper-l" :style="note">
                <div class="text">严选验货</div>
              </div>
             </li>

             <li class="part2-img" @click="() => scan(2)">
              <div class="wrapper-l" :style="note">
                <div class="text">严选入库</div>
              </div>
             </li>
          </ul>

           <!-- <ul class="part">
             <li class="much-img" @click="() => scan(3)">
              <div class="wrapper-l" :style="note">
                <div class="text">统货验货</div>
              </div>
             </li>

             <li class="much2-img" @click="() => scan(4)">
              <div class="wrapper-l" :style="note">
                <div class="text">拆解任务</div>
              </div>
             </li>
          </ul> -->
       
          <li class="much-img" @click="() => scan(3)">
            <div class="wrapper-l" :style="note">
              <div class="title">统货验货</div>
              <button>
                <i class="iconfont icon-jiantou icon"></i>
                点击扫码
              </button>
            </div>
            <div class="wrapper-r" :style="mimg"></div>
          </li>
       
          <li class="por-img" @click="() => scan(5)">
            <div class="wrapper-l" :style="note">
              <div class="title">生产排产</div>
              <button>
                <i class="iconfont icon-jiantou icon"></i>
                点击扫码
              </button>
            </div>
            <div class="wrapper-r" :style="rimg"></div>
          </li>
       
      </div>
    </div>
    <ScanBarcode  :errorFun="errorFun" :scanVisible.sync="visible" @succsssFun="successFun"></ScanBarcode>
    <div class="footerBox">     
      <ul class="footer">
         <router-link to="/index">
           <li>
              <i class="iconfont icon-tianchongxing-"></i>
              <span>工作台</span>
           </li>          
         </router-link>
          <router-link to="/partslist">
          <li>
            <i class="iconfont icon-mingxi"></i>
            <span>严选入库列表</span>
          </li>          
         </router-link>
         <router-link to="/details">
          <li>
            <i class="iconfont icon-mingxi"></i>
            <span>拆解列表</span>
          </li>          
         </router-link>
          <router-link to="/list">
          <li>
            <i class="iconfont icon-mingxi"></i>
            <span>排产列表</span>
          </li>          
         </router-link>
          
      </ul>      
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Toast } from 'vant';
Vue.use(Toast);
import Header from "../../components/header/Header";
import { ScanBarcode } from "@/components/index";



export default {
  name: "index",
  data() {
    return {
      visible:false,
      scanResult:'',
      title: "首页",
      type:1,
      note: {
        backgroundImage: "url(" + require("../../assets/image/bg.png") + ")",
        backgroundRepeat: "no-repeat"
      },
      mimg: {
        backgroundImage: "url(" + require("../../assets/image/car.png") + ")",
        backgroundRepeat: "no-repeat"
      },
      pimg: {
        backgroundImage: "url(" + require("../../assets/image/box1.png") + ")",
        backgroundRepeat: "no-repeat"
      },
      rimg: {
        backgroundImage: "url(" + require("../../assets/image/box2.png") + ")",
        backgroundRepeat: "no-repeat"
      }
    };
  },
  methods: {
    // 点击三个元素，都要执行同一个方法，但做不同事件的处理。
   scan(type){
     this.type = type;
     this.visible = true;
   },

   errorFun(err) {
    this.scanResult = err;
    Toast('扫码失败，请重新扫码');
   },

   successFun(result) {
    this.visible = false;
    this.scanResult = result;  // 获取到的扫码code

    if(this.type == 1){
      Toast({
        message: "扫码成功",
        duration: 500
      });
      setTimeout(() => {       
            this.$router.push({name: 'examine', params: {idCode: this.scanResult}});    
      }, 650); 

    } else if(this.type == 2){
        Toast({
          message: "扫码成功",
          duration: 500
        });
        setTimeout(() => {
          this.$router.push({name: 'part', params: {idCode: this.scanResult}});        
        }, 650);  

    } else if(this.type == 3){       
        Toast({
          message: "扫码成功",
          duration: 500
        });
        setTimeout(() => {
          this.$router.push({name: 'shipment', params: {idCode: this.scanResult}});  
        }, 650);                      
    } else if(this.type == 4){
        Toast({
          message: "扫码成功",
          duration: 500
        });
        setTimeout(() => {
          this.$router.push({name: 'cargo', params: {idCode: this.scanResult}});       
        }, 650);  

    } else if(this.type == 5){       
        Toast({
          message: "扫码成功",
          duration: 500
        });
        setTimeout(() => {
          this.$router.push({name: 'production', params: {idCode: this.scanResult}});  
        }, 650);                      
    }               
  }
  },
  components: {
    "app-header": Header,
    ScanBarcode
  }
};
</script>


<style lang="less" scoped>
.wrapper {
  width: 70%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  a {
    text-decoration: none;
  }
  .part{
     margin: 0 auto;
     width: 7rem;
     height: 2.4rem;
     display: flex;
     margin-bottom: .8rem;
     li{
       flex:0 0 2.4rem;
       text-align: center;
 
       .text{
         font-size: .45rem;
         color: #fff;
         line-height: 2.4rem;
       }
     }
  }
  li {
    margin: 0 auto;
    width: 7rem;
    height: 2.4rem;
    margin-bottom: 1rem;
    border-radius: 0.12rem;
  }
  .part-img {
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 0.12rem;
    background: -webkit-linear-gradient(top, #0baade, #65cef1);
    display: flex;
    .icon {
      color: #0284de;
    }
    // button {
    //   box-shadow: 0 10px 10px -5px #0284de;
    // }
  }
   .part2-img {
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 0.12rem;
    background: -webkit-linear-gradient(top, #0284de, #04b1eb);
    display: flex;
    .icon {
      color: #0284de;
    }
    // button {
    //   box-shadow: 0 10px 10px -5px #0284de;
    // }
  }
  .much-img {
    background: -webkit-linear-gradient(top, #01ccb7, #3ee8cd);
    display: flex;
    .icon {
      color: #01ccb7;
    }
    button {
      box-shadow: 0 10px 10px -5px #01ccb7;
    }
  }
   .much2-img {
    background: -webkit-linear-gradient(top, #01ccb7, #3ee8cd);
    display: flex;
    .icon {
      color: #01ccb7;
    }
    button {
      box-shadow: 0 10px 10px -5px #01ccb7;
    }
  }
  .por-img {
    background: -webkit-linear-gradient(top, #fe5934, #f9814e);
    display: flex;
    .icon {
      color: #fe5934;
    }
    button {
      box-shadow: 0 10px 10px -5px #fe5934;
    }
  }
  .wrapper-l {
    flex: 50%;
    text-align: center;
    background-position: -0.9rem -0.3rem;
    .title {
      color: #fff;
      font-size: 0.5rem;
      margin-bottom: 0.1rem;
      margin-top: 0.45rem;
    }
    button {
      border: none;
      background-color: #fff;
      color: #333;
      width: 2.2rem;
      height: 0.54rem;
      line-height: 0.54rem;
      font-size: 0.3rem;
      border-radius: 0.27rem;

      .icon {
        font-size: 0.3rem;
        margin-right: 0.1rem;
      }
    }
  }
  .wrapper-r {
    flex: 50%;
    background-position: 0.9rem 0.7rem;
  }
}
.footerBox{
  width: 100%;
  height: .8rem;
  border-top: .01rem solid #fff;
  background-color: #fff;
  position: fixed;
  left: 0;
  bottom: 0;
  
  .footer{
     width: 80%;
    //  background-color: blue;
     margin: 0 auto;
     display: flex;   
     justify-content: center;
     align-items: center;
     font-size: .28rem;
     margin-top: .07rem;
    //  color: #333;
    a{
      color: #333;
    }
     li{
       width: 2rem;
       flex:1;
       text-align: center;
       justify-content: center;
      //  margin-right:1rem;
      //  color: #333;
       i{
         display: block;
         font-size: .24rem;
       }
       span{
         display: block;
       }
       
     }
      .active{
        color: #0284de;
      }
    
  }
 
}
</style>
