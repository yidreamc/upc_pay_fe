<template>

    <div>
        <h3>支付成功</h3>
        <el-table
                :data="data">
            <el-table-column
                    prop="title">
            </el-table-column>
            <el-table-column
                    prop="value">
            </el-table-column>
        </el-table>
    </div>



</template>
<script>
    export default {
        name: "PayReturn",
        data(){
            return {
                data: [
                    { title: "订单号",value: ""},
                    { title: "总金额",value: ""},
                    { title: "费用名称",value: ""}
                ]
            }
        },
        mounted(){
           let orderId =  this.$route.query.orderId;
           let amt =  this.$route.query.amt;
           let name =  this.$route.query.name;

           this.data[0].value = orderId;
           this.data[1].value = amt;
           this.data[2].value = name;
        }
    }
</script>

<style scoped>

    h3{
        text-align: center;
    }
</style>