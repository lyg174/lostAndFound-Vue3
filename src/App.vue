<template>
  <Login v-if="loginView" @changeView="hanleView"></Login>
  <div class="app" v-else>
    <Sidebar @changeView="hanleView"></Sidebar>
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
      loginView: true   // 控制登录页与内容页转换
    }
  },
  components: {
    Login,
    Sidebar,
    Home
  },
  methods: {
    hanleView(value) {
      this.loginView = value;
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