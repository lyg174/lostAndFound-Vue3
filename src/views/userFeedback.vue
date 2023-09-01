<template>
    <div class="feedback">
        <el-scrollbar class="scroll">
            <li class="title">
                <div>反馈时间</div>
                <div>联系电话</div>
                <div>电子邮箱</div>
                <div>建议</div>
                <div>删除</div>
            </li>

            <template v-for="(item, index) of datalist" :key="index">
                <li class="scrollbar-demo-item">
                    <div class="lostInfo">{{ item.feedTime }}</div>
                    <div class="lostInfo">{{ item.phoneNumber }}</div>·
                    <div class="lostInfo">{{ item.email }}</div>
                    <div class="lostInfo">{{ item.suggestion }}</div>
                    <div class="lostInfo">

                        <el-button @click="handleDelete(item.suggestion, index)" type="danger" circle>
                            <el-icon>
                                <Delete />
                            </el-icon>
                        </el-button>

                    </div>
                </li>
            </template>

            <el-empty v-if="!datalist.length" description="description" />


            <!-- 发布信息按钮 -->
            <el-button class="publish" type="primary" circle @click="centerDialogVisible = true">
                <el-icon>
                    <Promotion />
                </el-icon>
            </el-button>
        </el-scrollbar>


        <!-- 建议反馈对话框 -->
        <el-dialog v-model="centerDialogVisible" title="建议反馈" width="30%" align-center center>

            <el-form ref="ruleFormRef" label-position="right" label-width="100px" style="max-width: 460px">
                <el-form-item label="姓名:">
                    <el-input v-model="userFeedback.name" />
                </el-form-item>
                <el-form-item label="性别:">
                    <el-select v-model="userFeedback.gender" class="m-2" placeholder="Select" size="default">
                        <el-option v-for="item of options" :key="item.value" :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="年龄:">
                    <el-input v-model="userFeedback.age" />
                </el-form-item>
                <el-form-item label="联系电话:">
                    <el-input v-model="userFeedback.phoneNumber" />
                </el-form-item>
                <el-form-item label="电子邮箱:">
                    <el-input v-model="userFeedback.email" />
                </el-form-item>
                <el-form-item label="反馈建议:">
                    <el-input v-model="userFeedback.suggestion" autosize type="textarea" />
                </el-form-item>
            </el-form>

            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="centerDialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="handleFeedback">
                        发送
                    </el-button>
                </span>
            </template>

        </el-dialog>
    </div>
</template>

<style lang="scss" scoped>
.feedback {
    flex: 1;
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

        text-overflow: ellipsis;
        /* 当文本溢出时显示省略号 */
        overflow: auto;
        /* 隐藏溢出内容 */

        // line-height: 200px;
    }

    div:not(:last-child) {
        border-right: 1px solid black;
    }
}
</style>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            centerDialogVisible: false,
            datalist: [],
            options: [
                {
                    value: '男'
                },
                {
                    value: '女'
                }
            ],
            userFeedback: {
                name: '',
                gender: '',
                age: '',
                phoneNumber: '',
                email: '',
                suggestion: ''
            }
        }
    },
    methods: {
        handleFeedback() {
            setTimeout(() => {
                this.centerDialogVisible = false;
            }, 1000);

            const userFeedbackInfo = this.userFeedback;

            const currentDate = new Date();//获取当前反馈发布时间
            const feedTime = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;// 格式化日期展示

            userFeedbackInfo.username = sessionStorage.getItem('username');
            userFeedbackInfo.feedTime = feedTime;

            axios.post('http://localhost:3000/userPublishFeedbackInfo', userFeedbackInfo).then(res => {
                alert(res.data.message);
            }).catch((err) => {
                alert(err.response.data.error);
            })


        },
        handleDelete(suggestion, index) {
            axios.post('http://localhost:3000/userDeleteFeedbackInfo', { suggestion }).then(res => {
                alert(res.data.message);
                this.datalist.splice(index, 1);//同步移除
            }).catch((err) => {
                alert(err.response.data.error);
                console.log(err.response.data.error);
            })

        }
    },
    mounted() {
        const username = sessionStorage.getItem('username');
        axios.post('http://localhost:3000/userFeedbackInfo', { username }).then(res => {
            this.datalist = res.data.data;
        }).catch((err) => {
            alert(err.response.data.error);
        })
    }
}
</script>