<template>
  <div class="login-container">
    <van-nav-bar class="page-nav-bar"
      title="登录"
    >
    <van-icon slot="left" name="cross" @click="$router.back()"/>
    </van-nav-bar>

    <van-form @submit="onSubmit" ref="loginForm">
      
      <van-field
        center
        v-model="user.mobile"
        placeholder="请输入手机号"
        name="mobile"
        :rules="userFormRules.mobile"
        type="number"
        maxlength="11"
        >
      <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
      center
        v-model="user.code"
        type="number"
        maxlength="6"
        name="code"
        placeholder="请输入验证码"
        :rules="userFormRules.code"
        
      > 
      <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
      <template #button>
        <!-- time 倒计时事件 -->
        <van-count-down  v-if="isCountDownShow"
          :time="1000*10"  
          format="ss s"
          @finish="isCountDownShow=false"
          />

        <van-button 
        v-else
          native-type="button"
          size="small" 
          round 
          type="default" 
          class="send-sms-btn"
          @click="onSendSms"
          >获取验证码</van-button>
      </template>
    </van-field>
      <div class="login-btn-wrap ">
        <van-button  class="login-btn" block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>


</div>
</template>

<script>
  import {loginAPI} from '@/api'
export default {
  data() {
    return {
      isCountDownShow: false,//是否展示倒计时
      user:{
        mobile: '13911111111',
        code: '246810'
      },
      userFormRules:{
        mobile: [
          { 
            required: true, 
            message: '手机号不能未空' 
          },
          {
            pattern: /^1[3|5|7|8|9]\d{9}$/,
            message: '号码格式不正确'
          }
        ],
        code: [
          { 
            required: true, 
            message: '验证码不能未空' 
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码格式'
          }
        ]
      }
    };
  },
  methods: {
    async onSubmit() {
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true,
        duration: 0, //0就是一直显示
      });
      try {
        const { data } = await loginAPI(this.user)
        // 保存token到store
        this.$store.commit('setUser',data.data)
        this.$toast.success('登录成功')
        // 登录成功，跳转回原来页面
        this.$router.back()
      } catch (error) {
        if(error.response.status === 400){
          this.$toast.fail('手机号码或者验证码错误')
        }else{
          this.$toast.fail('登陆失败，请稍后重试')
        }
      }
      
    },
    async onSendSms(){
      // 1. 校验手机号码
      try {
        await this.$refs.loginForm.validate('mobile')
        console.log('验证通过')
      } catch (error) {
        console.log('验证失败',error)
        return 
      }
      // 2. 验证通过显示倒计时
      this.isCountDownShow=true
      // 3. 请求发送验证码
      // 模拟 号码是13911111111成功 否则失败
      if(this.user.mobile === '13911111111'){
        this.$toast('发送成功')
      }else{
        this.isCountDownShow = false
        this.$toast('发送失败')
      }
      // try{
      //   const res = await sendSmsAPI(this.user.mobile)
      //   console.log('发送成功',res)
      // }catch(err){
      //   console.log('发送失败',err)
      // }
    }
     
  },
}
</script>

<style scoped lang="less">
  .login-container{
    .toutiao{
      font-size: 37px;
    }
    .send-sms-btn {
      width: 152px;
      height: 46px;
      line-height: 46px;
      background-color: #ededed;
      font-size: 22px;
      color: #666;
    }
    .login-btn-wrap {
      padding: 53px 33px;
      .login-btn {
        background-color: #6db4fb;
        border: none;
      }
    }
  }


</style>