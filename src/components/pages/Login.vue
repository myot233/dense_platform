<template>
    <el-dialog v-model="centerDialogVisible" width="400" align-center>

        <div style="margin-bottom: 25px;">
            <el-text size="large">{{ title }}</el-text>
        </div>
        <el-form label-width="auto" v-if="isLogin">
            <el-form-item label="账号:">
                <el-input v-model="loginForm.account"></el-input>
            </el-form-item>
            <el-form-item label="密码:">
                <el-input v-model="loginForm.password" type="password" />
            </el-form-item>
            <!-- <div style="display: flex;">
                <el-text style="margin-right: 12px;">验证码:</el-text>
                <el-input style="width: 120px; margin-right: 12px;"></el-input>
                <el-image ></el-image>
            </div> -->

        </el-form>
        <el-form label-width="auto" v-else>
            <el-form-item label="账号:">
                <el-input v-model="registerForm.account"></el-input>
            </el-form-item>
          <el-form-item label="类别:">
            <el-select v-model="registerForm.type">
              <el-option label="病人" :value="UserType.Patient"></el-option>
              <el-option label="医生" :value="UserType.Doctor"></el-option>
            </el-select>
          </el-form-item>
            <el-form-item label="密码:">
                <el-input v-model="registerForm.password" type="password" />
            </el-form-item>
            <el-form-item label="重复密码:">
                <el-input v-model="registerForm.password_repeat" type="password" />
            </el-form-item>
            <!-- <el-form-item label="验证码:" style="display: flex;">
                <el-input v-model="registerForm.verify"> </el-input>
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
import {ElMessage} from "element-plus";

interface loginForm {
    account: string,
    password: string,
    verify: string
}



interface registerForm {
    account: string,
    password: string,
    type:UserType,
    password_repeat: string,
    verify: string,
}


import { login, register } from "@/api";


import { ref, computed, watch, inject } from "vue"
import type { VueCookies } from "vue-cookies";
import {UserType} from "@/common";
import {useCommonStore}  from "@/store"
const centerDialogVisible = defineModel({ default: false })
const isLogin = ref(true);
const $cookies = inject<VueCookies>('$cookies');
const store = useCommonStore();
watch(centerDialogVisible, (value) => {
    if (value) {
        isLogin.value = true;
    }
})
const title = computed(() => isLogin ? "请登录" : "请注册");


const loginForm = ref<loginForm>({
    account: "",
    password: "",
    verify: "",
});

const registerForm = ref<registerForm>({
    account: "",
    password: "",
    type:UserType.Patient,
    password_repeat: "",
    verify: ""
});

const loginButtonClick = () => {
    if (isLogin.value) {
        if (!$cookies?.isKey("token")) {
          
            login(loginForm.value.account, loginForm.value.password).then(
                (resp) => {
                    if (resp.data.code == "0") {
                      store.username = resp.data.username;
                        document.cookie = `token=${resp.data.token}`;
                        window.location.reload();
                    }
                    else
                      ElMessage.error(resp.data.message);
                    
                
                }
            )

        }else{
        
        }
    }else{
        if ($cookies?.isKey("token")) return;
        register(registerForm.value.account,registerForm.value.password,registerForm.value.type).then(
                resp=>{
                    if (resp.data.code == "0") {
                        document.cookie = `token=${resp.data.token}`;
                        store.username = resp.data.username;
                        window.location.reload();
                    }else
                      ElMessage.error(resp.data.message); 
                }
            )
        
    }
}


</script>