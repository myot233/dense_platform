<template>

    <div class="container">
        <div class="title">
            <el-icon size="2em" style="margin: auto 15px;">
                <logo></logo>

            </el-icon>
            <h3>龋齿检测平台</h3>
        </div>


        <div class="avatar" v-if="login">
          <el-button-group>
            <el-button size="large" :icon="FullScreen" text/>
            
            <el-button size="large" :icon="Sunny" text/>
            <el-button size="large" :icon="Bell" text/>
            
          </el-button-group>
            <el-avatar fit="cover" size="small" :src="src"></el-avatar>
            <el-text>{{ name }}</el-text>
            <el-dropdown>
                <el-icon size="18px">
                    <ArrowDown />
                </el-icon>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>个人信息</el-dropdown-item>
                        <el-dropdown-item>我的报告</el-dropdown-item>

                        <el-dropdown-item divided @click="logout()">注销</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
        <div @click="userLogin" style="cursor: pointer;" class="avatar" v-else>
            <el-avatar size="small"></el-avatar>
            <el-text >未登录</el-text>
            <el-icon size="18px">
                <ArrowDown />
            </el-icon>
        </div>



    </div>
    <Login v-model="showDialogVariable"></Login>

</template>

<script setup lang="ts">
import {ArrowDown, Bell, FullScreen, Sunny} from '@element-plus/icons-vue';
import {inject, ref} from 'vue';
import logo from '../icon/logo.vue';
import Login from '../pages/Login.vue';
import type {VueCookies} from 'vue-cookies';
import {getAvatar} from '@/api';
import {useCommonStore} from "@/store";
import {UserType} from "@/common";

const $cookies = inject<VueCookies>('$cookies');
const showDialogVariable = ref(false);
const src = ref<string>();
const store = useCommonStore();
export interface HeaderProps {
    name: string,
    login?: boolean
}

const props = withDefaults(defineProps<HeaderProps>(), {
    name: "",
    login: false,
});


if($cookies?.isKey("token")){
    getAvatar($cookies.get("token")).then(x=>{
        const blob = x.data;
        const imageUrl = URL.createObjectURL(blob);
        src.value = imageUrl;
    })
}


function userLogin() {

    showDialog();
}

function showDialog() {
    showDialogVariable.value = true;
}

function logout(){
    
    if($cookies?.isKey("token")){
        $cookies.remove("token","/");
    }
    store.username = "";
    store.usertype = UserType.Patient;
    store.menu = undefined
    store.detail = {
      name: "",
      sex: "",
      birth: "",
      phone:"",
      email:"",
      password:"",
      address:""

    }
    window.location.reload();
    
}

</script>


<style scoped>
.el-button {
  height: 100%;

}
.avatar .el-avatar {
    margin-right: 8px;

}

.avatar .el-text {
    margin-right: 8px;

}

.container {
    display: grid;
    grid-template: auto / 1fr auto;
}

.avatar {
    display: flex;
    justify-content: baseline;
    align-items: center;

}

.title {
    display: flex;
    width: auto;

}


h2 {
    color: #303133;
}
</style>