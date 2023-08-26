<script>
import axios from 'axios';
import { ref } from 'vue';

export default {
    setup() {
        const publishInfo = ref({
            foundImageUrl: '',
            foundDescribe: '',
            foundTime: '',
            foundPublishTime: '',
            myContact: '',
            imageFile: null // 用来存放用户选择的图片文件
        });

        const handleImageChange = (event) => {
            publishInfo.value.imageFile = event.target.files[0];
        };

        const handlePublish = () => {
            const formData = new FormData();
            formData.append('foundImageUrl', publishInfo.value.imageFile);
            formData.append('foundDescribe', publishInfo.value.foundDescribe);
            formData.append('foundTime', publishInfo.value.foundTime);
            formData.append('foundPublishTime', publishInfo.value.foundPublishTime);
            formData.append('myContact', publishInfo.value.myContact);

            axios.post('http://localhost:3000/userFoundList', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res => {
                // 处理响应
            });
        };

        return {
            publishInfo,
            handleImageChange,
            handlePublish
        };
    }
};
</script>