<template>
    <div class="dataSum">
        <div id="year"></div>
        <div id="month"></div>
        <div id="week"></div>
        <div id="day"></div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import year from './echarts_js/year'
import month from './echarts_js/month'
import week from './echarts_js/week'
import day from './echarts_js/day'

onMounted(() => {
    year();
    month();
    week();
    day();
})


</script>

<style lang="scss" scoped>
.dataSum {
    // width: 100%;
    flex: 1;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 50% 50%;
    // gap: 1px;
    background-color: skyblue;

    div {
        width: 99%;
        height: 99%;
        background-color: white;
    }
}
</style>