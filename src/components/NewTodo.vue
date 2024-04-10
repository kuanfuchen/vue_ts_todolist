<template>
  <!-- <q-dialog v-model="toog"> -->
    <q-card>
      <q-card-section>
        <div class="text-h6">新增事件</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input v-model="v_name" hint="姓名" :dense="true"  />
        <q-input outlined v-model="todoEvent" label="新增事件" />
        <div>
          <q-checkbox left-label v-model="v_perWeek" label="每周例行公事" />
        </div>
        <div>
          <q-checkbox  v-model="v_perMon" label="每月例行公事" />
        </div>
        <div>
          <q-checkbox  v-model="v_progress" label="進行中" />
        </div>
        <div>
          <q-checkbox  v-model="v_fin" label="已完成" />
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn class="q-ml-md" color="brown-5" size="lg" label="新增" @click="addTodo"></q-btn>
        <!-- <q-btn flat label="OK" color="primary" v-close-popup /> -->
      </q-card-actions>
    </q-card>
  <!-- </q-dialog> -->
  <!-- <div class="row q-py-md">
    <div class="col-8">
      <q-input outlined v-model="todoEvent" label="新增事件" />
    </div>
    <div class="col-2 ">
      <q-btn class="q-ml-md" color="brown-5" size="lg" label="+" @click="addTodo"></q-btn>
    </div>
    
  </div> -->
</template>
<script setup>
  import {ref} from 'vue';
  import {serviceListen} from '../service/dataService';
  const todoEvent  = ref('');
  const v_name = ref('');
  const v_implementTime = ref('');
  const v_perWeek = ref(false);
  const v_perMon = ref(false);
  const v_participants = ref([]);
  const v_fin = ref(false);
  const v_progress = ref(false);
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