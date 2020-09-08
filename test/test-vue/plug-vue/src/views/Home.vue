<template>
  <div>

    <DatePicker></DatePicker>
    <CountDown></CountDown>
    <Shaya></Shaya>


  </div>
</template>

<script>
import CountDown from '@/components/CountDown/CountDown.vue';
import DatePicker from '@/components/DatePicker/DatePicker.vue';
import Shaya from '@/components/shaya/shaya.vue';


export default {
     nameL: "Home",
     components:{
         CountDown,
         DatePicker,
         Shaya

     }
}
</script>

<style>

</style>