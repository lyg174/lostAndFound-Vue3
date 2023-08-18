import { createRouter, createWebHistory } from 'vue-router'
import lostAndFoundList from '../views/lostAndFoundList.vue'
import personalCenter from '../views/personalCenter.vue'
import foundPublish from '../views/foundPublish.vue'
import lostPublish from '../views/lostPublish.vue'
import userFeedback from '../views/userFeedback.vue'
import lostList from '../views/lostAndfound/lostList.vue'
import foundList from '../views/lostAndfound/foundList.vue'

const routes = [
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
        redirect: '/list/lostlist'
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router