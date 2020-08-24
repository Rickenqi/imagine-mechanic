<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/dashboard' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户汽车登记</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card-1">
      <h2 class="box-title">登记单</h2>
      <el-form :model="input_form" :rules="rules" ref="inputformRef">
        <p>车主姓名：</p>
        <el-form-item prop="owner_name">
          <el-input v-model="input_form.owner_name" placeholder="车主姓名"></el-input>
        </el-form-item>
        <p>车牌号：</p>
        <el-form-item prop="car_id">
          <el-input v-model="input_form.car_id" placeholder="车牌号"></el-input>
        </el-form-item>
        <p>车型：</p>
        <el-form-item prop="car_type">
          <el-input v-model="input_form.car_type" placeholder="车型"></el-input>
        </el-form-item>
        <p>电话：</p>
        <el-form-item prop="owner_phone">
          <el-input v-model="input_form.owner_phone" placeholder="电话"></el-input>
        </el-form-item>
        <p>邮箱：</p>
        <el-form-item prop="owner_email">
          <el-input v-model="input_form.owner_email" placeholder="邮箱"></el-input>
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
        owner_name: '',
        car_id: '',
        car_type: '',
        owner_phone: '',
        owner_email: ''
      },
      rules: {
        owner_name: [{ required: true, message: '不能为空', trigger: 'change' }],
        car_id: [{ required: true, message: '不能为空', trigger: 'change' }],
        car_type: [{ required: true, message: '不能为空', trigger: 'change' }],
        owner_phone: [{ required: true, message: '不能为空', trigger: 'change' }],
        owner_email: [{ required: true, message: '不能为空', trigger: 'change' }]
      }
    }
  },
  methods: {
    clearInput() {
      this.input_form = {
        owner_name: '',
        car_id: '',
        car_type: '',
        owner_phone: '',
        owner_email: ''
      }
    },
    inputSubmit() {
      this.$refs.inputformRef.validate(async valid => {
        if (!valid) return this.$message.error('格式错误')
        const {data: res} = await this.$http.post(
                'carregister',
                JSON.stringify(this.input_form),
                {
                  headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                  }
                }
        )
        console.log(res)
        if (res.code === 1) {
          this.clearInput()
          return this.$message.success('录入成功')
        }
        return this.$message.error(res.msg)
        // 用axios提交表单交互
        // console.log(this.input_form)
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
