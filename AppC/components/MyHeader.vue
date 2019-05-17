<template>
  <nav class="header">
    <ul>
      <li><nuxt-link to="/">홈</nuxt-link></li>
      <li><nuxt-link to="/company">기업정보</nuxt-link></li>
      <li><nuxt-link to="/product">제품소개</nuxt-link></li>
      <li><nuxt-link to="/job">채용</nuxt-link></li>
    </ul>
  </nav>
</template>

<style scoped>
.header ul {
  margin: 0 0 0 0.2em;
  padding: 0;
  list-style-type: none;
}
.header ul li {
  display: inline-block;
  margin: 0 0.6em 0 0;
}
.header a {
  text-decoration: none;
}
.header a.nuxt-link-exact-active {
  text-decoration: underline;
}
</style>
