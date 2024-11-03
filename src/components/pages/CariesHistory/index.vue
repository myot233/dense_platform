<template>
  <el-card>
    <el-page-header @back="goBack" >
      <template #content>
        <span class="text-large font-600 mr-0" v-if="route.path.split('/').length >= 3"> {{path}} </span>
      </template>
      <template #breadcrumb>
        <el-breadcrumb separator="/">
        <el-breadcrumb-item >历史记录</el-breadcrumb-item>
        <el-breadcrumb-item v-if="  route.path.split('/').length >= 3 ">{{ path }}</el-breadcrumb-item>
        </el-breadcrumb>
      </template>
    </el-page-header>
    <RouterView >
    </RouterView>
  </el-card>
</template>

<script lang="ts" setup>
import {computed} from 'vue';
import {useRoute, useRouter} from 'vue-router';


const router = useRouter();
const route = useRoute();

const path = computed(()=>{
    const temp = route.path.split("/");
    return temp[temp.length-1]
})



function goBack(){
  router.back();
  
}

</script>

<style scoped></style>