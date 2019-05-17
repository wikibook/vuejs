import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

// 상태 'Auth'와 상태 'Board'를 Vuex의 스테이트로 일괄 관리할 수 있도록 정의
const state = {
  auth: { // 상태 'Auth'
    token: null, // 'token'을 null로 초기화
    userId: null // 'userId'을 null로 초기화
  },
  board: { // 상태 'Board'
    lists: [] // 상태 'TaskList'은 빈 리스트로 초기화
  }
}

export default new Vuex.Store({
  state, // 앞서 정의한 state를 전달
  getters,
  actions,
  mutations,
  strict: process.env.NODE_ENV !== 'production'
})
