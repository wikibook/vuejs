import { mount } from '@vue/test-utils'
import KbnLoginForm from '@/components/molecules/KbnLoginForm.vue'

describe('KbnLoginForm', () => {
  describe('프로퍼티', () => {
    describe('validation', () => {
      let loginForm
      beforeEach(done => {
        loginForm = mount(KbnLoginForm, {
          propsData: { onlogin: () => {} }
        })
        loginForm.vm.$nextTick(done)
      })

      describe('email', () => {
        describe('required', () => {
          describe('아무것도 입력하지 않음', () => {
            it('validation.email.required가 invalid임', () => {
              loginForm.setData({ email: '' })
              expect(loginForm.vm.validation.email.required).to.equal(false)
            })
          })

          describe('입력 내용 있음', () => {
            it('validation.email.required가 valid임', () => {
              loginForm.setData({ email: 'foo@domain.com' })
              expect(loginForm.vm.validation.email.required).to.equal(true)
            })
          })
        })

        describe('format', () => {
          describe('이메일 주소 형식이 아닌 값', () => {
            it('validation.email.format가 invalid임', () => {
              loginForm.setData({ email: 'foobar' })
              expect(loginForm.vm.validation.email.format).to.equal(false)
            })
          })

          describe('이메일 주소 형식인 값', () => {
            it('validation.email.required가 valid임', () => {
              loginForm.setData({ email: 'foo@domain.com' })
              expect(loginForm.vm.validation.email.format).to.equal(true)
            })
          })
        })
      })

      describe('password', () => {
        describe('required', () => {
          describe('아무 것도 입력하지 않음', () => {
            it('validation.password.required가 invalid임', () => {
              loginForm.setData({ password: '' })
              expect(loginForm.vm.validation.password.required).to.equal(false)
            })
          })

          describe('입력 내용 있음', () => {
            it('validation.password.required가 valid임', () => {
              loginForm.setData({ password: 'xxxx' })
              expect(loginForm.vm.validation.password.required).to.equal(true)
            })
          })
        })
      })
    })

    describe('valid', () => {
      let loginForm
      beforeEach(done => {
        loginForm = mount(KbnLoginForm, {
          propsData: { onlogin: () => {} }
        })
        loginForm.vm.$nextTick(done)
      })

      describe('모든 항목 유효성 검사 OK', () => {
        it('유효성 검사 결과 valid', () => {
          loginForm.setData({
            email: 'foo@domain.com',
            password: '12345678'
          })
          expect(loginForm.vm.valid).to.equal(true)
        })
      })

      describe('유효성 검사 NG 항목 있음', () => {
        it('유효성 검사 결과 invalid', () => {
          loginForm.setData({
            email: 'foo@domain.com',
            password: ''
          })
          expect(loginForm.vm.valid).to.equal(false)
        })
      })
    })

    describe('disableLoginAction', () => {
      let loginForm
      beforeEach(done => {
        loginForm = mount(KbnLoginForm, {
          propsData: { onlogin: () => {} }
        })
        loginForm.vm.$nextTick(done)
      })

      describe('유효성 검사 NG 항목 있음', () => {
        it('유효하지 않은 로그인 처리', () => {
          loginForm.setData({
            email: 'foo@domain.com',
            password: ''
          })
          expect(loginForm.vm.disableLoginAction).to.equal(true)
        })
      })

      describe('유효성 검사 모든 항목 OK이고 로그인 처리 중이 아님', () => {
        it('유효한 로그인 처리', () => {
          loginForm.setData({
            email: 'foo@domain.com',
            password: '12345678'
          })
          expect(loginForm.vm.disableLoginAction).to.equal(false)
        })
      })

      describe('유효성 검사 모든 항목 OK이고 로그인 처리 중', () => {
        it('유효하지 않은 로그인 처리', () => {
          loginForm.setData({
            email: 'foo@domain.com',
            password: '12345678',
            progress: true
          })
          expect(loginForm.vm.disableLoginAction).to.equal(true)
        })
      })
    })

    describe('onlogin', () => {
      let loginForm
      let onloginStub
      beforeEach(done => {
        onloginStub = sinon.stub()
        loginForm = mount(KbnLoginForm, {
          propsData: { onlogin: onloginStub }
        })
        loginForm.setData({
          email: 'foo@domain.com',
          password: '12345678'
        })
        loginForm.vm.$nextTick(done)
      })

      describe('resolve', () => {
        it('resolve 됨', done => {
          onloginStub.resolves()

          // 클릭 이벤트
          loginForm.find('button').trigger('click')
          expect(onloginStub.called).to.equal(false) // 아직 resolve되지 않음
          expect(loginForm.vm.error).to.equal('') // 오류 메시지 초기화
          expect(loginForm.vm.disableLoginAction).to.equal(true) // 로그인 액션 불가

          // 상태 반영
          loginForm.vm.$nextTick(() => {
            expect(onloginStub.called).to.equal(true) // resolve 됨
            const authInfo = onloginStub.args[0][0]
            expect(authInfo.email).to.equal(loginForm.vm.email)
            expect(authInfo.password).to.equal(loginForm.vm.password)
            loginForm.vm.$nextTick(() => { // resolve 에서 상태 반영
              expect(loginForm.vm.error).to.equal('') // 오류 메시지는 초기화된 그대로
              expect(loginForm.vm.disableLoginAction).to.equal(false) // 로그인 액션 가능
              done()
            })
          })
        })
      })

      describe('reject', () => {
        it('reject 됨', done => {
          onloginStub.rejects(new Error('login error!'))

          // 클릭 이벤트
          loginForm.find('button').trigger('click')
          expect(onloginStub.called).to.equal(false) // 아직 reject 되지 않음
          expect(loginForm.vm.error).to.equal('') // 오류 메시지 초기화
          expect(loginForm.vm.disableLoginAction).to.equal(true) // 로그인 액션 불가

          // 상태 반영
          loginForm.vm.$nextTick(() => {
            expect(onloginStub.called).to.equal(true) // reject됨
            const authInfo = onloginStub.args[0][0]
            expect(authInfo.email).to.equal(loginForm.vm.email)
            expect(authInfo.password).to.equal(loginForm.vm.password)
            loginForm.vm.$nextTick(() => {
              expect(loginForm.vm.error).to.equal('login error!') // 오류 메시지가 설정됨
              expect(loginForm.vm.disableLoginAction).to.equal(false) // 로그인 액션 가능
              done()
            })
          })
        })
      })
    })
  })
})
