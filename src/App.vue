<template>
  <div class="appStyle row justify-center items-center">
    <div class="  ">
      <Todolists class="todolistStyle"></Todolists>
    </div>
    <!-- <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a> -->
    
    
  </div>
  <!-- <HelloWorld msg="Vite + Vue" /> -->
</template>
<script setup>
// import HelloWorld from './components/HelloWorld.vue';
import Todolists from './components/Todolist.vue';
</script>
<style scoped>
  .appStyle{
    width: 100vw;
    height: 100vh;
  }
  
</style>
