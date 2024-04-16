<template>
  <div class="bodyclass">
    <div class="text-h6">行事曆</div>

  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
  const todayNow = ref({
    year:2024,
    mon:4,
    day:16
  });
  const month = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  const week = ref([ "一", "二", "三", "四", "五", "六", "日"]);
  const calcDisplayCalendar = (year, month, day) => {
    const monthFitstDay = new Date(year, month, 1).getDay();
    const monthLastDay = new Date(year,month , 1);
    const currentDate = new Date(year, month , 0).getDate();
    console.log(monthFitstDay, monthLastDay,  currentDate)
    const firstDateDay = monthFitstDay === 0 ? 7 : monthFitstDay;
    console.log(firstDateDay, 'firstDateDay')
    let initFirstWeek = new Date(year, month, firstDateDay);
    // const lastWeekOverDate = 7- monthLastDay.getDate() === 7 ? 0 : 7 - 
    // console.log(initFirstWeek, 'monthFitstDay',lastWeekOverDate)
  }
  onMounted(async()=>{
    const year = new Date().getFullYear();
    const mon = new Date().getMonth() ;
    const day = new Date().getDate();
    await calcDisplayCalendar(year, mon, day);
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