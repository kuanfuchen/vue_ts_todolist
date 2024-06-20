<template>
  <div class="bodyclass q-pa-md" style="width: 80vw">
    <div class="row text-bold text-h4 q-my-md">
      <div class="q-ml-xs text-teal">行事曆</div>
      <div class="q-ml-md text-primary">
        <span>{{ calendarDefineStore.todayNow.year }} 年 </span><span>{{ calendarDefineStore.todayNow.mon + 1 }} 月 </span>
        <!-- <span>{{ todayNow.day }}</span> -->
      </div>
      <div class="q-ml-auto">
        <q-btn class="q-mr-md text-bold" color="secondary" label="<" @click="calendarDefineStore.calcMonth(-1)"></q-btn>
        <q-btn color="secondary" class="text-bold" label=">" @click="calendarDefineStore.calcMonth(1)"></q-btn>
      </div>
      
    </div>
    
    <div class="row calendar">
      <div class="col" v-for="(day, i) in calendarDefineStore.weekday" :key="i">
      <span class="text-bold" :style="{ color: day === '日' || day === '六' ? '#03A9F4' : '#37474F'}">星期{{ day }}</span>
      </div>
    </div>
    <div class="row calendar">
      <div class="col" v-for="(day, index) in calendarDefineStore.monthInfo" :key="index" :style="{background:day.date===calendarDefineStore.todayNow.day?'#FFC107':'#fff'}"
        style="font-weight: bold;" @dblclick="calendarDefineStore.toogledFnTodo(true)">
        <div class="colDay" style="height: 10vh;" >
          {{ day.date === 0 ? '': day.date}}
        </div>
      </div>
    </div>
    <!-- <q-dialog v-model="toggleNewTodo" persistent> -->
      <!-- <NewTodo @closeNewTodo="toogledFnTodo"></NewTodo> -->
    <!-- </q-dialog> -->
  </div>
</template>
<script setup >
  import { reactive, ref, onMounted } from 'vue';
  import { useCalendarDefineStore } from '../store/calendar';
  const calendarDefineStore = useCalendarDefineStore();

  // import NewTodo from './NewTodo.vue';
  // const toggleNewTodo = ref(false);
  // const todayNow = reactive({
  //   year:2024,
  //   mon:4,
  //   day:16
  // });
  // const month = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  // const displayMonthInfo = reactive({
  //   year:0,
  //   mon:0,
  //   day:0
  // })
  // const monthInfo = reactive([])
  // const weekday = ref([ "日","一", "二", "三", "四", "五", "六"]);
  // const calcDisplayCalendar = (year, month, next) => {
  //   const monthFitstDay = new Date(year, month , 1);//當月第一天
  //   const monthLastDay = new Date(year,month + 1 , 0);//當月最後一天
  //   const currentDate = new Date(year, month + 1 , 0).getDate();
  //   const firstDateDay = monthFitstDay.getDay() === 0 ? 7 : monthFitstDay.getDay();//星期x
  //   // 第一周日期格子數目
  //   let initFirstWeek = new Date(year, month, 2 - firstDateDay);
  //   // 最後一周日期格子
  //   const lastWeekDates = 7 - monthLastDay.getDay() === 7 ? 0 : 7 - monthLastDay.getDay();
  //   const totalDates = firstDateDay - 1 + currentDate + lastWeekDates;
  //   let dateIndex = 1;
  //   let weekdayIndex = firstDateDay;
  //   for(let i  = 0 ; totalDates > i ; i++){
  //     if( i >= weekdayIndex && i <= currentDate){
  //       monthInfo.push({
  //       weekday:weekday.value[weekdayIndex],
  //       date:dateIndex,
  //       // holiday:false,
  //       // month:0,
  //       })
  //       weekdayIndex = weekdayIndex < 6 ?  weekdayIndex + 1 : 0;
  //       dateIndex = dateIndex <= currentDate? dateIndex + 1: 1;
  //     }else{
  //       monthInfo.push({
  //       weekday:'',
  //       date:0,
  //       })
  //     }
  //   }
  // }
  // const toogledFnTodo = (boolean) => toggleNewTodo.value = boolean;
  // const calcMonth =(calcMon)=>{

  // }
  onMounted(async() => {
    // todayNow.year = new Date().getFullYear();
    // todayNow.mon = new Date().getMonth() ;
    // todayNow.day = new Date().getDate();
    await calendarDefineStore.calcDisplayCalendar();
  });

</script>
<style scope lang="scss">
  $primary:'#c6c0ba';
  .bodyclass{
    background: $primary;
    padding: 0;
    margin: 0;
    font-size: 400;
  }
  .container{
    padding: 0 3rem;
  }
  .calendar{
    // display:flex;
    // flex-flow: column;
    // height:80vh;
    .col{
      min-width: 14.25%;
      padding:10px 10px;
      box-sizing:border-box;
      border-left:1px solid rgba(255,255,255,0.2);
      // &:nth-child(7n + 1)
      .colDay{
        height: 10vh;
      }
    }
    
  }
</style>