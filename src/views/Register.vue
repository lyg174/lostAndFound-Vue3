<template>
    <div class="container">
        <div class="content">
            <form class="register">
                <p class="title">注册界面</p>
                <el-button class="btnBack" type='primary' round @click="handleBack"><el-icon>
                        <ArrowLeft />
                    </el-icon></el-button>
                <el-input class="info" v-model="user" placeholder="请输入账号:" />
                <el-input class="info" v-model="psw1" type="password" placeholder="请输入密码:" show-password />
                <el-input class="info" v-model="psw2" type="password" placeholder="确认密码:" show-password />
                <el-button class="btn" type="primary" round @click="handleRegister">注册</el-button>
            </form>
        </div>
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
    background: linear-gradient(45deg, #5c32bf 0%, #196073 50%, #26dc69 100%);
    /* background-color: white; */
}

.register {
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
            psw1: '',
            psw2: ''
        }
    },
    methods: {
        handleRegister() {
            if (this.psw1 === '' && this.psw2 === '') {
                alert('密码不能为空!!')
                return;
            };
            if (this.psw1 !== this.psw2) {
                alert('两次输入密码不一致！！')
                return;
            };
            const registerMsg = {
                username: this.user,
                password: this.psw1
            };
            axios.post('http://localhost:3000/register', registerMsg).then(res => {
                alert(res.data.message);
                setTimeout(() => {
                    this.$emit('isRegister', true)
                }, 1500);
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