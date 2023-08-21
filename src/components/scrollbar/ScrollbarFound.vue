<template>
    <div class="lostList">
        <el-scrollbar class="scroll">
            <li class="title">
                <div>招领物图片</div>
                <div>招领物描述</div>
                <div>拾取时间</div>
                <div>招领物发布时间</div>
                <div>拾取人联系方式</div>
                <div>认领</div>
            </li>

            <li v-for="item of dataList" :key="item" class="scrollbar-demo-item">
                <div class="lostInfo">
                    <img :src="hanleImg(item.foundImageUrl)">
                </div>
                <div class="lostInfo">{{ item.foundDescribe }}</div>
                <div class="lostInfo">{{ item.foundTime }}</div>
                <div class="lostInfo">{{ item.foundPublishTime }}</div>
                <div class="lostInfo">{{ item.foundersContact }}</div>
                <div class="lostInfo">
                    <el-button>认领</el-button>
                </div>
            </li>
        </el-scrollbar>
    </div>
</template>

<style lang="scss" scoped>
.lostList {
    flex: 1; //填充剩余部分
}

.scroll { // 滚动组件
    max-height: 676.4px;
    position: relative;
}

.title {// 信息标题
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 550;
    background: var(--el-color-primary-light-9);
    color: var(--el-color-primary);
    padding: 10px;
    padding-bottom: 0;
    position: sticky; //设置粘性定位
    top: 0;
    
    div {
        flex: 1;
        text-align: center;
        border-bottom: 1px solid black;
    }
    div:not(:last-child) {
        border-right: 1px solid black;
    }
}

.scrollbar-demo-item { // 后端获取数据并展示的栏位
    display: flex;
    align-items: center;
    justify-content: center;
    // height: 50px;
    padding: 10px;
    text-align: center;
    border-radius: 4px;
    border-bottom: 1px solid black;
    background: var(--el-color-primary-light-9);
    color: var(--el-color-primary);


    .lostInfo {
        flex: 1;
        height: 200px;
        display: flex;
        justify-content: center;
        align-items: center;

        // line-height: 200px;
        img {
            width: 90%;
            height: 100%;
        }
    }

    div:not(:last-child) {
        border-right: 1px solid black;
    }
}
</style>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            dataList: []
        }
    },
    mounted() {
        axios.get('http://localhost:3000/foundlist').then(res => {
            this.dataList = res.data.data;
            console.log(res.data.data);
        })
    },
    methods: {
        hanleImg(url) {// 设置代理处理图片
            const proxyUrl = `http://localhost:3000/image-proxy?url=${encodeURIComponent(url)}`;
            return proxyUrl;
        }
    },
}
</script>