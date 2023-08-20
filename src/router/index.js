import { createRouter, createWebHistory } from 'vue-router'
import lostAndFoundList from '../views/lostAndFoundList.vue'
import personalCenter from '../views/personalCenter.vue'
import foundPublish from '../views/foundPublish.vue'
import lostPublish from '../views/lostPublish.vue'
import userFeedback from '../views/userFeedback.vue'
import lostList from '../views/lostAndfound/lostList.vue'
import foundList from '../views/lostAndfound/foundList.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
// import Home from '../components/Home.vue'

const routes = [
    {
        name: 'Login',
        path: '/login',
        component: Login,
    },
    {
        name: 'Register',
        path: '/register',
        component: Register,
    },
    {
        path: '/list',
        component: lostAndFoundList,
        children: [
            {
                path: '/list/lostlist',
                component: lostList
            },
            {
                path: '/list/foundlist',
                component: foundList
            }
        ]
    },
    {
        path: '/center',
        component: personalCenter,
    },
    {
        path: '/found',
        component: foundPublish,
    },
    {
        path: '/lost',
        component: lostPublish,
    },
    {
        path: '/feedback',
        component: userFeedback,
    },
    {
        path: '/', // 初始界面
        redirect: '/login'
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    let loginStatus = sessionStorage.getItem('loginStatus');

    if (to.name === 'Register') {
        next()
        return
    }
    
    if (to.name === 'Login' && loginStatus == undefined) { //数据初始化(每次进入系统)
        sessionStorage.setItem('loginStatus', 'false');
        sessionStorage.setItem('username', '')
        next({ name: 'Login' });
    }
    else next();
})

export default router