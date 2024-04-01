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
            <q-tab name="finished" label="已完成" :disabled="!signIn" />
          </q-tabs>
          <q-tab-panels v-model="todoTab" animated class="bg-blue-grey-4  todolistStyle" >
            <q-tab-panel name="notStated">
              <div class="text-indigo">
                <div class="text-h6 text-white">未開始</div>
                <div class="">

                </div>
                <ul>
                  
                  <li class="row text-white q-ml-md" v-for="(item, i) in notStartWork" :key="i">
                    <div class="col-8">
                      <q-btn color="primary" @click="startedProgress(item)">開始進行</q-btn>
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
                沒有資訊!
              </div>
            </q-tab-panel>
            <q-tab-panel name="finished">
              <div class="text-indigo">
                <div class="text-h6">已完成</div>
                沒有資訊!
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
  const signIn = ref(false);
  type todoData = {
    content:string,
    createdAt:any,
    finish:boolean,
    name:string,
    progress:boolean,
    _id:string
  }
  const notStartWork:todoData[]  = reactive([]);
  const inProgressWork:todoData[] = reactive([]);
  const finishWork:todoData[] = reactive([]);
  serviceListen.getTodolistInfo$.pipe(takeUntil(comSubject$),debounceTime(300)).subscribe((getTodolist:any)=>{
    handleTodolist(getTodolist.data)
  })
  const startedProgress = (item:todoData) => {
    console.log(item)
    item.progress = true;
    serviceListen.updateProgress();
  }
  const handleTodolist = (data:todoData[])=>{
    for(let i = 0 ; data.length >i ; i++){
      const date = new Date(data[i].createdAt).getTime();
      const year = new Date(date).getFullYear();
      const mon = new Date(date).getMonth() + 1;
      const day = new Date(date).getDate();
      const hours = new Date(date).getHours();
      const min = new Date(date).getMinutes();
      console.log( year, mon, day,hours, min)
      data[i].createdAt = `${ year }年 ${ mon }月 ${ day }日 ${ hours }時 ${ min }分`
      // data[i].createdAt = new Date(date.getTime() + (8 * 60 * 60 * 1000));
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