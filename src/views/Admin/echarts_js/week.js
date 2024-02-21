import * as echarts from 'echarts';


function week() {
    var chartDom = document.getElementById('year_pie');
    var myChart = echarts.init(chartDom, 'dark');
    var option;
    window.addEventListener('resize', function () {
        myChart.resize();
    });

    option = {
        title: {
            text: '近一年发布信息概览'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: '5%',
            left: 'center'
        },
        series: [
            {
                name: '失物招领发布数',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 40,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    { value: 1048, name: '一月' },
                    { value: 735, name: '二月' },
                    { value: 580, name: '三月' },
                    { value: 484, name: '四月' },
                    { value: 450, name: '五月' },
                    { value: 1048, name: '六月' },
                    { value: 735, name: '七月' },
                    { value: 580, name: '八月' },
                    { value: 484, name: '九月' },
                    { value: 770, name: '十月' },
                    { value: 1048, name: '十一月' },
                    { value: 240, name: '十二月' }
                ]
            }
        ]
    };

    option && myChart.setOption(option);
}

export default week