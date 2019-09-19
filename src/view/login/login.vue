<template>
  <div class="login" >
    <div class="logo-wrapper">
      <div class="circle">
        <img :src="logo" alt />
      </div>
      <div class="text">Welcome</div>
    </div>

    <div class="formBox">
      <div class="account" v-show="isAccount">
        <van-cell-group>
          <van-field
            class="inp"
            v-model="field.account"
            required
            clearable
            label="用户名"
            placeholder="请输入用户名"
          />

          <van-field
            class="inp"
            v-model="field.password"
            type="password"
            label="密码"
            placeholder="请输入密码"
            clearable
            required
          />
        </van-cell-group>
      </div>
      <div class="mobile" v-show="!isAccount">
         <van-cell-group>
            <van-field class="inp" v-model="field.mobile" label="手机号" placeholder="请输入手机号" clearable required />
            <van-field
              class="inp"
              v-model="sms"
              center
              clearable
              required
              label="验证码"
              placeholder="验证码"
            >
              <van-button  slot="button" size="small" type="primary" @click="simfn" :disabled="!(field.mobile.length ==11)">发送验证码</van-button>
            </van-field>
          </van-cell-group>
        <!-- <van-cell-group>
          <van-field class="inp" v-model="field.mobile" label="手机号" placeholder="请输入手机号" clearable required />
          <van-field class="inp" v-model="sms" center clearable required label="验证码" placeholder="短信验证码">
            <count-down
              :startTime="60"
              slot="button"              
              :mobile="field.mobile"
              :disabled="!(field.mobile.length ==11)"
              @click="sim()"
            ></count-down>
          </van-field>
        </van-cell-group> -->
        
      </div>

      <van-button class="login-btn" size="large" @click="loginSubmit" :disabled="loginDisable">登录</van-button>
     
      <div class="bot">
         <div class="switch" @click="isAccount = !isAccount">{{!isAccount ? '账户密码登录':'短信验证码登录'}}</div>
        <router-link to="/forget" class="forget">忘记密码?</router-link>
      </div>
      
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Toast } from 'vant';
Vue.use(Toast);
import { loginByAccount, loginByMobile, saveAppid ,getSim} from "@/api/user";
import { config } from "@/util";
import { saveUserInfor } from "@/util/dealStorage";
import { CountDown } from "@/components";
export default {
  name: "login",
  components: {
    CountDown
  },
  data() {
    return {
      isAccount: true,
      field: {
        account: "",
        mobile: "",
        password: ""
      },
      logo: config.logo,
      clientType: config.clientType,
      sms: ""
    };
  },
  computed: {
    loginDisable() {
      let flag = true;
      if (!this.isAccount) {
        flag = !(this.field.mobile.length == 11 && this.sms.length > 0);
      } else {
        flag = !(
          this.field.account.length > 0 && this.field.password.length > 0
        );
      }
      return flag;
    }
  },
  mounted() {
    localStorage.setItem("secondres", "");
  },
  methods: {
    loginSubmit() {
      // this.$toast.success('登录成功')
      let param = {},
        login = "";
      if (this.isAccount) {
        param = {          
          password: this.field.password,
          account: this.field.account
        };
        login = loginByAccount;
      } else {
        param = {          
          mobile: this.field.mobile,
          sms: this.sms,     
        };
        login = loginByMobile;
      }
      login(param).then(res => {
        if (res.success) {
          // debugger        

          let userInfor = {
            ...res.data,
            token: res.token
          };

          /**存储用户的ClientId */

          if (window.plus) {
            var pinf = plus.push.getClientInfo();
            var cid = pinf.clientid; //客户端标识
            saveAppid({
              userId: userInfor["id"],
              appId: cid || "",
              type: config.clientType
            })
              .then(res => {
                console.log(res);
              })
              .catch(err => console.log(err));
          }

          saveUserInfor(userInfor);
          this.$toast.success("登录成功");

          // 设置登录的标记
          localStorage.setItem('login',true)

          this.$router.push({
            path: "index",
            query: {
              index: 0
            }
          });
        }
      });
    },
    simfn(){
       let params = {
         mobile:this.field.mobile
       }
       getSim(params).then(res=>{
           if(res.code == 0){
              Toast('发送成功');
           }
       })
    },
  }
};
</script>


<style scoped lang='less'>
.login {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: -webkit-linear-gradient(top, #0390f4 51%, #7bc861);
  .logo-wrapper {
    position: fixed;
    top: 27%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);

    .circle {
      width: 1.4rem;
      height: 1.4rem;
      background-color: #fff;
      border-radius: 50%;
      box-shadow: 0 0 30px -2px #0276ca;
      margin: 0 auto;
      margin-bottom: 0.1rem;
      padding-top: 0.09rem;

      img {
        display: block;
        width: 1.2rem;
        height: 1.2rem;
        margin: 0 auto;
        background-size: contain;
      }
    }
    .text {
      color: #fff;
      font-size: 0.45rem;
      text-align: center;
      margin-bottom: 0.3rem;
    }
  }
}
.bot{
  margin-top: .2rem;
  margin-bottom: .8rem;
  
  .switch{
    float: left;
    color: #0276ca;
    margin-top: .1rem;
  }
  .forget{
    margin-top: .1rem;
    float: right;
    a{
      // margin-top: .1rem;
    }
  }
 
}


.formBox {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  font-size: 0.28rem;

  width: 5.5rem;
  background-color: #fff;
  padding: 0.3rem;
  padding-bottom: 0.15rem;
  box-sizing: border-box;
  border-radius: 3%;
  box-shadow: 0 0 20px -2px #0276ca;

  .inp {
    border: 1px solid #f2f2f2;
    margin-bottom: 0.3rem;
    font-size: 0.28rem;
  }

  .login-btn {
    width: 100%;
    border-radius: 0.1rem;
    color: #fff;
    text-align: center;
    // line-height: 0.3rem;
    font-size: 0.3rem;
    border: none;
    background-color: #2d9bf0;
    margin: 0 auto;
    opacity: 100;
  }
  p {
    width: 100%;
    text-align: right;
    // margin-top: 0.2rem;
  }
}
</style>