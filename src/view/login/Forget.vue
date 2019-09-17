<template>
  <div class="login" >
    <div class="logo-wrapper">
      <div class="circle">
        <img :src="logo" alt />
      </div>
    </div>

    <div class="formBox">
      <div class="account" v-show="isAccount">
        <van-cell-group>
          <van-field
            class="inp"
            v-model="field.mobile"
            required
            clearable
            label="手机号"
            placeholder="请输入手机号"
          />

          <van-cell-group>
            <van-field
              class="inp"
              v-model="sms"
              center
              clearable
              required
              label="验证码"
              placeholder="验证码"
            >
              <van-button  slot="button" size="small" type="primary" @click="simFn()" :disabled="!(field.mobile.length ==11)">发送验证码</van-button>
            </van-field>
          </van-cell-group>

          <van-field
            class="inp"
            v-model="field.password"
            type="password"
            label="新密码"
            placeholder="请输入新密码"
            clearable
            required
          />
           <van-field
            class="inp"
            v-model="field.confirmPassword"
            type="password"
            label="确认密码"
            placeholder="请输入确认密码"
            clearable
            required           
            
            
            
          />
        </van-cell-group>
      </div>
      <div class="mobile" v-show="!isAccount">
        <van-cell-group>
          <van-field v-model="field.mobile" label="手机号" placeholder="请输入手机号" clearable required />
          <van-field v-model="sms" center clearable required label="短信验证码" placeholder="请输入短信验证码">
            <count-down
              slot="button"
              :startTime="60"
              :mobile="field.mobile"
              :disabled="!(field.mobile.length ==11)"
            ></count-down>
          </van-field>
        </van-cell-group>
      </div>
      <div class="footer">
        <!-- <div
        class="left"
        @click="isAccount = !isAccount"
        >{{!isAccount ? '账户密码登录' :'短信验证码登录'}}</div>-->
        <div class="right">
          <!-- <router-link to='/forgetpasswoed'>忘记密码？</router-link> -->
        </div>
      </div>
      <van-button class="login-btn" size="large" @click="forgetSubmit" >确认</van-button>
      <!-- :disabled="loginDisable" -->
     
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Toast } from 'vant';
Vue.use(Toast);
import { loginByAccount, loginByMobile, saveAppid , getSim ,resetPassword} from "@/api/user";
import { config } from "@/util";
import { saveUserInfor } from "@/util/dealStorage";
import { CountDown } from "@/components";
export default {
  name: "forget",
  components: {
    CountDown
  },
  data() {
    return {
      isAccount: true,
      flag:true,
      msg:'',

      field: {
        account: "",
        mobile: "",
        password: "",
        confirmPassword:'',
      },
      logo: config.logo,
      clientType: config.clientType,
      sms: ""
    };
  },
  computed: {
    // loginDisable() {
    //   let flag = true;
    //   if (!this.isAccount) {
    //     flag = !(this.field.mobile.length == 11 && this.sms.length > 0);
    //   } else {
    //     flag = !(
    //       this.field.account.length > 0 && this.field.password.length > 0
    //     );
    //   }
    //   return flag;
    // }
  },
  mounted() {
    // localStorage.setItem("secondres", "");
  },
  methods: {
    simFn(){
       let params = {
         mobile:this.field.mobile
       }
       getSim(params).then(res=>{
           if(res.code == 0){
            //  this.disabled = false;
             Toast('发送成功');
           }
       })
    },
    forgetSubmit() {
      if(this.password !== this.confirmPassword){
        Toast('请输入相同密码');
      }else {
         let params = {
          'sms':this.sms,
          'mobile': this.field.mobile,
          'password':this.field.password
           } 
         resetPassword(params).then(res =>{
          //  debugger
            if(res.code == 0){
              this.$router.push('/login')
            }
         })
      }

      
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
    top: 22%;
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

.formBox {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);

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
    font-size: 0.25rem;
  }

  .login-btn {
    width: 100%;
    border-radius: 0.1rem;
    color: #fff;
    text-align: center;
    line-height: 0.4rem;
    font-size: 0.3rem;
    border: none;
    background-color: #2d9bf0;
    margin: 0 auto;
    opacity: 100;
    margin-bottom: .3rem;
  }
  p {
    width: 100%;
    text-align: right;
    margin-top: 0.2rem;
  }
}
</style>