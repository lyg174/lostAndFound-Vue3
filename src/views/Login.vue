<template>
  <div class="container">
    <div class="content">
      <form action="" class="login" v-if="isLogin">
        <p class="title">校园失物招领系统登录页</p>
        <el-input class="info" v-model="user" placeholder="账号:" />
        <el-input class="info" v-model="psw" type="password" placeholder="密码:" show-password />
        <router-link to="/register" class="left">注册</router-link>
        <el-button class="btn" type="primary" round @click="handleLogin">登录</el-button>
        <a href="#" class="right">忘记密码？</a>
      </form>

    </div>
  </div>
</template>
  
<style src="../style/Login.css" scoped></style>
  
<script>
import axios from 'axios'

export default {

  data() {
    return {
      user: '',
      psw: '',
      isLogin: true,// 控制跳转注册界面
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
        // this.$emit('changeView', true, this.user)
        sessionStorage.setItem('loginStatus', 'true');
        sessionStorage.setItem('username', userMsg.username); //保存用户名到本地(临时)
        this.$router.push('/list/lostlist')
        this.$emit('loggedIn'); // 触发@loggedIn改变Sidebar显示状态，并传入用户的用户名
      }).catch((err) => {
        alert(err.response.data.error);
      })
    }
  },
}
</script>