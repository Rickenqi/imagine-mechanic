<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/dashboard' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>零件领用</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card-1">
      <h2 class="box-title">零件领用单</h2>
      <el-form :model="input_form" :rules="rules" ref="inputformRef">
        <p>零件号：</p>
        <el-form-item prop="carpartId">
          <el-input v-model="input_form.carpartId" placeholder="图书ID"></el-input>
        </el-form-item>
        <p>数量：</p>
        <el-form-item prop="usage_amount">
          <el-input v-model="input_form.usage_amount" placeholder="读者ID"></el-input>
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
        carpartId: '',
        usage_amount: ''
      },
      rules: {
        carpartId: [{ required: true, message: '不能为空', trigger: 'change' }],
        usage_amount: [{ required: true, message: '不能为空', trigger: 'change' }]
      }
    }
  },
  methods: {
    clearInput() {
      this.input_form = {
        carpartId: '',
        usage_amount: ''
      }
    },
    inputSubmit() {
      this.$refs.inputformRef.validate(async valid => {
        if (!valid) return this.$message.error('格式错误')
        // 用axios提交表单交互
        // console.log(this.input_form)
        const { data: res } = await this.$http.post('usage', this.input_form)
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
