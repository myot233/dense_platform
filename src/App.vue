<template>
  <div class="common-layout">
    <el-container>
      <el-header style="height: auto">
        <Header :name :login></Header>
      </el-header>
      <el-container>
        <el-aside width="250px">
          <el-menu ref="menu"  default-active="1" class="el-menu-vertical-demo" @select="handleSelect" >
            <el-menu-item index="1">
              <el-icon>
                <House></House>
              </el-icon>
              <span>主页</span>
            </el-menu-item>
            <el-menu-item index="2">
              <el-icon>
                <User></User>
              </el-icon>
              <span>个人信息</span>
            </el-menu-item>
            <el-sub-menu index="3">
              <template #title>
                <el-icon>
                  <Notification/>
                </el-icon>
                <span>检测管理</span>
              </template>
              <el-menu-item index="3-1">
                <el-icon>
                  <PieChart/>
                </el-icon>
                <span>龋齿检测</span>
              </el-menu-item>
              <el-menu-item index="3-2">
                <el-icon>
                  <Clock/>
                </el-icon>
                <span>历史记录</span>
              </el-menu-item>
            </el-sub-menu>
          </el-menu>

        </el-aside>
        <el-container>
          <el-main style="background-color: #EBEEF5">
            <RouterView></RouterView>
          </el-main>

        </el-container>
      </el-container>
    </el-container>
  </div>
</template>


<script setup lang="ts">
import Header from './components/parts/Header.vue';
import {House, User, Notification, PieChart, Clock} from '@element-plus/icons-vue';
import {ref, inject, onMounted} from 'vue';
import {type VueCookies} from 'vue-cookies';
import {useRoute, useRouter} from 'vue-router';
import {getUserInfo} from './api';
import {ElMessage} from 'element-plus';
import { ElMenu} from "element-plus";

const router = useRouter();
const name = ref("")
const login = ref(false)
const $cookies = inject<VueCookies>('$cookies');
const menu = ref(null)


if ($cookies?.isKey("token")) {
  login.value = true;
  const token:string = $cookies.get("token");
  getUserInfo(token).then(resp => {
        name.value = resp.data.form.name;
          
      }
  )

}


router.push("home");


function handleSelect(index: string) {
  if (!$cookies?.isKey("token")) {
    ElMessage.error("请登录后使用本系统");
    return;
  }
  // 直接把index改成对应的route应该也可以
  switch (index) {
    case "1":
      router.push("home");
      break;
    case "2":
      router.push("personal");
      break;
    case "3-1":
      router.push("check");
      break;
    case "3-2":
      router.push("history");
      break;
  }
}


</script>

<style scoped>
.common-layout {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.el-container {
  height: 100%;
  width: 100%;
}
</style>