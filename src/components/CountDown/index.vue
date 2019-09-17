<template>
  <van-button
    size="small"
    @click="handleClilk"
    type="primary"
    :disabled='disable'
  > {{start>0 ? `${start}秒后重新获取` :'发送验证码'}}</van-button>
</template>
<script>
import { getSim,checkAccount } from "@/api/user";
import { config } from '@/util'
export default {
    name: "CountDown",
    props: {
        disabled: {
            default: false,
            type: Boolean
        },
        startTime: {
            default: 120,
            type: Number
        },
        mobile: {
            type: String
        },
        needCheck:{
          default:false,
          type:Boolean
        },
        account:{
          default:'',
          type:String
        }
    },
    computed: {
        disable() {
            return this.disabled || this.startDowm;
        }
    },
    data() {
        return {
            startDowm: false,
            start: 0
        };
    },
    methods: {
         handleClilk() {
            if (this.mobile.length != 11) {
                this.$toast("请输入正确的手机号");
                return;
            }
            if(this.account.length === 0){
               this.$toast("请输入账号");
               return
            }
            if(this.needCheck){
              checkAccount({
                mobile:this.mobile,
                account:this.account,
                clientType:config.clientType
              }).then(res => {
                if(res.success){
                  this.sendMessage()
                }
              })
            }else{
              this.sendMessage()
            }
           
        },
        sendMessage(){
            getSim({
                mobile: this.mobile
            }).then(res => {
                if (res.success) {
                   this.$toast('验证码已经发送到您的手机')

                    this.start = this.startTime;
                    this.startDowm = true;
                    this.time1 = setInterval(() => {
                        if (this.start <= 0) {
                            this.startDowm = false;
                            this.start = 0;
                            clearInterval(this.time1);
                            return;
                        } else {
                            this.start = this.start - 1;
                        }
                    }, 1000);
                }
            });
        }
    },
    mounted() {
        // console.log(this.disabled)
    }
};
</script>
<style lang="less" scoped>
</style>

