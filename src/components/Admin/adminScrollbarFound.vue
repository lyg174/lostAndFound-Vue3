<template>
    <div class="lostList">

        <el-table :data="dataListCopy" style="width: 100%" table-layout="fixed" max-height="680">
            <el-table-column prop="foundImageUrl" label="招领物图片" align="center">
                <template #default="scope">
                    <img style="width: 100%; height: 150px;" :src="hanleImg(scope.row.foundImageUrl)">
                </template>
            </el-table-column>
            <el-table-column prop="foundName" label="招领物名称" align="center" />
            <el-table-column prop="foundTime" label="拾取时间" align="center" />
            <el-table-column prop="foundPublishTime" label="招领物发布时间" align="center" />
            <el-table-column prop="foundersContact" label="拾取人联系方式" align="center" />
            <el-table-column prop="publish_status" label="操作" align="center" :filters="[
                { text: '已发布', value: 'true' },
                { text: '未发布', value: 'false' }
            ]" :filter-method="filterHandler">

                <template #default="scope">

                    <el-button @click="getDetails(scope.row.foundImageUrl)">查看详情</el-button>
                    <el-button type="danger" circle @click="handleDelete(scope.row.id, scope.$index)">
                        <el-icon>
                            <Delete />
                        </el-icon>
                    </el-button>

                    <el-tooltip :content="'是否允许发布: ' + scope.row.publish_status" placement="top">
                        <el-switch v-model="scope.row.publish_status"
                            @click="changePublishStatus(scope.row.publish_status, scope.row.foundImageUrl)"
                            style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" active-value="true"
                            inactive-value="false">

                        </el-switch>
                    </el-tooltip>

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

import { ElMessage } from 'element-plus'

export default {
    props: ['dataListCopy'],
    data() {
        return {
            dialogTableVisible: false,
            dataList: []
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
        handleDelete(id, index) {
            // const imageUrl = {
            //     'url': url
            // }

            axios.post('http://localhost:3000/userDeletePublishFoundInfo', id).then(res => {
                ElMessage.success(res.data.message);
                this.dataListCopy.splice(index, 1);//同步移除
            }).catch(err => {
                console.log(err.response.data.error);
            })
        },
        getDetails(url) {
            const list = this.dataList.filter(item => item.foundImageUrl.includes(url));// 根据图片地址唯一性过滤出特定失物信息
            this.detailText = list[0].descripText;
            this.dialogTableVisible = true;
            console.log(list[0].lostName);
        },
        changePublishStatus(status, url) {
            const info = {
                publish_status: status,
                foundImageUrl: url
            }

            axios.post('http://localhost:3000/changeUsersPublishStatus', info).then(res => {
                console.log(res.data.message);
            }).catch(err => {
                console.log(err.response.data.error);
            })
        },

        filterHandler(value, row, column) {
            const property = column['property']
            return row[property] === value
        },

        hanleImg(url) {// 设置代理处理图片
            const proxyUrl = `http://localhost:3000/image-proxy?url=${encodeURIComponent(url)}`;
            return proxyUrl;
        }
    },
}
</script>