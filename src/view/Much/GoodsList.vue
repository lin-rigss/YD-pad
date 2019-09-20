<template>
  <div>
    <app-header :title="title" :isShow="true"></app-header>
    <div class="content">
      <van-loading class="loading" type="spinner" v-if="isLoading" color="#1989fa" />
      <div v-if="!isLoading">  
         <div class="engineTitle">统货到货列表</div> 

         <div class="details-text" v-for="(item,index) in goodsListData" :key="index" >
             <div class="info">
                <div class="info-item">
                    <span class="name">货品名称:</span>
                    <span class="value">{{item.goodsName}}</span>
                </div> 

                <div class="info-item">
                    <span class="name">货品重量：</span>
                    <span class="value">{{item.goodsWeight}}千克</span>
                </div>               
             </div>            
          </div>

          <div class="tu" :style="note" v-if="!goodsListData.length > 0" ></div>

        <!-- <van-pagination 
            v-if="goodsListData.length > 0"
            class="details-box bottom-box " 
            v-model="partsPage" 
            :total-items="partsCount" 
            :show-page-size="3" 
            force-ellipses 
            @change="partsChange()"
        /> -->
      </div>
    </div>  

    <div class="btn-footer">
      <button class="common-btn info" @click="additional">补录</button>
       <button class="common-btn danger" @click="confirm">添加拆解任务</button>
    </div>
  </div>
</template>


<script>
import Vue from "vue";
import { Toast, Tab, Tabs } from "vant";
Vue.use(Toast)
  .use(Tab)
  .use(Tabs);

import Header from "../../components/header/Header";
export default {
  data() {
    return {
      title: "统货详情",
      isLoading:false,
      shipmentData:{}, // 统货全部数据
      goodsListData:[],
      partsPage:1,
      partsCount:0,
      note: {
        backgroundImage: "url(" + require("../../assets/image/null.png") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "2rem auto",        
      },
    };
  },
  components: {
    "app-header": Header
  },
  mounted(){ 
    this.shipmentData =JSON.parse(localStorage.getItem('shipmentData'));
    this.goodsListData = this.shipmentData.goodsList;
  },
  methods: {
    // 补录跳转方法
    additional(){
       
    },

    // 拆解任务跳转方法
    confirm() {
      setTimeout(() => {
        this.$router.push({name:'scan', params: {orderId:this.shipmentData.id}});
      }, 650);
    },


  //  partsChange(){
  //     let params = {
  //       pageIndex:this.partsPage,
  //       pageSize:10,
  //       partStatus:10,
  //     }
  //   //   xxxxxx(params).then(res=>{
  //   //     //  debugger
  //   //      if(res.success){
  //   //          this.partsListData = res.data    
  //   //      }
  //   //    })
  //   },
  },
 
};
</script>


<style scoped lang='less'>
ul {
  padding-bottom: 0.3rem;
}
.details-box {
  position: relative;
  width: 90%;
  margin: 0.3rem auto;
  background-color: #fff;
  border: 0.01rem solid #e4e4e4;
  border-radius: 0.1rem;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  li {
    width: 100%;
    text-align: center;
    margin-top: 0.35rem;
    span {
      font-size: 0.4rem;
      color: #0284de;
    }
    p {
      font-size: 0.3rem;
      margin-top: 0.1rem;
    }
  }
}
.details-text {
  position: relative;
  width: 90%;
  margin: 0.3rem auto;
  background-color: #fff;
  border-bottom: 0.01rem solid #e4e4e4;
  border-radius: 0.1rem;
  box-sizing: border-box;
  display: flex;
  padding: 0.1rem;
  font-size: 0.3rem;
//   justify-content: center;
  align-items: center;
   h4 {
      font-size: 0.3rem;
      font-weight: bold;
      margin-left: .1rem;
    }

  
}
.btn-footer {
  width: 100%;
  position: fixed;
  bottom: -0.1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  .common-btn {
    width: 50%;
    height: 0.8rem;
    line-height: 0.8rem;
    color: #fff;
    font-size: 0.3rem;
    border: none;
  }
  .danger {
    background-color: #7bc861;
  }
  .info {
    background-color: #0284de;
  }
}
.tabs {
  width: 94%;
  margin: 0 auto;
}
.bottom-box {
  border: none;
  margin-bottom: 1.8rem;
  background-color: #f5f5f5;
}
.engineTitle{
  width: 40%;
  margin: 0 auto;
  margin-top: .3rem;
  height: .6rem;
  background-color: #0284de;
  font-size: .33rem;
  text-align: center;
  color: #fff;
  border-radius: 1rem;
  line-height: .6rem;
  letter-spacing: .015rem; 
}
.tu{
  width:2rem; 
  height:2.6rem; 
  position:fixed; 
  top:50%; 
  left:50%; 
  transform:translate3d(-50%,-50%,0);   
  // text-align: center;
  // background-position: 0rem 0rem;
}
</style>