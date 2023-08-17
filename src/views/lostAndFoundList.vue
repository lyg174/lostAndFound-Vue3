<template>
    <div class="list">
        <div class="navbar">
            <ul>
                <li><router-link to="/list/lostlist">失物列表</router-link></li>
                <li><router-link to="/list/foundlist">招领列表</router-link></li>
            </ul>
        </div>
        <router-view></router-view>
    </div>
</template>

<style lang="scss">
.list {
    width: 100%;
}

.navbar {
    width: 100%;
    background-color: rgb(94, 75, 75);
    ul {
        height: 70px;
        display: flex;
        text-align: center;
        li {
            line-height: 70px;
            font-size: 30px;
            font-weight: 500;
            height: 100%;
            padding: 0 10px;
            flex: 1;
        }
        li:first-child {
            border-right: 1px solid black;
        }
        li:hover {
            cursor: pointer;
        }
    }
}

a {
    text-decoration: none;
    color: black;
}
</style>

<script>
export default {

}
</script>