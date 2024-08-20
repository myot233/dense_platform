<template>
    <el-card>
        <el-steps :active="step" finish-status="success" align-center>
            <el-step title="选择医生" />
            <el-step title="上传图片" />
            <el-step title="等待结果" />
        </el-steps>
        <div style="margin: 16px">
            <div v-if="step == 0" style="display: flex;justify-content:center">
                <el-form style="min-width: 600px">
                    <el-form-item  label="选择一位医生">
                        <el-select   style="text-align: end" placeholder="请选择" v-model="form.doctor">
                            <el-option  v-for="doctor in doctors" :label="doctor.name" :value="doctor.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <div v-if="step == 1" style="display: flex;justify-content:center">
                <el-form>
                    <el-form-item label="上传图片:">
                        <Uploads  @onSuccess="(resp:any)=>{console.log(resp);form.images.push(resp.image as number)}"></Uploads>
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
      <div style="display: grid; grid-template-columns:auto 1fr auto;margin:auto 25%">
        <el-button v-if="step >= 1" @click="()=> { step-- }">上一步</el-button>
        <div v-else></div>
        <div></div>
        <el-button @click="()=> {if(step++ >= 2){
            router.push('history');
            submitReport($cookies.get('token'),form.doctor,form.images).then(x=>{
            
            })
        } }">{{ buttonNextText }}</el-button>
      </div>
    </el-card>
</template>


<script lang="ts" setup>
import {ref, watch, computed, inject} from "vue"
import Uploads from "../parts/Uploads.vue";
import { useRouter } from "vue-router";
import {getDoctors, submitReport} from "@/api";
import type {VueCookies} from "vue-cookies";
import type {UserSex} from "@/common";
import {useCommonStore} from "@/store";

const router = useRouter();
const form = ref({
    doctor: "",
    images:[] as number[],
});
const buttonNextText = computed(()=>{
    if(step.value == 2){
        return "完成"
    }
    return "下一步"
})



const step = ref(0);
const doctors = ref<{
  id:string, 
  name:string,
  sex:UserSex,
  position:string,
  workplace:string
}[]>();
const $cookies = inject<VueCookies>('$cookies');
if($cookies?.isKey("token")){
  getDoctors($cookies?.get('token')).then((x)=>{
    doctors.value = x.data.doctors
  })
}

</script>

<style></style>
