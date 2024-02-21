import * as echarts from 'echarts';
import axios from 'axios';

function handleData(data) {
    // 创建一个对象来存储每个月的计数
    const monthlyCount = new Array(12).fill(0);

    // 遍历失物招领数据
    data.forEach(item => {
        const month = new Date(item.lostTime ? item.lostTime : item.foundTime).getMonth();
        monthlyCount[month]++;
    });

    return monthlyCount;

}


async function year() {
    const res_01 = await axios.get('http://localhost:3000/lostlist');
    const res_02 = await axios.get('http://localhost:3000/foundlist');
    const data_01 = handleData(res_01.data.data);
    const data_02 = handleData(res_02.data.data);
    console.log(data_01, data_02);


    var chartDom = document.getElementById('year_line');
    var myChart = echarts.init(chartDom, 'dark');
    var option;
    window.addEventListener('resize', function () {
        myChart.resize();
    });

    option = {
        title: {
            text: '近一年'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend: {
            data: ['已发布的失物', '已发布的招领物']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: '已发布的失物',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: [120, 132, 101, 134, 90, 230, 210, 230, 120, 132, 101, 134]
            },
            {
                name: '已发布的招领物',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: [550, 532, 501, 534, 590, 530, 510, 530, 550, 532, 501, 534]
            }
        ]
    };

    option && myChart.setOption(option);
}

export default year

