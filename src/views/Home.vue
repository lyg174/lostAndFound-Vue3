<template>
    <div class="home">

        <div
            style="margin:auto; height: 5%; width: 95%; margin: 1px auto; text-align: center; background-color: #21a7a6; border: none;">
            <h2>校园失物招领系统</h2>
        </div>

        <div class="box-card">
            <el-card style="flex: 3;">
                <div v-if="username === 'admin'" style="display: flex; flex-wrap: wrap; justify-content: space-between;">
                    <el-card style="background-color: red;" class="content">用户数量: <span>{{userCount}}</span></el-card>
                    <el-card style="background-color: blue;" class="content">失物总数: <span>{{lostCount}}</span></el-card>
                    <el-card style="background-color: green;" class="content">招领总数: <span>{{foundCount}}</span></el-card>
                    <el-card style="background-color: skyblue;" class="content">反馈总数: <span>{{feedbackCount}}</span></el-card>
                </div>

                <el-avatar fit="cover" :size="300" :src="hanleImg()" />
                <h1>{{ username }}</h1>
            </el-card>
            <div style="flex: 1;"></div>
            <el-card style="flex: 5;">
                <el-calendar v-model="value" />
            </el-card>

        </div>

    </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { ref } from 'vue'
import axios from 'axios'

const value = ref(new Date())

const hanleImg = () => {// 设置代理处理图片
            const url = sessionStorage.getItem('avatar').replace('node\\', '');
            const proxyUrl = `http://localhost:3000/image-proxy?url=${encodeURIComponent(url)}`;
            sessionStorage.setItem('avatar_copy', proxyUrl)
            return proxyUrl;
        }

const username = computed(() => sessionStorage.getItem('username'))

const userCount = ref(0)
const lostCount = ref(0)
const foundCount = ref(0)
const feedbackCount = ref(0)

const getUserCount = async () => {
    const res = await axios.get('http://localhost:3000/usersAccountInfo')
    userCount.value = res.data.data.length
}

const getLostCount = async () => {
    const res = await axios.get('http://localhost:3000/lostlist')
    lostCount.value = res.data.data.length
}

const getFoundCount = async () => {
    const res = await axios.get('http://localhost:3000/foundlist')
    foundCount.value = res.data.data.length
}

const getFeedbackCount = async () => {
    const res = await axios.get('http://localhost:3000/users_feedback')
    feedbackCount.value = res.data.data.length
}

onMounted(() => {
    getUserCount()
    getLostCount()
    getFoundCount()
    getFeedbackCount()
})

</script>

<style lang="scss" scoped>
.home {
    flex: 1;
    background-color: #fff;
    display: flex;
    flex-direction: column;

    .box-card {
        margin: 0 auto;
        margin-top: 5px;
        width: 95%;
        height: 90%;
        text-align: center;

        display: flex;
    }

    
}
.content {
        width: 48%;
        margin-bottom: 10px;
        color: #fff;
    }
</style>