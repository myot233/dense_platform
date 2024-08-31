<script setup lang="ts">
      import router from "@/router";

      router.push('/login')
</script>

<template>
    <RouterView class="common-layout"></RouterView>
</template>

<style scoped>
.common-layout {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}


</style>