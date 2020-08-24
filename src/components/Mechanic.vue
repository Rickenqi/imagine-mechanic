<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/dashboard' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>零件信息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card-1">
      <h2 class="box-title">零件详情</h2>
      <!-- 搜索功能 -->
      <span>
        技师号：
        <el-input placeholder="请输入内容" v-model="queryInfo.mechanicId"></el-input>
      </span>
      <span>
        姓名：
        <el-input placeholder="请输入内容" v-model="queryInfo.mechanicName"></el-input>
      </span>
      <span>
        资历：
        <el-input placeholder="请输入内容" v-model="queryInfo.mechanicLv"></el-input>
      </span>
      <el-button icon="el-icon-search" @click="getData()"></el-button>
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="carpartId" label="零件号">
          <template slot-scope="scope">
            <a :href="'/worker/list/'+scope.row.mechanicId">{{scope.row.mechanicId}}</a>
          </template>
        </el-table-column>
        <el-table-column prop="mechanicId" label="职工号"></el-table-column>
        <el-table-column prop="mechanicName" label="职工姓名"></el-table-column>
        <el-table-column prop="mechanicLv" label="职工资历"></el-table-column>
        <el-table-column prop="mechanicPhone" label="职工手机号"></el-table-column>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[10, 20, 50]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next"
        :total="total"
      ></el-pagination>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      queryInfo: {
        mechanicId: '',
        mechanicName: '',
        mechanicLv: '',
        mechanicPhone: '',
        pageNum: 1,
        pageSize: 20
      },
      total: 0,
      tableData: []
    }
  },
  created: function() {
    this.getData()
  },
  methods: {
    getTable() {
      console.log(this.queryInfo)
    },
    async getData() {
      // console.log(this.queryInfo)
      const { data: res } = await this.$http.get('worker/list', {
        params: this.queryInfo
      })
      console.log(res.data)
      const table = res.data.list
      this.tableData = []
      for (var idx in table) {
        this.tableData.push({
          mechanicId: table[idx].mechanicId,
          mechanicName: table[idx].mechanicName,
          mechanicLv: table[idx].mechanicLv,
          mechanicPhone: table[idx].mechanicPhone,
        })
      }
      this.total = res.data.total
    },
    // 页大小改变
    handleSizeChange(val) {
      this.queryInfo.pagesize = val
      this.getData()
      // console.log(`每页 ${val} 条`)
    },
    // 页码改变
    handleCurrentChange(val) {
      this.queryInfo.pagenum = val
      this.getData()
      // console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style lang="less" scoped>
.el-input {
  width: 150px;
  margin: 10px;
}
.box-title {
  font-size: 20px;
  font-family: '微软雅黑';
  border-bottom: 3px solid rgba(207, 19, 19, 0.438);
}
.inputbtn {
  float: right;
  transform: translateY(-20%);
}
</style>
