<template>
    <div class="found">
        <el-card class="box-card01">

            <template #header>
                <div class="card-header">
                    <h3>失物发布页面</h3>
                </div>
            </template>

            <el-form ref="ruleFormRef" label-position="right" label-width="100px" style="max-width: 460px">
                <el-form-item label="失物图片:">
                    <uploadImage ref="upload"></uploadImage>
                </el-form-item>
                <el-form-item label="失物名称:">
                    <el-input v-model="publishInfo.lostName" />
                </el-form-item>
                <el-form-item label="详细描述:">
                    <el-input v-model="publishInfo.descripText" autosize type="textarea" placeholder="请输入详细内容" />
                </el-form-item>
                <el-form-item label="丢失时间:">
                    <div class="block">
                        <el-date-picker v-model="publishInfo.lostTime" type="date" placeholder="Pick a day"
                            size="default" />
                    </div>
                </el-form-item>
                <el-form-item label="发布时间:">
                    <div class="block">
                        <el-date-picker v-model="publishInfo.lostPublishTime" type="date" placeholder="Pick a day"
                            size="default" />
                    </div>
                </el-form-item>
                <el-form-item label="我的联系方式:">
                    <el-input v-model.number="publishInfo.myContact" />
                </el-form-item>
            </el-form>

            <el-button type="primary" @click="handlePublish">
                发布
            </el-button>

        </el-card>

        <el-card class="box-card01">

            <template #header>
                <div class="card-header">
                    <h3>我发布的失物</h3>
                </div>
            </template>

            <el-table :data="dataList" style="width: 100%" table-layout="fixed" max-height="550">
                <el-table-column prop="lostImageUrl" label="失物图片" align="center">
                    <template #default="scope">
                        <img style="width: 100%; height: 150px;" :src="hanleImg(scope.row.lostImageUrl)">
                    </template>
                </el-table-column>
                <el-table-column prop="lostName" label="失物名称" align="center" />
                <el-table-column prop="lostTime" label="丢失时间" align="center" />
                <el-table-column prop="address" label="删除" align="center">

                    <template #default="scope">
                        <el-button @click="handleDelete(scope.row.id, scope.$index)" type="danger" circle>
                            <el-icon>
                                <Delete />
                            </el-icon>
                        </el-button>
                    </template>

                </el-table-column>
            </el-table>

        </el-card>
    </div>
</template>

<style lang="scss" scoped>
.found {
    // width: 100%;
    flex: 1;
    background-color: #545c64;
    // background-image: url('../image/bg.jpg');
    // background-size: cover;
    display: flex;

    .box-card01 {
        margin: 30px auto;
        width: 45%;
        height: 90%;
        text-align: center;
    }
}
</style>

<script>
import axios from 'axios';
import uploadImage from '../components/uploadImage.vue'
import { ElMessage } from 'element-plus'

export default {
    provide() {
        return {
            api: 'http://localhost:3000/userPublishLost'// 提供给子组件的api接口
        }
    },
    components: {
        uploadImage
    },
    data() {
        return {
            dataList: [],
            centerDialogVisible: false,
            publishInfo: {
                lostName: '',
                lostTime: '',
                lostPublishTime: '',
                descripText: '',
                myContact: ''
            }
        }
    },
    methods: {
        handleDelete(id, index) {// 删除发布信息
            // const imgUrl = { 'url': url };//后端可根据url删除特定信息
            axios.post('http://localhost:3000/userDeletePublishLostInfo', { id }).then(res => {
                ElMessage.success(res.data.message);
                this.dataList.splice(index, 1);//同步移除
            }).catch((err) => {
                ElMessage.error(err.response.data.error);
            })
        },
        hanleImg(url) {// 设置代理处理图片
            const proxyUrl = `http://localhost:3000/image-proxy?url=${encodeURIComponent(url)}`;
            return proxyUrl;
        },
        handlePublish() {// 处理上传的信息，并交给子组件发送

            setTimeout(() => {
                this.centerDialogVisible = false;
            }, 1000);

            if (this.publishInfo.lostTime && this.publishInfo.lostPublishTime) {
                this.publishInfo.lostTime = this.publishInfo.lostTime.toLocaleDateString('en-CA');// 传化成普通日期字符串格式，例如：2020-05-25
                this.publishInfo.lostPublishTime = this.publishInfo.lostPublishTime.toLocaleDateString('en-CA');
            } else {
                ElMessage.error('时间不可为空！');
                return;
            }


            const publishInfo = this.publishInfo;
            publishInfo.username = sessionStorage.getItem('username')//获取用户名

            for (let item in publishInfo) {// 判断相关内容是否为空
                if (!publishInfo[item]) {
                    ElMessage.error('请填写完整信息');
                    return;
                }
            }

            this.$refs.upload.userData = publishInfo;//将处理后的信息提交给子组件

            this.$refs.upload.submitUpload();//触发子组件发送方法
        }
    },
    mounted() {
        const username = sessionStorage.getItem('username');
        axios.post('http://localhost:3000/userLostList', { username }).then(res => {
            this.dataList = res.data.data;
            console.log(res.data.data);
        })
    },
}
</script>

