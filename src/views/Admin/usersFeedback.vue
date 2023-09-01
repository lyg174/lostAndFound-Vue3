<template>
    <div class="feedback">
        <el-scrollbar class="scroll">
            <li class="title">
                <div>反馈时间</div>
                <div>用户名</div>
                <div>姓名</div>
                <div>性别</div>
                <div>年龄</div>
                <div>联系电话</div>
                <div>电子邮箱</div>
                <div>建议</div>
                <div>删除</div>
            </li>

            <template v-for="(item, index) of datalist" :key="index">
                <li class="scrollbar-demo-item">
                    <div class="lostInfo">{{ item.feedTime }}</div>
                    <div class="lostInfo">{{ item.username }}</div>
                    <div class="lostInfo">{{ item.name }}</div>
                    <div class="lostInfo">{{ item.gender }}</div>
                    <div class="lostInfo">{{ item.age }}</div>
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

        </el-scrollbar>

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
        handleDelete(suggestion, index) {
            axios.post('http://localhost:3000/userDeleteFeedbackInfo', { suggestion }).then(res => {
                alert(res.data.message);
                this.datalist.splice(index, 1);//同步移除
            }).catch((err) => {
                alert(err.response.data.error);
            })

        }
    },
    mounted() {
        axios.get('http://localhost:3000/users_feedback').then(res => {
            this.datalist = res.data.data;
            console.log(this.datalist);
        }).catch((err) => {
            alert(err.response.data.error);
        })
    }
}
</script>