new Vue({
  el: '#app',
  data: function() {
    return {
      counter: 0
    }
  },
  render: function(createElement) {
    return createElement('div', [
      createElement(
        'button',
        {
          on: {
            click: () => (this.counter += 1)
          }
        },
        ' 클릭 카운트 증가 '
      ),
      createElement('p', [
        '클릭 횟수: ',
        createElement('b', this.counter + ' 번')
      ])
    ])
  }
})
