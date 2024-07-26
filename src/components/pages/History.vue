<template>
    <el-card>
        <el-page-header @back="goBack">
    <template #content>
      <span class="text-large font-600 mr-3"> Title </span>
    </template>
    <template #breadcrumb>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: './page-header.html' }">
          homepage
        </el-breadcrumb-item>
        <el-breadcrumb-item
          ><a href="./page-header.html">route 1</a></el-breadcrumb-item
        >
        <el-breadcrumb-item>route 2</el-breadcrumb-item>
      </el-breadcrumb>
    </template>
  </el-page-header>
  <RouterView>

  </RouterView>
    </el-card>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

    const router = useRouter();
    
    function goBack(){

    }
</script>

<style scoped>


</style>