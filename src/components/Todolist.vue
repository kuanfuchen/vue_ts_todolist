<template>
  <div>
    <div class="q-pa-md">
      <NewTodo></NewTodo>
      <div class="q-gutter-y-md " style="width: 80vw">
        <q-card>
          <q-tabs
            v-model="todoTab"
            class="bg-grey-2 text-grey-7"
            active-color="primary"
            indicator-color="purple"
            align="justify">
            <q-tab name="notStated" class="" label="未開始" />
            <q-tab name="inProgress" label="進行中"  />
            <q-tab name="finished" label="已完成" />
          </q-tabs>
          <q-tab-panels v-model="todoTab" animated class="bg-blue-grey-3  todolistStyle" >
            <q-tab-panel name="notStated">
              <div class="text-indigo">
                <div class="text-h6 text-white">未開始</div>
                <div class="">
                </div>
                <ul>
                  <li class="row text-white q-ml-md q-mt-sm" v-for="(item, i) in notStartWork" :key="i">
                    <div class="col-8">
                      <q-btn color="primary" @click="startedProgress(item)" icon="play_arrow"></q-btn>
                      <q-btn class="q-ml-md" color="red-8" @click="deletedTodo(item)" icon="close"></q-btn>
                      <span class="q-ml-md">{{ item.content }}</span>
                    </div>
                    <span class="col-2">{{ item.name }}</span>
                    <span class="col-2">{{ item.createdAt }}</span>
                  </li>
                </ul>
              </div>
              
            </q-tab-panel>
            <q-tab-panel name="inProgress">
              <div class="text-indigo">
                <div class="text-h6">進行中</div>
                <li class="row text-white q-ml-md q-mt-sm" v-for="(item, i) in inProgressWork" :key="i">
                    <div class="col-8">
                      <q-btn color="amber" icon="replay" @click="reStartWork(item)"></q-btn>
                      <q-btn color="teal" class="q-ml-md" @click="finishedProgress(item)" no-caps> Fin. </q-btn>
                      <q-btn class="q-ml-md" color="red-8" @click="deletedTodo(item)"
                      icon="close"
                      ></q-btn>
                      <!-- <q-btn color="primary" @click="startedProgress(item)">開始進行</q-btn> -->
                      <span class="q-ml-md">{{ item.content }}</span>
                    </div>
                    <span class="col-2">{{ item.name }}</span>
                    <span class="col-2">{{ item.createdAt }}</span>
                  </li>
              </div>
            </q-tab-panel>
            <q-tab-panel name="finished">
              <div class="text-indigo">
                <div class="text-h6">已完成</div>
                <li class="row text-white q-ml-md q-mt-sm" v-for="(item, i) in finishWork" :key="i">
                    <div class="col-8">
                      <q-btn color="amber" icon="replay" @click="reProgress(item)"></q-btn>
                      <q-btn class="q-ml-sm" color="red-8" @click="deletedTodo(item)" icon="close" ></q-btn>
                      <!-- <q-btn color="primary" @click="startedProgress(item)">開始進行</q-btn> -->
                      <span class="q-ml-md">{{ item.content }}</span>
                    </div>
                    <span class="col-2">{{ item.name }}</span>
                    <span class="col-2">{{ item.createdAt }}</span>
                  </li>
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import NewTodo from '@/components/NewTodo.vue';
  import { serviceListen } from '@/service/dataService';
  import { Subject, takeUntil, debounceTime } from 'rxjs';
  import { ref, reactive } from 'vue';
  const comSubject$ = new Subject();
  const todoTab = ref('inProgress');
  type todoData = {
    content:string,
    _id:string,
    createdAt:any,
    finish:boolean,
    name:string,
    progress:boolean,
    // 
    updateTime:any,
    perWeek:boolean,
    perMon:boolean,
    sponsor:string,
    participants:string[],
    description:string,
    implementTime:string,
  }
  const notStartWork:todoData[]  = reactive([]);
  const inProgressWork:todoData[] = reactive([]);
  const finishWork:todoData[] = reactive([]);
  serviceListen.getTodolistInfo$.pipe(takeUntil(comSubject$),debounceTime(300)).subscribe(async(getTodolist:any)=>{
    notStartWork.length = 0;
    inProgressWork.length = 0;
    finishWork.length = 0;
    await handleTodolist(getTodolist.data);
  })
  const deletedTodo = (item:todoData)=>{
    const id = item._id;
    serviceListen.deletedTodo(id);
  }
  const reStartWork = (item:todoData) => {
    item.progress = false;
    serviceListen.updateTodo(item);
  }
  const startedProgress = (item:todoData) => {
    item.progress = true;
    serviceListen.updateTodo(item);
  }
  const finishedProgress = (item:todoData)=>{
    item.finish = true;
    serviceListen.updateTodo(item);
  }
  const reProgress = (item:todoData) => {
    item.finish = false;
    serviceListen.updateTodo(item);
  }
  const handleTodolist = (data:todoData[])=>{
    for(let i = 0 ; data.length >i ; i++){
      const date = new Date(data[i].createdAt).getTime();
      const year = new Date(date).getFullYear();
      const mon = new Date(date).getMonth() + 1;
      const day = new Date(date).getDate();
      const hours = new Date(date).getHours();
      const min = new Date(date).getMinutes();
      data[i].createdAt = `${ year }/${ mon }/${ day }  ${ hours }: ${ min }`;
      if(!data[i].finish && !data[i].progress){
        notStartWork.push(data[i])
      }else if(data[i].progress && !data[i].finish){
        inProgressWork.push(data[i])
      }else if(data[i].progress && data[i].finish){
        finishWork.push(data[i])
      }
    }
  };
</script>
<style scope>
  .todolistStyle{
    height:70vh
  }
</style>