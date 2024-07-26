<template>
    <el-dialog v-model="centerDialogVisible" title="请登录" width="400"  align-center>
        <el-form label-width="auto">
            <el-form-item label="账号:">
                <el-input v-model="loginform.account"></el-input>
            </el-form-item>
            <el-form-item label="密码:">
                <el-input v-model="loginform.password" type="password" />
            </el-form-item>
            <el-form-item style="width: 165px;" label="验证码:">
                <el-input v-model="loginform.verify"></el-input>
            </el-form-item>

        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="centerDialogVisible = false">注册</el-button>
                <el-button type="primary" @click="centerDialogVisible = false">登录</el-button>
            </div>
        </template>
    </el-dialog>
</template>
<script lang="ts" setup>
interface LoginForm {
    account:string,
    password:string,
    verify:string
}

interface RegisterForm {
    account:string,
    password:string,
    verify:string,
}

import { ref } from "vue"

const centerDialogVisible = defineModel({ default: false })
const loginform = ref<LoginForm>({
    account:"",
    password:"",
    verify:"",
});

const registerform = ref<RegisterForm>();


</script>