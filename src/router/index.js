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
import publishInfo from '../views/Admin/publishInfo.vue'
import lostInfo from '../views/Admin/lostAndfoundInfo/lostInfo.vue'
import foundInfo from '../views/Admin/lostAndfoundInfo/foundInfo.vue'
import usersManager from '../views/Admin/usersManager.vue'
import usersFeedback from '../views/Admin/usersFeedback.vue'

const routes = [
    {
        path: '/publishinfo',
        component: publishInfo,
        children: [
            {
                path: '/publishinfo/lostinfo',
                component: lostInfo
            },
            {
                path: '/publishinfo/foundinfo',
                component: foundInfo
            }
        ]
    },
    {
        path: '/usersmanager',
        component: usersManager
    },
    {
        path: '/usersfeedback',
        component: usersFeedback
    },
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
    } else if (to.name !== 'Login' && loginStatus === 'false') next({ name: 'Login' });
    else next();
})

export default router