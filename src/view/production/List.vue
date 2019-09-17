<template>
  <div>
    <app-header :title="title" :isShow="true"></app-header>
    <div class="content">
      <van-loading class="loading" type="spinner" v-if="isLoading" color="#1989fa" />
      <div v-if="!isLoading">
        <ul class="details-box">
          <li v-for="(item,index) in goodsData" :key="index">
            <span>{{item.count}}</span>
            <p>{{item.goodsName}}</p>
          </li>
        </ul>

        <div class="engineTitle">废发动机变速箱排产列表</div>
        
         <router-link 
            :to="{name:'listdetails',params:{code:item.codeId}}"
            class="details-text" 
            v-for="(item,index) in engineList" :key="index"
            tag="div">
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
              v-model="enginePage" 
              :total-items="engineCount" 
              :show-page-size="3" 
              force-ellipses 
              @change="engineChange()"
            />

<!-- 
        <van-tabs type="card" v-model="active" color="#0284de" class="tabs ">
          <van-tab title="废发动机变速箱">
            <div class="details-text" v-for="(item,index) in engineList" :key="index" >
              <div class="boxL">
                <h4>{{item.goodsName}}</h4>
                <p>编号ID：{{item.codeId}}</p>
              </div>
              <div class="boxR">
                <div class="ball">{{item.type == "jingchai" ? '精':'废'}}</div>
              </div>
            </div>
             <van-pagination 
              class="details-box bottom-box " 
              v-model="enginePage" 
              :total-items="engineCount" 
              :show-page-size="3" 
              force-ellipses 
              @change="engineChange()"
            />
          </van-tab> -->
          
          <!-- <van-tab title="水箱">
            <div class="details-text" v-for="(item,index) in tankList" :key="index">
              <div class="boxL">
                <h4>{{item.goodsName}}</h4>
                <p>编号ID：{{item.codeId}}</p>
              </div>
            </div>
             <van-pagination 
              class="details-box bottom-box " 
              v-model="tankPage" 
              :total-items="tankCount" 
              :show-page-size="3" 
              force-ellipses 
              @change="tankChange()"
            />
          </van-tab>           -->
        <!-- </van-tabs>        -->
      </div>
    </div>  

    <div class="btn-footer">
      <button class="common-btn danger" @click="link">继续排产</button>
      <button class="common-btn info" @click="confirm">确认完成</button>
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
import { engineList , count } from "../../api/goods";

export default {
  data() {
    return {
      title: "排产详情",
      isLoading:false,
      listData:[],  // 统货总列表
      engineList:[], // 发动机

      active: 2,
      enginePage:1,
      engineCount:0,
      goodsData:[],
    };
  },
  components: {
    "app-header": Header
  },
  mounted(){  
     this.getCountsData();
     this.getEngineData();
  },
  methods: {
    // 获取数量
    getCountsData(){
       count().then(res=>{
        //  debugger
         if(res.success){
           this.goodsData = res.data
           let engineC = this.goodsData.filter(item=>{
             if(item.goodsName == "废发动机变速箱"){
               return item; 
              }})
           this.engineCount = engineC[0].count
         }
       })
    },

     // 获取废发动机列表
     getEngineData(){
      let params = {
        goodsName: "废发动机变速箱",
        pageIndex:this.enginePage,
        pageSize:10,
      }
      engineList(params).then(res=>{
        //  debugger
         if(res.success){
            this.engineList = res.data,
            // console.log(this.engineList)
            this.isLoading = false;  
         }
       })
    },


    link() {
      this.$router.push("/proscan");
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

    engineChange(){
      let params = {
        pageIndex:this.enginePage,
        pageSize:10,
        goodsName: "废发动机变速箱"
      }
       engineList(params).then(res=>{
        //  debugger
         if(res.success){
            this.engineList = res.data     
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
    flex: 30%;
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
  width: 50%;
  margin: 0 auto;
  margin-top: .3rem;
  height: .7rem;
  background-color: #0284de;
  font-size: .33rem;
  text-align: center;
  color: #fff;
  border-radius: 1rem;
  line-height: .7rem;
  letter-spacing: .015rem; 
}
</style>