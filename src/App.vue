<template>
  <div class="appStyle ">
    <HeaderBar></HeaderBar>
    <DiagolSignin></DiagolSignin>
    <div class="row justify-center items-center q-mt-xl">
      <TodolistTabs></TodolistTabs>
    </div>
  </div>
</template>
<script setup>
  // import HelloWorld from './components/HelloWorld.vue';
  import HeaderBar from './components/HeaderBar.vue'; 
  import TodolistTabs from './views/Tabs.vue';
  import DiagolSignin from './components/DialogSignIn.vue';
  import { serviceListen } from './service/dataService.js';
  import { onMounted } from 'vue';
  onMounted(async()=>{
    await serviceListen.appListenService()
    
  })
</script>
<style scoped lang="scss">
  .appStyle{
    width: 100vw;
    height: 100vh;
  }
  
</style>
