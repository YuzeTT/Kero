<template>
  <div class="image">
    <!-- {{ date }}
    {{ work }} -->
    <div class="header" style="height:100px">
      <!-- <span class="title">作业</span> -->
      <!-- <div>日期 
        <span style="background-color: black;padding: 0 10px;color:#fff">{{ date }}</span>
      </div> -->
      <a-row style="position: relative;" >
        <a-col :span="12">
          <span class="title">作业</span>
          <span style="padding-left:15px;font-size:30px;">数量
            <span style="font-size:23px;background-color: black;color:#fff;padding: 0 5px;font-weight: 700;"><span>{{ work.totalNum }}</span></span>
          </span>
          <br>
          <span style="font-size:20px;color: black;"><InfoCircleOutlined style="font-size:18px;color:black" /> 可用于热敏打印</span>
        </a-col>
        <a-col :span="12" style="position: absolute;right: 0;top: 0;">
          <div class="info">
            <a-row :gutter="[10,10]">
              <a-col style="font-weight: 400;text-align-last:justify">
                <span>发布日期</span>
                <br>
                <span>有效期至</span>
                <br>
                <span>发布者</span>
              </a-col>
              <a-col style="font-weight: 500;">
                <span>{{date[0]}}</span>
                <br>
                <span>{{date[1]}}</span>
                <br>
                <span>2517746965</span>
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
          <td style="width:50px">序号</td>
          <td>作业</td>
          <!-- <td style="width:50px">完成</td> -->
        </tr>
        <tr v-for="(items, index) in item.text" :key="index">
          <td>{{ index+1 }}</td>
          <td style="white-space: normal">{{ items }}</td>
          <!-- <td></td> -->
        </tr>
      </table>
      <br>
    </div>
    <span style="font-size: 20px;color: black;">TS {{ work.ts }}</span>
    <!-- <div style="font-size: 20px;color: black;">1/1</div> -->
  </div>
</template>

<script>
import { defineComponent, reactive, ref, watch } from 'vue';
import { InfoCircleOutlined } from '@ant-design/icons-vue';

export default {
  props: {
    date: Array,
    works: Array
  },
  components: {
    InfoCircleOutlined
  },
  setup(props) {
    watch(props,()=>{
      work.total()
      work.workList = props.works
      console.log(work.workList)
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
/*
.frame {
  padding: 0px;
  border: 2px solid black;
  position: relative;
}

.top_left {
  padding-left: 6px;
  position: absolute;
  left: 50%;
  transform:translate(-50%,0);
}

.header_table {
  font-size: 25px;
  position: absolute;
  left: 0;
  top: 0;
}
 */

table {
  border-color: black;
}

td, th{
  padding: 3px;
  font-size: 18px;
  color: black;
}

.title {
  font-size: 3rem;
  font-weight: 600;
  line-height: 50px;
  color: black;
}

.info {
  border: 1px solid black;
  padding: 0 5px;
  padding-bottom: 3px;
  /* font-weight: 600; */
  border-radius: 6px;
  font-size: 18px;
  color: black;
}

.tables {
  width: 100%;
  color: black;
}

.subject {
  text-align: center;
  color: black;
}

</style>