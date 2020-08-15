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
  </div>
</template>

<script>
export default {
  data() {
    return {
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
  methods: {
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
        const { data: res } = await this.$http.post('borrow', this.input_form)
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
