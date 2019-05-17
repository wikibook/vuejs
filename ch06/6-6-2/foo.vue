<template>
  <div class="foo">
    <h1 class="header">Foo 컴포넌트</h1>
    <p>이것은 Foo 컴포넌트입니다</p>
  </div>
</template>

<!-- 앞서 본 예제에서 Root 컴포넌트의 스타일 정의에서 정의한 p 요소의 스타일을 Foo 컴포넌트로 가져옴 -->
<style>
p { text-decoration: underline; }
</style>

<style scoped>
.foo {
  border: solid 1px green;
  margin: 4px;
  padding: 4px;
}
.header { font-size: 150%; }
</style>
