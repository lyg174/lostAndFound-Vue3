<template>
    <div class="lostList">
        <el-scrollbar class="scroll">
            <li class="title">
                <div>招领物图片</div>
                <div>招领物名称</div>
                <div>拾取时间</div>
                <div>招领物发布时间</div>
                <div>拾取人联系方式</div>
                <div>详情</div>
            </li>

            <template v-for="item of dataListCopy" :key="item">
                <li v-if="item.publish_status === 'true'" class="scrollbar-demo-item">
                    <div class="lostInfo">
                        <img :src="hanleImg(item.foundImageUrl)">
                    </div>
                    <div class="lostInfo">{{ item.foundName }}</div>
                    <div class="lostInfo">{{ item.foundTime }}</div>
                    <div class="lostInfo">{{ item.foundPublishTime }}</div>
                    <div class="lostInfo">{{ item.foundersContact }}</div>
                    <div class="lostInfo">
                        <el-button @click="getDetails(item.foundImageUrl)">查看详情</el-button>
                    </div>
                </li>
            </template>

            <el-empty v-if="!dataList.length" description="description" />

        </el-scrollbar>

        <el-dialog v-model="dialogTableVisible" title="信息详情" center width="30%">
            <div class="textHeight">
                {{ detailText }}
            </div>
        </el-dialog>

    </div>
</template>

<style lang="scss" scoped>
.textHeight {
    height: 400px; // 固定高度
    font-size: 20px;
    text-indent: 2em; // 首行缩进
}

.lostList {
    flex: 1; //填充剩余部分
    background-color: #ecf5ff;
}

.scroll {
    // 滚动组件
    max-height: 680.4px;
    position: relative;
}

.title {
    // 信息标题
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
        overflow: hidden;
        /* 隐藏溢出内容 */
        white-space: nowrap;
        /* 不换行，防止文本溢出 */
        text-overflow: ellipsis;
        /* 当文本溢出时显示省略号 */
    }

    div:not(:last-child) {
        border-right: 1px solid black;
    }
}

.scrollbar-demo-item {
    // 后端获取数据并展示的栏位
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
    props: ['dataListCopy'],
    data() {
        return {
            dialogTableVisible: false,
            dataList: [],
            detailText: ''
        }
    },
    mounted() {
        axios.get('http://localhost:3000/foundlist').then(res => {
            this.dataList = res.data.data;
            this.$emit('handleArray', this.dataList)// 传递给父组件，以便进行搜索操作
            console.log(res.data.data);
        })
    },
    methods: {
        getDetails(url) {
            const list = this.dataList.filter(item => item.foundImageUrl.includes(url));// 根据图片地址唯一性过滤出特定失物信息
            this.detailText = list[0].descripText;
            this.dialogTableVisible = true;
            console.log(list[0].foundName);
        },

        hanleImg(url) {// 设置代理处理图片
            const proxyUrl = `http://localhost:3000/image-proxy?url=${encodeURIComponent(url)}`;
            return proxyUrl;
        }
    },
}
</script>