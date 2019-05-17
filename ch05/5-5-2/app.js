Vue.mixin({
  data: function() {
    return {
      loggedInUser: null
    }
  },
  created: function() {
    var auth = this.$options.auth
    this.loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'))
    if (auth && !this.loggedInUser) {
      window.alert(' 이 페이지는 로그인이 필요합니다 ')
    }
  }
})
var LoginRequiredPage = {
  auth: true,
  template: `
    <div>
      <p v-if="!loggedInUser">
        이 페이지는 로그인이 필요합니다
      </p>
      <p v-else>
        {{ loggedInUser.name }}님으로 로그인했습니다
      </p>
    </div>
  `
}
new Vue({
  el: '#app',
  components: {
    LoginRequiredPage
  }
})
