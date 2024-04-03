<template>
  <div class="appStyle ">
    <HeaderBar></HeaderBar>
    <DiagolSignin></DiagolSignin>
    <div class="row justify-center items-center">
      <Todolists class="todolistStyle"></Todolists>
    </div>
  </div>
  <!-- <HelloWorld msg="Vite + Vue" /> -->
</template>
<script setup>
  // import HelloWorld from './components/HelloWorld.vue';
  import HeaderBar from './components/HeaderBar.vue'; 
  import Todolists from './components/Todolist.vue';
  import DiagolSignin from './components/DialogSignIn.vue';
  import { serviceListen } from './service/dataService.js';
  import { onMounted } from 'vue';
  onMounted(async()=>{
    await serviceListen.appListenService()
    
  })
</script>
<style scoped>
  .appStyle{
    width: 100vw;
    height: 100vh;
  }
  
</style>
