<template>
    <div class="lostList">
        <el-table :data="dataListCopy" style="width: 100%" table-layout="fixed" max-height="680">
            <el-table-column prop="lostImageUrl" label="失物图片" align="center">
                <template #default="scope">
                    <img style="width: 100%; height: 150px;" :src="hanleImg(scope.row.lostImageUrl)">
                </template>
            </el-table-column>
            <el-table-column prop="lostName" label="失物名称" align="center" />
            <el-table-column prop="lostTime" label="丢失时间" align="center" />
            <el-table-column prop="lostPublishTime" label="失物发布时间" align="center" />
            <el-table-column prop="losersContact" label="失主联系方式" align="center" />
            <el-table-column prop="address" label="详情" align="center">

                <template #default="scope">
                    <el-button @click="getDetails(scope.row.lostImageUrl)">查看详情</el-button>
                </template>

            </el-table-column>
        </el-table>

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
        axios.get('http://localhost:3000/lostlist').then(res => {
            this.dataList = res.data.data;
            this.$emit('handleArray', this.dataList)// 传递给父组件，以便进行搜索操作
            console.log(res.data.data);
        })
    },

    methods: {
        getDetails(url) {
            const list = this.dataList.filter(item => item.lostImageUrl.includes(url));// 根据图片地址唯一性过滤出特定失物信息
            this.detailText = list[0].descripText;
            this.dialogTableVisible = true;
            console.log(list[0].lostName);
        },

        hanleImg(url) {// 设置代理处理图片
            const proxyUrl = `http://localhost:3000/image-proxy?url=${encodeURIComponent(url)}`;
            return proxyUrl;
        }
    },
}
</script>