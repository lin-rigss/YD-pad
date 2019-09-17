<template>
  <div>
    <app-header :title="title" :isShow="true"></app-header>
    <div class="content">
      <van-loading class="loading" type="spinner" v-if="isLoading" color="#1989fa" />
      <div v-if="!isLoading">  
         <div class="engineTitle">严选货品入库列表</div>     
         <div class="details-text" v-for="(item,index) in partsListData" :key="index" >
             <div class="info">
                <div class="info-item">
                    <span class="name">时&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;间: </span>
                    <span class="value sign">{{item.createTime}}</span>
                </div> 

                <!-- <div class="info-item">
                    <span class="name">V&nbsp;&nbsp;&nbsp;&nbsp;I&nbsp;&nbsp;&nbsp;&nbsp;N：</span>
                    <span class="value">{{item.vin}}</span>
                </div>  -->

                <div class="info-item">
                    <span class="name">货品名称:</span>
                    <span class="value">{{item.brandName}}</span>
                </div> 

                <div class="info-item">
                    <span class="name">订单编号：</span>
                    <span class="value">{{item.id}}</span>
                </div>

                <div class="info-item">
                    <span class="name">供&nbsp;&nbsp;应&nbsp;&nbsp;商：</span>
                    <span class="value">{{item.dismantlingPlantName}}</span>
                </div> 
             </div>            
          </div>
        <van-pagination 
            v-if="partsListData.length > 0"
            class="details-box bottom-box " 
            v-model="partsPage" 
            :total-items="partsCount" 
            :show-page-size="3" 
            force-ellipses 
            @change="partsChange()"
        />
      </div>
    </div>  

    <!-- <div class="btn-footer">
      <button class="common-btn info" @click="confirm">确认</button>
    </div> -->
  </div>
</template>


<script>
import Vue from "vue";
import { Toast, Tab, Tabs } from "vant";
Vue.use(Toast)
  .use(Tab)
  .use(Tabs);

import Header from "../../components/header/Header";
import { partsList } from "../../api/goods"
export default {
  data() {
    return {
      title: "严选入库详情",
      isLoading:false,
      partsListData:[],
      partsPage:1,
      partsCount:0,
    };
  },
  components: {
    "app-header": Header
  },
  mounted(){   
     this. getPartsListData();
  },
  methods: {
    // 获取严选列表数据    
    getPartsListData(){
      let params = {
        pageIndex:1,
        pageSize:10,
        partStatus:10,
      }
      partsList(params).then(res=>{
        //  debugger
         if(res.success){
             if(res.data !== null){
                 this.partsListData = res.data
                 this.partsCount =  res.pageInfo.total
             }           
         }
       })
    },

    confirm() {
      // Toast({
      //   message: "确认完成",
      //   duration: 500
      // });
      setTimeout(() => {
        this.$router.push("/index");
      }, 650);
    },


   partsChange(){
      let params = {
        pageIndex:this.partsPage,
        pageSize:10,
        partStatus:10,
      }
       partsList(params).then(res=>{
        //  debugger
         if(res.success){
             this.partsListData = res.data    
         }
       })
    },
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
    width: 100%;
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
</style>