<template>
    <div class="md:bg-indigo-50 w-full h-full" style="z-index: -1">
      <img  src="@/assets/bg.png" class="fixed h-full w-full left-0 bottom-0 max-md:hidden" style="z-index: -1;"  alt="">
      <div class="grid md:grid-cols-2 h-full items-center gap-60 max-md:grid-cols-1 max-md:grid-rows-1">
          <div class="flex justify-center items-center max-md:hidden" >
            <img src="@/assets/fg.png "  alt="">
          </div>
          <div class="w-[500px] max-md:w-full">
            <el-card shadow="never" class="">
                <template #header>
                    <el-text size="large">请登录或者注册一个账号</el-text>
                </template>
              
              <template #footer>
                <el-text>使用其他方式登录</el-text>
                <el-icon></el-icon>
              </template>
               <div class="flex flex-col justify-center items-center text-center p-5">
                 <div class="flex items-center mb-10">
                   <el-icon size="100px"><logo></logo></el-icon>
                   <h1 class="text-2xl text-gray-600 ml-4">龋齿检测平台</h1>
                 </div>
                 <el-form-item class="w-full">
                   <el-input placeholder="账号" class="h-10" :prefix-icon="User"></el-input>
                 </el-form-item>
                 <el-form-item class="w-full">
                   <el-input placeholder="密码" class="h-10" :prefix-icon="Key"></el-input>
                 </el-form-item>
                 <div class="grid md:grid-cols-2 w-full max-md:grid-rows-2 gap-2">
                   <el-button type="primary">登录</el-button>
                   <el-button >注册</el-button>
                 </div>
                 
               </div>
            </el-card>
          </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import Logo from "@/components/icon/logo.vue";
import {Key, User} from "@element-plus/icons-vue";
</script>