<template>
    <div class="usersManager">

        <el-scrollbar class="scroll">
            <li class="title">
                <div>用户名</div>
                <div>用户密码</div>
                <div>用户昵称</div>
                <div>用户头像</div>
                <div>删除账户</div>
            </li>

            <template v-for="item of datalist" :key="item">
                <li class="scrollbar-demo-item">
                    <div class="lostInfo">{{ item.username }}</div>
                    <div class="lostInfo">{{ item.password }}</div>·
                    <div class="lostInfo">{{ item.nickname }}</div>
                    <div class="lostInfo">
                        <img :src="hanleImg(item.avatar)" />
                    </div>
                    <div class="lostInfo">

                        <el-button @click="handleDelete(item.username)" type="danger" circle>
                            <el-icon>
                                <Delete />
                            </el-icon>
                        </el-button>

                    </div>
                </li>
            </template>


            <el-empty v-if="false" description="description" />


        </el-scrollbar>

    </div>
</template>

<style lang="scss" scoped>
.usersManager {
    // flex: 1;
    width: 100%;
    background-color: skyblue;
}

.title {
    // 信息标题
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 550;
    background: var(--el-color-primary-light-9);
    color: var(--el-color-primary);
    padding: 10px;
    padding-bottom: 0;
    position: sticky; //设置粘性定位
    top: 0;

    div {
        flex: 1;
        text-align: center;
        border-bottom: 1px solid black;
        overflow: hidden;
        /* 隐藏溢出内容 */
        white-space: nowrap;
        /* 不换行，防止文本溢出 */
        text-overflow: ellipsis;
        /* 当文本溢出时显示省略号 */
    }

    div:not(:last-child) {
        border-right: 1px solid black;
    }
}

.scroll {
    // 滚动组件
    max-height: 750.4px;
    position: relative;

    .publish {
        position: absolute;
        bottom: 100px;
        right: 10px;
    }
}

.scrollbar-demo-item {
    // 后端获取数据并展示的栏位
    display: flex;
    align-items: center;
    justify-content: center;
    // height: 50px;
    padding: 10px;
    text-align: center;
    border-radius: 4px;
    border-bottom: 1px solid black;
    background: var(--el-color-primary-light-9);
    color: var(--el-color-primary);



    .lostInfo {
        flex: 1;
        height: 200px;
        display: flex;
        justify-content: center;
        align-items: center;

        // line-height: 200px;
        img {
            width: 90%;
            height: 100%;
        }
    }

    div:not(:last-child) {
        border-right: 1px solid black;
    }
}
</style>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            datalist: []
        }
    },
    methods: {
        handleDelete(username) {
            if (username == 1741174892) {
                alert('不可删除!!');
                return;
            }
            
            const userInfo = {
                'username': username
            }

            axios.post('http://localhost:3000/delUsersAccountInfo', userInfo).then(res => {
                alert(res.data.message)
            }).catch(err => {
                alert(err.response.data.error);
            })
        },
        hanleImg(url) {// 设置代理处理图片
            if (url === null) {// 用户未设置头像时采用默认头像
                url = 'usersAvatar\\0fc7d20532fdaf769a25683617711png.png';
                console.log(url);
            }
            const proxyUrl = `http://localhost:3000/image-proxy?url=${encodeURIComponent(url)}`;
            return proxyUrl;
        },
    },
    mounted() {
        axios.get('http://localhost:3000/usersAccountInfo').then(res => {
            this.datalist = res.data.data;
            console.log(this.datalist);
        }).catch(err => {
            alert(err.response.data.error);
        })
    },
}
</script>