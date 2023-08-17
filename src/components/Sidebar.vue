<template>
    <div class="container">
        <ul>
            <li>
                <router-link to="/list/lostlist">失物招领列表</router-link>
            </li>
            <li>
                <router-link to="/center">个人中心</router-link>
            </li>
            <li>
                <router-link to="/feedback">用户反馈</router-link>
            </li>
            <li>
                <router-link to="/lost">失物招领</router-link>
            </li>
            <li>
                <router-link to="/found">失物发布</router-link>
            </li>
            <li @click="dialogVisible = true">
                退出登录
                <el-icon>
                    <SwitchButton class="exitImg" />
                </el-icon>
            </li>
        </ul>

        <!-- 消息弹出框 -->
        <el-dialog v-model="dialogVisible" title="Tips" width="30%" center align-center>
            <span>是否确认退出登录？</span>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="exitLogin">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<style lang="scss" scoped>
.container {
    width: 15vw;
    height: 100vh;
    background-color: rgb(7, 77, 124);

    ul {
        height: 100%;
        display: flex;
        flex-direction: column;

        li {
            height: 35px;
            border-bottom: 1px solid black;
            border-left: none;
            border-right: none;
            margin: 1px 0;
            padding: 1px 0;
            text-align: center;
            line-height: 35px;

            a {
                text-decoration: none;
                color: black;
            }

            .exitImg {
                position: relative;
                top: 2px;
            }
        }

        li:hover {
            cursor: pointer;
        }

        li:last-child {
            margin-top: 400px;
            border: none;
        }
    }
}

// .router-link-active {
//     background-color: rgb(240, 231, 231, 0.3);
// }
</style>

<script>

export default {
    data() {
        return {
            drawer: false,
            direction: 'ltr',
            dialogVisible: false,// 控制对话框是否可见
        };
    },
    methods: {
        exitLogin() {

            this.$emit('changeView', true)//退出登录
        },
    },
}
</script>