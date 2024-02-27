<template>
  <div class="container">

    <el-row style="width: 55%;">
      <el-col class="side" :span="16" style="background-color: white;">
      </el-col>
      <el-col :span="8" style="background-color: rgb(255, 255, 255,0.5);">
        <div class="login">

          <h3 style="text-align: center; padding-top: 10px;">校园失物招领登录页</h3>

          <el-form label-width="60px" size="large">
            <el-form-item label="用户名:">
              <el-input v-model="user" />
            </el-form-item>
            <el-form-item label="密码:">
              <el-input v-model="psw" type="password" />
            </el-form-item>
            <el-form-item>
              <el-button color="black" round @click="handleLogin" style="width: 100%;">登录</el-button>
            </el-form-item>
            <el-form-item>
              <el-button color="black" round @click="$router.push('/register')">注册</el-button>
              <el-button color="black" round @click="$router.push('/lostPassword')">忘记密码？</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>


  </div>
</template>
  
<style scoped lang="scss">
.container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  :deep(.el-col) {
    border-radius: 15px;
    box-shadow: 0 0 5px 1px rgb(101, 179, 194);
  }

  .side {
    border: none;
    width: 100%;
    height: 400px;
    background-image: url('../assets/login.jpg');
    background-size: cover;
  }

  .login {
    display: flex;
    flex-direction: column;
    height: 100%;

    .el-form {
      flex: 1;
      font-weight: 700;

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
</style>
  
<script>
import axios from 'axios'

import { ElMessage } from 'element-plus'


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
        ElMessage.error('请输入账号密码！')
        return;
      };
      const userMsg = {
        username: this.user,
        password: this.psw
      };

      axios.post('http://localhost:3000/login', userMsg).then(res => {
        ElMessage.success('登录成功');
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
          this.$router.push('/home');
          this.$emit('adminLoggedIn'); // 触发@adminLoggedIn改变adminSidebar显示状态
          console.log(555);
        }
        else {
          this.$router.push('/home');// 普通用户账号
          this.$emit('loggedIn'); // 触发@loggedIn改变Sidebar显示状态
        };

      }).catch((err) => {
        ElMessage.error(err.response.data.error);
      })
    }
  },
}
</script>