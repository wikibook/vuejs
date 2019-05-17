// Node.js의 require를 사용해 임포트
const bodyParser = require('body-parser')

// 'Express' 애플리케이션 인스턴스를 받는 함수를 익스포트
module.exports = app => {
  // HTTP 요청의 body 내용을 JSON으로 파싱하는 미들웨어를 설치
  app.use(bodyParser.json())

  // 사용자 정보
  const users = {
    'foo@domain.com': {
      password: '12345678',
      userId: 1,
      token: '1234567890abcdef'
    }
  }

  // 로그인 API 엔드포인트 '/auth/login'
  app.post('/auth/login', (req, res) => {
    const { email, password } = req.body
    const user = users[email]
    if (user) {
      if (user.password !== password) {
        res.status(401).json({ message: '로그인에 실패했습니다' })
      } else {
        res.json({ userId: user.userId, token: user.token })
      }
    } else {
      res.status(404).json({ message: '등록된 사용자가 아닙니다' })
    }
  })
}
