<template>
  <div>
    <app-header :title="title" :isShow="true"></app-header>
    <div class="content">
      <van-loading class="loading" type="spinner" v-if="isLoading" color="#1989fa" />

      <div v-if="!isLoading">      
        <div class="cargo-box">
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
              <span class="name">货品类型：</span>
              <div class="value">
                <select class="drop" v-model="goods" @change="goodsChange">
                  <option value="" disabled >请选择</option>
                  <option
                    class="opt"
                    v-for="(item,index) in selectListData"
                    :key="index"
                    :value="item.id"
                  >{{ item.goodsName }}</option>
                </select>
              </div>
            </div>

            <div class="info-item" v-if="tonflag">
              <span class="name">单位：</span>
              <div class="value">
                 <input class="drop-short" type="text" v-model="tunnage">{{unitName}}</div>
            </div>

            <div class="info-item" v-if="!tonflag">
              <span class="name">单位：</span>
              <div class="value">1{{unitName}}</div>
            </div>


            <div class="classify-engine" v-show="engine">
              <div class="info-item">
                <span class="name">品牌：</span>
                <div class="value">
                  <select v-model="factory" class="drop" @change="modeln=0;">
                    <option value="" disabled >请选择</option>
                    <option
                      class="opt"
                      v-for="(item,index) in factoryData"
                      :key="index"
                      :value="item.id"
                    >{{ item.brand }}/{{item.model}}/{{item.textureType}}/{{item.atOrMt}}/{{item.oilyType}}</option>
                  </select>

                  <select v-model="modeln" v-show="false" class="drop-short">
                    <option
                      class="opt"
                      v-for="(item,index) in modelnObj"
                      :key="index"
                      :value="index"
                    >{{ item.model }}</option>
                  </select>
                </div>
              </div>
              
              <div class="info-item" >
                <span class="name">型号：</span>
                <div class="value"  v-if=" modelnAry.length > 0 ">{{modelnAry[0].model}}</div>
              </div>

              <div class="info-item" >
                <span class="name">货品材质：</span>
                <div class="value"  v-if=" modelnAry.length > 0 ">{{modelnAry[0].textureType}}</div>
              </div>

              <div class="info-item" >
                <span class="name" >AT / MT：</span>
                <div class="value"  v-if=" modelnAry.length > 0 ">{{modelnAry[0].atOrMt}}</div>
              </div>

              <div class="info-item" >
                <span class="name" >油质种类：</span>
                <div class="value"  v-if=" modelnAry.length > 0 ">{{modelnAry[0].oilyType}}</div>
              </div>
            </div> 

            <div class="classify-cistern" v-show="flag">
              <div class="info-item">
                <span class="name">货品材质：</span>
                <div class="value">
                  <van-radio-group v-model="textureType">
                    <van-radio name="qlv" class="vradio">全铝</van-radio>
                    <van-radio name="tlv" class="vradio">铁铝</van-radio>
                  </van-radio-group>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="cargo-box" v-show="engine">
          <div class="title">
            <i class="iconfont icon-mingxi"></i>
            <h3>拆解信息</h3>
          </div>
          <div class="info">
            <div class="info-item">
              <span class="name">拆解类型：</span>
              <div class="value">
                <van-radio-group v-model="type" @change="changeparts()">
                  <van-radio name="jingchai" class="vradio">精拆</van-radio>
                  <van-radio name="chaifei" class="vradio">拆废</van-radio>
                </van-radio-group>
              </div>
            </div>
          </div>

          <div class="info" v-show="!isShow">
            <div class="info-item">
              <span class="name sign">拆废备注：</span>
              <div class="value">
                <textarea
                  v-model="annotation"
                  class="annotationBox"
                  type="text"
                  placeholder="填写拆废原因，最多20个字。"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
                                    
        <div class="cargo-box bottom-box" v-show="engine">
          <div class="title">
            <i class="iconfont icon-shezhi"></i>
            <h3>拆解产生产品</h3>
          </div>
          <div class="partsBox" >
            <a
              v-for="(item,index) in parts"
              :key="index"
              @click="partsChange(item.id)"
              :class="{'pitch':getPartsList.includes(item.id)}"
            >{{item.nameZn}}</a>
          </div>
        </div>
      </div>
    </div>
    <div class="btn-footer">
      <button class="common-btn info" @click="skip" >确认</button>
    </div>
  </div>
</template>

<script>
export const unit = [
    {cname: '套', ename: 'SET', value: '1'},
    {cname: '个', ename: 'PCS', value: '2'},
    {cname: '公斤', ename: 'Kilo', value: '3'},
]


import Vue from 'vue';
import { Toast } from 'vant';
Vue.use(Toast);
import Header from "../../components/header/Header";
import { save ,selectList } from "../../api/goods"
import { factoryList, goodsList} from '../../api/product'

export default {
  data() {
    return {
      title: "添加拆解任务",
      isLoading:false,
      idCode:'',  // 二维码 ID
      texture: "1",
      sort: "1",
      kerogen: "1",
      type: "",   // 类型 精拆和拆废
      msg: "",
      annotation: "",     
      brand: "",
      isShow:true,

      flag: false,    // 水箱标记
      engine:false,   // 发动机标记
      other:false,    // 其它标记      

      textureType:"",    
      // 零件
      parts: [],
      // 选中零件数组
      partsIndex: [],     
      goodsData:[],    // 存储货品种类的数据
      goods:'',   // 货品类型ID
      goodsCode:'',
      goodsName:'',
      factoryData:[],  // 存储品牌
      factory:'',
      modelnAry:[],    // 存储型号
      modeln:'',
      goodsListData:[],
      getPartsList:[],
      orderId:'',
      selectListData:[],
      billId:'',

      tunnage:0, // input框的重量
      tonflag:false,
      unit:'',
      unitName:'',
     
    };
  },
  components: {
    "app-header": Header
  },
  mounted(){
    this.idCode = this.$route.params.idCode;  // 获取二维码的ID码 
    this.orderId =this.$route.params.orderId;   
    // this.orderId =localStorage.getItem('orderId');   
    this.getFactoryData(); // 品牌型号
    this.getSelectListData();  // 获取货品种类下拉菜单
  },
  methods: {
    // 获取下拉框 货品种类
    getSelectListData(){

      // this.orderId = '111333833474215710720'

       selectList(this.orderId).then(res=>{
        //  debugger
         this.selectListData = res.data;
         console.log(this.selectListData)
       })
    },

    // 获取品牌型号的方法
    getFactoryData(){
       let params={
         pageIndex:1,
         pageSize:1000
       }
       factoryList(params).then(res=>{
        //  debugger
         if(res.success){
           this.factoryData = res.data
          //  console.log(this.factoryData)
         }
       })
    },

    // 拆解类型  改变方法
    changeparts(){
      // console.log(this.type)
       // 获取精拆
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
    },

    // 货品种类  改变的方法
    goodsChange(){
      console.log(this.goods)
      // 通过id 获取 名称
      let newgoods = this.selectListData.filter(item => item.id == this.goods);

      // 获取下拉框中的   货品名称  货品id 
      this.goodsName = newgoods[0].goodsName;
      this.id = this.goods;
      // console.log(this.goodsName,this.id)
      this.unit = newgoods[0].unit;
      // console.log(this.unit)


      if (this.goodsName == "废发动机变速箱") {
          this.engine = true;
          this.flag = false;
        } else if(this.goodsName == '水箱'){
          this.flag = true;
          this.engine = false;
        }else{
          this.other = true;
          this.engine = false;
          this.flag = false;
        }       
        
        if(this.unit == '1'){
          this.unitName = '套'
          this.tonflag = false;

        }else if(this.unit == '2') {
          this.unitName = '个';
          this.tonflag = false;

        }else if(this.unit == '3'){
          this.unitName = '公斤'
          this.tonflag = true;
        }
        
        
    }, 
    

    // 确认提交的方法   
    skip() {
      if( this.goodsName == "废发动机变速箱"){
           let params = {
            goodsUnifyId:this.id,  // 货品统一id
            codeId:this.idCode,       //  编码ID
            goodsId:'',       // 货品品种id 
            num:'1',
            weight:Number(this.tunnage), 
            goodsName:this.goodsName,   // 选中的货品名称 
            factoryId:this.factory,    // 品牌型号ID  
            type:this.type,   // 拆解类型 
            disassemblyIds:this.getPartsList,   // 拆解的产生产品  [id]
            contentJson:'',      // 发动机  空
            postscript:this.msg    // 备注
          }
          save(params).then(res =>{         
           if(res.code == 0){
               Toast({
                  message: "提交成功",
                  duration: 1000
                });
                setTimeout(() => {
 
                  // this.$router.push("/details");
                  this.$router.push({name:'details', params: {orderId:this.orderId}});
                }, 1200);        
           }
        })
      }else if(this.goodsName == '水箱'){
           let params = {
                goodsUnifyId:this.id,  // 货品品种id (下拉框选中的id)
                codeId:this.idCode,       //  编码ID
                goodsId:'',       // 货品品种id (下拉框选中的id)
                goodsName:this.goodsName,   // 选中的货品名称
                num:'1',
                weight:Number(this.tunnage),   
                factoryId:'',    // 品牌型号ID  
                type:'chaifei',   // 拆解类型 
                disassemblyIds:[],   // 拆解的产生产品  [id]
                contentJson:{
                textureType:this.textureType
                },      // 发动机  空
                postscript:this.msg    // 备注
          }
          save(params).then(res =>{         
           if(res.code == 0){
               Toast({
                  message: "提交成功",
                  duration: 1000
                });
                setTimeout(() => {
                  // this.$router.push("/details");
                   this.$router.push({name:'details', params: {orderId:this.orderId}});
                }, 1200);        
           }
        })         
      }else{
         let params = {
            goodsUnifyId:this.id,  // 货品品种id (下拉框选中的id)
            codeId:this.idCode,       //  编码ID
            goodsId:'',       // 货品品种id (下拉框选中的id)
            goodsName:this.goodsName,   // 选中的货品名称 
            factoryId:this.factory,    // 品牌型号ID 
            num:'1',
            weight:Number(this.tunnage),   
            type:'chaifei',   // 拆解类型 
            disassemblyIds:[],   // 拆解的产生产品  [id]
            contentJson:'',      // 
            postscript:this.msg    // 备注
          }
          save(params).then(res =>{         
           if(res.code == 0){
               Toast({
                  message: "提交成功",
                  duration: 1000
                });
                setTimeout(() => {
                  // this.$router.push("/details");
                   this.$router.push({name:'details', params: {orderId:this.orderId}});
                }, 1200);        
           }
        })
      }
    },      
   

    partsChange(id) {
      const idArray = this.getPartsList
      if(this.getPartsList.includes(id)){
        this.getPartsList = idArray.filter(item => item !== id)
      }else {
        this.getPartsList.push(id)
      }
    },

   
  },
  computed: {
    brandObj() {
      return this.brandList[this.brand];
    },    
    // 根据品牌获取对象型号
    modelnObj(){      
        if(this.factoryData.length>0){
         let faId = this.factory 
          this.modelnAry = this.factoryData.filter(item =>(item.id == faId))
          // console.log(this.factory )
          return this.modelnAry 
        }
        return []
    }
  },
  watch: {
    type() {
      if (this.type === 'jingchai') {
        this.isShow = true;
      } else if(this.type === 'chaifei') {
        this.isShow = false;
      }
    },
    // unit(){
    //     if(this.unit == '1'){
    //       this.unitName = '套'
    //       this.tonflag = false;

    //     }else if(this.unit == '2') {
    //       this.unitName = '个';
    //       this.tonflag = false;

    //     }else if(this.unit == '3'){
    //       this.unitName = '公斤'
    //       this.tonflag = true;
    //     }
    // }
  }
};
</script>


<style scoped lang='less'>
.cargo-box {
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
  .not {
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

.info-item {
  line-height: 0.8rem;
}
.vradio {
  float: left;
  margin-right: 1rem;
  margin-top: .26rem;
}
.radio-r {
  margin-right: 1.22rem;
}
.bottom-box {
  margin-bottom: 1.8rem;
}

.drop {
  width: 66%;
  height: 0.65rem;
  background-color: #fff;
  border: 0.01rem solid #c2c2c2;
  font-size: .28rem;
  // option {
  //   width: 2rem;
  //   background-color: #fff;
  //   border: 0.01rem solid #0284de;
  // }
}
.drop-short {
  width: 30%;
  height: 0.6rem;
  background-color: #fff;
  border: 0.01rem solid #c2c2c2;
  margin-right: 0.4rem;
}
.annotationBox {
  width: 80%;
  border: 0.01rem solid #c2c2c2;
  line-height: 0.35rem;
  font-size: 0.26rem;
}
</style>