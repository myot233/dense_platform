<script setup lang="ts">

import {Key, User} from "@element-plus/icons-vue";
import {inject, ref, type Ref} from "vue";
import {type RegisterForm} from ".."
import {UserType} from "@/common";
import {ElMessage, type FormInstance, type FormRules} from "element-plus";
import {register as registerRequest } from "@/api";
import router from "@/router";

const isLoginView = inject<Ref<boolean>>("isLoginView");
const registerForm = ref<RegisterForm>({
  account: "",
  type: UserType.Patient,
  password: "",
  _password: ""
});
const registerFormInstance = ref<FormInstance>();
const registerRule = ref<FormRules<RegisterForm>>({
  account: [
    {required: true, message: "请输入账号"}
  ],
  password: [
    {required: true, message: "请输入密码"}, {min: 7, message: "密码长度需要大于7个字符"},
    {
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]*$/,
      message: '密码必须包含至少一个大写字母、一个小写字母、一个数字和一个特殊字符',
      trigger: 'blur'
    }
  ],
  type: [
    {required: true, message: "请输入密码"},

  ],
  _password: [
    {required: true, message: "请再次输入密码"},

    {validator: validatePassWordRepeat}
  ]
})

function validatePassWordRepeat(rule: any, value: any, callback: any) {
  if (value !== registerForm.value.password) {
    callback(new Error("密码不匹配"))
  } else {
    callback()
  }
}

async function register() {
  await registerFormInstance.value?.validate();
  try {
    let result = await registerRequest(registerForm.value.account, registerForm.value.password, registerForm.value.type);
    if(result.data.code == 32){
      ElMessage.error("已经存在相同的账号")
      return;
    }
    $cookies.set("token", result.data.token, Date.now() + 7);
    await router.push("/user/home");
  }catch (error){
    if (error === undefined)
      ElMessage.error("发生了未知错误");
    else
      ElMessage.error(error as any);
  }
}

</script>

<template>
  <el-form ref="registerFormInstance" :model="registerForm" :rules="registerRule">

    <div class="grid grid-cols-2 gap-2">
      <el-form-item prop="account">
        <el-input v-model="registerForm.account" placeholder="账号" size="large" :prefix-icon="User"></el-input>
      </el-form-item>
      <el-form-item prop="type">
        <el-select v-model="registerForm.type" placeholder="选择你的身份" size="large">
          <el-option label="医生" :value="UserType.Patient"></el-option>
          <el-option label="病人" :value="UserType.Doctor"></el-option>
        </el-select>
      </el-form-item>
    </div>

    <el-form-item class="w-full" prop="password">
      <el-input type="password" v-model="registerForm.password" placeholder="密码" size="large" :prefix-icon="Key"></el-input>
    </el-form-item>
    <el-form-item class="w-full" prop="_password">
      <el-input type="password" v-model="registerForm._password" placeholder="重复密码" size="large" :prefix-icon="Key"></el-input>
    </el-form-item>
  </el-form>
  <div class="grid md:grid-cols-2 w-full max-md:grid-rows-2 gap-2">
    <el-button type="primary" @click="register">注册</el-button>
    <el-button @click="isLoginView = true  ">返回</el-button>
  </div>
</template>

<style scoped>

</style>