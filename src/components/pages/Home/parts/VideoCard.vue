<script setup lang="ts">
type Props = {
  title:string, 
  content:string,
}

const props = defineProps<Props>();

</script>

<template>
  <el-card style="width: fit-content;">
    <div class="flex items-center">
      <slot></slot>
      <div class="items-baseline;">
        <h3 class="text-2xl">{{props.title}}</h3>
        <el-text size="large">{{props.content}}</el-text>
      </div>
    </div>

  </el-card>
</template>

<style scoped>

</style>