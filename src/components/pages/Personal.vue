<template>
    <el-row>
        <el-card>

            <div style="display: flex;flex-basis: content;">
                <el-text style="margin-right: 16px;" size="large">头像:</el-text>
                <Upload upload-url="http://localhost:24552/api/uploadAvatar"></Upload>
            </div>

        </el-card>
    </el-row>

    <el-row>
        <el-card>
            <el-form :model="form" label-width="auto" style="max-width: 600px">
                <el-form-item label="用户名:">
                    <el-input v-model="form.name" />
                </el-form-item>
                <el-form-item label="密码:">
                    <el-button type="primary">重置密码</el-button>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio-group v-model="form.sex">
                        <el-radio value="male">男性</el-radio>
                        <el-radio value="female">女性</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="出生日期">
                    <el-date-picker v-model="form.birth" type="date" placeholder="Pick a date" style="width: 100%" />
                </el-form-item>
                <el-form-item label="联系方式">
                    <el-input v-model="form.phone" />
                </el-form-item>
                <el-form-item label="电子邮箱">
                    <el-input v-model="form.email" />
                </el-form-item>
                <el-form-item label="居住地址">
                    <el-input v-model="form.address" />
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
import { getUserInfo, submitUserInfo } from "@/api";
let imageUrl = ref();
const $cookies = inject<VueCookies>("$cookies")
const form = ref({
    name: "",
    sex: "",
    birth: "",
    phone:"",
    email:"",
    password:"",
    address:""

});

getUserInfo($cookies?.get("token")).then(x=>{
    form.value = x.data.form
});


function onSubmit(){
    submitUserInfo($cookies?.get("token"),form).then(x=>{
        console.log(x)   
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
