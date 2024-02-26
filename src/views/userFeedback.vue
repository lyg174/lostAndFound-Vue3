<template>
    <div class="feedback">

        <el-card class="box-card01">

            <template #header>
                <div class="card-header">
                    <h3>反馈页面</h3>
                </div>
            </template>

            <el-form ref="ruleFormRef" label-position="right" label-width="100px" style="max-width: 460px">
                <el-form-item label="姓名:">
                    <el-input v-model="userFeedback.name" />
                </el-form-item>
                <el-form-item label="性别:">
                    <el-select v-model="userFeedback.gender" class="m-2" placeholder="Select" size="default">
                        <el-option v-for="item of options" :key="item.value" :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="年龄:">
                    <el-input-number v-model="userFeedback.age" />
                </el-form-item>
                <el-form-item label="联系电话:">
                    <el-input v-model="userFeedback.phoneNumber" />
                </el-form-item>
                <el-form-item label="电子邮箱:">
                    <el-input v-model="userFeedback.email" />
                </el-form-item>
                <el-form-item label="反馈建议:">
                    <el-input resize="none" v-model="userFeedback.suggestion" :autosize="{maxRows: 10}" type="textarea" />
                </el-form-item>
            </el-form>

            <el-button type="primary" @click="handleFeedback">
                发布
            </el-button>

        </el-card>

        <el-card class="box-card01">

            <template #header>
                <div class="card-header">
                    <h3>我的反馈</h3>
                </div>
            </template>

            <el-table :data="datalist" style="width: 100%" table-layout="fixed" max-height="550">
                <el-table-column prop="suggestion" label="建议" />
                <el-table-column prop="feedTime" label="反馈时间" />
                <el-table-column prop="address" label="删除">

                    <template #default="scope">
                        <el-button @click="handleDelete(scope.row.suggestion, scope.$index)" type="danger" circle>
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
.feedback {
    flex: 1;
    background-color: #545c64;
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

import { ElMessage } from 'element-plus'

export default {
    data() {
        return {
            datalist: [],
            options: [
                {
                    value: '男'
                },
                {
                    value: '女'
                }
            ],
            userFeedback: {
                name: '',
                gender: '',
                age: '',
                phoneNumber: '',
                email: '',
                suggestion: ''
            }
        }
    },
    methods: {
        handleFeedback() {
            

            const userFeedbackInfo = this.userFeedback;

            const currentDate = new Date();//获取当前反馈发布时间
            const feedTime = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;// 格式化日期展示

            userFeedbackInfo.username = sessionStorage.getItem('username');
            userFeedbackInfo.feedTime = feedTime;

            for (let item in userFeedbackInfo) {// 判断相关内容是否为空
                if (!userFeedbackInfo[item]) {
                    ElMessage.error('请填写完整信息');
                    return;
                }
            }

            axios.post('http://localhost:3000/userPublishFeedbackInfo', userFeedbackInfo).then(res => {
                ElMessage.success(res.data.message);
            }).catch((err) => {
                ElMessage.error(err.response.data.error);
            })


        },
        handleDelete(suggestion, index) {
            axios.post('http://localhost:3000/userDeleteFeedbackInfo', { suggestion }).then(res => {
                ElMessage.success(res.data.message);
                this.datalist.splice(index, 1);//同步移除
            }).catch((err) => {
                ElMessage.error(err.response.data.error);
                console.log(err.response.data.error);
            })

        }
    },
    mounted() {
        const username = sessionStorage.getItem('username');
        axios.post('http://localhost:3000/userFeedbackInfo', { username }).then(res => {
            this.datalist = res.data.data;
        }).catch((err) => {
            ElMessage.error(err.response.data.error);
        })
    }
}
</script>