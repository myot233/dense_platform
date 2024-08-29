<script setup lang="ts">

import {User} from "@element-plus/icons-vue";
import LiteLineChart from "@/components/pages/Home/parts/LiteLineChart.vue";
import {ref} from "vue";
type Prop = {
    title:string, 
    num:number,
    percent:string,
}
const data = [1,1,4,5,1,4,1]
defineProps<Prop>();
const options = ref({
  container: ".line-card",
  xAxis: {
    type: "category",
    show: false,
    data: data
  },
  grid: {
    top: "15px",
    bottom: 0,
    left: 0,
    right: 0
  },
  yAxis: {
    show: false,
    type: "value"
  },
  series: [
    {
      data: data,
      type: "line",
      symbol: "none",
      smooth: true,
      color: "#41b6ff",
      lineStyle: {
        shadowOffsetY: 3,
        shadowBlur: 7,
        shadowColor: "#41b6ff"
      }
    }
  ]
});
</script>

<template>
  <el-card>
    <div class="flex items-center justify-start gap-10">
      <el-icon  size="100px"><slot></slot></el-icon>
      <div class="grid grid-rows-3 justify-center items-center">
        <h2 class="text-2xl">{{ title  }}</h2>
        <h2 class="text-2xl">{{ num }}</h2>
        <h2 class="text-green-600">{{ percent }}</h2>
      </div>
      <LiteLineChart :option="options" ></LiteLineChart>
    </div>
  </el-card>
</template>

<style scoped>
  @import "@/style.css";
</style>