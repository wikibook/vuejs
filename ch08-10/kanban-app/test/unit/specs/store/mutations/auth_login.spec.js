import mutations from '@/store/mutations'

describe('AUTH_LOGIN 뮤테이션', () => {
  it('뮤테이션 페이로드 값에 auth가 있을 것', () => {
    const state = {}

    const token = '1234567890abcdef'
    const userId = 1
    mutations.AUTH_LOGIN(state, { token, userId })

    expect(state.auth.token).to.equal(token)
    expect(state.auth.userId).to.equal(userId)
  })
})
