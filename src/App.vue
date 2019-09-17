<template>
  <div id="app">
    <div class="clientId">{{clientId}}</div>
    <router-view />
  </div>
</template>
<script>
import { updateUser } from "@/api/user";
export default {
  data() {
    return {
      clientId: ""
    };
  },
  mounted() {
    let that = this;
    function plusReady() {
      //监听click事件，用户从消息中心点击触发的
      setTimeout(() => {
        if (!window.plus) {
          return;
        }
        var pinf = plus.push.getClientInfo();
        var cid = pinf.clientid; //客户端标识
        // plus.nativeUI.toast(cid);
        // that.clientId = cid
        // plus.nativeUI.toast(cid);
        // updateUser({
        //    'id': this.userInfor['id'],
        //     'account': this.userInfor['account'],
        //     'registrationId': rid,
        //     'clientType': Config.clientType
        // })
        plus.push.addEventListener(
          "click",
          function(msg) {
            // plus.push.clear();  // 清空所有消息
            // plus.nativeUI.toast("点击通知消息");
            // wap2app.open("http://192.168.2.7:8080/#/index?index=0");
            // console.log("You clicked: " + msg.title); //推送消息标题
            // console.log("You clicked: " + msg.content); //推送消息内容
            // //根据payload传递过来的数据，打开一个详情
            // var payload = msg.payload;
            // if (payload) {
            //     // payload 按照规范是 Object，但实际推送过来有可能是 String，需要多一步处理；
            //     if (typeof payload === "string") {
            //         payload = JSON.parse(payload);
            //     }
            //     if (typeof payload === "object") {
            //         //payload是一个json对象，可以传递业务数据，开发者可以根据实际需求自定义参数
            //         //本示例在payload中传入新闻id，wap2app接收到推送后，直接打开新闻详情
            //         var detailId = payload.id;
            //         //wap2app.open(url)可以直接打开对应的webview
            //         //这里是示例，实际项目中开发者需根据M站的url拼接页面地址
            //         wap2app.open(
            //             "http://192.168.2.7:8080/#/index?index=0"
            //         );
            //     }
            // }
          },
          false
        );

        //监听接收透传消息事件
        plus.push.addEventListener(
          "receive",
          function(msg) {
            // plus.nativeUI.toast("收到了receive消息");
            //处理透传消息的业务逻辑代码
          },
          false
        );
      }, 3000);
    }
    if (window.plus) {
      plusReady();
    } else {
      document.addEventListener("plusready", plusReady, false);
    }
  }
};
</script>

<style lang="less" >
html,
body {
  height: 100%;
  font-size: 16px;
}
body {
  -webkit-font-smoothing: antialiased;
}
#app {
  height: 100%;
}
a {
  text-decoration: none;
}
.clientId {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
}
.btn {
  width: 90%;
  margin: 30px auto 20px;
  button {
    height: 40px;
    line-height: 38px;
    border-radius: 20px;
  }
}
.title {
  .right {
    span {
      color: #999;
      font-size: 12px;
    }
  }
}
.bac100 {
  height: 100vh;
  background: white;
  box-sizing: border-box;
}
.orang {
  color: orange;
}
.van-swipe-cell__right {
  width: 65px;
  text-align: center;
  background: red;
  line-height: 100px;
  color: white;
}
.content {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0.64rem;
  // 根据上title的高度设置
  bottom: 0.8rem;
  // 根据下tag的高度设置
  overflow: auto;
  // 或 scroll
  background-color: #f5f5f5;
}

.info {
  width: 100%;
  margin: 0.1rem 0;
  font-size: 0.28rem;
  color: #333;
  .info-item {
    width: 100%;
    display: flex;
    padding-left: 0.3rem;
    box-sizing: border-box;
    line-height: 0.6rem;
    .name {
      display: block;
      flex: 0 0 1.8rem;
      text-align: left;
      color: #373737;
      font-weight: bold;
    }
    .value {
      flex: 1;
      color: #333;
      text-align: left;
    }
    .sign {
      color: #ee2929;
    }
  }
}
.loading {
   position: absolute; top: -2rem; bottom: 0; left: 0; right: 0; margin: auto;
  }
</style>
