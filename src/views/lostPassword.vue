<template>
    <div class="container">
        <el-card class="box-card">
            <template #header>
                <div class="card-header" style="border: none;">
                    <h3>密码找回</h3>
                </div>
            </template>
            <div class="login">
                <div style="flex: 1;"></div>

                <el-form :model="form" label-width="120px" size="large">
                    <el-form-item label="请输入用户名:">
                        <el-input v-model="user" />
                    </el-form-item>
                    <el-form-item label="请输入手机号:">
                        <el-input v-model="phoneNumber" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" round @click="handleBack">返回</el-button>
                        <el-button type="primary" round @click="handleVerify">验证</el-button>
                    </el-form-item>

                </el-form>
            </div>

        </el-card>

        <!-- 对话框 -->
        <el-dialog v-model="centerDialogVisible" title="资料修改" width="30%" align-center :center="true">

            <!-- element plus表单，用于提交用户修改数据 -->
            <el-form ref="ruleFormRef" label-position="right" label-width="100px" style="max-width: 460px">
                <el-form-item label="新密码:">
                    <el-input v-model="newPassword" />
                </el-form-item>
                <el-form-item label="确认密码:">
                    <el-input v-model="confirmPSW" />
                </el-form-item>
            </el-form>

            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="centerDialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="changeInfo">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>

    </div>
</template>

<style scoped lang="scss">
.container {
    width: 100vw;
    height: 100vh;
    /* background-image: url("../image/巴丝特.jpg");
    background-size: cover; */
    display: flex;
    justify-content: center;
    align-items: center;

    .box-card {
        border: none;
        width: 700px;
        height: 400px;
        background-image: url('../assets/login.jpg');
        background-size: cover;
        border-radius: 10px;

        :deep(.el-card__header) {
            border: none;
        }

        .login {
            display: flex;

            .el-form {
                height: 300px;
                flex: 3;
                font-weight: 700;
                background-color: rgb(255, 255, 255, 0.3);

                .el-form-item {
                    margin: 0;
                    padding: 10px;

                    &:nth-of-type(1) {
                        margin-top: 70px;
                        margin-bottom: 0;
                    }
                }
            }
        }
    }
}
</style>

<script>
import axios from 'axios';
import { ElMessage } from 'element-plus'

export default {
    data() {
        return {
            user: '',
            phoneNumber: '',
            centerDialogVisible: false,
            newPassword: '',
            confirmPSW: ''
        }
    },
    methods: {
        handleVerify() {
            const userInfo = {
                username: this.user,
                phoneNumber: this.phoneNumber,
            }

            axios.post('http://localhost:3000/handlePassword', userInfo).then(res => {
                this.centerDialogVisible = res.data.data;
            }).catch((err) => {
                ElMessage.error(err.response.data.error);
            })
        },
        changeInfo() {

            if (this.newPassword === '' && this.confirmPSW === '') {
                ElMessage.error('密码不能为空');
                return;
            }

            if (this.newPassword !== this.confirmPSW) {
                ElMessage.error('两次输入密码不一致');
                return;
            }

            const userInfo = {
                username: this.user,
                password: this.newPassword
            };

            axios.post('http://localhost:3000/changePassword', userInfo).then(res => {
                this.centerDialogVisible = false;
                ElMessage.success(res.data.message);
            }).catch((err) => {
                ElMessage.error(err.response.data.error);
            })
        },
        handleBack() {
            this.$router.back()
        }
    },
}
</script>