Vue.directive('fallback-image', {
  bind: function (el, binding) {
    console.log('bind', binding)
    var once = binding.modifiers.once // 수정자
    el.addEventListener('error', function onError () {
      // no image URL을 img 요소의 src 값으로 설정함
      el.src = binding.value
      // once 수정자가 설정되어 있다면 이벤트리스너를 삭제함
      if (once) {
        el.removeEventListener('error', onError)
      }
    })
  },
  update: function (el, binding) {
    console.log('update', binding)
    if (binding.oldValue !== binding.value && binding.oldValue === el.src) {
      el.src = binding.value
    }
  }
})
var vm = new Vue({
  el: '#app',
  data: function () {
    return {
      altText: 'logo',
      noImageURL: 'https://dummyimage.com/400x400/000/ffffff.png&text=no+image'
    }
  }
})
