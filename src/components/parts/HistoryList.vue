<template>
  <el-table :data="reports">
    <el-table-column prop="reportId" label="报告号"/>
    <el-table-column prop="doctor" label="负责医生"/>
    <el-table-column label="状态">
      <template #default="scope">
        <el-popover effect="light" trigger="hover" placement="top" width="auto">
          <template #reference>
            <el-tag :type="color(scope.row)">{{ scope.row.status }}</el-tag>
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
</template>


<script lang="ts" setup>
enum Status {
  Checking = "检测中",
  Completed = "检测完成",
  Abnormality = "检测异常",
  Error = "检测失败",

}


type Report = {
  reportId: number,
  doctor: string,
  status: Status,
}


import {inject, ref, type Ref} from "vue";
import type { Router } from "vue-router";


const reports = ref<Report[]>([
  {
    reportId: 114514,
    doctor: "陈医生",
    status: Status.Checking,
  }, {
    reportId: 2144,
    doctor: "6a105d51",
    status: Status.Completed

  }
]);

const color = (scope: Report) => {
  switch (scope.status) {
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
  console.log(`${index} at ${row}`)
    path.value = `/${row.reportId.toString()}`;
}

function handleDelete(index: number, row: Report) {

}

</script>
