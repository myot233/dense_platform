<template>

    <div class="grid grid-cols-2 h-16 w-full">
        <div class='flex justify-start items-center row-span-1'>
            <el-icon size="3rem" class="mr-4"><logo></logo></el-icon>
            <h3 class="text-2xl text-gray- font-medium">龋齿检测平台</h3>
        </div>


        <div @click="!login ? userLogin() : undefined" style="cursor: pointer;"  class="row-span-1 flex justify-end items-center gap-2" >
          <el-button-group>
            <el-button size="large" :icon="FullScreen" text/>
            
            <el-button size="large" :icon="Sunny" text/>
            <el-button size="large" :icon="Bell" text/>
            
          </el-button-group>
            <el-avatar fit="cover" size="small" :src="src"></el-avatar>
            <el-text >{{ login ? name : "未登录" }}</el-text>
            <el-dropdown>
                <el-icon size="18px">
                    <ArrowDown />
                </el-icon>
                <template #dropdown>
                    <el-dropdown-menu v-if="login">
                        <el-dropdown-item>个人信息</el-dropdown-item>
                        <el-dropdown-item>我的报告</el-dropdown-item>

                        <el-dropdown-item divided @click="logout()">注销</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>




    </div>


</template>

<script setup lang="ts">
import {ArrowDown, Bell, FullScreen, Sunny} from '@element-plus/icons-vue';
import {inject, ref} from 'vue';
import logo from '../icon/logo.vue';
import Login from '../pages/AccountAccess/index.vue';
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

