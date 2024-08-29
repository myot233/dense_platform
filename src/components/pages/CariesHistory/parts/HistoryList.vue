<template>
  <div>
    <div style="display: flex;align-items: center;margin-top: 16px">


      <div style="margin:8px 0;background: #f4f4f5;padding: 8px 8px;width: 100%">
        <el-icon style="max-resolution: res;margin-right: 8px">
          <Search></Search>
        </el-icon>
        <el-input style="width: 160px; margin-right: 16px" v-model="search" placeholder="搜索报告号或医生" clearable
                  @clear="handleSearch"></el-input>

        <el-divider direction="vertical"></el-divider>
        <el-date-picker
            type="daterange"
            v-model="dataRange"
            range-separator="To"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            :size="'medium'"
        />
        <el-divider direction="vertical"></el-divider>
        <el-button type="primary" :icon="Refresh" @click="refresh()"></el-button>
      </div>
    </div>
    <el-table :data="filteredReports" style="width: 100%">
      <el-table-column prop="id" label="报告号" sortable/>
      <el-table-column prop="doctor" label="负责医生" sortable/>
      <el-table-column prop="submitTime" label="提交时间" sortable>
      </el-table-column>
      <el-table-column label="状态">
        <template #default="scope">
          <el-popover effect="light" trigger="hover" placement="top" width="auto">
            <template #reference>
              <el-tag :type="color(scope.row)">{{ argsComputed(scope.row.current_status) }}</el-tag>
            </template>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
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
          <el-button v-if="store.usertype == UserType.Doctor"
                     type="success"
                     size="small">
            操作报告
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
import {Refresh, Search} from "@element-plus/icons-vue";
import {deleteReport, getReports} from "@/api";
import {computed, inject, ref, watch} from "vue";
import {type VueCookies} from "vue-cookies";
import {useCommonStore, useHistoryStore} from "@/store";
import {useRouter} from "vue-router";
import {UserType} from "@/common";
import {ElMessage} from "element-plus";

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


const reports = ref<Report[]>([]);
const search = ref("");
const currentPage = ref(1);
const pageSize = ref(10);
const store = useCommonStore();
const router = useRouter();
const $cookies = inject<VueCookies>("$cookies");
const dataRange = ref<string[]>([]);

refresh();
router.beforeEach((to, from) => {
  if (to.path == '/history' && from.path == '/check') {
    refresh()
  }
})
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


function handleOpen(index: number, row: Report) {
  router.push(`/history/${row.id.toString()}`);
}

function handleDelete(index: number, row: Report) {
  deleteReport($cookies?.get("token"), row.id).then((x) => {
    if (x.data.code != 0) {
      ElMessage.error(x.data.message)
    }
    reports.value = reports.value.filter((x) => x.id != row.id);
  })
}

const filteredReports = computed(() => {
  const filtered = reports.value.filter(report => {
        const searchExp = report.id.toString().includes(search.value) || report.doctor.includes(search.value);
        const dateExp = dataRange.value.length == 0 || Date.parse(dataRange.value[0]) <= Date.parse(report.submitTime) && Date.parse(report.submitTime) < Date.parse(dataRange.value[1]);
    return searchExp && dateExp;    
  }
  );
  return filtered.slice((currentPage.value - 1) * pageSize.value, currentPage.value * pageSize.value);
});

function handleSearch() {
  currentPage.value = 1;
}

function refresh() {
  if ($cookies?.isKey("token")) {
    getReports($cookies.get("token")).then(x => {
      reports.value = x.data.reports;

    });
  }
}
</script>
