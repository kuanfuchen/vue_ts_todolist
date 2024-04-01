<template>
  <div class="row q-py-md">
    <div class="col-8">
      <q-input outlined v-model="todoEvent" label="新增事件" />
    </div>
    <div class="col-2 ">
      <q-btn class="q-ml-md" color="brown-5" size="lg" label="+" @click="addTodo"></q-btn>
    </div>
    
  </div>
</template>
<script setup>
  import {ref} from 'vue';
  const todoEvent  = ref('');
  const addTodo = ()=>{
    console.log(todoEvent.value)
  }
</script>