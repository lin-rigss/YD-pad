<template>
<div class="much-table">
    <div class="container">
    <div class="row">
        <table class="table table-striped table-bordered table-condensed">
            <tr>                        
                <th>品类</th>
                <th>单位</th>
                <th>采购重量(千克)</th>
                
                <!-- <th colspan="3">过磅照片</th> -->
               
            </tr>
            <tr v-for="(item, index) in goodsList" :key="index" >
                <td class="cen" >{{item.goodsName}}</td>
                <td class="cen">{{filterUnit(item.unit)}}</td>
                <td class="cen">{{item.goodsWeight}}</td>
                <!-- <td class="cen" colspan="3" >
                    <div v-for="(url,i) in item.img" :key='i'>
                        <img :src="url" alt="" @click="enlargement(i)" >
                    </div>
                </td> -->
            </tr>
            <tr >
                <td colspan="3">总重量:{{weight}} 千克</td>               
            </tr>
            <tr>
                <td colspan="3" >到厂总重量: <input type="text" class="inpt" v-model="realityWeight" @change="weiChange()">千克</td>
            </tr>
        </table>
        
    </div>
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
import { ImagePreview } from 'vant';
Vue.use(ImagePreview);

  export default {
     data () {
       return {
        realityWeight:''

       }
     },
    props: {
        goodsList: {
          type: Array
        },
        weight:{
          type: Number
        }   
    },
    methods: {
        enlargement(i) {
            ImagePreview({
                images: this.goodsList[i].img,
                startPosition: i
            });
        },
        weiChange(){
            this.$emit('wei',this.realityWeight)
        },
        filterUnit(u){ 
            // console.log(u)  // 2     
            let unitName = unit.filter(item=>{
                if(item.value == u){
                return item                    
                }
            })
            return unitName[0].cname
          }          
        
     },
    //  computed: {
    //      unitAry(){
    //          let newAry = this.goodsList.filter(item=>{
    //           return unit.filter(uitem=>{
    //               if(uitem.value == item.unit){
    //                   return uitem.cname
    //                 console.log('单位',uitem.cname)
    //               }
    //           })
    //       })
    //      }
    //  },
   
 
  }
</script>


<style scoped lang='less'>
table{
    width: 100%;
}
.container{
    width: 100%;
    margin-top: .2rem;
}
.container table tr{
   width: 100%;
   
}
.container table tr th {
    font-size: 0.15rem;
    vertical-align: middle;
    text-align: center;
    color: #333;
    background-color: #e9e9e9;
    border: 1px solid #e4e4e4;
    line-height: .4rem;
    font-size: .25rem;
    font-weight: normal;
}
.container table tr td {
    font-size: 0.25rem;
    border-bottom: 1px solid #e4e4e4;
    line-height: 1rem;
    // text-align: center;
    padding-left: .2rem;
    padding: .1rem;

    img{
        width: 1rem;
        height: 1rem;
        background-size: contain;
        margin-right: .2rem;
    }   
    .inpt{
      height: .5rem;
      margin-right: .1rem;
    } 
   
    
}

 
.cen{
    text-align: center;
    img{
        float: left;
    }
}










</style>