<template>
  <div class="common-layout">
    <el-container>
      <el-header style="height: auto">
        <Header :name></Header>
      </el-header>
      <el-container>
        <el-aside width="250px">
          <el-menu default-active="1" class="el-menu-vertical-demo" @select="handleSelect">
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
                  <Notification />
                </el-icon>
                <span>检测管理</span>
              </template>
              <el-menu-item index="3-1">
                <el-icon>
                  <PieChart />
                </el-icon>
                <span>龋齿检测</span>
              </el-menu-item>
              <el-menu-item index="3-2">
                <el-icon>
                  <Clock />
                </el-icon>
                <span>历史记录</span>
              </el-menu-item>
            </el-sub-menu>

            <!-- <el-sub-menu index="1">
          <template #title>
            <el-icon><location /></el-icon>
            <span>Navigator One</span>
          </template>
          <el-menu-item-group title="Group One">
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item two</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group Two">
            <el-menu-item index="1-3">item three</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="1-4">
            <template #title>item four</template>
            <el-menu-item index="1-4-1">item one</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-menu-item index="2">
          <el-icon><icon-menu /></el-icon>
          <span>Navigator Two</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <el-icon><document /></el-icon>
          <span>Navigator Three</span>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon><setting /></el-icon>
          <span>Navigator Four</span>
        </el-menu-item> -->
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


<script setup>
import Header from './components/parts/Header.vue';
import { House, User, Notification, PieChart, Clock } from '@element-plus/icons-vue';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const router = useRouter();
let name = ref("陈平")
router.push("home");
function handleSelect(index) {
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