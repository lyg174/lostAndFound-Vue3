<template>
    <div class="list">
        <div class="navbar">

            <el-menu default-active="1" class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff"
                active-text-color="#ffd04b" :ellipsis="false">
                <el-menu-item index="1" @click="changeRouter('/publishinfo/lostinfo')">失物列表</el-menu-item>
                <el-menu-item index="2" @click="changeRouter('/publishinfo/foundinfo')">招领列表</el-menu-item>

                <el-menu-item>
                    <el-input index="3" class="search" v-model="text" placeholder="请输入物品名称" maxlength="10" show-word-limit
                        clearable>
                        <template #append>
                            <el-button type="primary" @click.stop="handleSearch">搜索</el-button>
                        </template>
                    </el-input>
                </el-menu-item>

                <el-menu-item>
                    <el-button type="info" @click="sendMsgDialog = true" style="background-color: #4d5154; border: none;">
                        <el-icon style="margin: 0;">
                            <Message />
                        </el-icon>
                    </el-button>
                </el-menu-item>

                <el-menu-item index="4" class="avatar">
                    <!-- 气泡确认框 -->
                    <el-popconfirm width="150px" @confirm="centerDialogVisible = true" title="更改头像？"
                        confirm-button-text="更换" cancel-button-text="取消" icon-color="#626AEF">
                        <template #reference>
                            <el-button class="avatar_btn">
                                <el-avatar @error="errorHandler">
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

        <el-dialog v-model="sendMsgDialog" title="发布通知" width="30%" align-center center>

            <el-input v-model="msg" :rows="2" type="textarea" placeholder="Please input" />

            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="sendMsgDialog = false">取消</el-button>
                    <el-button type="primary" @click="sendMsg">
                        发布
                    </el-button>
                </span>
            </template>

        </el-dialog>

        <router-view @handleArray="copyArray" :dataListCopy="this.dataListCopy"></router-view>
    </div>
</template>

<style scoped lang="scss">
.list {
    // 父元素为App.vue的app
    flex: 1;
    display: flex; //设置弹性布局，方便lostList.vue的对应元素填充剩余部分
    flex-direction: column;
}


.avatar.is-active,
.search.is-active {
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
import axios from 'axios'
import uploadAvatar from '../../components/uploadAvatar.vue'


import { ElMessage } from 'element-plus'

export default {
    components: {
        uploadAvatar,
    },
    mounted() {
        axios.get('http://localhost:3000/getInfo').then(res => {
            this.msg = res.data.message.information;
        }).catch((err) => {
            ElMessage.error(err.response.data.error);
        })
    },
    data() {
        return {
            centerDialogVisible: false,
            sendMsgDialog: false,
            text: '',
            msg: '',
            dataList: [],// 用于接受子组件数据
            dataListCopy: []// 提供搜索后的数据
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
        handleSearch() {// 搜索方法
            console.log(this.text);
            if (this.text !== '') {
                this.dataListCopy = this.dataList.filter(item => {
                    if (item.lostName) return item.lostName.includes(this.text);// 处理失物数据
                    if (item.foundName) return item.foundName.includes(this.text);// 处理招领物数据
                });
            } else {// 内容为空时
                this.dataListCopy = this.dataList;
                console.log(this.dataListCopy);
            }
        },
        copyArray(list) {// 接受子组件传来的数据
            this.dataList = list;
            this.dataListCopy = this.dataList.slice();// 复制
        },
        sendMsg() {
            const msg = this.msg;

            axios.post('http://localhost:3000/sendMsg', { msg }).then(res => {
                ElMessage.success(res.data.message);
                this.sendMsgDialog = false;
            }).catch((err) => {
                ElMessage.error(err.response.data.error);
            })
        },

        hanleImg() {// 设置代理处理图片
            const url = sessionStorage.getItem('avatar').replace('node\\', '');
            const proxyUrl = `http://localhost:3000/image-proxy?url=${encodeURIComponent(url)}`;
            sessionStorage.setItem('avatar_copy', proxyUrl)
            return proxyUrl;
        }
    },
}
</script>