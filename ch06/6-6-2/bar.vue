<template>
  <div class="bar">
    <h1 class="header">Bar 컴포넌트</h1>
    <p>이것은 Bar 컴포넌트입니다</p>
    <!-- Foo 컴포넌트에 header 클래스를 지정 -->
    <foo class="header"/>
  </div>
</template>

<script>
import Foo from './foo'
export default { // Bar 컴포넌트에 Foo 컴포넌트를 등록
  components: {
    Foo
  }
}
</script>

<style scoped>
.bar {
  border: 1px solid red;
  margin: 4px;
  padding: 4px;
}
.header { font-size: 125%; }
</style>
