<template>
    <div class="found">
        <el-scrollbar class="scroll">
            <li class="title">
                <div>招领物图片</div>
                <div>招领物名称</div>
                <div>拾取时间</div>
                <div>招领物发布时间</div>
                <div>我的联系方式</div>
                <div>删除</div>
            </li>


            <template v-for="(item, index) of dataList" :key="index">
                <li class="scrollbar-demo-item">
                    <div class="lostInfo">
                        <img :src="hanleImg(item.foundImageUrl)">
                    </div>
                    <div class="lostInfo">{{ item.foundDescribe }}</div>
                    <div class="lostInfo">{{ item.foundTime }}</div>
                    <div class="lostInfo">{{ item.foundPublishTime }}</div>
                    <div class="lostInfo">{{ item.foundersContact }}</div>
                    <div class="lostInfo">

                        <el-button @click="handleDelete(item.foundImageUrl, index)" type="danger" circle>
                            <el-icon>
                                <Delete />
                            </el-icon>
                        </el-button>

                    </div>
                </li>
            </template>

            <el-empty v-if="!dataList.length" description="description" />


            <!-- 发布信息按钮 -->
            <el-button class="publish" type="primary" circle @click="centerDialogVisible = true">
                <el-icon>
                    <Promotion />
                </el-icon>
            </el-button>

        </el-scrollbar>

        <!-- 招领物信息编辑对话框 -->
        <el-dialog v-model="centerDialogVisible" title="编辑招领信息" width="30%" align-center center>

            <el-form ref="ruleFormRef" label-position="right" label-width="100px" style="max-width: 460px">
                <el-form-item label="招领物图片:">
                    <uploadImage ref="upload"></uploadImage>
                </el-form-item>
                <el-form-item label="招领物描述:">
                    <el-input v-model="publishInfo.foundDescribe" />
                </el-form-item>
                <el-form-item label="拾取时间:">
                    <div class="block">
                        <el-date-picker v-model="publishInfo.foundTime" type="date" placeholder="Pick a day"
                            size="default" />
                    </div>
                </el-form-item>
                <el-form-item label="发布时间:">
                    <div class="block">
                        <el-date-picker v-model="publishInfo.foundPublishTime" type="date" placeholder="Pick a day"
                            size="default" />
                    </div>
                </el-form-item>
                <el-form-item label="我的联系方式:">
                    <el-input v-model.number="publishInfo.myContact" />
                </el-form-item>
            </el-form>

            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="centerDialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="handlePublish">
                        发布
                    </el-button>
                </span>
            </template>
        </el-dialog>

    </div>
</template>

<style lang="scss" scoped>
.found {
    width: 100%;
    background-color: white;
    // background-image: url('../image/bg.jpg');
    // background-size: cover;
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
import axios from 'axios';
import uploadImage from '../components/uploadImage.vue'

export default {
    provide() {
        return {
            api: 'http://localhost:3000/userPublishFound'// 提供给子组件的api接口
        }
    },
    components: {
        uploadImage
    },
    data() {
        return {
            dataList: [],
            centerDialogVisible: false,
            publishInfo: {
                foundDescribe: '',
                foundTime: '',
                foundPublishTime: '',
                myContact: ''
            }
        }
    },
    methods: {
        handleDelete(url, index) {// 删除发布信息
            const imgUrl = {'url': url};//后端可根据url删除特定信息
            axios.post('http://localhost:3000/userDeletePublishFoundInfo', imgUrl).then(res => {
                alert(res.data.message);
                this.dataList.splice(index, 1);//同步移除
            }).catch((err) => {
                alert(err.response.data.error);
            })
        },
        hanleImg(url) {// 设置代理处理图片
            const proxyUrl = `http://localhost:3000/image-proxy?url=${encodeURIComponent(url)}`;
            return proxyUrl;
        },
        handlePublish() {// 处理上传的信息，并交给子组件发送

            setTimeout(() => {
                this.centerDialogVisible = false;
            }, 1000);

            this.publishInfo.foundTime = this.publishInfo.foundTime.toLocaleDateString('en-CA');// 传化成普通日期字符串格式，例如：2020-05-25
            this.publishInfo.foundPublishTime = this.publishInfo.foundPublishTime.toLocaleDateString('en-CA');

            const publishInfo = this.publishInfo;
            publishInfo.username = sessionStorage.getItem('username')//获取用户名

            this.$refs.upload.userData = publishInfo;//将处理后的信息提交给子组件

            this.$refs.upload.submitUpload();//触发子组件发送方法
        }
    },
    mounted() {
        const username = sessionStorage.getItem('username');
        axios.post('http://localhost:3000/userFoundList', { username }).then(res => {
            this.dataList = res.data.data;
            console.log(res.data.data);
        })
    },
}
</script>

