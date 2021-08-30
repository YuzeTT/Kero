<template>
  <div class="home">
    <div class="header">
      <h1 class="title">Kero 工具箱</h1>
      <p class="sing" @click="auth.goSing()">当前身份：{{ auth.sing }}</p>
    </div>
    <div class="container">
      <div class="buttons">
        <a-space direction="vertical" style="width: 100%;">
          <br>
          <a-row :gutter="[30,30]">
            <a-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <div class="card" @click="() => $router.push('/pushWork')" >
                <h2>作业生成 <i class="iconfont icon-right" style="font-size:1.3rem;vertical-align:top;"></i></h2>
                <p style="margin-block-end: 0">快速生成作业清单。</p>
              </div>
            </a-col>
            <a-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <div class="card">
                <h2>敬请期待</h2>
                <p style="margin-block-end: 0">这里啥也没有</p>
              </div>
            </a-col>
          </a-row>
          
        </a-space>
      </div>
    </div>

    <div class="footer">
      <a style="font-size:30px;color:#1A73E8" class="iconfont icon-GitHub" href="https://github.com/YuzeTT/Kero"></a>
      <br>
      v0.1.1-alpha
      <br>
      Copyright ©2021 uzett.com. All rights reserved. 
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, ref, onMounted } from 'vue';
import { CloudUploadOutlined,InfoCircleOutlined,ReloadOutlined,ArrowRightOutlined } from '@ant-design/icons-vue';
import {  useRouter } from 'vue-router'

export default defineComponent ({
  name: 'Home',
  components: {
    CloudUploadOutlined,
    InfoCircleOutlined,
    ReloadOutlined,
    ArrowRightOutlined
  },
  setup() {
    const router = useRouter()  

    onMounted(()=>{
      let sing = localStorage.getItem('sing');
      sing != null? auth.sing = sing : auth.sing = '游客'
    })
    const visible = ref(false);

    const showModal = () => {
      visible.value = true;
    };

    const handleOk = e => {
      visible.value = false;
    };

    const auth = reactive({
      sing: '游客',
      i: 1,
      goSing: () => {
        if(auth.i >= 5) {
          router.push('/sing')
        }else {
          auth.i ++

          setTimeout(()=>{
            auth.i = 1
          },2000)
        }
        
      }
    })

    return {
      visible,
      showModal,
      handleOk,
      auth
    };
  }
})
</script>

<style scoped>
.home {
  font-family: 'Noto Sans SC', sans-serif;
}

.header {
  padding-top: 40px;
  display: grid;
}

.title {
  text-align: center;
  font-size: 1rem;
  font-weight: 700;
  margin-block-end: 0
}

.subtitle {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 600;
}

.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 30px 20px 0 20px;
}

.buttons {
  margin: 0 auto;
}

@media screen and (min-width: 300px) {
  .title {
      font-size:50px;
  }
  
  .container{
    padding: 10px 20px 0 20px;
  }
}

@media screen and (min-width: 500px) {
  .title {
      font-size:50px;
  }

  .container{
    padding: 20px 20px 0 20px;
  }
}

@media screen and (min-width: 780px) {
  .title {
      font-size:70px;
  }

  .container{
    padding: 30px 20px 0 20px;
  }
}

@media screen and (min-width: 1024px) {
  .title {
      font-size:85px;
  }

  .container{
    padding: 30px 20px 0 20px;
  }
}


.card {
  border: 1px solid #eaeaea;
  border-radius: 5px;
  padding: 24px;
  transition: box-shadow .2s ease,border .2s ease;
  cursor:pointer;
}

@media (hover: hover) {
  .card:hover {
    transition:box-shadow .2s ease;
    box-shadow: 0 8px 30px rgba(0,0,0,0.12);
    border: 1px solid transparent
  }
}

.footer {
  padding-top: 30px;
  text-align: center;
  color: #8c8c8c;
}

.sing {
  font-size: 25px;
  text-align: center;
  color: #8c8c8c;
}
</style>
