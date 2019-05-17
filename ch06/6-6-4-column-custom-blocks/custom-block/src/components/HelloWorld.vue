<docs>
# HelloWorld 컴포넌트

## 개요
이 문서는 HelloWorld 컴포넌트의 사용법을 설명하는 문서입니다.

## 사용방법
...
</docs>

<template>
  <div class="hello">
   <p class="message">메시지: {{ msg }}</p>
   <!-- 변환된 커스텀 블록의 콘텐츠를 삽입(주의: XSS 취약점이 있으나 예제 목적으로 `v-html`을 사용하였다) -->
   <p v-html="docs"></p>
  </div>
</template>

<script>
// markdown을 HTML로 변환하기 위한 라이브러리를 로딩
import marked from 'marked'

export default {
  name: 'HelloWorld',
  data () {
    return {
      // webpack/Vue Loader가 주입한 커스텀 블록의 콘텐츠에 `$options`을 통해 접근할 수 있다
      // 마크다운으로 작성된 __docs의 콘텐츠를 HTML로 변환하여 `docs`에 초기 데이터로 설정하였다
      docs: marked(this.$options.__docs),
      msg: '안녕하세요!'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.message { color: #42b983; }
</style>
