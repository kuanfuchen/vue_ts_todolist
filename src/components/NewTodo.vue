<template>
  <!-- <q-dialog v-model="toog"> -->
    <q-card class="bg-grey-2">
      <q-card-section>
        <div class="text-h6">新增事件</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <!-- <q-input v-model="v_name" hint="姓名" :dense="true"  /> -->
        <q-input outlined v-model="todoEvent" label="新增事件" type="textarea" />
        <div>
          <div class="text-h6">例行事件</div>
          <q-checkbox  v-model="v_perDay" label="每日" />
          <q-checkbox  v-model="v_perWeek" label="每周" />
          <q-checkbox  v-model="v_perMon" label="每月" />
        </div>
        <div>
          <div class="text-h6">事件進度</div>
          <q-checkbox v-model="unStart" label="還沒開始"></q-checkbox>
          <q-checkbox  v-model="v_progress" label="進行中" />
          <q-checkbox  v-model="v_fin" label="已完成" />
        </div>
      </q-card-section>
      <q-card-section class="q-py-none">
        <!-- <q-card> -->
          <div class="row items-start">
            <div class="q-mb-sm">
              <div class="text-h6">執行時間</div>
              <q-card-actions>
                <q-btn size="md" class="q-mb-sm" :label="selectDate" @click="openDate=!openDate"
                :icon-right="openDate ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"></q-btn>
              </q-card-actions>
              <q-slide-transition>
                <div v-show="openDate">
                  <q-date v-model="selectDate" minimal />
                </div>
              </q-slide-transition>
              
            </div>
          </div>
        <!-- </q-card> -->
        
      </q-card-section>
      
      <q-card-actions align="right">
        <q-btn class="q-ml-md" color="brown-5" size="lg" label="新增" @click="addTodo"></q-btn>
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
  import { ref, onMounted } from 'vue';
  import {serviceListen} from '../service/dataService';
  const emits = defineEmits(['closeNewTodo']);
  const todoEvent  = ref('');
  
  const v_name = ref('');
  const v_implementTime = ref('');
  const v_perDay = ref(false);
  const v_perWeek = ref(false);
  const v_perMon = ref(false);
  const v_participants = ref([]);
  const unStart = ref(false);
  const v_fin = ref(false);
  const v_progress = ref(false);
  const selectDate = ref('');
  const openDate = ref(false);
  const addTodo = ()=>{
    // if(todoEvent.value === '')return
    const todo = {
      content:todoEvent.value,
      "name":"KFC",
      "progress": false,
      "finish": false
    }
    serviceListen.postNewtodo(todo);
    todoEvent.value = '';
    emits('closeNewTodo',false)
  };
  const settingDate = ()=>{
    const datenow = new Date();
    const year = datenow.getFullYear();
    let month = (datenow.getMonth() + 1).toString();
    let date = (datenow.getDate()).toString();
    const hour = datenow.getHours();
    const weekDay = datenow.getDay();
    month = month.length === 1 ? `0${month}` : month;
    date = date.length === 1? `0${date}`: date;
    console.log(datenow, 'datenow')
    const todayDate = `${year}/${month}/${date}`
    console.log(todayDate, 'today');
    selectDate.value = todayDate
  }
  onMounted(() => {
    settingDate();
  });
</script>
<style lang="scss" >

  .q-dialog__inner--minimized > div {
    width: 1200px !important; 
}
</style>