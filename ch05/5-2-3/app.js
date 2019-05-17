var MyButton = {
  data: function () {
    return {
      textLabel: 'child'
    }
  },
  template: `
    <button>
      <slot>OK</slot>
    </button>
  `
}

new Vue({
  el: '#app',
  data: function () {
    return {
      textLabel: 'parent'
    }
  },
  components: {
    MyButton: MyButton
  }
})