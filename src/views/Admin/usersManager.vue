<template>
    <div class="usersManager">

        <el-card class="box-card01">

            <template #header>
                <div class="card-header">
                    <h3>添加用户</h3>
                </div>
            </template>

            <el-form ref="ruleFormRef" label-position="right" label-width="100px" style="max-width: 460px">
                <el-form-item label="用户名:">
                    <el-input v-model="userRegisterInfo.username" />
                </el-form-item>
                <el-form-item label="密码:">
                    <el-input v-model="userRegisterInfo.password" />
                </el-form-item>
                <el-form-item label="昵称:">
                    <el-input v-model="userRegisterInfo.nickname" />
                </el-form-item>
                <el-form-item label="真实姓名:">
                    <el-input v-model="userRegisterInfo.realName" />
                </el-form-item>
                <el-form-item label="性别:">
                    <el-select v-model="userRegisterInfo.gender" class="m-2" placeholder="Select" size="default">
                        <el-option v-for="item of options" :key="item.value" :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="电话号码:">
                    <el-input v-model.number="userRegisterInfo.phoneNumber" />
                </el-form-item>
            </el-form>

            <el-button type="primary" @click="addUser">
                添加
            </el-button>

        </el-card>

        <el-card class="box-card02">

            <template #header>
                <div class="card-header">
                    <h3>用户列表</h3>
                </div>
            </template>

            <el-table :data="datalist" style="width: 100%" table-layout="fixed" max-height="550">
                <el-table-column prop="avatar" label="用户头像" align="center">
                    <template #default="scope">
                        <el-avatar :size="50" :src="hanleImg(scope.row.avatar)" />
                    </template>
                </el-table-column>
                <el-table-column prop="username" label="用户名" align="center" />
                <el-table-column prop="nickname" label="昵称" align="center" />
                <el-table-column prop="address" label="操作" align="center">

                    <template #default="scope">

                        <el-button v-if="scope.row.username !== 'admin'" @click="handleWrite(scope.row.username)"
                            type="primary">
                            编辑
                        </el-button>

                        <el-button @click="handleDelete(scope.row.username, scope.$index)" type="danger" circle>
                            <el-icon>
                                <Delete />
                            </el-icon>
                        </el-button>

                        <el-tooltip v-if="scope.row.username !== 'admin'" :content="'允许登录: ' + scope.row.login_status"
                            placement="top">
                            <el-switch v-model="scope.row.login_status"
                                @click="changeLoginStatus(scope.row.login_status, scope.row.username)"
                                style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" active-value="true"
                                inactive-value="false">

                            </el-switch>
                        </el-tooltip>

                    </template>

                </el-table-column>
            </el-table>

        </el-card>

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
    </div>
</template>

<style lang="scss" scoped>
.usersManager {
    flex: 1;
    // width: 100%;
    // height: 100%;
    background-color: #545c64;
    display: flex;

    .box-card01,
    .box-card02 {
        margin: 30px auto;
        width: 60%;
        height: 90%;
        text-align: center;
    }

    .box-card01 {
        width: 35%;
    }
}
</style>

<script>
import axios from 'axios'

import { ElMessage } from 'element-plus'


export default {
    data() {
        return {
            datalist: [],
            usersInfo: [],
            userRegisterInfo: {
                username: '',
                password: '',
                nickname: '',
                realName: '',
                gender: '',
                phoneNumber: '',
            },
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
                ElMessage.error('不可删除!!');
                return;
            }

            const userInfo = {
                'username': username
            }

            axios.post('http://localhost:3000/delUsersAccountInfo', userInfo).then(res => {
                ElMessage.success(res.data.message);
                this.datalist.splice(index, 1);//同步移除
            }).catch((err) => {
                ElMessage.error(err.response.data.error);
            })
        },
        handleWrite(username) {// 编辑用户资料
            this.centerDialogVisible = true;

            axios.post('http://localhost:3000/usersInfo', { username }).then(res => { //获取个人信息
                if (res.data.data.length) this.usersInfo = res.data.data[0];
                console.log(this.usersInfo);
            }).catch((err) => {
                ElMessage.error(err.response.data.error);
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
                ElMessage.success(res.data.message)
            }).catch((err) => {
                ElMessage.error(err.response.data.error);
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
                ElMessage.error(err.response.data.error);
            })
        },
        async addUser() {
            const res = await axios.post('http://localhost:3000/register', { username: this.userRegisterInfo.username, password: this.userRegisterInfo.password });
            if (res.data.message === '注册成功') {
                axios.post('http://localhost:3000/changeInfo', {
                    nickname: this.userRegisterInfo.nickname,
                    realName: this.userRegisterInfo.realName,
                    phoneNumber: this.userRegisterInfo.phoneNumber,
                    gender: this.userRegisterInfo.gender,
                    username: this.userRegisterInfo.username
                }).then(res => { //更新信息
                    ElMessage.success('添加成功')
                }).catch((err) => {
                    ElMessage.error(err.response.data.error);
                })
            }
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

            res.data.data.forEach((item, index) => {
                if (item.username === 'admin') {
                    const first = res.data.data[0];
                    res.data.data[0] = res.data.data[index];
                    res.data.data[index] = first;
                }
            });

            this.datalist = res.data.data;
            console.log(this.datalist);
        }).catch(err => {
            ElMessage.error(err.response.data.error);
        })
    },
}
</script>