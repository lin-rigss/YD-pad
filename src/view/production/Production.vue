<template>
  <div>
    <app-header :title="title" :isShow="true"></app-header>

    <div class="content">
      <van-loading class="loading" type="spinner" v-if="isLoading" color="#1989fa" />

      <div v-if="!isLoading">
        <div class="production-box">
          <div class="title">
            <i class="iconfont icon-xinxi"></i>
            <h3>货品信息</h3>
          </div>

          <div class="info">
            <div class="info-item">
              <span class="name">编码ID：</span>
              <div class="value sign">{{idCode}}</div>
            </div>

            <div class="info-item">
              <span class="name">货品种类：</span>
              <div class="value">{{detailData.goodsName}}</div>
            </div>

            <div class="info-item" v-if="factory.length > 0 ">
              <span class="name">品牌型号：</span>
              <div class="value">{{factory[0].brand}}/{{factory[0].model}}</div>
            </div>

            <div class="info-item" v-if="factory.length > 0 ">
              <span class="name">货品材质：</span>
              <div class="value">{{factory[0].textureType}}</div>
            </div>

            <div class="info-item" v-if="factory.length > 0 ">
              <span class="name">AT/MT：</span>
              <div class="value">{{factory[0].atOrMt}}</div>
            </div>

            <div class="info-item" v-if="factory.length > 0 ">
              <span class="name">油质种类：</span>
              <div class="value">{{factory[0].oilyType}}</div>
            </div>

            <div class="info-item">
              <span class="name">拆解类型：</span>
              <div class="value">{{type == 'jingchai' ? '精拆':'拆废'}}</div>
            </div>
          </div>
        </div>
    
        <div class="production-box" v-if="isShow">
            <div class="title borno">
              <i class="iconfont icon-zhuanhuan"></i>
              <h3>精拆转拆废</h3>
              <span class="switch">
                <van-switch v-model="checked"  @change="switchChange()"/>
              </span>
            </div>
            <div class="info" v-show="checked">
              <textarea
                v-model="annotationMsg"
                class="annotationBox"
                type="text"
                placeholder="填写拆废原因，最多20个字。"
              ></textarea>
            </div>
        </div>

        <div class="production-box bottom-box" v-if="flag">
            <div class="title">
              <i class="iconfont icon-shezhi"></i>
              <h3>拆解产生产品</h3>
            </div>

            <!-- 精拆 零件 -->
            <div class="partsBox" v-show="!checked">
              <a
                v-for="(item) in parts"
                :key="item.id"
                @click="change(item.id)"
                :class="{'pitch':getPartsList.includes(item.id) }"
              >{{item.nameZn}}</a>
            </div>            

            <!-- 拆废 零件 -->
            <div class="partsBox" v-show="checked">
              <a
                v-for="item in bad"
                :key="item.id"
                @click="badChange(item.id)"
                :class="{'pitch':badsIndex.includes(item.id)}"
              >{{item.nameZn}}</a>
            </div> 
        </div>
    </div>
    </div>
    <div class="btn-footer">
      <button class="common-btn info" @click="submit()">确认</button>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Toast, Switch } from "vant";
Vue.use(Toast).use(Switch);

import Header from "../../components/header/Header";
import { padDetail , taskUpdate } from "../../api/goods"
import { factoryList, goodsList} from '../../api/product'

export default {
  data() {
    return {
      title: "生产排产",
      isLoading:true,
      idCode:'',
      parts: [],
      bad: [],
      
      badsIndex: [],    // 选中拆废数组
      getPartsList:[],  // 选中精拆零件数组 
    
      checked: false,
      annotationMsg: "",

      factoryData:[],  // 存储型号 品牌
      newFactoryData:[],
      factoryId:'',
      detailData:[],   // 获取件货录入的详细数据
      type:'',
      isShow:true,     
      id:'',
      goodsId:'',
      goodsName:'',
      flag:true,
      orderId:'',
    };
  },
  components: {
    "app-header": Header
  },
  mounted(){
     this.idCode = this.$route.params.idCode;  // 获取二维码的ID码
    //  this.orderId = localStorage.getItem('orderId'), 
     this.getDetaildata();
     this.getFactoryData();
  },
  methods: {
    // 获取统货录入的详细数据
    getDetaildata(){   
      // 测试使用
      //  padDetail('WT-57VV8NEXTP05201').then(res=>{

      padDetail(this.idCode).then(res=>{
         // debugger  
        if(res.success ){          
          if(res.data !== null){
            this.detailData = res.data
            this.isLoading = false;
            console.log(this.detailData)
            this.type = this.detailData.type
            this.getPartsList = this.detailData.disassemblyIds;  // 获取零件ID [12, 18]
            this.factoryId = this.detailData.factoryId;
            this.goodsId = this.detailData.goodsId;   // 货品种类ID  1
            this.goodsName = this.detailData.goodsName;
            this.id = this.detailData.id;  // 

            if(this.type == 'jingchai'){
                this.isShow = true;
              }else {
                this.isShow = false;
            }  

            if( this.goodsName !== '废发动机变速箱' ){
               this.flag = false
            }else{
               this.flag = true
            }
            
            // 根据扫码的类型   获取精拆还是拆废
             let params = {
                parentId: 1,
                type:this.type
              }
              goodsList(params).then(res =>{
                // debugger
                if(res.success){
                  this.parts = res.data;
                  // console.log(this.parts)
                }
              })
          } 
          }else {
             this.isLoading = true;   
              setTimeout(() => {
                this.$router.push('/index');
              }, 1300);
          }        
      })
    },

    //获取品牌型号的方法
    getFactoryData(){
       let params={
         pageIndex:1,
         pageSize:1000
       }
       factoryList(params).then(res=>{
        //  debugger
         if(res.success){
           this.factoryData = res.data; 
          //  console.log(this.factoryData)  
           this.newFactoryData = this.factoryData.filter(item=>(item.id == this.factoryId));       
          //  console.log(this.newFactoryData)           
         }
       })
    },
  
    switchChange(){
      //  console.log(this.checked)
       if(this.checked){
         this.type = 'chaifei'
         let params = {
            parentId: 1,
            type:'chaifei'
          }
          goodsList(params).then(res =>{
            // debugger
            if(res.success){
              this.bad = res.data;
              // console.log(this.bad)
            }
          })                    
       }else{
         this.type = 'jingchai'
       }
    },

    change(id) {
      const idArray = this.getPartsList
      if(this.getPartsList.includes(id)){
        this.getPartsList = idArray.filter(item => item !== id)
      }else {
        this.getPartsList.push(id)
      }
      // console.log(this.getPartsList)  // 精拆零件
    },

     badChange(id) {
       const idArray = this.badsIndex
        if(this.badsIndex.includes(id)){
          this.badsIndex = idArray.filter(item => item !== id)
        }else {
          this.badsIndex.push(id)
        }
        // console.log(this.badsIndex)  // 拆废零件


      // let arrbadIndex = this.badsIndex.indexOf(i);
      // if (arrbadIndex > -1) {
      //   this.badsIndex.splice(arrbadIndex, 1);
      // } else {
      //   this.badsIndex.push(i);
      // }
      // console.log(this.badsIndex)  // 转 拆废零件选中数组
    },

    // 确认提交方法
    submit() {
      if(this.type == 'chaifei' && this.checked == true ){
          let params = { 
            codeId:this.idCode,
            // orderId:this.orderId,           
            id:this.detailData.id,   
            type:this.type,
            goodsName:this.goodsName,
            postscript:this.annotationMsg,
            disassemblyIds:this.badsIndex,          
          }
          taskUpdate(params).then(res =>{
            // debugger
            if(res.code == 0){
              Toast({
                message: '提交成功',
                duration: 1000
              });
              setTimeout(() => {
                this.$router.push("/list");
              }, 1300);
                      
            }
          })
      } else {
          let params = {
            codeId:this.idCode,
            // orderId:this.orderId,           
            id:this.detailData.id, 
            goodsName:this.goodsName,
            type:this.type,       
            disassemblyIds:this.getPartsList,              
          }
          taskUpdate(params).then(res =>{
            // debugger
            if(res.code == 0){
            Toast({
                message: '提交成功',
                duration: 1000
              });
              setTimeout(() => {
                this.$router.push("/list");
              }, 1300);          
            }
        })
      }       
    },  
  },

  computed: {
    factory(){
      let onFactory = this.factoryData.filter(item=>(item.id == this.factoryId))
      // console.log(onFactory)
      return onFactory
    },    
  },

  watch:{
    checked(newVal){
      if(newVal){
        this.type = 'chaifei'
      } else{
        this.type = 'jingchai'
      }
    }
  }
};
</script>


<style scoped lang='less'>
.production-box {
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
    margin-bottom: 0.2rem;
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
  .borno {
    border-bottom: none;
  }
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
.partsBox {
  width: 100%;
  margin-left: 0.4rem;
  padding: 0.1rem;
  box-sizing: border-box;
  overflow: hidden;
  a {
    float: left;
    width: unit(100/4, %);
    height: 0.6rem;
    line-height: 0.6rem;
    text-align: center;
    font-size: 0.3rem;
    border-radius: 0.3rem;
    margin: 0.15rem 0.2rem;
    box-sizing: border-box;
    color: #555;
    background-color: #fff;
    border: 0.01rem solid #0284de;
    text-decoration: none;
  }
  .pitch {
    background-color: #0284de;
    color: #fff;
  }
}
.bottom-box {
  margin-bottom: 1.8rem;
}
.switch {
  float: right;
}
.annotationBox {
  width: 93%;
  border: 0.01rem solid #c2c2c2;
  line-height: 0.35rem;
  font-size: 0.26rem;
  margin-left: 0.3rem;
}
</style>