<template>

    <div class="container">
        <div class="title">
            <el-icon size="2em" style="margin: auto 15px;">
                <logo></logo>
                
            </el-icon>
            <h3>龋齿检测平台</h3>
        </div>

        <el-dropdown>
            <div class="avatar">
                <el-avatar size="small"></el-avatar>
                <p>{{ name }}</p>
                <el-icon size="18px">
                    <ArrowDown />
                </el-icon>
            </div>
            <template #dropdown>
                <el-dropdown-menu>
                   <el-dropdown-item>个人信息</el-dropdown-item>
                   <el-dropdown-item>我的报告</el-dropdown-item>
                
                   <el-dropdown-item divided>注销</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>

</template>

<script setup lang="ts">
import { Search, ArrowDown } from '@element-plus/icons-vue';
import logo from '../icon/logo.vue';
defineProps<{
    name:string
}>();




</script>


<style scoped>
.avatar * {
    margin-right: 8px;

}


.container {
    display: grid;
    grid-template: auto / 1fr auto;
}

.avatar {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-wrap: nowrap;
}

.title {
    display: flex;
    width: auto;

}


h2 {
    color: #303133;
}
</style>