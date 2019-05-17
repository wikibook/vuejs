<template>
  <div id="root">
    <h1 class="header">Root 컴포넌트</h1>
    <p>이것은 Root 컴포넌트입니다</p>
    <foo/>
    <bar/>
  </div>
</template>

<script>
import Foo from './foo'
import Bar from './bar'
export default {
  components: {
    Foo,
    Bar
  }
}
</script>

<style>
#root {
  border: solid 1px blue;
  margin: 4px;
  padding: 4px;
}
.header { font-size: 200%; }
p { text-decoration: underline; }
</style>
