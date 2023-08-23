<template>
    <el-upload class="avatar-uploader" action="http://localhost:3000/usersAvatar" :show-file-list="false"
        :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <el-icon v-else class="avatar-uploader-icon">
            <Plus />
        </el-icon>
    </el-upload>
</template>
  
<script>
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

export default {
    data() {
        return {
            imageUrl: '',
        }
    },

    methods: {
        handleAvatarSuccess(response, uploadFile) {
            alert('上传成功！');
            this.$emit('hanleSubmit');
            this.imageUrl = URL.createObjectURL(uploadFile.raw)
        },

        beforeAvatarUpload(rawFile) {
            if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
                ElMessage.error('头像必须是jpg或png格式')
                return false
            }
            else if (rawFile.size / 1024 / 1024 > 100) {
                ElMessage.error('头像文件大小不得超过100MB!')
                return false
            }
            return true
        }
    }
}
</script>
  
<style scoped>
.avatar-uploader {
    /* 使上传框居中 */
    display: flex;
    justify-content: center;
}

.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
  
<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>
  