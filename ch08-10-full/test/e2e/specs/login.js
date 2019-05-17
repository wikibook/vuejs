module.exports = {
  'ログイン': function (browser) {
    const devServer = browser.globals.devServerURL

    browser
      // 애플리케이션 최상위 페이지로
      .url(devServer)
      // 애플리케이션이 렌더링될 때까지 대기
      .waitForElementVisible('#app', 1000)
      // 이메일 주소 입력
      .enterValue('input#email', 'foo@domain.com')
      // 패스워드 입력
      .enterValue('input#password', '12345678')
      // 로그인 버튼이 활성화될 때까지 대기
      .waitForElementPresent('form > .form-actions > button', 1000)
      // 로그인
      .click('form > .form-actions > button')
      // 로그인 성공 후 리다이렉트돼 보드 페이지가 나올 때까지 대기
      .waitForElementPresent('#app > .board-view > .board-navigation > .title > h1', 1000)
      // 현재 페이지가 보드 페이지인지 확인
      .assert.urlEquals('http://localhost:8080/#/')
      // 끝
      .end()
  }
}
