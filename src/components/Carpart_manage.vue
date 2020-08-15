<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/dashboard' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>零件信息管理</el-breadcrumb-item>
      <el-breadcrumb-item>员工信息管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card-1">
      <h2 class="box-title">零件信息管理</h2>
      <p>注：零件号缺省情况下为录入新零件</p>
      <el-form :model="input_form" :rules="rules" ref="inputformRef">
        <p>零件号：</p>
        <el-form-item prop="carpartId">
          <el-input v-model="input_form.carpartId" placeholder="零件号"></el-input>
        </el-form-item>
        <p>零件名称：</p>
        <el-form-item prop="carpart_name">
          <el-input v-model="input_form.carpart_name" placeholder="零件名称"></el-input>
        </el-form-item>
        <p>零件制造商：</p>
        <el-form-item prop="manufacturer">
          <el-input v-model="input_form.manufacturer" placeholder="零件制造商"></el-input>
        </el-form-item>
        <p>零件价格：</p>
        <el-form-item prop="carpart_price">
          <el-input v-model="input_form.carpart_price" placeholder="零件价格">
          </el-input>
        </el-form-item>
        <p>零件数量：</p>
        <el-form-item prop="reserve_amount">
          <el-input v-model="input_form.reserve_amount" placeholder="零件数量">
          </el-input>
        </el-form-item>
        <el-button type="primary" @click="inputSubmit()" class="inputbtn">录入</el-button>
      </el-form>
    </el-card>
    <el-card class="box-card-2">
      <h2 class="box-title">删除零件信息</h2>
      <el-form :model="del_form" :rules="rules" ref="delformRef">
        <p>零件号：</p>
        <el-form-item prop="id_del">
          <el-input v-model.number="del_form.id_del" placeholder="零件号"></el-input>
        </el-form-item>
        <el-button type="primary" @click="delSubmit()" class="inputbtn">删除</el-button>
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
        carpart_name: '',
        manufacturer: '',
        carpart_price: '',
        reserve_amount: ''
      },
      del_form: {
        id_del: ''
      },
      rules: {
        id_del: [{ required: true, message: '不能为空', trigger: 'change' }]
      }
    }
  },
  methods: {
    clearInput() {
      this.input_form = {
        carpartId: '',
        carpart_name: '',
        manufacturer: '',
        carpart_price: '',
        reserve_amount: ''
      }
    },
    clearDel() {
      this.del_form = {
        id_del: ''
      }
    },
    inputSubmit() {
      this.$refs.inputformRef.validate(async valid => {
        if (!valid) return this.$message.error('格式错误')
        const anf = this.input_form
        const { data: res } = await this.$http.post(
          'altercarpart',
          JSON.stringify(anf),
          {
            headers: {
              'Content-Type': 'application/json; charset=UTF-8'
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
    },
    delSubmit() {
      this.$refs.delformRef.validate(async valid => {
        if (!valid) return this.$message.error('格式错误')
        const { data: res } = await this.$http.post(
          'delcarpart',
          JSON.stringify(this.del_form.id_del),
          {
            headers: {
              'Content-Type': 'application/json; charset=UTF-8'
            }
          }
        )
        console.log(res)
        if (res.code === 1) {
          this.clearDel()
          return this.$message.success('删除成功')
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
