import Vue from 'vue'
import App from './App.vue'
import store from './store'

new Vue({
  el: '#app',

  // 컴포넌트에서 스토어를 사용할 수 있도록 함
  store,

  render: h => h(App)
})
