<script setup lang="ts">

import {Key, User} from "@element-plus/icons-vue";
import {inject, ref, type Ref} from "vue";
import IcBaselineWechat from "@/components/icon/IcBaselineWechat.vue";
import MingcuteQqLine from "@/components/icon/MingcuteQqLine.vue";
import {login as loginRequest } from "@/api"
import {type LoginForm} from ".."
import Sha256 from "crypto-js/sha256"
import {useCookies} from "@/common";
import router from "@/router";
import {ElMessage, type FormInstance, type FormRules} from "element-plus";

const isLoginView = inject<Ref<boolean>>("isLoginView")!
const loginModel = ref<LoginForm>({account:"",password:""});
const loginForm = ref<FormInstance>();
const rules = ref<FormRules<LoginForm>>({
  account:[
    {required:true,message:'请输入账号'}
  ],
  password:[
      {required:true,message:"请输入密码"}
  ]
})
const $cookies = useCookies();


async function login()
{
  await loginForm.value?.validate();
  try {
    let result = await loginRequest(loginModel.value.account, Sha256(loginModel.value.password).toString())
    if(result.data.code == 31){
        ElMessage.error("用户名或密码错误")
        return;
    }
    $cookies.set("token", result.data.token, Date.now() + 7);
    await router.push("/user/home");
  }
  catch (error){
      if (error === undefined) 
        ElMessage.error("发生了未知错误");
      else 
        ElMessage.error(error as any);
    }
}


</script>

<template>
  <el-form ref="loginForm" class="w-full" :model="loginModel" :rules>
    <el-form-item class="w-full" prop="account">
      <el-input v-model="loginModel.account" placeholder="账号" size="large" :prefix-icon="User" ></el-input>
    </el-form-item>
    <el-form-item class="w-full" prop="password">
      <el-input v-model="loginModel.password" placeholder="密码" size="large" :prefix-icon="Key"></el-input>
    </el-form-item>
  </el-form>
  <div class="grid md:grid-cols-2 w-full max-md:grid-rows-2 gap-2">
    <el-button  type="primary" @click="login" >登录</el-button>
    <el-button @click="isLoginView = false">注册</el-button>
  </div>
  <el-divider ><el-text>使用其他方式登录</el-text></el-divider>
  <div class="flex gap-4">
    <el-link><ic-baseline-wechat class="w-7 "/></el-link>
    <el-link><MingcuteQqLine class="w-7"/></el-link>
  </div>
</template>
