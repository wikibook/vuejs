import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import KbnLoginView from '@/components/templates/KbnLoginView.vue'

// 로컬 Vue 생성자를 생성
const localVue = createLocalVue()

// 로컬 Vue 생성자에 Vuex를 설치
localVue.use(Vuex)

describe('KbnLoginView', () => {
  let actions
  let $router
  let store
  let LoginFormComponentStub

  // 'KbnLoginForm' 컴포넌트의 로그인 버튼 클릭을 일으키는 헬퍼 함수
  const triggerLogin = (loginView, target) => {
    const loginForm = loginView.find(target)
    loginForm.vm.onlogin('foo@domain.com', '12345678')
  }

  beforeEach(() => {
    // KbnLoginForm 컴포넌트 스텁 설정
    LoginFormComponentStub = {
      name: 'KbnLoginForm',
      props: ['onlogin'],
      render: h => h('p', ['login form'])
    }

    // Vue Router 목업 설정
    $router = {
      push: sinon.spy()
    }

    // login 액션 동작 확인을 위한 Vuex 관련 설정
    actions = {
      login: sinon.stub() // login 액션 목업
    }
    store = new Vuex.Store({
      state: {},
      actions
    })
  })

  describe('로그인', () => {
    let loginView
    describe('성공', () => {
      beforeEach(() => {
        loginView = mount(KbnLoginView, {
          mocks: { $router },
          stubs: {
            'kbn-login-form': LoginFormComponentStub
          },
          store,
          localVue
        })
      })

      it('보드 페이지 루트로 리다이렉트', done => {
        // login 액션을 성공함
        actions.login.resolves()

        triggerLogin(loginView, LoginFormComponentStub)

        // 프라미스 리프레시
        loginView.vm.$nextTick(() => {
          expect($router.push.called).to.equal(true)
          expect($router.push.args[0][0].path).to.equal('/')
          done()
        })
      })
    })

    describe('실패', () => {
      beforeEach(() => {
        loginView = mount(KbnLoginView, {
          stubs: {
            'kbn-login-form': LoginFormComponentStub
          },
          store,
          localVue
        })
        sinon.spy(loginView.vm, 'throwReject') // spy를 이용해 래핑
      })

      afterEach(() => {
        loginView.vm.throwReject.restore() // spy 래핑 해제
      })

      it('오류 처리가 호출됨', done => {
        // login 액션이 실패함
        const message = 'login failed'
        actions.login.rejects(new Error(message))

        triggerLogin(loginView, LoginFormComponentStub)

        // 프라미스 리프레시
        loginView.vm.$nextTick(() => {
          const callInfo = loginView.vm.throwReject
          expect(callInfo.called).to.equal(true)
          expect(callInfo.args[0][0].message).to.equal(message)
          done()
        })
      })
    })
  })
})
