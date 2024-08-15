<template>

  <el-form :model="form">

    <el-form-item label="Primary Point of Interest:">
      <el-image></el-image>
    </el-form-item>

    <el-form-item label="医生">
      <el-link type="primary">{{ form.doctor }}</el-link>
    </el-form-item>

    <el-form-item label="患者">
      <el-link type="primary">{{ form.patient }}</el-link>
    </el-form-item>

    <el-form-item label="检测结果参考:">
      <p>{{ form.diagnosis }}</p>
    </el-form-item>

    <el-form-item label="医生评价">
      <el-input v-model="form.doctorFeedback" type="textarea"></el-input>
    </el-form-item>
  </el-form>
</template>


<script lang="ts" setup>
import {useRoute, useRouter} from 'vue-router';
import {inject, ref} from "vue";
import {useHistoryStore} from "@/store";
import {getImagesOfReport} from "@/api";
import type {VueCookies} from "vue-cookies";
import {ImageType} from "@/common";

const router = useRouter();
const routes = useRoute();
const id = routes.params.id

let form = ref({
  primaryPoint: false,
  image:[],
  doctor: '',
  patient: '',
  diagnosis: '',
  doctorFeedback: '',
})
const $cookies = inject<VueCookies>("$cookies");
const store = useHistoryStore();
form.value.doctor = store.doctor;
form.value.patient = store.patient;
getImagesOfReport($cookies?.get("token"),store.id,ImageType.source).then(async (x)=>{
  for (let i in x.data.images){
    imageUrl.value = URL.createObjectURL(await )
  }
});

</script>