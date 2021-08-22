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
      <!-- <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="Tab 1">Content of Tab Pane 1</a-tab-pane>
        <a-tab-pane key="2" tab="Tab 2" force-render>Content of Tab Pane 2</a-tab-pane>
        <a-tab-pane key="3" tab="Tab 3">Content of Tab Pane 3</a-tab-pane>
      </a-tabs> -->
      <div style="margin:5px"></div>
      <div>
        <a-divider/>
        <div v-show="quickStart.show.date">
          <h2>1. 选择生效日期</h2>
          <a-radio-group v-model:value="quickStart.addDate" style="width: 100%">
            <a-radio value="now">仅今天</a-radio>
            <a-radio value="custom">自定义</a-radio>
            <a-radio value="range">自定义范围</a-radio>
          </a-radio-group>
          <div style="margin: 20px"></div>
          <a-date-picker v-model:value="quickStart.date" v-show="quickStart.addDate == 'custom'" />
          <a-range-picker v-model:value="quickStart.rangeDate" v-show="quickStart.addDate == 'range'" />
        </div>
        <div v-show="quickStart.show.subject">
          <h2>2. 勾选需要发布的科目</h2>
          <a-checkbox-group v-model:value="quickStart.subject">
            <a-row>
              <a-col :span="6" v-for="item in quickStart.subjectList" :key="item">
                <a-checkbox :value="item">{{ item }}</a-checkbox>
              </a-col>
            </a-row>
          </a-checkbox-group>
        </div>
        <div v-show="quickStart.show.addWork">
          <h2>3. 填写各科作业</h2>
          <a-tabs v-model:activeKey="activeKey">
            <a-tab-pane v-for="(item,key) in quickStart.subject" :key="item" :tab="item">
              <a-row>
                <a-col :span="24">
                  <a-form-item label="名称 ">
                    <a-input v-model:value="quickStart.addWork.text" />
                  </a-form-item>
                </a-col>
                <a-col :span="24">
                  <a-form-item label="范围 ">
                    <a-input v-model:value="quickStart.addWork.pages" />
                  </a-form-item>
                </a-col>
                <a-col :span="24">
                  <a-form-item label="标签 ">
                    <a-select
                      v-model:value="quickStart.addWork.tag"
                      :options="quickStart.tagOptions"
                      mode="tags"
                      placeholder="添加标签"
                      style="width: 100%"
                    >
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :span="24">
                  <a-form-item label="备注 ">
                    <a-input v-model:value="quickStart.addWork.remarks" />
                  </a-form-item>
                </a-col>
              </a-row>
            </a-tab-pane>
          </a-tabs>
        </div>
        <div v-show="quickStart.show.result">
          <a-result
            status="success"
            title="图片已生成"
            sub-title="数据不会保存，刷新即清除。"
          >
            <template #extra>
              <a-button key="console" type="primary">查看图片</a-button>
              <a-button key="buy">保存</a-button>
            </template>
          </a-result>
        </div>

        <a-divider />
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
import { defineComponent, reactive, ref, onMounted } from 'vue';
import { ArrowRightOutlined, ArrowLeftOutlined, RollbackOutlined } from '@ant-design/icons-vue';

export default {
  components: {
    ArrowRightOutlined,
    ArrowLeftOutlined,
    RollbackOutlined
  },
  
  setup() {
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
        date: true,
        subject: false,
        addWork: false,
        result: false,
        nextButton: true,
        nextButtonText: '下一步',
        disabledBackButton: true,
        againPush: false
      },
      addDate: '',
      tagOptions: [{value:'普通'},{value:'重要'},{value:'惩罚性'}],
      date: '',
      rangeDate: [],
      addWork: {
        subject: '',
        text: '',
        pages: '',
        remarks: '',
        tag: ['普通']
      },
      next: (()=>{
        console.log('[DEBUG] 下一步')
        
        if ( quickStart.show.date == true && quickStart.show.subject == false && quickStart.show.addWork == false ) {
          // 状态更新
          quickStart.show.date = false
          quickStart.show.subject = true
          quickStart.show.addWork = false
          quickStart.show.result = false
          quickStart.progress += 30

          quickStart.show.disabledBackButton = false
          // 逻辑代码
          console.log(quickStart.addDate)
          
        }else if ( quickStart.show.date == false && quickStart.show.subject == true && quickStart.show.addWork == false ) {
          // 状态更新
          quickStart.show.date = false
          quickStart.show.subject = false
          quickStart.show.addWork = true
          quickStart.show.result = false
          quickStart.progress += 40
          quickStart.show.nextButtonText = '提交'
          console.log(quickStart.addWork.tag)
          // 逻辑代码
        }else if ( quickStart.show.date == false && quickStart.show.subject == false && quickStart.show.addWork == true ) {
          // 状态更新
          quickStart.show.nextButton = false
          quickStart.show.date = false
          quickStart.show.subject = false
          quickStart.show.addWork = false
          quickStart.show.result = true
          quickStart.progress += 30
          quickStart.show.againPush = true
          // 逻辑代码
        }
      }),

      back: (()=>{
        if ( quickStart.show.date == false && quickStart.show.subject == true && quickStart.show.addWork == false ) {
          // 状态更新
          quickStart.show.date = true
          quickStart.show.subject = false
          quickStart.show.addWork = false
          quickStart.show.result = false
          quickStart.progress -= 30
          quickStart.show.disabledBackButton = true
        }else if ( quickStart.show.date == false && quickStart.show.subject == false && quickStart.show.addWork == true ) {
          // 状态更新
          quickStart.show.nextButton = true
          quickStart.show.date = false
          quickStart.show.subject = true
          quickStart.show.addWork = false
          quickStart.show.result = false
          quickStart.progress -= 40
          quickStart.show.nextButtonText = '下一步'
        }

      }),

      againPush: (()=>{
        location.reload();
      })
    })
    return {
      activeKey: ref('1'),
      quickStart,
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
</style>