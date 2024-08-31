<template>
    <div class="md:bg-indigo-50 w-full h-full" style="z-index: -1">
      <img src="../../../assets/imgs/bg.png" class="fixed h-full w-full left-0 bottom-0 max-md:hidden" style="z-index: -1;" alt="">
      <div class="grid md:grid-cols-2 h-full items-center gap-60 max-md:grid-cols-1 max-md:grid-rows-1">
          <div class="flex justify-center items-center max-md:hidden" >
            <img src="../../../assets/imgs/fg.png " class="h-[600px]" alt="">
          </div>
          <div class="w-[500px] max-md:w-full">
            <el-card shadow="never" class="">
                <template #header>
                    <el-text size="large">请登录或者注册一个账号</el-text>
                </template>
              
               <div class="flex flex-col justify-center items-center text-center p-5">
                 <div class="flex items-center mb-10">
                   <el-icon size="100px"><logo></logo></el-icon>
                   <h1 class="text-2xl text-gray-600 ml-4">龋齿检测平台</h1>
                 </div>
                  <Login v-if="isLoginView"></Login>
                  <Register v-else></Register>
               </div>
            </el-card>
          </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import Logo from "@/components/icon/logo.vue";

import Login from "./parts/Login.vue";
import {provide, ref} from "vue";
import Register from "./parts/Register.vue";
const isLoginView = ref(true)
provide("isLoginView",isLoginView)

</script>