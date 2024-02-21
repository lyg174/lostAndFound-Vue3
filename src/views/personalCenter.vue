<template>
    <div class="center">
        <div class="content">
            <el-avatar class="avatar">
                <img :src="avatar">
            </el-avatar>

            <div class="info">
                <ul>
                    <li>
                        <span>昵称:</span>
                        <div>{{ datalist[0].nickname }}</div>
                    </li>
                    <li>
                        <span>真实姓名:</span>
                        <div>{{ datalist[0].realName }}</div>
                    </li>
                    <li>
                        <span>性别:</span>
                        <div>{{ datalist[0].gender }}</div>
                    </li>
                    <li>
                        <span>电话号码:</span>
                        <div>{{ datalist[0].phoneNumber }}</div>
                    </li>

                    <li>
                        <el-button type="primary" @click="centerDialogVisible = true">
                            <el-icon>
                                <Edit />
                            </el-icon>
                            编辑资料
                        </el-button>
                    </li>
                </ul>
            </div>
        </div>

        <!-- 对话框 -->
        <el-dialog v-model="centerDialogVisible" title="资料修改" width="30%" align-center :center="true">

            <!-- element plus表单，用于提交用户修改数据 -->
            <el-form ref="ruleFormRef" label-position="right" label-width="100px" style="max-width: 460px">
                <el-form-item label="昵称:">
                    <el-input v-model="nickname" />
                </el-form-item>
                <el-form-item label="真实姓名:">
                    <el-input v-model="realName" />
                </el-form-item>
                <el-form-item label="性别:">
                    <el-select v-model="value" class="m-2" placeholder="Select" size="default">
                        <el-option v-for="item of options" :key="item.value" :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="电话号码:">
                    <el-input v-model.number="phoneNumber" />
                </el-form-item>
            </el-form>

            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="centerDialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="changeInfo" centerDialogVisible>
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<style lang="scss">
.center {
    // width: 100%;
    flex: 1;
    background-image: url('../image/bg.jpg');
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;


    .content {
        width: 70%;
        height: 90%;
        background-color: rgb(242, 235, 235, 0.7);
        display: flex;
        justify-content: start;
        align-items: center;
        flex-direction: column;
        box-shadow: 6px 4px 6px rgba(0, 0, 0, 0.1), 0px 2px 4px rgba(0, 0, 0, 0.1);
        /* 添加阴影效果 */

        .avatar {
            width: 200px;
            height: 200px;

            img {
                border-radius: 50;
                width: 100%;
                height: 100%;
            }
        }

        .info {
            width: 100%;
            flex: 1;
            // background-color: white;
            display: flex;
            justify-content: center;

            ul {
                width: 80%;

                li {
                    display: flex;
                    font-size: 20px;
                    padding: 20px;
                    border-bottom: 1px solid black;

                    div {
                        width: 50%;
                        margin-left: auto;
                    }
                }

                li:last-child {
                    border-bottom: none;
                    justify-content: center;
                }
            }
        }
    }
}
</style>

<script>
import axios from 'axios';
import { ElMessage } from 'element-plus'



export default {
    data() {
        return {
            datalist: [
                {
                    nickname: '',
                    realName: '',
                    phoneNumber: '',
                    gender: ''
                }
            ],
            centerDialogVisible: false,
            nickname: '',
            realName: '',
            phoneNumber: '',
            value: '',
            options: [
                {
                    value: '男'
                },
                {
                    value: '女'
                }
            ]
        }
    },
    computed: {
        avatar() {
            return sessionStorage.getItem('avatar_copy') //获取用户头像路径
        }
    },
    methods: {
        changeInfo() {


            const username = sessionStorage.getItem('username'); //后端查询依据

            if (!this.nickname || !this.realName || !this.phoneNumber || !this.value) {
                ElMessage.error('请填写完整信息！')
                return
            } else {
                const userInfo = {
                    nickname: this.nickname,
                    realName: this.realName,
                    gender: this.value,
                    phoneNumber: this.phoneNumber,
                    username: username
                }

                console.log(userInfo);

                axios.post('http://localhost:3000/changeInfo', userInfo).then(res => { //更新信息
                    ElMessage.success(res.data.message)
                }).catch((err) => {
                    ElMessage.error(err.response.data.error);
                })

                this.centerDialogVisible = false;
            }


        }
    },
    mounted() {
        let id = sessionStorage.getItem('username')

        axios.post('http://localhost:3000/usersInfo', { username: id }).then(res => { //获取个人信息
            if (res.data.data.length) this.datalist = res.data.data;
            console.log(this.datalist);
        }).catch((err) => {
            ElMessage.error(err.response.data.error);
        })
    },
}
</script>