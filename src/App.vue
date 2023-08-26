<template>
  <div class="app">
    <Sidebar v-if="loginView" @loggedIn="handleLoginView" :usernameId="username"></Sidebar>
    <router-view @loggedIn="handleLoginView"></router-view>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue';

export default {
  data() {
    return {
      loginView: false,   // 控制Sidebar组件的显示,默认为false
      username: ''
    }
  },
  components: {
    Sidebar,
  },
  methods: {
    setLogin() {// 设置登录状态loginStatus
      let loginStatus = sessionStorage.getItem('loginStatus')
      let user = sessionStorage.getItem('username')
      if (loginStatus === 'true' && user) {// 根据登录状态改变Sidebar组件显示情况
        this.loginView = true;
        this.username = user;
      }
    },
    toList() {// 登录成功后在当前界面浏览器刷新，重定向到'/list/lostlist'
      let loginStatus = sessionStorage.getItem('loginStatus')
      if (loginStatus === 'true' && this.loginView === true && this.username !== '') this.$router.push('/list/lostlist')

    },
    handleLoginView() {
      // 控制Sidebar组件的显示
      this.loginView = !this.loginView;
      this.username = sessionStorage.getItem('username') // 第一次登录成功后立即传值
    }
  },
  created() {// 每次创建时执行下列方法，包括浏览器刷新
    let loginStatus = sessionStorage.getItem('loginStatus');
    if (loginStatus !== 'false') { // 只有登录成功才能执行
      this.setLogin()
      this.toList()
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


#app {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  /* background-image: url("./image/巴丝特.jpg");
  background-size: cover; */
  background: linear-gradient(45deg, #db0e97 0%, #0a67bf 50%, #0ae6a4 100%);
}

/* body {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
} */

/* .home {
  display: flex;
  flex-direction: column;
} */

.app {
  display: flex;
  width: 70%;
  /* height: 0; */
}
</style>