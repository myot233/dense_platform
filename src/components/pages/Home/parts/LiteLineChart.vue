<script setup lang="ts" generic="T extends ECBasicOption">
import * as echarts from "echarts/core";
import {onMounted, onRenderTriggered, onUpdated, ref, watch} from "vue";
import { CanvasRenderer } from 'echarts/renderers';
// 引入柱状图图表，图表后缀都为 Chart
import { BarChart,LineChart } from 'echarts/charts';
// 引入标题，提示框，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
} from 'echarts/components';
// 标签自动布局、全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features';
import type {ECBasicOption} from "echarts/types/dist/shared";
import type {EChartsType} from "echarts";
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
type Props<T extends ECBasicOption> = {
  option:T
}
let chart = ref()
let props = defineProps<Props<T>>()
let myChart:any = undefined;
onMounted(()=>{
  myChart = echarts.init(chart.value);
  myChart.setOption(props.option)
})

watch(props.option,(value, oldValue)=>{
    myChart.setOption(value)
})
// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  LabelLayout,
  LineChart,
  UniversalTransition,
  CanvasRenderer
]);

onUpdated(() => {
  
  myChart.setOption(props.option)
});
// 绘制图表

</script>

<template>
  <div ref="chart" class="h-40 w-40"></div>
</template>

<style scoped>

</style>