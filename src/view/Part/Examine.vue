<template>
  <div class="part">
    <app-header :title="title" :isShow="true" ></app-header>

    <div class="content" >
       <van-loading class="loading" type="spinner" v-if="isLoading" color="#1989fa"/>

       <div v-if="!isLoading">
          <div class="part-info">
            <div class="title">
              <i class="iconfont icon-xinxi"></i>
              <h3>验货信息</h3>
            </div>
            <div class="info">
              <div class="info-item">
                <span class="name">编码ID：</span>
                <span class="value sign">{{idCode}}</span>
              </div>

              <div class="info-item">
                <span class="name">订单编号：</span>
                <span class="value">{{partData.enquiryOrderId}}</span>
              </div>

              <div class="info-item">
                <span class="name">货品ID：</span>
                <span class="value">{{partData.id}}</span>
              </div>

              <div class="info-item">
                <span class="name">供应商：</span>
                <span class="value">
                  <span>{{partData.dismantlingPlantName}}</span> 
                </span>
              </div>

              <div class="info-item">
                <span class="name">货品名称：</span>
                <span class="value" v-if="partData.partsFrameValue">
                  <span >{{partData.partsFrameValue ? partData.partsFrameValue :placeholder}}</span> 
                  <span>,{{partData.partsCategoryValue ?partData.partsCategoryValue :placeholder}}</span>
                  <span v-if="partData.partsDetaValue">,{{partData.partsDetaValue ? partData.partsDetaValue :placeholder }}</span> 
                  
                </span>
              </div>

              <div class="info-item">
                <span class="name">品&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;牌：</span>
                <span class="value">
                  <span>{{partData.brandName}}</span> </span>
              </div>

              <div class="info-item">
                <span class="name">数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;量：</span>
                <span class="value">
                  <span>{{partData.quantity}}</span> </span>
              </div>         

              <div class="info-item">
                <span class="name">物流单号：</span>
                <span class="value">{{partData.logisticOrder}}</span>
              </div>

              <div class="info-item">
                <span class="name">物流公司：</span>
                <span class="value">{{partData.logisticCom}}</span>
              </div>

            </div>
          </div>
          <div class="part-info">
            <div class="title">
              <i class="iconfont icon-tupian"></i>
              <h3>物流照片</h3>
            </div>
            <ul class="imgBox" >
              <li v-for="(item,index) in partData.urls" :key="index">
                <img :src="item" alt @click="magnify(index)" />
              </li>
            </ul>
          </div>

           <div class="part-info  bottom-store">
            <div class="title">
              <i class="iconfont icon-tupian"></i>
              <h3>验货照片</h3>
            </div>
            <ul class="imgBox" >
              <li v-for="(item,index) in partData.receiveUrls" :key="index">
                <img :src="item" alt @click="receive(index)" />
              </li>
            </ul>
          </div>
        
       </div>
    </div>

    <div class="btn-footer">
      <button class="common-btn info" @click="confirm">确认验货</button>
    </div>
    <app-popup v-show="isShow" @cancel="isShow=false" @sure="fn" ref="popup"></app-popup>
  </div>
</template>

<script>
import Vue from "vue";
import { ImagePreview, Toast ,Lazyload } from "vant";
import { setTimeout } from "timers";

import Header from "../../components/header/Header";
import Popup from "../../components/Popup/Popup";
import {getParts,staff} from "../../api/goods"

Vue.use(ImagePreview).use(Toast).use(Lazyload );

export default {
  data() {
    return {
      checked: false,
      isShow: false,
      title: "严选验货",
      isLoading: true,
      show: false,
      placeholder:'',
      idCode:'', 
      partData: {},
      brandId:'',
      brandNames:[],
      repAry:[],
      gIdsAry:[],
      gCodes:[],
      goodsNames:[],
    };
  },
  components: {
    "app-header": Header,
    "app-popup": Popup
  },
  mounted(){   
    this.idCode = this.$route.params.idCode;  // 获取二维码的ID码        
    this.getPartsData(); 
  },

  methods: {
    // 获取件货信息的方法
    getPartsData(){
        let params = {
          // 测试 
          // qrCode:'WJ-57W80VT0QRB1018'
          qrCode:this.idCode,
        }
       getParts(params).then(res=>{
        //  debugger
        if(res.success){
          if(res.data == null){
              Toast({
                message: '该编码无信息',
                duration: 1000
              });
              setTimeout(() => {
                this.$router.push('/index');
              }, 1300);
           }else if(res.data.status == '10'){
              Toast({
                message: '该单已验货',
                duration: 1000
              });
               setTimeout(() => {
                this.$router.push('/index');
            }, 1300);
         }else if(res.data !== null){
              this.partData = res.data;
              // console.log(this.partData)
              this.isLoading = false;
              this.brandId = this.partData.brandId.split(',');
              this.brandNames = this.partData.brandName.split(',');              
           }
         } else{
           this.isLoading = false;
              Toast({
                message: '该编码无信息',
                duration: 1000
              });
              setTimeout(() => {
                this.$router.push('/index');
              }, 1300);
         }
       })
    },

    note() {
      this.isShow = true;
    },
    fn(msg) {
      this.isShow = false;
      this.msg = msg;
    },
    magnify(i) {
      ImagePreview({
        images: this.partData.urls,
        startPosition: i
      });
    },
     receive(i) {
      ImagePreview({
        images: this.partData.receiveUrls,
        startPosition: i
      });
    },

    // 确认验货提交
    confirm() {
       let params={
           orderId: this.partData.enquiryOrderId, //101开头的,
           id:this.partData.id,         
       }
       staff(params).then(res =>{
        //  debugger
         if(res.code == 0){
           Toast({
              message: "验货成功",
              duration: 500
            });
            setTimeout(() => {
              this.$router.push("/index");
            }, 650);         
        }
       })      
    },  
  }, 
};
</script>


<style scoped lang='less'>
.part{
  width: 100%;
  position: relative;
.part-info {
  position: relative;
  width: 90%;
  margin: 0.3rem auto;
  background-color: #fff;
  border: 0.01rem solid #e4e4e4;
  border-radius: 0.1rem;
  padding: 0.2rem;
  box-sizing: border-box;
  margin-bottom: 0.3rem;

  .title {
    width: 100%;
    height: 0.6rem;
    padding-left: 0.2rem;
    border-bottom: 0.01rem solid #e4e4e4;
    box-sizing: border-box;
    i {
      display: inline-block;
      color: #0284de;
      font-size: 0.28rem;
      margin-right: 0.1rem;
    }
    h3 {
      display: inline-block;
      line-height: 0.6rem;
      color: #0284de;
      font-size: 0.28rem;
      margin: 0;
      font-weight: bold;
    }
  }

  .imgBox {
    width: 100%;
    padding: 0.2rem;
    padding-bottom: 0;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;

    li {
      // flex: 33.3%;
      margin-bottom: 0.16rem;
      img {
        width: 2.6rem;
        height: 2.6rem;
        background-size: contain;
        margin-left: 0.2rem;
      }
    }
  }
}

.bottom-store {
  margin-bottom: 1.8rem;
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
    background-color: #fd5c37;
  }
  .info {
    background-color: #0284de;
  }
}

.drop {
  width: 90%;
  height: 0.65rem;
  margin-bottom: 0.25rem;
  background-color: #fff;
  border: 0.01rem solid #c2c2c2;
  font-size: .28rem;
}
.drop-short {
  width: 40%;
  height: 0.8rem;
  margin-bottom: 0.25rem;
  background-color: #fff;
  border: 0.01rem solid #c2c2c2;
  margin-right: 0.65rem;
}
.height {
  line-height: 0.8rem;
}
.ti-bottom {
  margin-bottom: 0.2rem;
}

}

</style>