<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/dashboard' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>账单</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="box-card-1">
            <h2 class="box-title">账单</h2>
            <!-- 搜索功能 -->
            <span>
            注册号：
            <el-input placeholder="请输入内容" v-model="queryInfo.mechanicId"></el-input>
            </span>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="billId" label="账单号"></el-table-column>
                <el-table-column prop="registerId" label="注册号"></el-table-column>
                <el-table-column prop="payment" label="支付金额"></el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                queryInfo: {
                    billId: '',
                    registerId: '',
                    payment: ''
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
                const { data: res } = await this.$http.get('/bill', {
                    params: this.queryInfo
                })
                console.log(res.data)
                const table = res.data.list
                this.tableData = []
                for (var idx in table) {
                    this.tableData.push({
                        billId: table[idx].billId,
                        registerId: table[idx].registerId,
                        payment: table[idx].payment,
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
