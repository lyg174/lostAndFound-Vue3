<template>
  <div class="app">
    <Sidebar v-if="loginView" @loggedIn="handleLoginView" :usernameId="username"></Sidebar>
    <adminSidebar v-if="adminView" @adminLoggedIn="handleAdminView" :usernameId="username"></adminSidebar>
    <router-view @loggedIn="handleLoginView" @adminLoggedIn="handleAdminView"></router-view>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue';
import adminSidebar from './components/Admin/adminSidebar.vue';

export default {
  data() {
    return {
      loginView: false,   // 控制Sidebar组件的显示,默认为false
      adminView: false,   // 控制adminSidebar组件显示，默认为false
      username: ''
    }
  },
  components: {
    Sidebar,
    adminSidebar
  },
  methods: {
    setLogin() {// 设置登录状态loginStatus
      let loginStatus = sessionStorage.getItem('loginStatus')
      let user = sessionStorage.getItem('username')
      if (loginStatus === 'true' && user != 'admin') {// 根据登录状态改变Sidebar组件显示情况
        this.loginView = true;
        this.username = user;
      } else if (loginStatus === 'true' && user == 'admin') {// 管理员界面
        this.adminView = true;
        this.username = user;
      }
    },
    toList() {// 登录成功后在当前界面浏览器刷新，重定向到'/list/lostlist',若为管理员，则定向到'/publishinfo/lostinfo'
      let loginStatus = sessionStorage.getItem('loginStatus')
      if (loginStatus === 'true' && (this.loginView === true || this.adminView === true) && this.username !== '') {
        if (this.username != 'admin') this.$router.push('/list/lostlist');
        else this.$router.push('/publishinfo/lostinfo');
      }

    },
    handleLoginView() {
      // 控制Sidebar组件的显示
      this.loginView = !this.loginView;
      this.username = sessionStorage.getItem('username') // 第一次登录成功后立即传值
    },
    handleAdminView() {
      // 控制adminSidebar组件的显示
      console.log(666);
      this.adminView = !this.adminView;
      this.username = sessionStorage.getItem('username') // 第一次登录成功后立即传值
    }
  },
  created() {// 每次创建时执行下列方法，包括浏览器刷新
    let loginStatus = sessionStorage.getItem('loginStatus');
    let username = sessionStorage.getItem('username')
    if (loginStatus !== 'false' && username !== '') { // 只有登录成功才能执行
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
  background-image: url(".//assets/bg.jpg");
  background-size: cover;
  /* background: linear-gradient(45deg, #db0e97 0%, #0a67bf 50%, #0ae6a4 100%); */
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
  width: 100%;
  /* height: 0; */
  
}
</style>