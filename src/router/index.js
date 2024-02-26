import { createRouter, createWebHashHistory } from 'vue-router'
// import lostAndFoundList from '../views/lostAndFoundList.vue'
// import personalCenter from '../views/personalCenter.vue'
// import foundPublish from '../views/foundPublish.vue'
// import lostPublish from '../views/lostPublish.vue'
// import userFeedback from '../views/userFeedback.vue'
// import lostList from '../views/lostAndfound/lostList.vue'
// import foundList from '../views/lostAndfound/foundList.vue'
// import Login from '../views/Login.vue'
// import Register from '../views/Register.vue'
// import lostPassword from '../views/lostPassword.vue'
// import publishInfo from '../views/Admin/publishInfo.vue'
// import lostInfo from '../views/Admin/lostAndfoundInfo/lostInfo.vue'
// import foundInfo from '../views/Admin/lostAndfoundInfo/foundInfo.vue'
// import usersManager from '../views/Admin/usersManager.vue'
// import usersFeedback from '../views/Admin/usersFeedback.vue'

const routes = [
    {
        path: '/home',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/publishinfo',
        component: () => import('../views/Admin/publishInfo.vue'),
        children: [
            {
                path: '/publishinfo/lostinfo',
                component: () => import('../views/Admin/lostAndfoundInfo/lostInfo.vue')
            },
            {
                path: '/publishinfo/foundinfo',
                component: () => import('../views/Admin/lostAndfoundInfo/foundInfo.vue')
            }
        ]
    },
    {
        path: '/usersmanager',
        component: () => import('../views/Admin/usersManager.vue')
    },
    {
        path: '/usersfeedback',
        component: () => import('../views/Admin/usersFeedback.vue')
    },
    {
        path: '/lostAndFoundSum',
        component: () => import('../views/Admin/lostAndFoundSum.vue')
    },
    {
        name: 'Login',
        path: '/login',
        component: () => import('../views/Login.vue')
    },
    {
        name: 'Register',
        path: '/register',
        component: () => import('../views/Register.vue')
    },
    {
        name: 'lostPassword',
        path: '/lostPassword',
        component: () => import('../views/lostPassword.vue')
    },
    {
        path: '/list',
        component: () => import('../views/lostAndFoundList.vue'),
        children: [
            {
                path: '/list/lostlist',
                component: () => import('../views/lostAndfound/lostList.vue')
            },
            {
                path: '/list/foundlist',
                component: () => import('../views/lostAndfound/foundList.vue')
            }
        ]
    },
    {
        path: '/center',
        component: () => import('../views/personalCenter.vue'),
    },
    {
        path: '/found',
        component: () => import('../views/foundPublish.vue'),
    },
    {
        path: '/lost',
        component: () => import('../views/lostPublish.vue'),
    },
    {
        path: '/feedback',
        component: () => import('../views/userFeedback.vue'),
    },
    {
        path: '/', // 初始界面
        redirect: '/login'
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    let loginStatus = sessionStorage.getItem('loginStatus');

    if (to.name === 'Register') {
        next()
        return
    }

    if (to.name === 'lostPassword') {
        next()
        return
    }

    if (to.name === 'Login' && loginStatus == undefined) { //数据初始化(每次进入系统)
        sessionStorage.setItem('loginStatus', 'false');
        sessionStorage.setItem('username', '')
        next({ name: 'Login' });
    } else if (to.name !== 'Login' && loginStatus === 'false') next({ name: 'Login' });
    else next();
})

export default router