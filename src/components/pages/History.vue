<template>
  <el-card>
    <el-page-header @back="goBack" >
      <template #content>
        <span class="text-large font-600 mr-3" v-if="routePath != ''"> {{routePath.replace("/","")}} </span>
      </template>
      <template #breadcrumb>
        <el-breadcrumb separator="/">
        <el-breadcrumb-item >历史记录</el-breadcrumb-item>
        <el-breadcrumb-item v-if="routePath != '' ">{{ routePath.replace("/","")}}</el-breadcrumb-item>
          <!-- <el-breadcrumb-item :to="{ path: './page-header.html' }">
            homepage
          </el-breadcrumb-item>
          <el-breadcrumb-item><a href="./page-header.html">route 1</a></el-breadcrumb-item>
          <el-breadcrumb-item>route 2</el-breadcrumb-item> -->
        </el-breadcrumb>
      </template>
    </el-page-header>
    <RouterView >
    </RouterView>
  </el-card>
</template>

<script lang="ts" setup>
import { provide, reactive,ref, watch } from 'vue';
import { useRouter,useRoute} from 'vue-router';
const routePath = ref("");
const router = useRouter();


provide("curRouter",router);
provide("path",routePath);

watch(routePath,(value:string,old:string,_)=>{

  router.push("/history"+value)
});

function goBack(){
  routePath.value = ""
  
}

</script>

<style scoped></style>