<template>
    <div class="feedback">
        <el-scrollbar class="scroll">
            <li class="title">
                <div>失物名称</div>
                <div>失物描述</div>
                <div>丢失时间</div>
                <div>失物发布时间</div>
                <div>我的联系方式</div>
                <div>删除</div>
            </li>

        </el-scrollbar>
    </div>
</template>

<style lang="scss">
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
</style>