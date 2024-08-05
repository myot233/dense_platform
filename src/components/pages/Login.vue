<template>
    <el-dialog v-model="centerDialogVisible" width="400" align-center>

        <div style="margin-bottom: 25px;">
            <el-text size="large">{{ title }}</el-text>
        </div>
        <el-form label-width="auto" v-if="isLogin">
            <el-form-item label="账号:">
                <el-input v-model="loginform.account"></el-input>
            </el-form-item>
            <el-form-item label="密码:">
                <el-input v-model="loginform.password" type="password" />
            </el-form-item>
            <!-- <div style="display: flex;">
                <el-text style="margin-right: 12px;">验证码:</el-text>
                <el-input style="width: 120px; margin-right: 12px;"></el-input>
                <el-image ></el-image>
            </div> -->

        </el-form>
        <el-form label-width="auto" v-else>
            <el-form-item label="账号:">
                <el-input v-model="registerform.account"></el-input>
            </el-form-item>
            <el-form-item label="密码:">
                <el-input v-model="registerform.password" type="password" />
            </el-form-item>
            <el-form-item label="重复密码:">
                <el-input v-model="registerform.password_repeat" type="password" />
            </el-form-item>
            <!-- <el-form-item label="验证码:" style="display: flex;">
                <el-input v-model="registerform.verify"> </el-input>
                <template #suffix>
                    <el-image></el-image>
                </template>
</el-form-item> -->

        </el-form>

        <template #footer>
            <div class="dialog-footer">
                <el-button @click="isLogin = false" v-if="isLogin">注册</el-button>
                <el-button type="primary" @click="loginButtonClick()">{{ isLogin ? "登录" : "注册" }}</el-button>
            </div>


        </template>
    </el-dialog>
</template>
<script lang="ts" setup>
interface LoginForm {
    account: string,
    password: string,
    verify: string
}

interface RegisterForm {
    account: string,
    password: string,
    password_repeat: string,
    verify: string,
}


import { login, register } from "@/api";


import { ref, computed, watch, inject } from "vue"
import type { VueCookies } from "vue-cookies";

const centerDialogVisible = defineModel({ default: false })
const isLogin = ref(true);
const $cookies = inject<VueCookies>('$cookies');
watch(centerDialogVisible, (value) => {
    if (value) {
        isLogin.value = true;
    }
})
const title = computed(() => isLogin ? "请登录" : "请注册")


const loginform = ref<LoginForm>({
    account: "",
    password: "",
    verify: "",
});

const registerform = ref<RegisterForm>({
    account: "",
    password: "",
    password_repeat: "",
    verify: ""
});

const loginButtonClick = () => {
    if (isLogin.value) {
        if (!$cookies?.isKey("token")) {

            login(loginform.value.account, loginform.value.password).then(
                (resp) => {
                    if (resp.data.code == "0") {
                        document.cookie = `token=${resp.data.token}`
                        window.location.reload();
                    } 
                
                }
            )

        }else{
        
        }
    }else{
        if ($cookies?.isKey("token")) return;
        register(registerform.value.account,registerform.value.password).then(
                resp=>{
                    if (resp.data.code == "0") {
                        document.cookie = `token=${resp.data.token}`
                        window.location.reload();
                    } 
                }
            )
        
    }
}


</script>