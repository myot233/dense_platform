<script setup lang="ts">
  import Comments from "@/components/parts/Comments.vue";

  type Comment = {
      user:string,
      content:string
  }
  const props = defineProps<{
    comments:Comment[]
  }>()
  
</script>

<template>
    <div v-for="comment in props.comments">
      <el-avatar src="" ></el-avatar>
      <el-text>{{comment.content}}</el-text>
    </div>
</template>

<style scoped>

</style>