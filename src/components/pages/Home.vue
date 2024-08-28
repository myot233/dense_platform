<template>
  <el-row>
    <el-col :span="8" >
      <el-card style="margin: 16px 16px 16px auto">
        <div style="display: grid;grid-template: auto / 1fr 1fr">
          <User style="height: 75px"></User>
          <div>
            <el-text size="large">用户数量</el-text>
            <h2 style="margin: 8px 0 4px;">114514</h2>
            <el-text type="success">100%</el-text>
          </div>
        </div>
      </el-card>
    </el-col>  <!--展示当前用户数量，医生数量，和检测数量 -->
    <el-col :span="8">
      <el-card style="margin: 16px 16px 16px auto">
        <div style="display: grid;grid-template: auto / 1fr 1fr">
          <User style="height: 75px"></User>
          <div>
            <el-text size="large">医生数量</el-text>
            <h2 style="margin: 8px 0 4px;">114514</h2>
            <el-text type="success">25%</el-text>
          </div>
        </div>
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card style="margin: 16px 0px 16px auto">
          <div style="display: grid;grid-template: auto / 1fr 1fr">
          <Edit style="height: 75px"></Edit>
          <div>
            <el-text size="large">检测数量</el-text>
            <h2 style="margin: 8px 0 4px;">114514</h2>
            <el-text type="success">30%</el-text>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
    <el-row>
        <el-col>
            <el-card>
                <el-row>
                    <el-icon size="5em" class="logo">
                        <logo></logo>
                    </el-icon>

                </el-row>

                <el-row>
                    <h2 style="text-align: center;">龋齿检测平台简介 🦷✨</h2>
                    <p>
                        欢迎光临我们的龋齿检测平台！🌟 我们的使命是利用最先进的人工智能技术，为您的口腔健康保驾护航。无论您是希望预防龋齿还是需要准确的诊断，我们都能为您提供卓越的服务和支持。平台具备以下优势：
                    </p>
                    <ul>
                        <li><strong>高效检测</strong>：只需上传牙齿照片，系统将在几秒钟内给出详细的检测结果，帮您快速了解牙齿状况。</li>
                        <li><strong>专业报告</strong>：检测结果附有详尽的分析报告，包括龋齿的位置、严重程度及可能的治疗建议，让您清晰了解口腔健康。</li>
                        <li><strong>专家咨询</strong>：与资深牙科专家在线交流，获取个性化的健康建议和治疗方案，确保您的牙齿得到最优质的照护。</li>
                    </ul>
                    <p>无论您是家长关心孩子的牙齿健康，还是个人希望维护自己的口腔卫生，我们的龋齿检测平台都将是您值得信赖的伙伴。让我们一起迈向健康、美丽的微笑！😊</p>
                </el-row>
            </el-card>
        </el-col>
    </el-row>

    <el-row gutter="24">
        <el-col :span="8">
            <el-card style="width: fit-content;">
                <el-row>
                    <el-col :span="12">
                        <video id="video" src="@/assets/data.mp4" autoplay="true" muted="true" loop="true"
                            v-on:focus="(x) => { }"></video>
                    </el-col>
                    <el-col :span="12">
                        <div>
                            <h3>即时检测 ⏱️</h3>
                            <el-text size="large">只需上传您的牙齿照片，我们的系统将在数秒内生成详细的检测结果。无与伦比的速度与准确性，让您轻松掌握牙齿健康状况。</el-text>
                        </div>
                    </el-col>
                </el-row>
            </el-card>
        </el-col>
        <el-col :span="8">
            <el-card style="width: fit-content;">
                <el-row>
                    <el-col :span="12">
                        <video id="video" src="@/assets/信息2.mp4" autoplay="true" muted="true" loop="true"
                            v-on:focus="(x) => { }"></video>
                    </el-col>
                    <el-col :span="12">
                        <div>
                            <h3>详尽报告 📋</h3>
                            <el-text size="large">我们的检测结果不仅包含是否存在龋齿的判断，还附有详尽的分析报告。报告涵盖龋齿的位置、严重程度及可能的治疗建议，助您全面了解口腔健康。</el-text>


                        </div>
                    </el-col>
                </el-row>
            </el-card>
        </el-col>
        <el-col :span="8">
            <el-card style="width: fit-content;">
                <el-row>
                    <el-col :span="12">
                        <video id="video" src="@/assets/分析.mp4" autoplay="true" muted="true" loop="true"
                            v-on:focus="(x) => { }"></video>
                    </el-col>
                    <el-col :span="12">
                        <div>
                            <h3>专家咨询 👩‍⚕️👨‍⚕️</h3>
                            <el-text size="large">平台为您提供与资深牙科专家在线交流的机会。通过专业咨询，您将获得个性化的治疗方案和健康建议，确保您的牙齿健康得到最优质的照护。</el-text>
 
                        </div>
                    </el-col>
                </el-row>
            </el-card>
        </el-col>

    </el-row>
</template>

<script setup lang="ts">
import logo from '../icon/logo.vue';
import {Edit, User} from "@element-plus/icons-vue";
</script>


<style scoped>
video {
    height: 200px;
    margin-right: 16px;
}

.el-card {
    border-radius: 8px;
    margin-bottom: 25px;

}

.el-card .el-row {
    align-items: center;
}
</style>
