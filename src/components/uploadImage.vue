<template>
  <el-upload :data="userData" ref="uploadRef" action="http://localhost:3000/userPublishFound" :auto-upload="false"
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
export default {

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
      alert(res.message)
    }
  }

}  
</script>