<template>
  <div style="text-align: center;">
    <br>
    <h1>抹除签名</h1>
    <br>
    <button @click="() => $router.go('-1')">取消抹除并返回</button>
    <span style="margin: 0 5px"></span>
    <div style="margin: 5000px 0"></div>
    <p style="color:red">抹除签名后将重置所有数据，变为游客登录，且不可恢复，后果自负!!!</p>
    <div style="margin: 10000px 0"></div>
    <p style="color:red">抹除签名后将重置所有数据，变为游客登录，且不可恢复，后果自负!!!</p>
    <p style="color:red">后果自负!!! 后果自负!!! 后果自负!!!</p>
    <button @click="() => $router.go('-1')">取消抹除并返回</button>
    <div style="margin: 10px 0"></div>
    <button v-on:dblclick="remove()" style="background-color: red;color:white">双击确认抹除签名（谨慎操作！不可回档！）</button>
    
    <div style="padding: 10px 0"></div>
  </div>
</template>

<script>
import { onMounted } from 'vue';

export default {
  setup() {
    return {
      remove: () => {localStorage.removeItem('sing');}
    }
  }
}
</script>

<style>

</style>