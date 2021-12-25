import Vue from 'vue'
import App from './App.vue'
import {
  Table,
  TableColumn,
  Popover,
  Tag,
  Input,
  Col,
  Row,
  Button,
  Tooltip,
  Checkbox
} from "element-ui";
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Popover);
Vue.use(Tag);
Vue.use(Input);
Vue.use(Button);
Vue.use(Col);
Vue.use(Row);
Vue.use(Tooltip);
Vue.use(Checkbox);

new Vue({
  render: h => h(App),
}).$mount('#app')