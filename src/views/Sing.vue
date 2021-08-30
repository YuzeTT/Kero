<template>
  <div style="text-align: center;">
    <br>
    <h1>写入签名</h1>
    <div>
      <label for="password">密码：</label><input id="password" type="text" v-model="auth.form.password" placeholder="请输入动态密码" style="max-width:300px;width:70%">
      <div style="margin: 8px 0"></div>
      <label for="password"><span @click="auth.goRemove()">签名：</span></label><input type="text" maxlength="18" v-model="auth.form.sing" placeholder="请输入签名（18个英文/9个中文）" style="max-width:300px;width:70%">
      <div style="margin: 8px 0"></div>
      <p style="color: #8c8c8c">如未知密码，请联系管理员获取动态密码</p>
      <button @click="() => $router.go('-1')">返回</button>
      <span style="margin: 0 5px"></span>
      <button @click="auth.writeSing">提交</button>
      <div style="margin: 8px 0"></div>
      <p :style="auth.writeSingInfoStyle">{{ auth.writeSingInfo }}</p>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import md5 from 'js-md5';
import {  useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()  

    const auth = reactive({
      writeSing: () => {
        let d = new Date()
        let time = {}
        time.yy = d.getFullYear()
        time.mm = d.getMonth()+1
        time.dd = d.getDate()
        time.HH = d.getHours()

        time.mm = parseInt(time.mm) < 10 ? '0' + time.mm : time.mm
        time.dd = parseInt(time.dd) < 10 ? '0' + time.dd : time.dd
        time.HH = parseInt(time.HH) < 10 ? '0' + time.HH : time.HH
        let pwd = md5(''.concat(time.yy,time.mm,time.dd,time.HH,'auth.uzett.com'))

        if (auth.form.password.toLowerCase() == pwd) {
          localStorage.setItem('sing', auth.form.sing);
          auth.writeSingInfoStyle.color = 'green'
          auth.writeSingInfo = '写入成功'
        }else {
          auth.writeSingInfoStyle.color = 'red'
          auth.writeSingInfo = '密码错误'
        }
      },
      goRemoveInt: 1,
      goRemove: ()=>{
        if(auth.goRemoveInt >= 5) {
          router.push('/remove_sing')
        }else {
          auth.goRemoveInt ++
          setTimeout(()=>{
            auth.goRemoveInt = 1
          },2000)
        }
      },
      writeSingInfo: '',
      writeSingInfoStyle: {
        color: 'black'
      },
      form: {
        password: '',
        sing: ''
      }
    })
    return {auth}
  }
}
</script>

<style>

</style>