<template>
    <div class="home">
        <DatePicker />
    </div>
</template>

<script>
// @ is an alias to /src
import DatePicker from "@/components/DatePicker/DatePicker.vue";

export default {
    name: "home",
    components: {
        DatePicker
    }
};
</script>
