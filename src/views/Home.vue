<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <div class="header">
      <span class="title">Kero</span>
      <div></div>
      <span class="subtitle">学习工具平台</span>
    </div>
    <div class="container">
      <div class="buttons">
        <a-space direction="vertical" style="width: 100%;">
          <router-link to="/pushWork">
            <a-button type="primary" block size="large">
              <template #icon><CloudUploadOutlined /></template>
              发布作业
            </a-button>
          </router-link>
          <a-button block size="large" @click="showModal">
            <template #icon><InfoCircleOutlined /></template>
            关于
          </a-button>
          <a-modal v-model:visible="visible" title="关于" @ok="handleOk">
            <p>当前版本：v0.1.0-dev</p>
          </a-modal>
        </a-space>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import { defineComponent, ref } from 'vue';
import { CloudUploadOutlined,InfoCircleOutlined } from '@ant-design/icons-vue';

export default defineComponent ({
  name: 'Home',
  components: {
    // HelloWorld
    CloudUploadOutlined,
    InfoCircleOutlined,
  },
  setup() {
    const visible = ref(false);

    const showModal = () => {
      visible.value = true;
    };

    const handleOk = e => {
      // console.log(e);
      visible.value = false;
    };

    return {
      visible,
      showModal,
      handleOk,
    };
  }
})
</script>

<style scoped>
.header {
  padding-top: 40px;
  display: grid;
}

.title {
  text-align: center;
  font-size: 2rem;
  font-weight: 400;
}

.subtitle {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 600;
}

.container {
  max-width: 500px;
  margin: 0 auto;
  padding: 50px 20px 0px 20px;
}

.buttons {
  margin: 0 auto;
}
</style>
