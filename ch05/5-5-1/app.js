// 믹스인 정의
var Sharable = {
  data: function() {
    return {
      _isProcessing: false
    }
  },
  created: function () {
    console.log('Sharable 믹스인의 훅이 호출됨 ')
  },
  methods: {
    share: function() {
      if (this._isProcessing) {
        return
      }
      if (!window.confirm('공유하시겠습니까?')) {
        return
      }
      this._isProcessing = true
      // 실제 구현이라면 SNS 서비스의 API를 호출할 부분
      setTimeout(() => {
        window.alert(' 공유되었습니다 ')
        this._isProcessing = false
      }, 300)
    }
  }
}
var IconShareButton = {
  mixins: [Sharable],
  created: function () {
    console.log('IconShareButton의 훅이 호출됨 ')
  },
  template: `
    <button @click="share"><i class="fas fa-share-square"></i></button>
  `
}
var TextShareButton = {
  mixins: [Sharable],
  created: function () {
    console.log('TextShareButton의 훅이 호출됨 ')
  },
  template: `
    <button @click="share">{{ buttonLabel }}</button>
  `,
  data: function() {
    return {
      buttonLabel: '공유하기'
    }
  }
}

new Vue({
  el: '#app',
  components: {
    IconShareButton,
    TextShareButton
  }
})
