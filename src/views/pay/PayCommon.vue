<template>
    <div>
        <h2> {{ payment.name }} </h2>
        <el-form ref="payment" :model="form" label-width="70px" label-position="left">
            <!-- p1 start -->
            <div v-if=" payment.p1method != 'NOT' ">
                <div v-if=" payment.p1method == 'FILL' ">
                    <el-form-item :label="payment.p1name" class="p-label">
                        <el-input v-model="form.p1" class="p-input"></el-input>
                    </el-form-item>
                </div>

                <div v-if=" payment.p1method == 'SELECT' ">
                    <el-form-item :label="payment.p1name" class="p-label">
                        <el-select placeholder="请选择对应的选项" class="p-input" v-model="form.p1">
                            <div v-for="(opt, index) in payment.p1opt"
                                 :key="opt.key">
                                <el-option :label="opt.value" :value="opt.value"></el-option>
                            </div>
                        </el-select>
                    </el-form-item>
                </div>
            </div>
            <!-- p1 end -->

            <!-- p2 start -->
            <div v-if=" payment.p2method != 'NOT' ">
                <div v-if=" payment.p2method == 'FILL' ">
                    <el-form-item :label="payment.p2name" class="p-label">
                        <el-input v-model="form.p2" class="p-input"></el-input>
                    </el-form-item>
                </div>

                <div v-if=" payment.p2method == 'SELECT' ">
                    <el-form-item :label="payment.p2name" class="p-label">
                        <el-select placeholder="请选择对应的选项" class="p-input" v-model="form.p2">
                            <div v-for="(opt, index) in payment.p1opt"
                                 :key="opt.key">
                                <el-option :label="opt.value" :value="opt.value"></el-option>
                            </div>
                        </el-select>
                    </el-form-item>
                </div>
            </div>
            <!-- p2 end -->


            <!-- 收费项 start-->
            <div v-for="(item, index) in payment.items"
                 :key="item.key">

                <div v-if="item.method == 'FILL'">
                    <el-form-item :label="item.name" class="p-label">
                        <el-input v-model="form.amt[index]" class="p-input" placeholder="请输入缴费的金额"></el-input>
                    </el-form-item>
                </div>

                <div v-if="item.method == 'SELECT'">
                    <el-form-item :label="item.name" class="p-label">
                        <el-select placeholder="请选择对应的选项" class="p-input" v-model="form.amt[index]">
                            <div v-for="(o, index) in item.opt"
                                 :key="o.key">
                                <el-option :label="o.name + '---' + o.amt + '元'" :value="o.amt"></el-option>
                            </div>
                        </el-select>
                    </el-form-item>
                </div>
            </div>

            <!-- 收费项 end-->

            <!-- 票据信息 start-->

            <div v-if="payment.isBill == 'TRUE'">

                <el-form-item label="单位名称" class="p-label">
                    <el-select placeholder="请选择对应的选项"
                               class="p-input"
                               v-model="form.zzUnit"
                               @change="changeBill">
                        <div v-for="(bill, index) in bills"
                             :key="bill.key">
                            <el-option :label="bill.zzUnit" :value="bill.zzUnit"></el-option>
                        </div>
                    </el-select>
                </el-form-item>

                <el-form-item label="税号" class="p-label">
                    <el-input v-model="form.taxCode" class="p-input" disabled></el-input>
                </el-form-item>

                <el-form-item label="电话号码" class="p-label">
                    <el-input v-model="form.zzTel" class="p-input" disabled></el-input>
                </el-form-item>

                <el-form-item label="公司地址" class="p-label">
                    <el-input v-model="form.zzAddress" class="p-input" disabled></el-input>
                </el-form-item>

                <el-form-item label="银行名称" class="p-label">
                    <el-input v-model="form.zzBnkName" class="p-input" disabled></el-input>
                </el-form-item>

                <el-form-item label="开户账号" class="p-label">
                    <el-input v-model="form.zzBank" class="p-input" disabled></el-input>
                </el-form-item>

            </div>

            <!-- 票据信息 end -->


            <!-- 备注 start -->
            <div v-if="payment.remark != ''">
                <el-form-item label="备注" class="p-label">
                    <el-input class="p-input" type="textarea" :rows="3" v-model="payment.remark" disabled></el-input>
                </el-form-item>
            </div>
            <!-- 备注 end -->


            <el-form-item class="p-label">
                <el-button type="primary" class="sub-btn" @click="subPage">提交</el-button>
                <el-button type="danger" class="sub-btn" @click="resetPage">重置</el-button>
            </el-form-item>
        </el-form>


        <form id="nic_form" action="http://jf.finance.upc.edu.cn/payment/pay/mobileAppPay.action" method="post">
            <input type="hidden" name="sign" v-model="wx.subSign">
            <input type="hidden" name="sysid" v-model="wx.subSysid">
            <input type="hidden" name="subsysid" v-model="wx.subSubsysid">
            <input type="hidden" name="data" v-model="wx.subData">
        </form>

        <check-msg></check-msg>
    </div>

</template>

<script>
    import {getPaymentPageData, allBill, getPaymentData} from '../../api/api'
    import CheckMsg from "../CheckMsg";

    export default {
        name: "PayCommon",
        components: {CheckMsg},
        data() {
            return {
                payid: '',
                payment: {},
                form: {
                    amt: [],
                    taxCode: ''
                },
                bills: [],
                wx: {
                    subSign: '',
                    subSysid: '',
                    subSubsysid: '',
                    subData: ''
                }
            }
        },
        mounted() {
            let id = this.$route.query.id;
            let self = this;
            if (id !== undefined) {
                self.payid = id;
                let param = {
                    id: id
                };
                getPaymentPageData(param).then((res) => {
                    self.payment = res.data;
                });

                allBill().then((res) => {
                    self.bills = res.data;
                })
            }
        },
        methods: {
            changeBill(zzUnit) {
                let self = this;
                let obj = {};
                obj = this.bills.find((item) => {
                    return item.zzUnit === zzUnit;
                });
                self.form.taxCode = obj.taxCode;
                self.form.zzBank = obj.zzBank;
                self.form.zzTel = obj.zzTel;
                self.form.zzBnkName = obj.zzBnkName;
                self.form.zzAddress = obj.zzAddress;
            },
            resetPage() {
                this.form = {amt: [], taxCode: ''};

            },
            subPage() {
                let self = this;
                self.form.id = self.payid;
                for (let i = 0; i < self.form.amt.length; i++) {
                    if (!self.checkNumber(self.form.amt[i])) {
                        self.$message({
                            showClose: true,
                            message: '金额必须是数字',
                            type: 'error'
                        });
                        return false;
                    }
                }
                getPaymentData(self.form).then((res) => {
                    if (res.code == 0) {
                        self.nicFormSub(res.data).then(() => {
                            nic_form.submit();
                        })
                    } else {
                        self.$message({
                            showClose: true,
                            message: res.msg,
                            type: 'error'
                        });
                    }
                })
            },
            nicFormSub(wxdata) {
                let self = this;
                return new Promise((resolve, reject) => {
                    self.wx = wxdata;
                    resolve();
                });
            }, checkNumber(theObj) {
                let reg = /^[0-9]+.?[0-9]*$/;
                if (reg.test(theObj)) {
                    return true;
                }
                return false;
            },
        }
    }
</script>

<style>
    h2 {
        font-weight: bold;
        text-align: center;
    }

    .p-input {
        width: 90%;
    }

    .p-label {
        margin-left: 10px;
    }


</style>