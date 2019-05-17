<template>
  <p :class="$style.message">안녕하세요!</p>
</template>

<script>
export default {
  created () {
    // eslint-disable-next-line no-console
    console.log('css modules: $style', this.$style)
  }
}
</script>

<style module>
.message { color: #42b983; }
</style>
