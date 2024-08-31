<template>
  <div class="common-layout">
    <el-container>
      <el-header style="height: auto">
        <Header :name="store.username" :login></Header>
      </el-header>
      <el-container>
        <el-aside width="250px">
          <el-menu :router="true" ref="menu" @open="index => console.log(route.path)"   :default-active="route.path" class="el-menu-vertical-demo" @select="handleSelect" >
            <el-menu-item index="/home">
              <el-icon>
                <House></House>
              </el-icon>
              <span>主页</span>
            </el-menu-item>
            <el-menu-item index="/personal">
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
              <el-menu-item index="/check">
                <el-icon>
                  <PieChart/>
                </el-icon>
                <span>龋齿检测</span>
              </el-menu-item>
              <el-menu-item index="/history">
                <el-icon>
                  <Clock/>
                </el-icon>
                <span>历史记录</span>
              </el-menu-item>
            </el-sub-menu>
          </el-menu>

        </el-aside>
        <el-container>
          <el-main style="background-color: #EBEEF5;height: 100%">
            <RouterView ></RouterView>
          </el-main>

        </el-container>
      </el-container>
    </el-container>
  </div>
</template>


<script setup lang="ts">
import Header from './components/parts/Header.vue';
import {House, User, Notification, PieChart, Clock} from '@element-plus/icons-vue';
import {ref, inject, onMounted, provide} from 'vue';
import {type VueCookies} from 'vue-cookies';
import {useRoute, useRouter} from 'vue-router';
import {getUserInfo, getUserSimpleInfo} from './api';
import {ElMessage} from 'element-plus';
import {ElMenu} from "element-plus";
import {useCommonStore} from "@/store";
const route = useRoute();
const router = useRouter();
const name = ref("")
const login = ref(false)
const $cookies = inject<VueCookies>('$cookies');
$cookies?.config(Date.now() + 7,"/","localhost")
const menu = ref(null);
const store = useCommonStore();

store.menu = menu;

if ($cookies?.isKey("token")) {
  login.value = true;
  const token:string = $cookies.get("token");
  getUserInfo(token).then(x=>{
    if(x.data.code != "0" && x.data.code != "33") {
      ElMessage.error("获取用户信息失败")
      return;
    }
    store.detail = x.data.form
  }).catch((reason)=>{
    ElMessage.error(reason);
  });
  getUserSimpleInfo(token).then(x=>{
    if(x.data.code != "0" && x.data.code != "33") {
      ElMessage.error("获取用户信息失败")
      return;
    }
    store.username = x.data.user.id;
    store.usertype = x.data.user.type;
  }).catch((reason)=>{
    ElMessage.error(reason);
  });

}


router.replace("home");


function handleSelect(index: string) {
  if (!$cookies?.isKey("token")) {
    ElMessage.error("请登录后使用本系统");
    return;
  }
  // 直接把index改成对应的route应该也可以
  switch (index) {
    case "1":
      router.replace("home");
      break;
    case "2":
      router.replace("personal");
      break;
    case "3-1":
      router.replace("check");
      break;
    case "3-2":
      router.replace("history");
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