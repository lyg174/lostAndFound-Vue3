<template>
    <div class="list">
        <div class="navbar">

            <el-menu default-active="1" class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff"
                active-text-color="#ffd04b" :ellipsis="false">
                <el-menu-item index="1" @click="changeRouter('/list/lostlist')">失物列表</el-menu-item>
                <el-menu-item index="2" @click="changeRouter('/list/foundlist')">招领列表</el-menu-item>

                <el-menu-item index="3" class="avatar">
                    <!-- 气泡确认框 -->
                    <el-popconfirm width="150px" @confirm="centerDialogVisible = true" title="更改头像？"
                        confirm-button-text="更换" cancel-button-text="取消" icon-color="#626AEF">
                        <template #reference>
                            <el-button class="avatar_btn">
                                <el-avatar>
                                    <img :src="hanleImg()">
                                </el-avatar>
                            </el-button>
                        </template>
                    </el-popconfirm>

                    <span>{{ nickname }}</span>
                </el-menu-item>

            </el-menu>
        </div>

        <el-dialog v-model="centerDialogVisible" title="上传新头像" width="30%" align-center center>
            <!-- 头像上传组件 -->
            <uploadAvatar @hanleSubmit="hanleDialog"></uploadAvatar>

        </el-dialog>

        <router-view></router-view>
    </div>
</template>

<style scoped lang="scss">
.list {
    // 父元素为App.vue的app
    flex: 1;
    display: flex; //设置弹性布局，方便lostList.vue的对应元素填充剩余部分
    flex-direction: column;
}


.avatar.is-active {
    border-bottom: none;

    span {
        color: #fff;
    }
}

.avatar_btn {
    background-color: transparent;
    border: none;
}

.navbar {
    width: 100%;
    background-color: rgb(94, 75, 75);

    .el-menu {
        height: 70px;

        .el-menu-item {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 15px;
            font-weight: 500;
            padding: 0 30px;
        }

        .el-menu-item:last-child {
            margin-left: auto; //移到最右边
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            font-size: 10px;
            line-height: 10px;
            padding: 5px 0;

            span.el-avatar {
                width: 30px;
                height: 30px;
            }
        }
    }
}

a {
    text-decoration: none;
    color: black;
}
</style>

<script>
import uploadAvatar from '../components/uploadAvatar.vue'

export default {
    components: {
        uploadAvatar
    },
    data() {
        return {
            centerDialogVisible: false,
        }
    },
    computed: {
        nickname() {
            return sessionStorage.getItem('nickname')
        }
    },
    methods: {
        changeRouter(url) {
            this.$router.push(url)
        },
        errorHandler() {
            return true
        },
        hanleDialog() {//延时退出对话框
            setTimeout(() => {
                this.centerDialogVisible = false;
            }, 1000);
        },

        hanleImg() {// 设置代理处理图片
            const url = sessionStorage.getItem('avatar').replace('node\\', '');
            const proxyUrl = `http://localhost:3000/image-proxy?url=${encodeURIComponent(url)}`;
            sessionStorage.setItem('avatar_copy', proxyUrl)
            return proxyUrl;
        }
    }
}
</script>