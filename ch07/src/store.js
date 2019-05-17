import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 스토어 정의
const store = new Vuex.Store({
  state: {
    // 태스크 초기 스테이트
    tasks: [
      {
        id: 1,
        name: '우유 사기',
        labelIds: [1, 2],
        done: false
      },
      {
        id: 2,
        name: 'Vue.js 관련 책 사기',
        labelIds: [1, 3],
        done: true
      }
    ],

    // 레이블 초기 스테이트
    labels: [
      {
        id: 1,
        text: '쇼핑'
      },
      {
        id: 2,
        text: '음료'
      },
      {
        id: 3,
        text: '책'
      }
    ],

    // 다음에 추가할 태스크, 레이블 ID
    // 실제 애플리케이션이라면 서버에서 생성하거나 UUID를 사용함
    nextTaskId: 3,
    nextLabelId: 4,

    // 필터링 적용 레이블 ID
    filter: null
  },

  getters: {
    // 필터링된 태스크 목록을 반환
    filteredTasks (state) {
      // 레이블이 선택되지 않았다면 태스크 목록을 그대로 반환
      if (!state.filter) {
        return state.tasks
      }

      // 선택된 레이블로 필터링 적용
      return state.tasks.filter(task => {
        return task.labelIds.indexOf(state.filter) >= 0
      })
    }
  },

  mutations: {
    // 태스크 추가하기
    addTask (state, { name, labelIds }) {
      state.tasks.push({
        id: state.nextTaskId,
        name,
        labelIds,
        done: false
      })

      // 다음에 추가할 태스크의 ID 업데이트 
      state.nextTaskId++
    },

    // 태스크의 완료 상태 토글
    toggleTaskStatus (state, { id }) {
      const filtered = state.tasks.filter(task => {
        return task.id === id
      })

      filtered.forEach(task => {
        task.done = !task.done
      })
    },

    // 레이블 추가하기
    addLabel (state, { text }) {
      state.labels.push({
        id: state.nextLabelId,
        text
      })

      // 다음에 추가할 레이블 ID 업데이트
      state.nextLabelId++
    },

    // 필터링 대상 레이블 변경
    changeFilter (state, { filter }) {
      state.filter = filter
    },

    // 스테이트 복원
    restore (state, { tasks, labels, nextTaskId, nextLabelId }) {
      state.tasks = tasks
      state.labels = labels
      state.nextTaskId = nextTaskId
      state.nextLabelId = nextLabelId
    }
  },

  actions: {
    // 로컬 스토리지에 스테이트를 저장
    save ({ state }) {
      const data = {
        tasks: state.tasks,
        labels: state.labels,
        nextTaskId: state.nextTaskId,
        nextLabelId: state.nextLabelId
      }
      localStorage.setItem('task-app-data', JSON.stringify(data))
    },

    // 로컬 스토리지에 저장된 스테이트를 복원
    restore ({ commit }) {
      const data = localStorage.getItem('task-app-data')
      if (data) {
        commit('restore', JSON.parse(data))
      }
    }
  }
})

export default store
