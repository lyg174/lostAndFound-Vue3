<template>
  <div class="container">
    <div class="content">
      <form action="" class="login" v-if="isLogin">
        <p class="title">校园失物招领系统登录页</p>
        <el-input class="info" v-model="user" placeholder="账号:" />
        <el-input class="info" v-model="psw" type="password" placeholder="密码:" show-password />
        <a href="#" @click="isLogin = !isLogin" class="left">注册</a>
        <el-button class="btn" type="primary" round @click="handleLogin">登录</el-button>
        <a href="#" class="right">忘记密码？</a>
      </form>

      <Register v-else @isRegister="hanleStatus"></Register>
    </div>
  </div>
</template>
  
<style src="../style/Login.css" scoped></style>
  
<script>
import axios from 'axios'
import Register from './Register.vue';

export default {
  components: {
    Register
  },
  data() {
    return {
      user: '',
      psw: '',
      isLogin: true,// 控制跳转注册界面
      loginStatus: false //登录状态
    }
  },
  methods: {
    handleLogin() {
      if (this.user === '' || this.psw === '') {
        alert('请输入账号密码！')
        return;
      };
      const userMsg = {
        username: this.user,
        password: this.psw
      };
      axios.post('http://localhost:3000/login', userMsg).then(res => {
        alert(res.data.message);
        this.$emit('changeView', false, this.user)
      }).catch((err) => {
        alert(err.response.data.error);
      })
    },
    hanleStatus(value) {
      this.isLogin = value
    }
  },
}
</script>