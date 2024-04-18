<template>
  <div class="bodyclass">
    <div class="text-h6">行事曆</div>
    <div>
      <span>{{ todayNow.year }} / </span><span>{{ todayNow.mon + 1 }} / </span>
      <span>{{ todayNow.day }}</span>
    </div>
    
  </div>
</template>
<script setup >
import { reactive,ref, onMounted } from 'vue';
  const todayNow = reactive({
    year:2024,
    mon:4,
    day:16
  });
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

    console.log(monthFitstDay.getDay(), 'monthFitstDay')
    console.log(monthLastDay, 'monthLastDay');
    console.log(currentDate, 'currentDate');
    console.log(initFirstWeek.getDate(), 'initFirstWeek');
    console.log(lastWeekDates, 'lastWeekDates');
    
    const totalDates = firstDateDay - 1 + currentDate + lastWeekDates;
    console.log(totalDates, 'totalDates');
    let dateIndex = 1;
    let weekdayIndex = firstDateDay;
    // for(let i = 0; monthLastDay.length > i ;i++){

    // }

    const monthDateInfo = [];
    for(let i  = 0 ; totalDates > i ; i++){
      if( i >= weekdayIndex && i <= monthLastDay){
        monthDateInfo.push({
        weekday:weekday.value[weekdayIndex],
        date:1,
        // holiday:false,
        // month:0,
        })
        if(weekdayIndex <= 6){
          weekdayIndex++
        }else{
          weekdayIndex = 0
        }
        // weekdayIndex = weekdayIndex < 7 ?  weekdayIndex++ : 0 ;
        dateIndex = dateIndex < monthLastDay + 1 ? dateIndex++ : 0;
      }else{

      }
    }
    console.log(monthDateInfo, 'monthDateInfo')
  }
  onMounted(async()=>{
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
</style>