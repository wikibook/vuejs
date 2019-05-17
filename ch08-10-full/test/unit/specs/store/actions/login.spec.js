import Vue from 'vue'
import * as types from '@/store/mutation-types'

// login 액션 안에서 사용되는 의존성의 목업을 만듬
const mockLoginAction = login => {
  // inject-loader를 사용해 액션 내 의존성을 주입할 함수를 얻음
  const actionsInjector = require('inject-loader!@/store/actions')

  // 주입 함수를 사용해 Auth API 모듈의 목업을 만듬
  const actionsMocks = actionsInjector({
    '../api': {
      Auth: { login }
    }
  })

  return actionsMocks.default.login
}

describe('login 액션', () => {
  const address = 'foo@domain.com'
  const password = '12345678'
  let commit
  let future

  describe('Auth.login 성공', () => {
    const token = '1234567890abcdef'
    const userId = 1

    beforeEach(done => {
      const login = authInfo => Promise.resolve({ token, userId })
      const action = mockLoginAction(login)
      commit = sinon.spy()

      // login 액션 실행
      future = action({ commit }, { address, password })
      Vue.nextTick(done)
    })

    it('성공함', () => {
      // commit이 호출됐는지 확인
      expect(commit.called).to.equal(true)
      expect(commit.args[0][0]).to.equal(types.AUTH_LOGIN)
      expect(commit.args[0][1].token).to.equal(token)
      expect(commit.args[0][1].userId).to.equal(userId)
    })
  })

  describe('Auth.login 실패', () => {
    beforeEach(done => {
      const login = authInfo => Promise.reject(new Error('login failed'))
      const action = mockLoginAction(login)
      commit = sinon.spy()

      // login 액션 실행
      future = action({ commit })
      Vue.nextTick(done)
    })

    it('실패함', done => {
      // commit이 호출됐는지 확인
      expect(commit.called).to.equal(false)

      // 오류가 throw됐는지 확인
      future.catch(err => {
        expect(err.message).to.equal('login failed')
        done()
      })
    })
  })
})
