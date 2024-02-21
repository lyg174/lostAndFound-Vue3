<template>
  <el-upload :data="userData" ref="uploadRef" :action="api" :auto-upload="false"
    :on-success="handleImageSuccess">

    <template #trigger>
      <el-button>选择文件</el-button>
    </template>


    <template #tip>
      <div>jpg/png 文件</div>
    </template>

  </el-upload>
</template>

<script>
import { ElMessage } from 'element-plus'


export default {
  inject: ['api'],// 接受父组件传来的api接口
  data() {
    return {
      uploadRef: 'null',
      userData: {}
    }
  },

  mounted() {
    this.uploadRef = this.$refs.uploadRef;//获取组件实例
  },

  methods: {
    submitUpload() {//上传文件
      this.uploadRef.submit();
    },
    handleImageSuccess(res) {
      ElMessage.success(res.message)
    }
  }

}  
</script>