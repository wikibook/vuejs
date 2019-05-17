var MyPage = {
  template: `
    <div>
      <header>
        <!-- 헤더 슬롯(이름을 갖는 슬롯) -->
        <slot name="header"></slot>
      </header>
      <main>
        <!-- 바디 슬롯 -->
        <slot></slot>
      </main>
      <footer>
        <!-- 푸터 슬롯(이름을 갖는 슬롯) --> <slot name="footer"></slot>
      </footer>
    </div>
  `
}

new Vue({
  el: '#app',
  components: {
    MyPage: MyPage
  }
})
