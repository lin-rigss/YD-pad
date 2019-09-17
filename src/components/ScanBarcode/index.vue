<template>
  <div class="scanBroad" v-if="this.scanVisible">
    <van-nav-bar
      title="标题"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 二维码容器 -->
    <div class="scan" ref="bcid" id="bcid"></div>
	<div class="reStart">
		<van-button type="primary" @click="reScan" size="large">重新扫描</van-button>	<br>
		<van-button  @click="onClickLeft" size="large">返回</van-button>	
	</div>	
  </div>
</template>

<script>
import { NavBar, Button } from "vant";

export default {
  neme: "ScanBarcode",
  components: {
    NavBar
  },
  props: {
    scanVisible: {
      type: Boolean
    }
  },
  data() {
    return {
      scan: null
    };
  },

  watch: {
    scanVisible: function(val) {
      if (val) {
        setTimeout(() => {
          this.startRecognize();
        }, 0);
      }
    }
  },

  methods: {
    onClickLeft() {
      if (this.scan) {
        this.scan.close();
        this.scan = null;
      }
      this.hideVisible();
    },
    onClickRight() {
      this.startRecognize();
    },
    hideVisible() {
      this.$emit("update:scanVisible", false);
	},
	reScan(){
		if(this.scan){
			this.scan.close();
			this.scan = null;
		}
		this.startRecognize();
	},
    startRecognize() {
      //开启扫描
      try {
        var filter;
        //自定义的扫描控件样式
        var styles = {
          frameColor: "#29E52C",
          scanbarColor: "#29E52C",
          background: ""
        };
        //扫描控件构造
        this.scan = new plus.barcode.Barcode("bcid", filter, styles);
        this.scan.onmarked = this.onmarked;
        this.scan.onerror = this.onerror; //扫描错误
        this.scan.start();
      } catch (e) {
        alert("出现错误啦:\n" + e);
      }
    },
    onerror(e) {
      //错误弹框
      this.scan.close();
      this.scan = null;
      this.$emit("errorFun", "识别失败");
      this.hideVisible();
    },
    onmarked(type, result) {
      //这个是扫描二维码的回调函数，type是扫描二维码回调的类型
      var text = "";
      switch (
        type //QR,EAN13,EAN8都是二维码的一种编码格式,result是返回的结果
      ) {
        case plus.barcode.QR:
          text = "QR: ";
          break;
        case plus.barcode.EAN13:
          text = "EAN13: ";
          break;
        case plus.barcode.EAN8:
          text = "EAN8: ";
          break;
      }
      this.scan.close();
      this.scan = null;
      this.$emit("succsssFun", result);
      this.hideVisible();
    }
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
.scanBroad {
  position: fixed;
  z-index: 999999;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  // background: white;
  .scan {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 150px;
    background: black;
  }
  .reStart{
    height: 150px;
    background: white;
	  position: fixed;
	  bottom: 0;
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  justify-content: center;
	  
	  width: 100%;
	  box-sizing: border-box;
	  padding: 0 40px;
  }
}
</style>
