﻿<script setup lang="ts">

import {Key, User} from "@element-plus/icons-vue";
import {inject, ref, type Ref} from "vue";
import {type RegisterForm} from ".."
import {UserType} from "@/common";

const isLoginView = inject<Ref<boolean>>("isLoginView");
const registerForm = ref<RegisterForm>({
  account:"",
  type:UserType.Patient,
  password:"",
  pssswordRepeat:""
});

async function register(){
    
}

</script>

<template>
  <el-form :model="registerForm">
    <el-form-item class="w-full">
      <div class="grid grid-cols-2 gap-2">
        <el-input v-model="registerForm.account" placeholder="账号" size="large" :prefix-icon="User"></el-input>
        <el-select v-model="registerForm.type" placeholder="选择你的身份" size="large"  >
          <el-option label="医生" :value="UserType.Patient"></el-option>
          <el-option label="病人" :value="UserType.Doctor"></el-option>
        </el-select>
      </div>
    </el-form-item>

    <el-form-item class="w-full">
      <el-input v-model="registerForm.password" placeholder="密码" size="large" :prefix-icon="Key"></el-input>
    </el-form-item>
    <el-form-item class="w-full">
      <el-input v-model="registerForm.pssswordRepeat" placeholder="重复密码" size="large" :prefix-icon="Key"></el-input>
    </el-form-item>
  </el-form>
  <div class="grid md:grid-cols-2 w-full max-md:grid-rows-2 gap-2">
    <el-button type="primary">注册</el-button>
    <el-button @click="isLoginView = true  ">返回</el-button>
  </div>
</template>

<style scoped>

</style>