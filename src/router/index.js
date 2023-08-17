import { createRouter, createWebHashHistory } from 'vue-router'
import lostAndFoundList from '../views/lostAndFoundList.vue'
import personalCenter from '../views/personalCenter.vue'
import foundPublish from '../views/foundPublish.vue'
import lostPublish from '../views/lostPublish.vue'
import userFeedback from '../views/userFeedback.vue'

const routes = [
    {
        path: '/list',
        component: lostAndFoundList
    },
    {
        path: '/center',
        component: personalCenter
    },
    {
        path: '/found',
        component: foundPublish
    },
    {
        path: '/lost',
        component: lostPublish
    },
    {
        path: '/feedback',
        component: userFeedback
    },
    {
        path: '/',
        redirect: '/list'
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router