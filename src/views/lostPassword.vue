<template>
    <div class="container">
        <div class="content">
            <form class="foundPsw">
                <p class="title">密码找回</p>
                <el-button class="btnBack" type='primary' round @click="handleBack"><el-icon>
                        <ArrowLeft />
                    </el-icon></el-button>
                <el-input class="info" v-model="user" placeholder="请输入账号:" />
                <el-input class="info" v-model="phoneNumber" placeholder="请输入手机号码:" />
                <el-button class="btn" type="primary" round @click="handleVerify">验证</el-button>
            </form>
        </div>

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

<style scoped>
.container {
    width: 100vw;
    height: 100vh;
    /* background-image: url("../image/巴丝特.jpg");
    background-size: cover; */
    display: flex;
    justify-content: center;
    align-items: center;
}

.content {
    width: 550px;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    /* background: linear-gradient(45deg, #5c32bf 0%, #196073 50%, #26dc69 100%); */
    background-color: rgb(237, 215, 215, 0.8);
}

.foundPsw {
    text-align: center;
    position: relative;
}

.title {
    font-size: 25px;
    font-weight: 900;
}

.btnBack {
    /* background-color: transparent; */
    border-color: transparent;
    position: absolute;
    top: 0px;
    left: 0;
}

.info {
    margin: 5px 0;
}
</style>

<script>
import axios from 'axios';

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
                alert(err.response.data.error);
            })
        },
        changeInfo() {

            if (this.newPassword === '' && this.confirmPSW === '') {
                alert('密码不能为空');
                return;
            }

            if (this.newPassword !== this.confirmPSW) {
                alert('两次输入密码不一致');
                return;
            }

            const userInfo = {
                username: this.user,
                password: this.newPassword
            };

            axios.post('http://localhost:3000/changePassword', userInfo).then(res => {
                this.centerDialogVisible = false;
                alert(res.data.message);
            }).catch((err) => {
                alert(err.response.data.error);
            })
        },
        handleBack() {
            this.$router.back()
        }
    },
}
</script>