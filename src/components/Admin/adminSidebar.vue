<template>
    <div class="container">

        <!-- 使用element plus构建功能跳转框 -->
        <el-col :span="24"> <!-- width: 100% -->
            <el-menu default-active="5" class="el-menu-vertical-demo" background-color="#c6b0a7" active-text-color="#fff">
                <el-menu-item index="5" @click="handleRouter('/home')">
                    <el-icon><House /></el-icon>
                    <span>首页</span>
                </el-menu-item>

                <el-menu-item index="0" @click="handleRouter('/publishinfo/lostinfo')">
                    <el-icon><House /></el-icon>
                    <span>发布信息管理</span>
                </el-menu-item>

                <el-menu-item index="1" @click="handleRouter('/usersmanager')">
                    <el-icon><User /></el-icon>
                    <span>用户管理</span>
                </el-menu-item>

                <el-menu-item index="2" @click="handleRouter('/usersfeedback')">
                    <el-icon><Message /></el-icon>
                    <span>用户反馈</span>
                </el-menu-item>

                <el-menu-item index="3" @click="handleRouter('/lostAndFoundSum')">
                    <el-icon><Message /></el-icon>
                    <span>数据统计</span>
                </el-menu-item>

                <el-menu-item @click="dialogVisible = true">
                    <span>退出登录</span>
                    <el-icon>
                        <SwitchButton class="exitImg" />
                    </el-icon>
                </el-menu-item>
            </el-menu>
        </el-col>

        <!-- 消息弹出框 -->
        <el-dialog v-model="dialogVisible" title="Tips" width="30%" center align-center>
            <span>是否确认退出登录？</span>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="exitLogin" dialogVisible>
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<style lang="scss" scoped>
.container {
    width: 14%;
    height: 100vh;
    background-color: #c6b0a7;
}

.el-menu {
    border: none;
}

li.el-menu-item {


    span {
        overflow: hidden;
        /* 隐藏溢出内容 */
        white-space: nowrap;
        /* 不换行，防止文本溢出 */
        text-overflow: ellipsis;
        /* 当文本溢出时显示省略号 */
    }
}

li.el-menu-item:last-child {
    justify-content: center; //文字居中
    margin-top: 300px;
}
</style>

<script>

export default {
    props: ['usernameId'],
    data() {
        return {
            drawer: false,
            direction: 'ltr',
            dialogVisible: false,// 控制对话框是否可见
        };
    },
    methods: {
        exitLogin() {// 退出登录,并触发父组件App的@loggedIn实现隐藏Sidebar组件
            sessionStorage.setItem('loginStatus', 'false')
            sessionStorage.setItem('username', '')
            this.$emit('adminLoggedIn')
            this.$router.push('/login') // 退出后跳转到登录界面
            this.dialogVisible = false
        },
        handleRouter(value) {
            if (value === '/publishinfo/lostinfo') {// 该地址不用获取用户id
                this.$router.push('/publishinfo/lostinfo')
                return;
            };
            this.$router.push({
                path: value,
                query: {
                    username: this.usernameId //后期可以根据id获取对应的用户信息
                }
            })
        }
    },
}
</script>