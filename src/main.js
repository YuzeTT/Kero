import { createApp } from 'vue'
import {
  Button,
  Space,
  Modal,
  Card,
  Tabs,
  PageHeader,
  Progress,
  Checkbox,
  Row,
  Col,
  Divider,
  Form,
  Input,
  Radio,
  Result,
  DatePicker,
  Select,
  InputNumber,
  Spin
} from 'ant-design-vue';
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import 'ant-design-vue/dist/antd.css';

const app = createApp(App)

app.use(router)
app.use(Button)
app.use(Space)
app.use(Modal)
app.use(Card)
app.use(Tabs)
app.use(PageHeader)
app.use(Progress)
app.use(Checkbox)
app.use(Row)
app.use(Col)
app.use(Divider)
app.use(Form)
app.use(Input)
app.use(Radio)
app.use(Result)
app.use(DatePicker)
app.use(Select)
app.use(InputNumber)
app.use(Spin)

app.mount('#app')
