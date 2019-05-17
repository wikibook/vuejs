var MyButton = {
  props: ['href', 'tag'],
  render: function (createElement) {
    var tag = this.tag || (this.href ? 'a' : 'button')
    return createElement(tag, {
      attrs: {
        href: this.href || '#'
      }
    }, this.$slots.default)
  }
}
new Vue({
  el: '#app',
  render: function (createElement) {
    return createElement(MyButton, {
      attrs: {
        href: 'https://vuejs.org/'
      },
      props: {
        tag: 'a'
      }
    }, 'anchor')
  }
})
