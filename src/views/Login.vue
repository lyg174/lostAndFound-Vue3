<template>
  <div class="container">
    <div class="content">
      <form action="" class="login" v-if="isLogin">
        <p class="title">校园失物招领系统登录页</p>
        <el-input class="info" v-model="user" placeholder="账号:" />
        <el-input class="info" v-model="psw" type="password" placeholder="密码:" show-password />
        <router-link to="/register" class="left">注册</router-link>
        <el-button class="btn" type="primary" round @click="handleLogin">登录</el-button>
        <router-link to="/lostPassword" class="right">忘记密码?</router-link>
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
      user: 'admin',
      psw: '123',
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
        alert('登录成功');
        console.log(res.data);
        const datalist = res.data.data[0];
        // this.$emit('changeView', true, this.user)
        sessionStorage.setItem('loginStatus', 'true');
        sessionStorage.setItem('username', userMsg.username); //保存用户名到本地(临时)
        sessionStorage.setItem('nickname', datalist.nickname); // 昵称
        sessionStorage.setItem('controlClick', 1); // 控制消息通知触发次数
        if (!datalist.avatar) {
          sessionStorage.setItem('avatar', 'usersAvatar/0fc7d20532fdaf769a25683617711png.png');//如果头像为空，则设置为默认头像
        } else sessionStorage.setItem('avatar', datalist.avatar);// 头像地址

        if (userMsg.username == 'admin') {// 管理员账号
          this.$router.push('/publishinfo/lostinfo');
          this.$emit('adminLoggedIn'); // 触发@adminLoggedIn改变adminSidebar显示状态
          console.log(555);
        }
        else {
          this.$router.push('/list/lostlist');// 普通用户账号
          this.$emit('loggedIn'); // 触发@loggedIn改变Sidebar显示状态
        };

      }).catch((err) => {
        alert(err.response.data.error);
      })
    }
  },
}
</script>