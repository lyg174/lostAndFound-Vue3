<template>
    <div class="list">
        <div class="navbar">

            <el-menu default-active="1" class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff"
                active-text-color="#ffd04b" :ellipsis="false">
                <el-menu-item index="1" @click="changeRouter('/list/lostlist')">失物列表</el-menu-item>
                <el-menu-item index="2" @click="changeRouter('/list/foundlist')">招领列表</el-menu-item>

                <el-menu-item>
                    <el-avatar>
                        <img src="../image/巴丝特.jpg">
                    </el-avatar>
                    <span>唯一</span>
                </el-menu-item>

            </el-menu>
        </div>
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
export default {
    methods: {
        changeRouter(url) {
            this.$router.push(url)
        },
        errorHandler() {
            return true
        }
    },
}
</script>