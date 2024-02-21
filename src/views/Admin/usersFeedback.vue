<template>
    <div class="feedback">

        <el-card class="box-card01">

            <template #header>
                <div class="card-header">
                    <h3>用户反馈</h3>
                </div>
            </template>

            <el-table :data="datalist" style="width: 100%" table-layout="fixed" max-height="550">
                <el-table-column prop="name" label="姓名" align="center"/>
                <el-table-column prop="gender" label="性别" align="center" />
                <el-table-column prop="age" label="年龄" align="center" />
                <el-table-column prop="phoneNumber" label="电话号码" align="center" />
                <el-table-column prop="email" label="电子邮箱" align="center" />
                <el-table-column prop="address" label="操作" align="center">

                    <template #default="scope">

                        <el-button @click="getSuggestion(scope.row.suggestion)" type="primary" circle>
                            详情
                        </el-button>
                        
                        <el-button @click="handleDelete(scope.row.suggestion, scope.$index)" type="danger" circle>
                            <el-icon>
                                <Delete />
                            </el-icon>
                        </el-button>

                    </template>

                </el-table-column>
            </el-table>

        </el-card>

        <el-dialog v-model="dialogTableVisible" title="反馈详情" center width="30%">
            <div class="textHeight">
                {{ suggestion }}
            </div>
        </el-dialog>

    </div>
</template>

<style lang="scss" scoped>
.feedback {
    flex: 1;
    background-color: #545c64;
    // display: flex;

    .box-card01 {
        margin: 30px auto;
        width: 90%;
        height: 90%;
        text-align: center;
    }
}


.textHeight {
    height: 400px; // 固定高度
    font-size: 20px;
    text-indent: 2em; // 首行缩进
}
</style>

<script>
import axios from 'axios';

import { ElMessage } from 'element-plus'


export default {
    data() {
        return {
            dialogTableVisible: false,
            centerDialogVisible: false,
            datalist: [],
            suggestion: '',
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
        handleDelete(suggestion, index) {
            axios.post('http://localhost:3000/userDeleteFeedbackInfo', { suggestion }).then(res => {
                ElMessage.success(res.data.message);
                this.datalist.splice(index, 1);//同步移除
            }).catch((err) => {
                ElMessage.error(err.response.data.error);
            })

        },
        getSuggestion(suggestion) {
            this.suggestion = suggestion;
            this.dialogTableVisible = true;
        }
    },
    mounted() {
        axios.get('http://localhost:3000/users_feedback').then(res => {
            this.datalist = res.data.data;
            console.log(this.datalist);
        }).catch((err) => {
            ElMessage.error(err.response.data.error);
        })
    }
}
</script>