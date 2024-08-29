<template>
  <el-row>
  <div class="grid grid-cols-3 w-full gap-4 mb-4">
    <DataCard :num="25" percent="25%" title="用户数量">
      <User></User>
    </DataCard>
    <DataCard  :num="25" percent="25%" title="用户数量">
      <User></User>
    </DataCard>
    <DataCard :num="25" percent="25%" title="检测数量">
      <Edit></Edit>
    </DataCard>
  </div>

  </el-row>
  <el-row>
    <el-col>

    </el-col>
  </el-row>

  <el-row gutter="24">
    <el-col :span="8">
      <VideoCard title="即时检测 ⏱️"
                 content="只需上传您的牙齿照片，我们的系统将在数秒内生成详细的检测结果。无与伦比的速度与准确性，让您轻松掌握牙齿健康状况。">
        <video id="video" src="@/assets/data.mp4" autoplay="true" muted="true" loop="true"
               v-on:focus="(x) => { }"></video>
      </VideoCard>
    </el-col>
    <el-col :span="8">
      <VideoCard title="详尽报告 📋"
                 content="我们的检测结果不仅包含是否存在龋齿的判断，还附有详尽的分析报告。报告涵盖龋齿的位置、严重程度及可能的治疗建议，助您全面了解口腔健康。">
        <video id="video" src="@/assets/信息2.mp4" autoplay="true" muted="true" loop="true"
               v-on:focus="(x) => { }"></video>
      </VideoCard>
    </el-col>
    <el-col :span="8">
      <VideoCard title="专家咨询 👩‍⚕️👨‍⚕"
                 content="平台为您提供与资深牙科专家在线交流的机会。通过专业咨询，您将获得个性化的治疗方案和健康建议，确保您的牙齿健康得到最优质的照护。">
        <video id="video" src="@/assets/分析.mp4" autoplay="true" muted="true" loop="true"
               v-on:focus="(x) => { }"></video>
      </VideoCard>
    </el-col>

  </el-row>
</template>

<script setup lang="ts">
import logo from '../../icon/logo.vue';
import {Edit, User} from "@element-plus/icons-vue";
import DataCard from "@/components/pages/Home/parts/DataCard.vue";
import VideoCard from "@/components/pages/Home/parts/VideoCard.vue";
import LiteLineChart from "@/components/pages/Home/parts/LiteLineChart.vue";
</script>
