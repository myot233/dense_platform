<script setup lang="ts">
type Props = {
  title:string, 
  content:string,
}

const props = defineProps<Props>();

</script>

<template>
  <el-card style="width: fit-content;">
    <el-row>
      <el-col :span="12">
        <slot></slot>
      </el-col>
      <el-col :span="12">
        <div class="items-baseline">
          <h3 class="text-2xl">{{props.title}}</h3>
          <el-text size="large">{{props.content}}</el-text>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<style scoped>

</style>