<template>
  <Login v-if="loginView" @changeView="hanleView"></Login>
  <div class="app" v-else>
    <Sidebar @changeView="hanleView" :usernameId="username"></Sidebar>
    <Home></Home>
  </div>
</template>

<script>
import Login from './views/Login.vue'
import Sidebar from './components/Sidebar.vue';
import Home from './components/Home.vue';

export default {
  provide: {
    app: this
  },
  data() {
    return {
      loginView: true,   // 控制登录页与内容页转换
      username: ''
    }
  },
  components: {
    Login,
    Sidebar,
    Home
  },
  methods: {
    hanleView(value, user) {
      this.loginView = value;
      this.username = user; //从Login组件中获取的用户名发送给Sidebar组件
    }
  },
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
  list-style: none;
}

.app {
  display: flex;
}
</style>