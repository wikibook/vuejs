import store from '../store'

export const authorizeToken = (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 일치하는 라우트에 'requiresAuth' 메타 필드가 있으면
    // 로그인 시 발행되는 인증 토큰 유무를 확인함
    // 주의 :
    // 여기서는 편의상 'auth.token'이 있는지만 확인하지만
    // 원래는 인증 토큰의 유효성 자체를 서버에 확인해야 함.
    if (!store.state.auth || !store.state.auth.token) {
      next({ path: '/login' })
    } else {
      next()
    }
  } else {
    next()
  }
}
