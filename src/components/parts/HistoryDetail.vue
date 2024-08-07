<template>

  <el-form :model="form">

    <el-form-item label="Primary Point of Interest:">
      <img src="" alt="Teeth Image" class="teeth-image">
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
import {ref} from "vue";

const router = useRouter();
const routes = useRoute();
const id = routes.params.id

let form = ref({
  primaryPoint: false,
  image:"",
  doctor: 'doctor - 医生',
  patient: 'user01 - 患者1号',
  diagnosis: '0度软组织方面: ...',
  doctorFeedback: '',
})

</script>