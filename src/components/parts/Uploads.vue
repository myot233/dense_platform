<template>
  <el-upload
      v-model:file-list="fileList"
      :action="API_ADDRESS +  '/api/image' "
      :headers="{token:$cookies.get('token')}"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
  >
    <el-icon><Plus /></el-icon>
  </el-upload>

  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'

import type { UploadProps, UploadUserFile } from 'element-plus'
import Upload from "@/components/parts/Upload.vue";
import {API_ADDRESS} from "@/common";

const fileList = ref<UploadUserFile[]>([])

const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const emit = defineEmits<{
  (e: 'onSuccess', response: any): void
}>()
const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}

const handleSuccess:UploadProps['onSuccess'] = (response,uploadFile) => {
    emit('onSuccess', response)
}
</script>