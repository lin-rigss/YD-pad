<template>
  <div class="part">
    <app-header :title="title" :isShow="true" ></app-header>

    <div class="content" >
       <van-loading class="loading" type="spinner" v-if="isLoading" color="#1989fa"/>

       <div v-if="!isLoading">
          <div class="part-info" v-if="!imgflag">
            <div class="title">
              <i class="iconfont icon-xinxi"></i>
              <h3>入库信息</h3>
            </div>
            <div class="info">

            <div class="info-item">
              <span class="name">入库类型：</span>
              <div class="value">采购入库</div>
            </div>

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
                <span class="name">备注信息：</span>
                <span class="value">{{msg}}</span>
              </div>                   

            </div>
          </div>

          <div class="part-info" v-if="!imgflag">
            <div class="title">
               <i class="iconfont icon-xinxi"></i>
              <h3>零件信息</h3>
            </div>
            <div class="info">
              <div class="info-item">
                  <span class="name">零&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;件: </span>
                  <span class="value">
                    <input class="drop" type="text" v-model="part" placeholder="请输入零件型号"> 
                  </span>
              </div> 
              <div class="info-item">
                  <span class="name">套&nbsp;&nbsp;(SET)&nbsp;: </span>
                  <span class="value">
                    <input  class="drop" type="text" v-model="partUnit" > 
                  </span>
              </div> 
               <div class="info-item">
                  <span class="name">价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格: </span>
                  <span class="value">
                    <input class="drop-short" type="text" v-model="partPrice" >元
                  </span>
              </div> 
              <div class="info-item">
                  <span class="name">应付金额: </span>
                  <span class="value sign" >￥{{partData.auditQuotation}}</span>
              </div>
              <div class="info-item">
                  <span class="name">支付方式: </span>
                  <span class="value">现金支付</span>
              </div>
              <div class="info-item ">
                  <span class="name">支付状态: </span>
                  <span class="value">已支付</span>
              </div>
              <div class="info-item">
                  <span class="name">实付金额: </span>
                  <span class="value">
                     <input class="drop-short" type="text" v-model="expenses" >元
                  </span>
              </div>
              
            </div>           
          </div>

           <div class="part-info" v-if="!imgflag">
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

          <div class="part-info bottom-store" v-if="!imgflag">
            <div class="title ti-bottom">
              <i class="iconfont icon-cangku"></i>
              <h3>选择仓位</h3>
            </div>
            <div class="info">
              <div class="info-item">
                <span class="name height">仓库：</span>
                <div class="value">
                  {{partData.storeName}}
                </div>
              </div>
              <div class="info-item" >
                <span class="name height">区域：</span>
                <div class="value" v-if ="areaflag ">
                  <select class="drop" v-model="area"  @change="areaChange" >
                  <option value="" disabled >请选择</option>
                    <option
                      class="opt"
                      v-for="(item,index) in areaObj"
                      :key="index"
                      :value="item.id"
                    >{{ item.name }}</option>
                  </select>
                </div>
              </div>
              <div class="info-item"  >
                <span class="name height">货架：</span>
                <div class="value" v-if="areaflag && flag">
                  <select v-model="shelf" class="drop" @change="shelfChange"  >
                    <option value="" disabled >请选择</option>
                    <option
                      class="opt"
                      v-for="(item,index) in shelfAry"
                      :key="index"
                      :value="item.id"                
                    >{{ item.name }}</option>
                  </select>      
              </div>
              </div>
              <div class="info-item" >
                <span class="name height">层：</span>
                <div class="value"  v-if="flag && tierflag && areaflag">        
                  <select v-model="tier" class="drop"  @change="tierChange">
                    <option value="" disabled >请选择</option>
                    <option
                      class="opt"
                      v-for="(item,index) in tierAry"
                      :key="index"
                      :value="item.id"
                    >{{ item.name }}</option>
                  </select>
                </div>
              </div>
              <div class="info-item"  >
                <span class="name height">位置：</span>
                <div class="value"  v-if="flag && tierflag && locationflag && areaflag" >
                  <select class="drop" v-model="location" @change="locationChange">
                    <option value="" disabled >请选择</option>
                    <option
                      class="opt"
                      v-for="(item,index) in locationAry"
                      :key="index"
                      :value="item.id"
                    >{{ item.name }}</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

           <div class="imgbg" :style="bg" v-if="imgflag" ></div>
       </div>
    </div>

    <div class="btn-footer" v-if="!imgflag">
      <button class="common-btn danger" @click="note">添加备注</button>
      <button class="common-btn info" @click="confirm">确认入库</button>
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
import {tree,getParts,stock} from "../../api/goods"

Vue.use(ImagePreview).use(Toast).use(Lazyload );

export default {
  data() {
    return {
      checked: false,
      isShow: false,
      title: "严选入库",
      isLoading: true,
      msg: "无",
      show: false,
      placeholder:'...',
      idCode:'', 
      partData: {},
      brandId:'',
      brandNames:[],
      repAry:[],
      gIdsAry:[],
      gCodes:[],
      goodsNames:[],
      part:'',

      // 仓库 数据
      treeData:[],
      store: '',   // 仓库的id   一级
      storeName:'',
      areaAry:[],  // 获取 区域
      
      area: '',    // 区域的id    二级
      areaName:'',
      shelfAry:[], // 获取 货架的

      shelf: '',   // 货架的id   三级
      shelfName:'',
      tierAry:[],  // 获取 层的

      tier:'',     // 层的id  四级
      tierName:'',
      locationAry:[], // 获取 位置

      location:'', // 位置的id   五级
      locationName:'',
      

      areaflag:true,
      flag:true,
      tierflag:true,
      locationflag:true,

      storageType:'1',
      expenses:'',
      payment:'',
      payStatus:'',
      partPrice:'', // 零件价格
      partUnit:'',
      repositoryNames:[], // 存储仓位名称

      bg: {
        backgroundImage: "url(" + require("../../assets/image/null.png") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "2rem auto",        
      },
      imgflag:false,
    };
  },
  components: {
    "app-header": Header,
    "app-popup": Popup
  },
  mounted(){   
    this.idCode = this.$route.params.idCode;  // 获取二维码的ID码        
    this.getPartsData();
    this.getTree(); 
  },

  methods: {
    // 获取件货信息的方法
    getPartsData(){
        let params = {
          // 测试 
          // qrCode:'WJ-57W80VT0QRB1013'
          qrCode:this.idCode,
        }
       getParts(params).then(res=>{
        //  debugger
        if(res.success){
          if(res.data == null){
            this.isLoading = false;
            this.imgflag = true;
             
            //  Toast({
            //     message: '该编码无信息',
            //     duration: 1000
            //   });
            //   setTimeout(() => {
            //     this.$router.push('/index');
            //   }, 1300);
         
        //  else if(res.data.status === '10'){
        //       Toast({
        //         message: '该单已入库',
        //         duration: 1000
        //       });
        //       setTimeout(() => {
        //           this.$router.push('/index');
        //       }, 1300);
        //  } 
        } else if(res.data !== null){
              this.partData = res.data;
              this.isLoading = false;
              // console.log(this.partData)
              this.brandId = this.partData.brandId.split(',');
              this.brandNames = this.partData.brandName.split(',');
              this.store = this.partData.storeId;
              this.storeName = this.partData.storeName;
           }     
         }else{
             this.isLoading = false;
             this.imgflag = true;
              // Toast({
              //   message: '该编码无信息',
              //   duration: 1000
              // });
              // setTimeout(() => {
              //   this.$router.push('/index');
              // }, 1300);
           }      
       })
    },
    // 获取仓库数据的方法
    getTree(){
      tree().then(res => {
        // debugger
        if(res.code == 0){
          this.treeData = res.data;
          // console.log(this.treeData)
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

     receive(i) {
      ImagePreview({
        images: this.partData.receiveUrls,
        startPosition: i
      });
    },

    // 确认验货提交
    confirm() {      
       this.repAry = [this.store,this.area,this.shelf,this.tier,this.location].filter(item =>item );
       this.gIdsAry = [this.partData.partsFrameId,this.partData.partsCategoryId,this.partData.partsDetaId,].filter(item =>item );
       this.gCodes = [this.partData.partsFrameCode,this.partData.partsCategoryCode,this.partData.partsDetaCode,].filter(item =>item );
       this.goodsNames = [this.partData.partsFrameValue,this.partData.partsCategoryValue,this.partData.partsDetaValue,].filter(item =>item );
       this.repositoryNames = [this.storeName,this.areaName,this.shelfName,this.tierName,this.locationName].filter(item => item);

       let params={
           "orderId": this.partData.enquiryOrderId,
           "type":1,           
           "payStatus":1,
           "payWay":2,
           "amountPaid":this.expenses,     // 实付金额 
           "amountPayable":this.partData.auditQuotation,     
           "supplierId": this.partData.dismantlingPlantId,
           "supplierName": this.partData.dismantlingPlantName,
           "remarks":this.msg,           
           "goodsList": [{
               "partId":this.partData.id,               
               "num": this.partData.quantity,
               "price": this.partPrice, 
               "unit":this.partUnit,
               "source":  this.partData.dismantlingPlantId,
               "sourceName": this.partData.dismantlingPlantName,
               "coding": this.idCode,
               "manufacturer":'',
               "model":this.part,
               "brandIds": [this.brandId],
               "brandCodes": [this.brandId],
               "brandNames": [this.brandNames],
               "goodsCodes": this.gCodes,
               "goodsIds": this.gIdsAry,
               "goodsNames": this.goodsNames,
               "repositoryIds": this.repAry,
               "repositoryNames": this.repositoryNames ,
           }]           
       }
       stock(params).then(res =>{
         if(res.success){
           Toast({
              message: "入库成功",
              duration: 1000
            });
            setTimeout(() => {
              this.$router.push("/partslist");
            }, 1200);         
        }
       })      
    },





    // 仓位
    //  storeChange(){ 
    //   //  console.log(this.store) 
    //     if(this.treeData.length > 0){
    //       let newAry = this.treeData.filter((item,index)=>(item.id == this.store));
    //       if( newAry.length >0 ){
    //           this.areaAry = newAry[0].children;  
    //            if(this.areaAry.length >0){
    //              this.areaflag = true
    //            } else{
    //              this.areaflag = false
    //            }           
    //       }    
    //     }
    //     return []      
    // },
    areaChange(){      
      if(this.areaAry.length >0 ){
         let newshelf = this.areaAry.filter((item,index)=>(item.id == this.area))
         this.areaName = newshelf[0].name
            if(newshelf.length >0 ){
              this.shelfAry = newshelf[0].children; 
               if(this.shelfAry.length >0){
                 this.flag = true
               } else{
                 this.flag = false
               } 
              // console.log('货架',this.shelfAry)              
            } 
      }
      return []    
    },
    shelfChange(){ 
      // console.log(this.shelf)
      if(this.shelfAry.length >0){
         let newTier = this.shelfAry.filter((item,index)=>(item.id == this.shelf))
         this.shelfName = newTier[0].name
          if(newTier.length > 0){
            this.tierAry = newTier[0].children; 
            if(this.tierAry.length >0){
                 this.tierflag = true
               } else{
                 this.tierflag = false
               }             
            // console.log('层',this.tierAry)       
         }  
      } 
      return []      
    },
    tierChange(){ 
      // console.log(this.tier)
      if(this.tierAry.length > 0 ) {
         let newlocation = this.tierAry.filter((item,index)=>(item.id == this.tier))
            this.tierName = newlocation[0].name
            if(newlocation.length > 0){
              this.locationAry = newlocation[0].children;
               if(this.locationAry.length >0){
                 this.locationflag = true
               } else{
                 this.locationflag = false
               }    
              // console.log('位置',this.locationAry)        
         } 
      } 
      return []    
    },

    locationChange(){
      if(this.locationAry.length >0){
        let newAry = this.locationAry.filter((item,index)=>(item.id == this.location))
        this.locationName = newAry[0].name
        // console.log(this.locationName)
      }
         
    }


  
  },

  computed:{
     areaObj: function() {
       if(this.treeData.length > 0){
          let newAry = this.treeData.filter((item,index)=>(item.id == this.store));
          if( newAry.length >0 ){
              return this.areaAry = newAry[0].children; 
              // console.log(this.areaAry) 
               if(this.areaAry.length >0){
                 this.areaflag = true
               } else{
                 this.areaflag = false
               }           
          }    
        }   
    },
  }
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
    width: 50%;
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
  height: 0.65rem;
  margin-bottom: 0.25rem;
  background-color: #fff;
  border: 0.01rem solid #c2c2c2;
  margin-right: 0.1rem;
}
.height {
  line-height: 0.8rem;
}
.ti-bottom {
  margin-bottom: 0.2rem;
}
.vradio {
  float: left;
  margin-right: .5rem;
  margin-top: .2rem;
}
.marginb{
   margin-bottom: .4rem;
}

.imgbg{
  width:2rem; 
  height:2.6rem; 
  position:fixed; 
  top:50%; 
  left:50%; 
  transform:translate3d(-50%,-50%,0);   
}

}

</style>