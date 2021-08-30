<template>
  <div style="text-align: center;">
    <br>
    <h1>写入签名</h1>
    <div>
      <label for="password">密码：</label><input id="password" type="text" v-model="auth.form.password" placeholder="请输入" style="max-width:300px;width:70%">
      <div style="margin: 8px 0"></div>
      <label for="password">签名：</label><input type="text" v-model="auth.form.sing" placeholder="请输入" style="max-width:300px;width:70%">
      <div style="margin: 8px 0"></div>
      <button @click="auth.writeSing">提交</button>
      <div style="margin: 8px 0"></div>
      <p :style="auth.writeSingInfoStyle">{{ auth.writeSingInfo }}</p>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import md5 from 'js-md5';

export default {
  setup() {
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
        let pwd = md5(''.concat(time.yy,time.mm,time.dd,time.HH))

        if (auth.form.password == pwd) {
          localStorage.setItem('sing', auth.form.sing);
          auth.writeSingInfoStyle.color = 'green'
          auth.writeSingInfo = '写入成功'
        }else {
          auth.writeSingInfoStyle.color = 'red'
          auth.writeSingInfo = '密码错误'
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