<template>
  <div>
    <div style="display: flex;align-items: center;margin-top: 16px">
      <el-icon style="max-resolution: res;margin-right: 8px"><Search></Search></el-icon>
      <el-input style="width: 160px;" v-model="search" placeholder="搜索报告号或医生" clearable @clear="handleSearch"></el-input>
    </div>
    <el-table :data="filteredReports" style="width: 100%">
      <el-table-column prop="id" label="报告号" sortable />
      <el-table-column prop="doctor" label="负责医生" sortable />
      <el-table-column prop="submitTime" label="提交时间" sortable>
      </el-table-column>
      <el-table-column label="状态">
        <template #default="scope">
          <el-popover effect="light" trigger="hover" placement="top" width="auto">
            <template #reference>
              <el-tag :type="color(scope.row)">{{ argsComputed(scope.row.current_status ) }}</el-tag>
            </template>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column>
        <template #default="scope">
          <el-button size="small" @click="handleOpen(scope.$index, scope.row)">
            查看报告
          </el-button>
          <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
          >
            删除报告
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
        v-model:current-page="currentPage"
        :page-size="pageSize"
        :total="reports.length"
        layout="total, prev, pager, next"
        style="margin-top: 20px; text-align: center;">
    </el-pagination>
  </div>
</template>

<script lang="ts" setup>
import {Search} from "@element-plus/icons-vue";

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

const argsComputed = (status:Status)=>{
  return computed(()=>{
      switch(status){
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


import { getReports } from "@/api";
import { inject, ref, type Ref, computed } from "vue";
import { type VueCookies } from "vue-cookies";
import {useCommonStore, useHistoryStore} from "@/store";

const reports = ref<Report[]>([]);
const search = ref("");
const currentPage = ref(1);
const pageSize = ref(10);

const $cookies = inject<VueCookies>("$cookies");
if ($cookies?.isKey("token")) {
  getReports($cookies.get("token")).then(x => {
    reports.value = x.data.reports;
  });
}

const color = (scope: Report) => {
  switch (scope.current_status) {
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

const path = inject<Ref<string>>("path")!;

function handleOpen(index: number, row: Report) {
  const historyStore = useHistoryStore();
  const commonStore = useCommonStore();
  historyStore.id = row.id;
  historyStore.doctor = row.doctor;
  historyStore.sub_time = row.submitTime;
  historyStore.patient = commonStore.username;
  path.value = `/${row.id.toString()}`;
}

function handleDelete(index: number, row: Report) {
  // 删除报告逻辑
}

const filteredReports = computed(() => {
  const filtered = reports.value.filter(report =>
      report.id.toString().includes(search.value) || report.doctor.includes(search.value)
  );
  return filtered.slice((currentPage.value - 1) * pageSize.value, currentPage.value * pageSize.value);
});

function handleSearch() {
  currentPage.value = 1;
}
</script>
