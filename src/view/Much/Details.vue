<template>
  <div>
    <app-header :title="title" :isShow="true"></app-header>

    <div class="content">
      <van-loading class="loading" type="spinner" v-if="isLoading" color="#1989fa" />
      <div v-if="!isLoading">

        <!-- <ul class="details-box" >
          <li v-for="(item,index) in sunifyData" :key="index">
            <span>{{item.num}}</span>
            <p>{{item.goodsName}}-{{item.id}}</p>
          </li>         
        </ul> -->

         <div class="engineTitle">统货零件拆解列表</div>
            <router-link
              :to="{name:'sdetails',params:{code:item.codeId}}"  
              class="details-text" 
              v-for="(item,index) in shipmentsList" :key="index" 
              tag="div"
              >
              <div class="boxL">
                <h4>{{item.goodsName}}</h4>
                <p class="sign">编号ID：{{item.codeId}}</p>
                <p>时间：{{item.createTime}}</p>
              </div>
              <div class="boxR">
                <div class="ball">{{item.type == "jingchai" ? '精':'废'}}</div>
              </div>
            </router-link>
             <van-pagination 
              class="details-box bottom-box " 
              v-model="shipmentsPage" 
              :total-items="total" 
              :show-page-size="3" 
              force-ellipses 
              @change="shipmentsChange()"
            /> 
      </div>
    </div> 


   
     <div class="btn-footer">
       <button class="common-btn danger" @click="link">继续添加拆解任务</button> 
       <button class="common-btn info" @click="confirm">确认</button>
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
import { stockunify,engineList,shipmentList } from "../../api/goods"
import { debuglog } from 'util';
export default {
  data() {
    return {
      title: "统货详情",
      isLoading:false,
     
      engineList:[], // 发动机
      // tankList:[], // 水箱
      active: 2,
      shipmentsPage:1,
      tankPage:1,
      // engineCount:0,
      // tankCount:0,
      sunifyData:[],
      shipmentsList:[],  // 统货 零件总列表
      total:0,

    };
  },
  components: {
    "app-header": Header
  },
  mounted(){ 
    this.orderId =this.$route.params.orderId; 
    this.getShipmentsList();    
    // this.getsunifyData();
    // this.getEngineData();
  },
  methods: {
    // 统货-零件统计列表接口
    getShipmentsList(){
      shipmentList().then(res=>{
        // debugger
        if(res.code == 0){
          this.shipmentsList = res.data;
          this.total = res.pageInfo.total
          // console.log(this.shipmentsList)
        }
      })
    },


    // 获取库存
    // getsunifyData(){
    //   stockunify().then(res =>{
    //     // debugger
    //     if(res.code == 0){
    //        this.sunifyData = res.data
    //         console.log(this.sunifyData)
    //     }
    //   })
    // },

 

    // 获取发动机列表数据    
    // getEngineData(){
    //   let params = {
    //     // goodsName: "废发动机变速箱",
    //     pageIndex:this.enginePage,
    //     pageSize:10,
    //   }
    //   engineList(params).then(res=>{
    //     //  debugger
    //      if(res.success){
    //         this.engineList = res.data,
    //       //  console.log(this.engineList)
    //        this.isLoading = false;  
    //      }
    //    })
    // },

    link() {
      // this.$router.push("/scan");
      this.$router.push({name:'scan', params: {orderId:this.orderId}});
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


    shipmentsChange(){
      let params = {
        pageIndex:this.shipmentsPage,
        pageSize:10,
      }
       shipmentList(params).then(res=>{
        //  debugger
         if(res.success){
             this.shipmentsList = res.data;    
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
    width: 33%;
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
  justify-content: center;
  align-items: center;

  .boxL {
    flex: 1;
    margin-left: 0.2rem;
    .sign{
       color: #ee2929;
    }
    h4 {
      font-size: 0.3rem;
      font-weight: bold;
    }

  }
  .boxR {
    flex: 0 0 1rem;
    .ball {
      width: 0.6rem;
      height: 0.6rem;
      background-color: #0284de;
      border-radius: 50%;
      color: #fff;
      font-size: 0.35rem;
      line-height: 0.6rem;
      text-align: center;
    }
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
  height: .6rem;
  background-color: #0284de;
  font-size: .33rem;
  text-align: center;
  color: #fff;
  border-radius: 1rem;
  line-height: .6rem;
  letter-spacing: .015rem; 
  margin-top: .3rem;
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
</style>