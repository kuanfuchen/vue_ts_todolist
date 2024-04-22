<template>
  <div class="bodyclass q-pa-md" style="width: 80vw">
    <div class="row text-bold text-h4 q-my-md">
      <div class="q-ml-xs text-teal">行事曆</div>
      <div class="q-ml-md text-primary">
        <span>{{ todayNow.year }} 年 </span><span>{{ todayNow.mon + 1 }} 月 </span>
        <!-- <span>{{ todayNow.day }}</span> -->
      </div>
      <div class="q-ml-auto">
        <q-btn class="q-mr-md text-bold" color="secondary" label="<" @click="calcMonth(-1)"></q-btn>
        <q-btn color="secondary" class="text-bold" label=">" @click="calcMonth(1)"></q-btn>
      </div>
      
    </div>
    
    <div class="row calendar">
      <div class="col" v-for="(week, i) in weekday" :key="i">
      <span class="text-bold">星期{{ week }}</span>
      </div>
    </div>
    <div class="row calendar">
      <div class="col" v-for="(day, index) in monthInfo" :key="index" :style="{background:day.date===todayNow.day?'#80DEEA':'#fff'}"
        style="font-weight: bold;" @dblclick="toogledFnTodo(true)">
        <div class="colDay" style="height: 10vh;" >
          {{ day.date === 0 ? '': day.date}}
        </div>
      </div>
    </div>
    <q-dialog v-model="toggleNewTodo" persistent>
      <NewTodo @closeNewTodo="toogledFnTodo"></NewTodo>
    </q-dialog>
  </div>
</template>
<script setup >
  import { reactive, ref, onMounted } from 'vue';
  import NewTodo from './NewTodo.vue';
  const toggleNewTodo = ref(false);
  const todayNow = reactive({
    year:2024,
    mon:4,
    day:16
  });
  const displayMonthInfo = reactive({
    year:0,
    mon:0,
    day:0
  })
  // {
  //   week:'日',
  //   date:0,
  //   holiday:false,
  //   month:0,
  // }
  const monthInfo = reactive([])
  const month = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  const weekday = ref([ "日","一", "二", "三", "四", "五", "六"]);
  const calcDisplayCalendar = (year, month, next) => {
    const monthFitstDay = new Date(year, month , 1);//當月第一天
    const monthLastDay = new Date(year,month + 1 , 0);//當月最後一天
    const currentDate = new Date(year, month + 1 , 0).getDate();
    console.log(monthFitstDay, monthLastDay,  currentDate)
    const firstDateDay = monthFitstDay.getDay() === 0 ? 7 : monthFitstDay.getDay();//星期x
    console.log(firstDateDay, 'firstDateDay');
    // 第一周日期格子數目
    let initFirstWeek = new Date(year, month, 2 - firstDateDay);
    // 最後一周日期格子
    const lastWeekDates = 7 - monthLastDay.getDay() === 7 ? 0 : 7 - monthLastDay.getDay();
    // console.log(monthFitstDay.getDay(), 'monthFitstDay')
    // console.log(monthLastDay, 'monthLastDay');
    // console.log(currentDate, 'currentDate');
    // console.log(initFirstWeek.getDate(), 'initFirstWeek');
    // console.log(lastWeekDates, 'lastWeekDates');
    const totalDates = firstDateDay - 1 + currentDate + lastWeekDates;
    let dateIndex = 1;
    let weekdayIndex = firstDateDay;
    for(let i  = 0 ; totalDates > i ; i++){
      if( i >= weekdayIndex && i <= currentDate){
        monthInfo.push({
        weekday:weekday.value[weekdayIndex],
        date:dateIndex,
        // holiday:false,
        // month:0,
        })
        weekdayIndex = weekdayIndex < 6 ?  weekdayIndex + 1 : 0;
        dateIndex = dateIndex <= currentDate? dateIndex + 1: 1;
      }else{
        monthInfo.push({
        weekday:'',
        date:0,
        })
      }
    }
  }
  const toogledFnTodo = (boolean) => toggleNewTodo.value = boolean;
  const calcMonth =(calcMon)=>{

  }
  onMounted(async() => {
    todayNow.year = new Date().getFullYear();
    todayNow.mon = new Date().getMonth() ;
    todayNow.day = new Date().getDate();
    await calcDisplayCalendar(todayNow.year, todayNow.mon);
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