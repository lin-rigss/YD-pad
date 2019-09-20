<template>
  <div>
    <app-header :title="title" :isShow="true" ></app-header>
    <div class="content">
       <van-loading class="loading" type="spinner" v-if="isLoading" color="#1989fa" />
       <div v-if="!isLoading">      
        <div class="much-box">
          <div class="title">
            <i class="iconfont icon-huoche"></i>
            <h3>货车信息</h3>
          </div>

          <ul class="vehicle-info">
            <li>
              <span class="vehicle-title">司机姓名</span>
              <span class="vehicle-text" v-for="(item,index) in muchData.driverList" :key="index">{{item.driverName}}</span>
            </li>
            <li>
              <span class="vehicle-title">司机电话</span>
              <span class="vehicle-text" v-for="(item,index) in muchData.driverList" :key="index">{{item.driverPhone}}</span>
            </li>
            <li>
              <span class="vehicle-title">车牌号码</span>
              <span class="vehicle-text" v-for="(item,index) in muchData.driverList" :key="index">{{item.license}}</span>
            </li>
          </ul>
          <!-- <div class="vehicle-img">
            <div class="veImg">
              <i class="iconfont icon-tupian"></i>
                <h3>行驶证照片</h3>
                <div class="imgbox" >
                  <div v-for="(item,index) in muchData.driverList" :key="index">
                    <div v-for="(url,i) in item.driverImgs" :key='i'   >
                      <img :src="url" alt @click="driving(i)" />
                    </div>               
                  </div>
                </div>
              </div>        
          </div> -->
          <div class="vehicle-img">
            <div class="veImg">
              <i class="iconfont icon-tupian"></i>
              <h3>车辆照片</h3>
              <div class="imgbox" >
                <div v-for="(item,index) in muchData.trackPhotosArr" :key="index">    <img :src="item" alt @click="vehicle(i)" />          
                </div>
              </div>
            </div>         
          </div>          
        </div>

        <div class="much-box">
          <div class="title">
            <i class="iconfont icon-xinxi"></i>
            <h3>发货信息</h3>
          </div>

          <div class="info">
            <div class="info-item">
              <span class="name">订单ID：</span>
              <span class="value sign">{{orderId}}</span>
            </div>

            <div class="info-item">
              <span class="name">采购员ID：</span>
              <span class="value">{{muchData.createrId}}</span>
            </div>

            <div class="info-item">
              <span class="name">申请时间：</span>
              <span class="value">{{muchData.createTime}}</span>
            </div>

            <div class="info-item">
              <span class="name">供应商：</span>
              <span class="value">{{muchData.dismantlingPlantName}}</span>
            </div>

            <div class="info-item">
              <span class="name">装车日期：</span>
              <span class="value">{{muchData.carStartTime}}</span>
            </div>

            <div class="info-item">
              <span class="name">装货地点：</span>
              <span class="value">{{muchData.loadAddr}}</span>
            </div>

            <div class="info-item">
              <span class="name">到货地点：</span>
              <span class="value">{{muchData.destination}}</span>
            </div>

            <div class="info-item">
              <span class="name">装货车型：</span>
              <span class="value">{{muchData.carType}}</span>
            </div>

            <div class="info-item">
              <span class="name">货品类型：</span>
              <span class="value">{{muchData.variety}}种</span>
            </div>
          </div>
        </div>

        <div class="much-box bottom-box">
          <div class="title">
            <i class="iconfont icon-mingxi"></i>
            <h3>货品明细</h3>
          </div>
          <app-table :goodsList='muchData.goodsList' :weight='muchData.weight' @wei='val =>actualWeight =val'></app-table>
        </div>
       </div>
    </div>

    <div class="btn-footer">
      <button class="common-btn info" @click="affirm">下一步</button>
    </div>

  </div>
</template>

<script>
import Vue from "vue";
import { ImagePreview ,Toast } from "vant";
Vue.use(ImagePreview).use(Toast);

import Header from "../../components/header/Header";
import Table from "./Table";
import { unify ,getShipment } from "../../api/goods"

export const unit = [
    {cname: '套', ename: 'SET', value: '1'},
    {cname: '个', ename: 'PCS', value: '2'},
    {cname: '公斤', ename: 'Kilo', value: '3'},
]

export default {
  data() {
    return {
      title: "统货验货",
      isLoading: true,
      orderId :'',
      muchData:{}, 
      actualWeight :0, 
      
    };
  },
  components: {
    "app-header": Header,
    "app-table": Table
  },

  mounted(){
    this.shipment();
    // this.orderId = this.$route.params.idCode;  // 获取二维码的ID码   
    // this.getShipmentData()
  },
  methods: {
    // 获取统货数据的方法
    // getShipmentData(){
    //   let params = {
    //     id:this.orderId
    //     // id:'111333909801283293184'
    //   }
    //   getShipment(params).then(res => {
    //     // debugger
    //     if(res.success){
    //        if(res.data !== null){
    //           this.muchData = res.data;
    //           console.log(this.muchData)
    //           this.isLoading = false;
    //        }else{
    //          this.isLoading = true;
    //           Toast({
    //             message: '该编码无信息',
    //             duration: 1000
    //           });
    //           setTimeout(() => {
    //             this.$router.push('/index');
    //           }, 1300);
    //        }           
    //      }
    //   })
    // },

    shipment(){
       this.muchData =JSON.parse(localStorage.getItem('shipmentData'))  ;    
       this.isLoading = localStorage.shipmentData ? false : true;
    },

    // 确认提交
    affirm() {
      // 更改数据中的字段，传递给后台。
      this.muchData.goodsList = this.muchData.goodsList.map(item => {
        return {
          ...item,
          goodsWeight:'',
          weight: Number(item.goodsWeight),
          unitPrice:this.muchData.unitPrice
        }
      });

      let params = {
        "type":"chaifei",
        "orderId":this.muchData.id,   // 1113
        "supplierId":this.muchData.dismantlingPlantId,
        "supplierName":this.muchData.dismantlingPlantName,
        "totalWeight" : Number(this.actualWeight),
        "unitPrice":this.muchData.unitPrice,
        "goodsList":this.muchData.goodsList        
      }
      unify(params).then(res =>{
        if(res.success){         
          Toast({
            message: '验货成功',
            duration: 1000
          });
          setTimeout(() => {
             this.$router.push('/goodslist');              
            // this.$router.push({name:'scan', params: {orderId:this.muchData.id}});             
            }, 1300);
        } else{ 
            setTimeout(() => {
              this.$router.push('/index');
            }, 1300);
        }
      })     
    },   
    vehicle(i) {
      ImagePreview({
        images:this.muchData.trackPhotosArr,
        startPosition: i
      });
    }, 
    //  driving(i) {
    //   ImagePreview({
    //     images: this.muchData.driverList[i].driverImgs,
    //     startPosition: i
    //   });
    // },     
  },  
};
</script>


<style scoped lang='less'>
.much-box {
  position: relative;
  width: 90%;
  margin: 0.3rem auto;
  background-color: #fff;
  border: 0.01rem solid #e4e4e4;
  border-radius: 0.1rem;
  padding: 0.2rem;
  box-sizing: border-box;
  .title {
    width: 100%;
    height: 0.5rem;
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
      line-height: 0.5rem;
      color: #0284de;
      font-size: 0.28rem;
      margin: 0;
      font-weight: bold;
    }
  }
}

.vehicle-info {
  width: 100%;
  display: flex;
  padding: 0.2rem;
  box-sizing: border-box;
  li {
    flex: 1;
    text-align: center;
    span {
      display: block;
      line-height: 0.6rem;
    }
    .vehicle-title {
      font-size: 0.28rem;
      color: #575757;
      font-weight: bold;
      margin-top: 0.1rem;
    }
    .vehicle-text {
      font-size: 0.28rem;
    }
  }
}
.vehicle-img {
  width: 100%;
  // display: flex;
  .veImg {
    // flex: 1;
    line-height: 0.3rem;
    padding: 0.2rem;
    box-sizing: border-box;
    // margin-right: .2rem;
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
      margin-bottom: 0.1rem;
      font-weight: bold;
    }
    .imgbox {
      // display: flex;
      overflow: hidden;
      margin-left: .15rem;

      img {
        // flex: 1;  
        float: left;   
        width: 1.8rem;
        height: 1.8rem;
        margin-right: 0.25rem;
        margin-bottom: .15rem;
      }
    }
  }
}

.bottom-box {
  margin-bottom: 1.8rem;
}

.btn-footer {
  width: 100%;
  position: fixed;
  bottom: -0.1rem;
  .common-btn {
    height: 0.8rem;
    line-height: 0.8rem;
    color: #fff;
    font-size: 0.3rem;
    border: none;
  }
  .info {
    background-color: #0284de;
  }
}
</style>