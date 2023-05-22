<template>
  <main>
    <div class="page">
      <slot />
    </div>
    <nav class="navigation">
      <div v-for="(menu, i) in menus" :key="i">
        <NuxtLink :to="links[i]">{{ menu }}</NuxtLink>
      </div>
    </nav>
  </main>
</template>

<script setup>
const menus = ["Home", "Shop", "Menu1", "Menu2"];
const links = ["/", "/", "/soyoon", "/soyoon"];
</script>

<style>
body {
  margin: 0;
  box-sizing: border-box;
}
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 480px;
  height: 100vh;
  margin: 0 auto;
}
.navigation {
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 480px;
  min-height: 65px;
  background-color: #ffffff;
  border-top: solid 1px #cccccc;
}
</style>
