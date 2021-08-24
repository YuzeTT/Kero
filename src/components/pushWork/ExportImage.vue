<template>
  <div class="image">
    <!-- {{ date }}
    {{ work }} -->
    <div class="header">
      <!-- <span class="title">作业</span> -->
      <div>日期 
        <span style="background-color: black;padding: 0 10px;color:#fff">2108 D24</span>
      </div>
    </div>
    <!-- <div class="frame">
      <div style="height: 50px;">
        <span class="header_table" style="padding-left:0px;">
          <div>总数 
            <span>{{ work.totalNum }}</span>
          </div>
        </span>
        <span class="top_right">
          <div>
            <a-row :gutter="12">
              <a-col>
                <span>发布人员</span>
                <br>
                <span>发布日期</span>
                <br>
                <span>时间戳</span>
                <br>
                <span>更新时间</span>
              </a-col>
              <a-col>
                2517746965
                <br>
                2021-08-24
                <br>
                1629807446
                <br>
                N/A
              </a-col>
            </a-row>
          </div>
        </span>
      </div>
      <div style="clear:both;"></div>
      
      <div class="content">
        <div v-for="(item, index) in works" :key="index">
          <h2>{{item.name}}</h2>
          <ol>
            <li class="works" v-for="(items, index) in item.text" :key="index">
              <span>{{items}}</span>
            </li>
          </ol>
        </div>
       
      </div>
      
    </div> -->

    <!-- <table border="0" width="100%" v-for="(item, index) in works" :key="index">
      <tr>
        <th height="30" colspan="4" style="text-align: center">{{ item.name }}</th>  
      </tr>
      <tr>
        <th>序号</th>
        <th>作业</th>
        <th>备注</th>
        <th>完成</th>
      </tr>
      <tr v-for="(items,index) in item.text" :key="index">
        <td>{{ index+1 }}</td>
        <td>{{ items }}</td>
        <td></td>
        <td width="40px"></td>
      </tr>
    </table> -->
    <!-- <button @click="work.total()">Button</button> -->
    <table class="table table-bordered">
      <thead>
        <tr>
          <th scope="col" style="width:50px;text-align: center;">序号</th>
          <th scope="col" style="text-align: center;">作业</th>
          <!-- <th scope="col" style="text-align: center;">备注</th> -->
          <th scope="col" style="width:50px;text-align: center;">完成</th>
        </tr>
      </thead>
      <tbody v-for="(item, index) in works" :key="index">
        <!-- <div class="table table-bordered" v-for="(item, index) in works" :key="index"> -->
          <tr style="text-align: center;color:#1890ff;background-color: #e6f7ff;">
            <td colspan="4" style="">{{ item.name }}</td>
          </tr>
          <tr v-for="(items, index) in item.text" :key="index">
            <td scope="row" style="text-align: center;">{{ index+1 }}</td>
            <td>{{ items }}</td>
            <!-- <td></td> -->
            <td></td>
          </tr>
        <!-- </div> -->
      </tbody>
    </table>
  </div>
</template>

<script>
import { defineComponent, reactive, ref, watch } from 'vue';

export default {
  props: {
    date: String,
    works: Array
  },
  setup(props) {
    watch(props,()=>{
      work.total()
    })
    const work = reactive({
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
/* .image {
  padding: 8px;
}

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

.top_right {
  padding: 0 3px;
  border-bottom: 1px solid black;
  border-left: 1px solid black;
  font-size: 1rem;
  position: absolute;
  right: 0;
  top: 0;
}

.content {
  padding: 15px;
  font-size: 1.2rem;
  font-weight: 600;
}

.works {
  font-size: 1.2rem;
  margin-left: 10px;
}

.title {
  font-size: 2rem;
  font-weight: 500;
  text-align: center;
}

.header_table {
  font-size: 25px;
  position: absolute;
  left: 0;
  top: 0;
}

.header_table div {
  padding-left: 6px;
}

.header_table >div >span {
  line-height: 0px;
} */

</style>