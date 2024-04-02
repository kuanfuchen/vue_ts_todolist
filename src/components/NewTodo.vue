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
  import {serviceListen} from '../service/dataService';
  const todoEvent  = ref('');
  const addTodo = ()=>{
    if(todoEvent.value === '')return
    const todo = {
      content:todoEvent.value,
      "name":"KFC",
      "progress": false,
      "finish": false
    }
    serviceListen.postNewtodo(todo);
    todoEvent.value = '';
    // console.log(todoEvent.value)
  }
</script>