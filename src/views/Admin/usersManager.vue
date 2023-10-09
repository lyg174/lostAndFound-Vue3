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

            <template v-for="(item, index) of datalist" :key="index">
                <li class="scrollbar-demo-item">
                    <div class="lostInfo">{{ item.username }}</div>
                    <div class="lostInfo">{{ item.password }}</div>·
                    <div class="lostInfo">{{ item.nickname }}</div>
                    <div class="lostInfo">
                        <img :src="hanleImg(item.avatar)" />
                    </div>
                    <div class="lostInfo">

                        <div>
                            <el-button v-if="item.username !== 'admin'" @click="handleWrite(item.username)" type="primary">
                                编辑
                            </el-button>

                            <el-button @click="handleDelete(item.username, index)" type="danger" circle>
                                <el-icon>
                                    <Delete />
                                </el-icon>
                            </el-button>

                            <br>

                            <el-tooltip v-if="item.username !== 'admin'" :content="'允许登录: ' + item.login_status"
                                placement="top">
                                <el-switch v-model="item.login_status"
                                    @click="changeLoginStatus(item.login_status, item.username)"
                                    style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                                    active-value="true" inactive-value="false">

                                </el-switch>
                            </el-tooltip>
                        </div>

                    </div>
                </li>
            </template>

            <!-- 对话框 -->
            <el-dialog v-model="centerDialogVisible" title="编辑用户资料" width="30%" align-center :center="true">

                <!-- element plus表单，用于提交用户修改数据 -->
                <el-form ref="ruleFormRef" label-position="right" label-width="100px" style="max-width: 460px">
                    <el-form-item label="昵称:">
                        <el-input v-model="usersInfo.nickname" />
                    </el-form-item>
                    <el-form-item label="真实姓名:">
                        <el-input v-model="usersInfo.realName" />
                    </el-form-item>
                    <el-form-item label="性别:">
                        <el-select v-model="usersInfo.gender" class="m-2" placeholder="Select" size="default">
                            <el-option v-for="item of options" :key="item.value" :value="item.value" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="电话号码:">
                        <el-input v-model.number="usersInfo.phoneNumber" />
                    </el-form-item>
                </el-form>

                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="centerDialogVisible = false">取消</el-button>
                        <el-button type="primary" @click="changeInfo">
                            确认
                        </el-button>
                    </span>
                </template>
            </el-dialog>

            <el-empty v-if="false" description="description" />


        </el-scrollbar>

    </div>
</template>

<style lang="scss" scoped>
.usersManager {
    flex: 1;
    // width: 100%;
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
            datalist: [],
            usersInfo: [],
            options: [
                {
                    value: '男'
                },
                {
                    value: '女'
                }
            ],
            value: '',
            centerDialogVisible: false
        }
    },
    methods: {
        handleDelete(username, index) {
            if (username === 'admin') {
                alert('不可删除!!');
                return;
            }

            const userInfo = {
                'username': username
            }

            axios.post('http://localhost:3000/delUsersAccountInfo', userInfo).then(res => {
                alert(res.data.message);
                this.datalist.splice(index, 1);//同步移除
            }).catch((err) => {
                alert(err.response.data.error);
            })
        },
        handleWrite(username) {// 编辑用户资料
            this.centerDialogVisible = true;

            axios.post('http://localhost:3000/usersInfo', { username }).then(res => { //获取个人信息
                if (res.data.data.length) this.usersInfo = res.data.data[0];
                console.log(this.usersInfo);
            }).catch((err) => {
                alert(err.response.data.error);
            })

        },
        changeInfo() {

            const userInfo = {
                    nickname: this.usersInfo.nickname,
                    realName: this.usersInfo.realName,
                    gender: this.usersInfo.gender,
                    phoneNumber: this.usersInfo.phoneNumber,
                    username: this.usersInfo.username
                }

            axios.post('http://localhost:3000/changeInfo', userInfo).then(res => { //更新信息
                alert(res.data.message)
            }).catch((err) => {
                alert(err.response.data.error);
            })

            this.centerDialogVisible = false;
        },
        changeLoginStatus(status, username) {// 控制登录权限
            const info = {
                login_status: status,
                username: username
            }

            axios.post('http://localhost:3000/changeUsersLoginStatus', info).then(res => {
                console.log(res.data.message);
            }).catch((err) => {
                alert(err.response.data.error);
            })
        },
        hanleImg(url) {// 设置代理处理图片
            if (url === null) {// 用户未设置头像时采用默认头像
                url = 'usersAvatar\\0fc7d20532fdaf769a25683617711png.png';
                // console.log(url);
            }
            const proxyUrl = `http://localhost:3000/image-proxy?url=${encodeURIComponent(url)}`;
            return proxyUrl;
        },
    },
    mounted() {
        axios.get('http://localhost:3000/usersAccountInfo').then(res => {

            let username = res.data.data[0];
            let length = res.data.data.length;
            res.data.data[0] = res.data.data[length - 1];
            res.data.data[length - 1] = username;

            this.datalist = res.data.data;
            console.log(this.datalist);
        }).catch(err => {
            alert(err.response.data.error);
        })
    },
}
</script>