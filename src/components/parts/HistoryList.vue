<template>
    <el-table :data="reports">
    <el-table-column prop="reportId" label="报告号" />
    <el-table-column prop="doctor" label="负责医生" />
    <el-table-column label="状态" >
        <template #default="scope">
            <el-popover effect="light" trigger="hover" placement="top" width="auto">
          <template #reference>
            <el-tag>{{ scope.row.status }}</el-tag>
          </template>
        </el-popover>
        </template>
    </el-table-column>
    
    <el-table-column>
        <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
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
    Abnormality= "检测异常",
    Error = "检测失败",

}

type Report = {
    reportId:number,
    doctor:string,
    status:Status,
}


import {ref} from "vue";
    const reports = ref<Report[]>([
        {
            reportId:114514,
            doctor:"陈医生",
            status:Status.Checking
        }
    ]);

    function handleEdit(index:number,row:Report){

    }

    function handleDelete(index:number,row:Report){

}

</script>
