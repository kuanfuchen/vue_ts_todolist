import { ref,  reactive, onMounted} from 'vue';
import { defineStore } from 'pinia';

export const  useCalendarDefineStore= defineStore('calendar',()=>{
  const toggleNewTodo = ref(false);
  const todayNow = reactive({
    year:0,
    mon:0,
    day:0
  });
  const month = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  const displayMonthInfo = reactive({
    year:0,
    mon:0,
    day:0
  })
  const monthInfo = reactive([])
  const weekday = ref([ "日","一", "二", "三", "四", "五", "六"]);
  const calcDisplayCalendar = () => {
    console.log('calcDisplayCalendar')
    todayNow.year = new Date().getFullYear();
    todayNow.mon = new Date().getMonth() ;
    todayNow.day = new Date().getDate();
    const monthFitstDay = new Date(todayNow.year , todayNow.mon , 1);//當月第一天
    const monthLastDay = new Date(todayNow.year ,todayNow.mon + 1 , 0);//當月最後一天
    const currentDate = new Date(todayNow.year , todayNow.mon + 1 , 0).getDate();
    const firstDateDay = monthFitstDay.getDay() === 0 ? 7 : monthFitstDay.getDay();//星期x
    // 第一周日期格子數目
    let initFirstWeek = new Date(todayNow.year, todayNow.mon, 2 - firstDateDay);
    // 最後一周日期格子
    const lastWeekDates = 7 - monthLastDay.getDay() === 7 ? 0 : 7 - monthLastDay.getDay();
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
  // onMounted(async() => {
  //   todayNow.year = new Date().getFullYear();
  //   todayNow.mon = new Date().getMonth() ;
  //   todayNow.day = new Date().getDate();
  //   await calcDisplayCalendar(todayNow.year, todayNow.mon);
  // });
  return {toggleNewTodo, todayNow, monthInfo, weekday, toogledFnTodo, calcMonth, calcDisplayCalendar}
})