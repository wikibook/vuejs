var MyButton = {
  template: `
    <button>
    <!-- 부모 컴포넌트에서 받아온 콘텐츠로 갈아 끼움 --> <slot>OK</slot>
    </button>
  `
}
new Vue({
  el: '#app',
  components: {
    MyButton: MyButton
  }
})
