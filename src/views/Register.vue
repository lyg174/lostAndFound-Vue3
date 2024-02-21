<template>
    <div class="container">
        <el-card class="box-card">
            <template #header>
                <div class="card-header" style="border: none;">
                    <h3>校园失物招领注册页</h3>
                </div>
            </template>
            <div class="login">
                <div style="flex: 1;"></div>

                <el-form :model="form" label-width="120px" size="large">
                    <el-form-item label="请输入用户名:">
                        <el-input v-model="user" />
                    </el-form-item>
                    <el-form-item label="请输入密码:">
                        <el-input v-model="psw1" type="password" />
                    </el-form-item>
                    <el-form-item label="确认密码:">
                        <el-input v-model="psw2" type="password" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" round @click="handleBack">返回</el-button>
                        <el-button type="primary" round @click="handleRegister">注册</el-button>
                    </el-form-item>

                </el-form>
            </div>

        </el-card>
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
                        margin-top: 30px;
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
            psw1: '',
            psw2: ''
        }
    },
    methods: {
        handleRegister() {
            if (this.psw1 === '' && this.psw2 === '') {
                ElMessage.error('密码不能为空!!')
                return;
            };
            if (this.psw1 !== this.psw2) {
                ElMessage.error('两次输入密码不一致！！')
                return;
            };
            const registerMsg = {
                username: this.user,
                password: this.psw1
            };
            axios.post('http://localhost:3000/register', registerMsg).then(res => {
                ElMessage.success(res.data.message);
                setTimeout(() => {
                    this.$emit('isRegister', true)
                }, 1500);
                this.$router.push('/login');
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