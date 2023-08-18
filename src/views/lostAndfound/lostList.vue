<template>
    <div class="lostList">
        <ul>
            <li>
                <div>失物图片</div>
                <div>失物描述</div>
                <div>丢失时间</div>
                <div>失物发布时间</div>
                <div>查看详情</div>
                <div>招领</div>
            </li>

            <!-- 以下数据通过请求后端获取 -->
            <li v-for="item of dataList" :key="item">
                <div class="lostInfo">{{item.a}}</div>
                <div class="lostInfo">{{item.b}}</div>
                <div class="lostInfo">{{item.c}}</div>
                <div class="lostInfo">{{item.d}}</div>
                <div class="lostInfo">{{item.e}}</div>
                <div class="lostInfo">
                    <el-button>招领</el-button>
                </div>
            </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
.lostList {
    flex: 1; //填充剩余部分

    ul {
        li {
            display: flex;
            justify-content: space-between;

            div {
                height: 20px;
                border-bottom: 1px solid black;
                flex: 1;
                text-align: center;
                line-height: 20px;
                font-weight: 550;
            }

            div:not(:last-child) {
                border-right: 1px solid black;
            }

            .lostInfo {
                height: 200px;
                line-height: 200px;
            }
        }
    }
}</style>

<script>
export default {
    data() {
        return {
            dataList: [
                {
                    a: 1,
                    b: 2,
                    c: 3,
                    d: 4,
                    e: 5
                }
            ]
        }
    },
}
</script>