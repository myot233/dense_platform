<template>
    <el-row>
        <el-card>

            <div style="display: flex;flex-basis: content;">
                <el-text style="margin-right: 16px;" size="large">头像:</el-text>
                <Upload @onSuccess="response => uploadAvatar($cookies.get('token'),response.image).then(x=>{
                  if(x.data.code == '0'){
                    ElMessage.success('上传成功');
                  }
                })"></Upload>
            </div>

        </el-card>
    </el-row>

    <el-row>
        <el-card>
            <el-form :model="store.detail" label-width="auto" style="max-width: 600px">
              <el-form-item label="用户ID:">
                <el-text>{{ store.username }}</el-text>
              </el-form-item>  
              <el-form-item label="用户名:">
                    <el-input v-model="store.detail.name" />
                </el-form-item>
                <el-form-item label="密码:">
                    <el-button type="primary">重置密码</el-button>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio-group v-model="store.detail.sex">
                        <el-radio :value="UserSex.Male">男性</el-radio>
                        <el-radio :value="UserSex.Female">女性</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="出生日期">
                    <el-date-picker v-model="store.detail.birth" type="date" placeholder="选择你的出生日期" value-format="YYYY-MM-DD" format="YYYY-MM-DD" style="width: 100%" />
                </el-form-item>
                <el-form-item label="联系方式">
                    <el-input v-model="store.detail.phone" />
                </el-form-item>
                <el-form-item label="电子邮箱">
                    <el-input v-model="store.detail.email" />
                </el-form-item>
                <el-form-item label="居住地址">
                    <el-input v-model="store.detail.address" />
                </el-form-item>
                <el-form-item>
                <el-button type="primary" @click="onSubmit">保存信息</el-button>
    </el-form-item>
            </el-form>
        </el-card>
    </el-row>
    
</template>

<script setup lang="ts">
import { inject, ref } from "vue";
import Upload from "../parts/Upload.vue"
import { type VueCookies } from "vue-cookies";
import { getUserInfo, submitUserInfo,uploadAvatar} from "@/api";
import {UserSex} from "@/common";
import {ElMessage} from "element-plus";
import {useCommonStore} from "@/store";

const store = useCommonStore()
const imageUrl = ref();
const $cookies = inject<VueCookies>("$cookies")


function onSubmit(){
    submitUserInfo($cookies?.get("token"),store.detail).then(x=>{
        if(x.data.code == '0'){
          ElMessage.success("信息保存成功")
          return;
        }else{
          ElMessage.error(x.data.message)
        }
    }).catch((reason)=>{
      ElMessage.error(reason);
    })
}



</script>


<style scoped>
.el-card {
    width: 100%;
    border-radius: 8px;
    margin-bottom: 8px;

}
</style>
