<template>
  <div>
    <!-- style="border: 1px solid rgb(235, 237, 240)" -->
     <a-page-header
      title="发布作业"
      sub-title=""
      @back="() => $router.go(-1)"
    />
    <div class="title">
      <h1 style="font-weight: 600;font-size:2.2rem">快速开始</h1>
    </div>

    <div class="container">
      <a-progress :percent="quickStart.progress" />
      <div style="margin:5px"></div>
      <div>
        <div v-show="quickStart.show.step1">
          <a-divider/>
          <h2>1. 选择生效日期</h2>
          <a-radio-group v-model:value="quickStart.addDate" style="width: 100%">
            <!-- <a-radio value="now">仅今天</a-radio> -->
            <a-radio value="custom">自定义</a-radio>
            <a-radio value="range">自定义范围</a-radio>
          </a-radio-group>
          <div style="margin: 20px"></div>
          <a-input-number v-model:value="quickStart.dateObj.s.yy" :min="0" :max="9999"  v-show="quickStart.addDate == 'custom'"/>
          <a-input-number v-model:value="quickStart.dateObj.s.mm" :min="1" :max="12"  v-show="quickStart.addDate == 'custom'"/>
          <a-input-number v-model:value="quickStart.dateObj.s.dd" :min="1" :max="31"  v-show="quickStart.addDate == 'custom'"/>
          <!-- <a-date-picker v-model:value="quickStart.date" v-show="quickStart.addDate == 'custom'" /> -->
          <a-range-picker v-model:value="quickStart.rangeDate" v-show="quickStart.addDate == 'range'" />
          <a-divider/>
        </div>
        <div v-show="quickStart.show.step1">
          <h2>2. 勾选需要发布的科目</h2>
          <a-checkbox-group v-model:value="quickStart.subject">
            <a-row>
              <a-col :span="6" v-for="item in quickStart.subjectList" :key="item">
                <a-checkbox :value="item">{{ item }}</a-checkbox>
              </a-col>
            </a-row>
          </a-checkbox-group>
          <a-divider/>
        </div>
        <div v-show="quickStart.show.step2">
          <a-divider/>
          <h2>3. 填写各科作业</h2>
          <a-tabs v-model:activeKey="activeKey">
            <a-tab-pane v-for="(item,index) in quickStart.subject" :key="index" :tab="item">
              <a-textarea v-model:value="quickStart.workArr[index]" placeholder="Basic usage" :rows="4" />
            </a-tab-pane>
          </a-tabs>
          <a-divider/>
        </div>

        <div v-show="quickStart.show.step3">
          <!-- <a-result
            status="success"
            title="图片已生成"
            sub-title="数据不会保存，刷新即清除。"
          >
            <template #extra>
              <a-button key="console" type="primary">查看图片</a-button>
              <a-button key="buy" @click="quickStart.createImage()">保存</a-button>
            </template>
          </a-result> -->
          <h2 style="font-weight: 600;font-size:1.4rem">快速开始</h2>
          <div>
            <!-- <a-result
              status="success"
              title="请检查"
              sub-title="确认无误点击提交"
            >
              <template #icon>
                <smile-twoTone />
              </template>
            </a-result> -->
            <a-result
              status="success"
              title="图片已生成"
              sub-title="长按下方图片保存。"
            >
            </a-result>
            <ExportImage ref="imageDom" class="exportImage" :date="quickStart.date" :works="quickStart.work"></ExportImage>
            
            <div class="imageBox">
              <a-spin style="" v-show="quickStart.show.loadingImage" />
              <!-- <img :src="quickStart.imageUrl" alt="图片" width="100%" /> -->
              <img v-show="quickStart.show.image" :src="quickStart.imageUrl" alt="图片" class="imageShow" >
            </div>

          

          </div>
          <a-divider/>
        </div>
        
      
        <a-row>
          <a-col :span="6">
            <a-button :disabled="quickStart.show.disabledBackButton" block size="large" @click="quickStart.back()" v-show="quickStart.show.nextButton">
              <ArrowLeftOutlined />
            </a-button>
          </a-col>
          <!-- <a-col :span="1"></a-col> -->
          <a-col :span="18">
            <a-button type="primary" block size="large" @click="quickStart.next()" v-show="quickStart.show.nextButton">
              {{ quickStart.show.nextButtonText }}
              <ArrowRightOutlined />
            </a-button>
          </a-col>
        </a-row>
        <a-button type="primary" block size="large" @click="quickStart.againPush()" v-show="quickStart.show.againPush">
          再次发布
          <RollbackOutlined />
        </a-button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, ref, onMounted,h, toRaw } from 'vue';
import { Modal } from 'ant-design-vue';
import { ArrowRightOutlined, ArrowLeftOutlined, RollbackOutlined, SmileTwoTone } from '@ant-design/icons-vue';
import html2canvas from 'html2canvas'
import ExportImage from '../components/pushWork/ExportImage.vue'
import { dividerProps } from 'ant-design-vue/lib/divider';

export default {
  components: {
    ArrowRightOutlined,
    ArrowLeftOutlined,
    RollbackOutlined,
    SmileTwoTone,
    ExportImage
  },
  setup() {
    onMounted(()=>{
      let d = new Date()
      quickStart.dateObj.s.yy = d.getFullYear()
      quickStart.dateObj.s.mm = d.getMonth()+1
      quickStart.dateObj.s.dd = d.getDate()

      // quickStart.setDate('now',quickStart.dateObj.s,quickStart.dateObj.e)
    })
    
    const imageDom = ref(null)
    const quickStart = reactive({
      progress: 0,
      subject: [],
      subjectList: [
        '语文','数学','英语','历史',
        '地理','政治','生物','物理',
        '化学','劳技','美术','音乐',
        '体育','其他',
      ],
      show: {
        nextButton: true,
        nextButtonText: '下一步',
        disabledBackButton: true,
        againPush: false,
        step1: true,
        step2: false,
        step3: false,
        loadingImage: false,
        image: false
      },
      addDate: '',
      tagOptions: [{value:'普通'},{value:'重要'},{value:'惩罚性'}],
      dateObj: {
        s:{
          yy: 0,
          mm: 0,
          dd: 0
        },
        e:{
          yy: null,
          mm: null,
          dd: null
        }
      },
      date: ['N/A','N/A'],
      rangeDate: [],
      addWork: {
        subject: '',
        text: '',
        pages: '',
        remarks: '',
        tag: ['普通']
      },
      workArr: [],
      work: [],
      next: (()=>{
        console.log('[DEBUG] 下一步')
        
        if ( quickStart.show.step1 == true && quickStart.show.step2 == false && quickStart.show.step3 == false ) {
          // --- 状态更新 ---
          quickStart.show.step1 = false
          quickStart.show.step2 = true
          quickStart.progress += 40

          quickStart.show.disabledBackButton = false
          quickStart.show.nextButtonText = '提交'
          // --- 逻辑代码 ---
          console.log(quickStart.addDate)
          quickStart.setDate(quickStart.addDate)
          
        }else if ( quickStart.show.step1 == false && quickStart.show.step2 == true && quickStart.show.step3 == false ) {
          // --- 状态更新 ---
          quickStart.show.step2 = false
          quickStart.show.step3 = true
          quickStart.progress += 60
          quickStart.show.nextButton = false
          quickStart.show.againPush = true
          
          // --- 逻辑代码 ---
          quickStart.subject.map((item,index) => {
              quickStart.work.push({name:item, text:quickStart.workArr[index].split('\n')})
          })
          quickStart.show.nextButtonText = '再次生成'

          quickStart.show.loadingImage = true
          
          setTimeout(()=>{
            quickStart.createImage()
            setTimeout(()=>{
              quickStart.show.image = true
              quickStart.show.loadingImage = false
            },400)
          },200)
        }
      }),

      back: (()=>{
        if ( quickStart.show.step1 == false && quickStart.show.step2 == true && quickStart.show.step3 == false ) {
          // 状态更新
          quickStart.show.step1 = true
          quickStart.show.step2 = false
          quickStart.progress -= 40
          quickStart.show.disabledBackButton = true
        }else if ( quickStart.show.step1 == false && quickStart.show.step2 == false && quickStart.show.step3 == true ) {
          // 状态更新
          quickStart.show.nextButton = true
          quickStart.show.step2 = true
          quickStart.show.step3 = false
          quickStart.progress -= 60
          quickStart.show.nextButtonText = '下一步'
        }

      }),

      setDate: (type) => {
        let s = quickStart.dateObj.s
        let e = quickStart.dateObj.e
        if (type == 'custom') {
          s.mm = parseInt(quickStart.dateObj.s.mm) < 10 ? '0' + s.mm : s.mm
          s.dd = parseInt(quickStart.dateObj.s.dd) < 10 ? '0' + s.dd : s.dd
          quickStart.date[0] = s.yy + '-' + s.mm + '-' + s.dd
          quickStart.date[1] = s.yy + '-' + s.mm + '-' + s.dd
        }
        if (type == 'range') {
          s.mm = quickStart.dateObj.s.mm < 10 ? '0' + s.mm : s.mm
          s.dd = quickStart.dateObj.s.dd < 10 ? '0' + s.dd : s.dd
          e.mm = quickStart.dateObj.e.mm < 10 ? '0' + e.mm : e.mm
          e.dd = quickStart.dateObj.e.dd < 10 ? '0' + e.dd : e.dd
          quickStart.date[0] = s.yy + '-' + s.mm + '-' + s.dd
          quickStart.date[1] = e.yy + '-' + e.mm + '-' + e.dd
        }
      },

      againPush: (()=>{
        location.reload();
      }),

      imageUrl: '',

      createImage: ()=>{
        html2canvas(imageDom.value.$el, {dpi:300,scale:4}).then(canvas => {
          let dataURL = canvas.toDataURL("image/png");
          quickStart.imageUrl = dataURL
        });
      }
    })
    return {
      activeKey: ref('1'),
      quickStart,
      imageDom
    }
  },
  // onMounted() {
  // },
}
</script>

<style scoped>
.title {
  text-align: center;
  padding-top: 30px;
}

.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 0 20px;
}

.exportImage {
  width:600px;
  padding: 20px;
  /* text-align: center; */
  /* top: -99999px;
  position: absolute; */
}

.imageBox {
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.05);
  width:100%;
  padding: 30px;
  text-align: center;
}
</style>