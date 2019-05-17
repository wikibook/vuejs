const loader = require.resolve('./loader.js') // 현재 디렉토리에 생성된 커스텀 로더를 불러옴

module.exports = {
  chainWebpack: config => {
    // Vue Loader의 설정을 커스터마이즈
    config.module
      .rule('docs')
      .resourceQuery(/blockType=docs/)
      .use('docs')
      .loader(loader)
  }
}
