<template>
  <div style="text-align: center;">
    <br>
    <h1>已抹除签名</h1>
  </div>
</template>

<script>
import { onMounted } from 'vue';

export default {
  setup() {
    onMounted(()=>{
      localStorage.removeItem('sing');
    })
  }
}
</script>

<style>

</style>