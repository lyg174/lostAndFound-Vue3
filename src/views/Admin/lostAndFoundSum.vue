<template>
    <div class="dataSum">

        <el-card class="box-card01">

            <template #header>
                <div class="card-header">
                    <h3>数据统计</h3>
                </div>
            </template>

            <el-tabs tab-position="left" style="height: 600px" class="demo-tabs">
                <el-tab-pane label="发布统计">

                    <div style="display: flex; height: 100%;">
                        <div style="flex: 5; padding: 0 10px;">
                            <div id="year_line" style="width: 100%; height: 100%;"></div>
                        </div>

                        <div style="flex: 2; padding: 0 10px;">
                            <div id="year_pie" style="width: 100%; height: 100%;"></div>
                        </div>
                    </div>


                </el-tab-pane>
                <el-tab-pane label="用户统计">
                    <div style="background-color: red; width: 100%;">bbb</div>
                </el-tab-pane>
                <el-tab-pane label="反馈统计">
                    <div style="background-color: red; width: 100%;">ccc</div>
                </el-tab-pane>
            </el-tabs>

        </el-card>

    </div>
</template>

<script setup>
import { nextTick, onMounted, onUpdated, ref, watchEffect } from 'vue';
import year from './echarts_js/year'
// import month from './echarts_js/month'
import week from './echarts_js/week'
// import day from './echarts_js/day'


onMounted(async () => {
    setTimeout(() => {
        year();
        // month();
        week();
        // day();
    }, 10);

})






</script>

<style lang="scss" scoped>
.dataSum {
    flex: 1;
    background-color: #545c64;
    // display: flex;

    .box-card01 {
        margin: 20px auto;
        width: 99%;
        height: 95%;
        text-align: center;
    }
}

:deep(.el-tabs__content) {
    height: 100%;
}

.el-tab-pane {
    height: 100%;
}
</style>