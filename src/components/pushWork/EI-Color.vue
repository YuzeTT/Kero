<template>
  <div class="image">
    <div class="header" style="height:100px">
      
      <a-row style="position: relative;" >
        <a-col :span="12">
          <span class="title">Kero作业工具</span>
          
          <!-- <span style="padding-left:15px;font-size:30px;">数量
            <a-tag color="blue">
              {{ work.totalNum }}
            </a-tag>
          </span> -->
          <div style="padding: 5px"></div>
          <!-- <span style="font-size:20px;color: black;"><InfoCircleOutlined style="font-size:18px;color:black" /> 可用于热敏打印</span> -->
          <a-breadcrumb style="font-size:18px">
            <!-- <a-breadcrumb-item>Tero</a-breadcrumb-item> -->
            <a-breadcrumb-item><ReadOutlined style="font-size:18px;"/> 光泽县第二中学</a-breadcrumb-item>
            <a-breadcrumb-item>七年级2班</a-breadcrumb-item>
          </a-breadcrumb>
        </a-col>
        <a-col :span="12" style="position: absolute;right: 0;top: 0;">
          <div class="info">
            <a-row :gutter="[10,10]">
              <a-col style="font-weight: 400;">
                <!-- text-align-last:justify -->
                  <!-- <a-badge color="green" :text="date[0]" /> -->
                <!-- <a-badge color="green">
                  <template #text>
                    <span  style="font-size: 18px">
                      发布日期：{{ date[0] }}
                    </span>
                  </template>
                </a-badge>
                <br>
                <a-badge color="yellow">
                  <template #text>
                    <span  style="font-size: 18px">
                      有效期至：{{ date[1] }}
                    </span>
                  </template>
                </a-badge>
                <br>
                <a-badge color="cyan">
                  <template #text>
                    <span  style="font-size: 18px">
                      发布者：{{ sing }}
                    </span>
                  </template>
                </a-badge> -->

                 <a-timeline>
                  <a-timeline-item color="blue" style="padding: 0 0 8px">发布者：{{ sing }}</a-timeline-item>
                  <a-timeline-item color="green" style="padding: 0 0 8px">发布日期：{{ date[0] }}</a-timeline-item>
                  <a-timeline-item color="red" style="padding: 0 0 8px">有效期至：{{ date[1] }}</a-timeline-item>
                </a-timeline>
              </a-col>
              <a-col style="font-weight: 500;">
                <span></span>
                <br>
                <span></span>
                <br>
                <span></span>
              </a-col>
            </a-row>
          </div>
        </a-col>
      </a-row>
    </div>

    <div v-for="(item,index) in works" :key="index">
      <table border="1" class="tables">
        <tr>
          <th colspan="3" class="subject">{{ item.name }}</th>
        </tr>
        <tr>
          <td style="width:50px;text-align: center;">序号</td>
          <td>作业</td>
        </tr>
        <tr v-for="(items, index) in item.text" :key="index">
          <td style="text-align: center;">{{ index+1 }}</td>
          <td style="white-space: normal">{{ items }}</td>
        </tr>
      </table>
      <!-- <br> -->
      <!-- <div style="padding: 10px"></div> -->
    </div>
    <!-- <a-alert message="UI更新" type="success" /> -->
    <br>
    <div style="padding-top:0px">
      <a-tag color="processing" style="font-size:17px;padding: 3px 8px">
        <template #icon>
          <FileTextOutlined />
        </template>
        <span>作业批号：{{ work.ts }}</span>
      </a-tag>
      <a-tag color="warning" style="font-size:17px;padding: 3px 8px">
        <template #icon>
          <ExclamationCircleOutlined />
        </template>
        <span>非官方</span>
      </a-tag>
      <div style="padding:5px"></div>
      <!-- <span style="font-size: 20px;color: black;">内容不一定准确，仅供参考；<br>如有错误/遗漏请以课堂布置为准！<br> Powered by 饶志伟</span>
      <br> -->
      <a-alert
        message="防依赖提醒"
        type="info"
        show-icon
      >
        <template #description>
          <div>此平台是学生开发的第三方平台。</div>
          <div>内容不一定准确，仅供参考；</div>
          <div>如有错误/遗漏请以课堂布置为准！；</div>
          <div><b>推荐将此平台仅用于核对作业，请勿产生依赖。</b></div>
        </template>
      </a-alert>
      <div class="footer">Release v0.2.0-alpha | Github YuzeTT | Powered by Zhiwei (k.uztt.cc)</div>
      <!-- ===== 项目二维码 ===== -->
      <!-- <span class="rb_PushWork">
        <span>了解此项目</span>
        <br>
        <img src="@/assets/qrcode.png" alt="" class="qrcode_PushWork">
      </span> -->
    </div>
  </div>
</template>

<script>
import { reactive, watch } from 'vue';
import { ReadOutlined,FileTextOutlined,ExclamationCircleOutlined } from '@ant-design/icons-vue';

export default {
  props: {
    date: Array,
    works: Array,
    sing: String
  },
  components: {
    ReadOutlined,
    FileTextOutlined,
    ExclamationCircleOutlined
  },
  setup(props) {
    watch(props,()=>{
      work.total()
      work.workList = props.works
      work.ts = new Date().getTime()
    })
    const work = reactive({
      ts: 'N/A',
      workList: [],
      totalNum: 0,
      total: ()=>{
        props.works.map(item=>{
          work.totalNum += item.text.length
        })
      },
      
    })
    return {
      work
    }
  },

}
</script>

<style scoped>
table {
  border-color: black;
}

td, th{
  padding: 3px;
  font-size: 18px;
  color: rgba(0,0,0,.85);
}

.title {
  font-size: 2.54rem;
  font-weight: 600;
  line-height: 28px;
  /* color: rgba(0, 0, 0, .88); */
}

.info {
  /* border: 1px solid black; */
  /* border-left: 1px solid rgba(0, 0, 0, 0.18); */
  padding: 0 5px;
  padding-bottom: 3px;
  /* border-radius: 6px; */
  font-size: 18px;
  color: black;
}

.tables {
  width: 100%;
  border: 0 solid white;
}
.tables > tr{
  border-bottom: 1px solid #f0f0f0;
}

.subject {
  text-align: center;
  color: rgba(0,0,0,.85);
  background-color: #FAFAFA;
  /* border-bottom: 2px solid #f0f0f0; */
}

.footer {
  text-align:center;
  font-size:17px;
  padding-top:8px;
  color: rgba(0,0,0,.55);
}

</style>