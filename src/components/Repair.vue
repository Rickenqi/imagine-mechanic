<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/dashboard' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>修理单填写</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card-1">
      <h2 class="box-title">修理单</h2>
      <el-form :model="input_form" :rules="rules" ref="inputformRef">
        <p>登记单号：</p>
        <el-form-item prop="register_id">
          <el-input v-model="input_form.register_id" placeholder="登记单号"></el-input>
        </el-form-item>
        <p>零件号：</p>
        <el-form-item prop="carpartId">
          <el-input v-model="input_form.carpartId" placeholder="零件号"></el-input>
        </el-form-item>
        <p>修理项：</p>
        <el-form-item prop="repair_task">
          <el-input v-model="input_form.repair_task" placeholder="修理项"></el-input>
        </el-form-item>
        <el-button type="primary" @click="inputSubmit()" class="inputbtn">提交</el-button>
      </el-form>
    </el-card>
    <el-card class="box-card-1">
      <h2 class="box-title">注册单详情</h2>
      <!-- 搜索功能 -->
      <span>
        车主：
        <el-input placeholder="请输入内容" v-model="queryInfo.ownerName"></el-input>
      </span>
      <span>
        车牌号：
        <el-input placeholder="请输入内容" v-model="queryInfo.carId"></el-input>
      </span>
      <span>
        车型：
        <el-input placeholder="请输入内容" v-model="queryInfo.carType"></el-input>
      </span>
      <el-button icon="el-icon-search" @click="getData()"></el-button>
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="ownerName" label="车主"></el-table-column>
        <el-table-column prop="carType" label="车型"></el-table-column>
        <el-table-column prop="carId" label="车牌号"></el-table-column>
        <el-table-column prop="ownerPhone" label="车主电话"></el-table-column>
        <el-table-column prop="ownerEmail" label="车主邮箱"></el-table-column>
      </el-table>
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
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      queryInfo: {
        ownerName: '',
        carId: '',
        carType: '',
        pageNum: 1,
        pageSize: 20
      },
      total: 0,
      tableData: [],
      input_form: {
        register_id: '',
        mechanic_id: window.sessionStorage.getItem("user_id"),
        carpartId: '',
        repair_task: ''
      },
      rules: {
        register_id: [{ required: true, message: '不能为空', trigger: 'change' }],
        mechanic_id: [{ required: true, message: '不能为空', trigger: 'change' }],
        carpartId: [{ required: true, message: '不能为空', trigger: 'change' }],
        repair_task: [{ required: true, message: '不能为空', trigger: 'change' }]
      }
    }
  },
  created: function() {
    this.getData()
  },
  methods: {
    getTable() {
      console.log(this.queryInfo)
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
    },
    async getData() {
      console.log(this.queryInfo)
      const { data: res } = await this.$http.get('carregister/list', {
          params: this.queryInfo
      })
      this.tableData = []
      for (var idx in res.data) {
        var cur = res.data[idx]
        this.tableData.push({
          ownerName: cur.ownerName,
          carId: cur.carId,
          carType: cur.carType,
          ownerPhone: cur.ownerPhone,
          ownerEmail:cur.ownerEmail
        })
      }
      this.total = res.data.total
      console.log(this.tableData)
    },
    clearInput() {
      this.input_form = {
        list_id: '',
        reader_id: ''
      }
    },
    inputSubmit() {
      this.$refs.inputformRef.validate(async valid => {
        if (!valid) return this.$message.error('格式错误')
        // 用axios提交表单交互
        // console.log(this.input_form)
        const { data: res } = await this.$http.post('/carrepair', this.input_form)
        console.log(res)
        if (res.code === 1) {
          this.clearInput()
          return this.$message.success('提交成功')
        }
        return this.$message.error(res.msg)
      })
    }
  }
}
</script>

<style lang="less" scoped>
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
