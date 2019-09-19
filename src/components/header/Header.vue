<template>
  <div class="header">
    <div class="top-wrapper">
      <!-- 左边结构 -->
      <div class="back-wrapper" v-if="isShow">
        <span class="iconfont icon-fanhui" @click="()=>{this.$router.go(-1)}"></span>
      </div>

      <!-- 中间结构 -->
      <form class="center-wrapper">
        {{title}}
      </form>

      <!-- 右边结构 -->
      <div class="search-wrapper" v-if="isquit"  @click="quit">       
       <i class="iconfont icon-gerenzhongxin"></i>
       <span>{{name}}</span> 
       <!-- <span>18810829060</span>  -->
      </div>

      <div class="search-wrapper" v-if="!isquit"  @click="homequit">
                                                  <!-- ()=>{this.$router.push('/index')} -->
       <i class="iconfont icon-tianchongxing-"></i>
        <span >回首页</span>
      </div>

    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Dialog } from "vant";
import { config } from "@/util";
import { getUserInfor } from "@/util/dealStorage";
import { close } from "fs";

export default {
  data() {
    return {
      logo: config.logo,
      name: '',
      userId:''
    };
  },
  props: {
    title: {
      type: String
    },
    isShow: {
      type: Boolean
    },
    isquit: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    quit() {
      Dialog.confirm({
        message: "确认退出吗？"
      })
        .then(() => {
          this.$router.push("/login");

          // 设置退出的标记 
          localStorage.removeItem('login')

        })
        .catch(() => {});
    },
    getUserName(){     
       this.name = getUserInfor().extendProperty.name;
      //  console.log(this.name)
      // getUserInfor().then(res =>{
      //   debugger
      //   if(res.success){
      //     this.name = res.data.extendProperty.name
      //   }
      // })
    },
    homequit(){
       Dialog.confirm({
        message: "确认回首页吗？"
      })
        .then(() => {
          this.$router.push("/index");
        })
        .catch(() => {});
    }
  },
  mounted(){
    this.getUserName();
  }
};
</script>


<style scoped lang='less'>
.header {
  position:fixed;
  left: 0;
  top:0;
  width: 100%;
  height: 0.64rem;
  /* 预留电池 信号的 高度 */
  padding-top: 0.2rem;
  background: -webkit-linear-gradient(left, #0284de 50%, #83c9fe);
  // background-color: #0390f4;
}

/* 顶部通栏 容器  样式 */
.header .top-wrapper {
  width: 100%;
  position: relative;
  color: #fff;
}
/*左边返回箭头 盒子  样式  */
.header .top-wrapper .back-wrapper {
  width: 0.5rem;
  height: 0.44rem;
  position: absolute;
  left: 0;
  top: 0;
  text-align: center;
  line-height: 0.44rem;
}
/* 返回箭头 样式 */
.header .top-wrapper .back-wrapper span {
  display: inline-block;
  color: white;
  font-size: 0.3rem;
}
/* 中间 盒子 */
.header .top-wrapper .center-wrapper {
  width: 100%;
  height: 0.44rem;
  box-sizing: border-box;
  text-align: center;
  line-height: 0.41rem;
  font-size: 0.3rem;
}

/* 右边 盒子 */
.header .top-wrapper .search-wrapper {
  width: 2.5rem;
  height: 0.44rem;
  position: absolute;
  right: 0.05rem;
  top: 0;
  text-align: right;
  line-height: 0.44rem;
  span{
    display: inline-block;
    color: white;
    font-size: 0.25rem;
  }
  i {
    display: inline-block;
    color: white;
    font-size: 0.25rem;
    margin-right: .05rem;
  }
}
</style>