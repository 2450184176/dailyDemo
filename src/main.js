import Vue from 'vue';
import AceEditor from 'vue-editor-ace';
import App from './App.vue';
import axios from 'axios';
import router from './router';
import elementui from 'element-ui';
import JsonEditor from 'vue-json-edit';
import 'element-ui/lib/theme-chalk/index.css';


Vue.use(JsonEditor);
Vue.use(AceEditor);
Vue.prototype.$axois = axios;
Vue.use(elementui);
Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  render: h => h(App),
});
