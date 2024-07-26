<template>
    <el-card>
        <el-steps :active="step" finish-status="success" align-center>
            <el-step title="选择医生" />
            <el-step title="上传图片" />
            <el-step title="等待结果" />
        </el-steps>
        <div style="margin: 16px;">
            <div v-if="step == 0">
                <el-form>
                    <el-form-item label="选择一位医生">
                        <el-select v-model="form.doctor">
                            <el-option v-for="doctor in doctors" :label="doctor"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <div v-if="step == 1">
                <el-form>
                    <el-form-item label="上传图片:">
                        <Upload></Upload>
                    </el-form-item>
                </el-form>
            </div>
            <div v-if="step == 2">
                <el-result
                    icon="success"
                    title="提交成功"
                    sub-title="请耐心等待,您的检测将在3-5个工作日内完成"
                ></el-result>
            </div>
        </div>
        <el-button style="margin-left: 85%;" @click="()=> {if(step++ >= 2) router.push('home') }">{{ buttonText }}</el-button>
    </el-card>
</template>


<script lang="ts" setup>
import { ref, watch,computed } from "vue"
import Upload from "../parts/Upload.vue";
import { useRouter } from "vue-router";
const router = useRouter();
const form = ref({
    doctor: ""
});
const buttonText = computed(()=>{
    if(step.value == 2){
        return "完成"
    }
    return "下一步"
})
const step = ref(0);
const doctors = ref(["陈医生", "赵医生", "徐医生"]);
</script>

<style></style>
