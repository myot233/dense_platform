<template>

  <el-form :model="form">
    <el-form-item label="上传图片:">
      <div v-for="uploadImage in uploadImages" style="margin-right: 16px">
        <el-image :src="uploadImage" style="max-width: 200px"></el-image>
      </div>
    </el-form-item>

    <el-form-item label="医生">
      <el-link type="primary">{{ form.doctor }}</el-link>
    </el-form-item>

    <el-form-item label="患者">
      <el-link type="primary">{{ form.user }}</el-link>
    </el-form-item>
    <el-form-item>
      <el-text>当前检测状态:
        <el-tag :type="color(form.current_status)">{{ argsComputed(form.current_status) }}</el-tag>
      </el-text>
    </el-form-item>
    <div v-if="commonStore.usertype == UserType.Patient">
      <div v-if="form.current_status == Status.Completed">
        <el-form-item label="检测结果参考:">
          <p></p>
        </el-form-item>

        <el-form-item label="医生评价">
          <el-input v-model="form.diagnose"  type="textarea" readonly></el-input>
        </el-form-item>
      </div>
      <el-text v-else>医生正在检测您的报告中，请耐心等待</el-text>
    </div>
    <div v-else>
      <el-form>
        <el-form-item label="诊断结果:">
          <el-input v-model="form.diagnose" type="textarea" placeholder="请输入诊断结果" style="width: 50%"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="warning" >检测</el-button>
          <el-button type="primary" @click="submitDiagnose()" >发布</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-form>

</template>


<script lang="ts" setup>
import {useRoute, useRouter} from 'vue-router';
import {computed, inject, ref} from "vue";
import {useCommonStore} from "@/store";
import {axiosInstance, getImageData, getImagesOfReport} from "@/api";
import type {VueCookies} from "vue-cookies";
import {ImageType, UserType} from "@/common";
const comments = ref([{
  user:"abc",
  content:"hello world"
}])

type Comment = {
  user: string,
  content: string
}

type ReportDetailResponse = {
  id: number,
  user: string,
  doctor: string,
  submitTime: string,
  current_status: Status,
  diagnose: string,
  comments: Comment[]
}

enum Status {
  Checking = 0,
  Completed = 1,
  Abnormality = 2,
  Error = 3,
}

type Report = {
  id: number,
  doctor: string,
  submitTime: string,
  current_status: Status,
}
const color = (status: Status) => {
  switch (status) {
    case Status.Checking:
      return "primary";
    case Status.Completed:
      return "success";
    case Status.Abnormality:
      return "warning";
    case Status.Error:
      return "danger";
  }
}
const argsComputed = (status: Status) => {
  return computed(() => {
    switch (status) {
      case Status.Completed:
        return "检测完成";
      case Status.Abnormality:
        return "状态异常";
      case Status.Error:
        return "检测错误"
      case Status.Checking:
        return "检测中"
    }
  })
}
const router = useRouter();
const routes = useRoute();
const id = routes.params.id;
const commonStore = useCommonStore();
const $cookies = inject<VueCookies>("$cookies");
router.beforeEach((to, from) => {
  console.log(from);
  console.log(to);
  const to_path_arr = to.path.split("/");
  const from_path_arr = from.path.split("/")
  if (to.path == "/history") return true;
  if (from_path_arr[1] === "history" && to_path_arr[1] === "history" && from_path_arr.length > 2) {

    return "/" + to_path_arr[to_path_arr.length - 1];
  }

  return true;
})

const form = ref<ReportDetailResponse>({
  comments: [], 
  current_status: Status.Completed, 
  diagnose: "", 
  doctor: "", 
  id: 0, 
  submitTime: "", 
  user: ""
});
const uploadImages = ref<string[]>([]);

getImagesOfReport($cookies?.get("token"), Number(id), ImageType.source).then(async (x) => uploadImages.value = await Promise.all(x.data.images.map(async (x: number) => URL.createObjectURL((await getImageData($cookies?.get("token"), Number(x))).data))));
axiosInstance.post("/report/detail", {
  token: $cookies?.get("token"),
  id: id,
}).then((resp) => {
  form.value = resp.data;
})

function submitDiagnose(){
  axiosInstance.post("/report/diagnose/submit",{
      token:$cookies?.get("token"),
      id:form.value.id,
      diagnose:form.value.diagnose
  })
  
}

</script>