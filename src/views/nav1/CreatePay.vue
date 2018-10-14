<template>

    <div>

        <el-form ref="form" :model="form" label-width="80px"
                 :rules="rules"
                 v-loading="loading"
                 style="margin:20px;width:60%;min-width:600px;">
            <el-form-item label="缴费名称" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>

            <el-form-item label="缴费类型">
                <el-select v-model="form.type" placeholder="请选择缴费类型">
                    <el-option label="校外用户" value="NOTSCHOOL"></el-option>
                    <el-option label="校内用户" value="SCHOOL"></el-option>
                </el-select>
            </el-form-item>


            <div v-if="form.type == 'NOTSCHOOL'">

                <!--参数 1 start-->

                <div v-if="form.p1method != 'NOT'">

                    <el-form-item label="参数1名称">
                        <el-col :span="6">
                            <el-input v-model="form.p1name"></el-input>
                        </el-col>
                        <el-col class="line" :span="3">&nbsp;&nbsp; 填入方式</el-col>
                        <el-col :span="5">
                            <el-select v-model="form.p1method" placeholder="请选择填入方式">
                                <el-option label="手动填入" value="FILL"></el-option>
                                <el-option label="用户选择" value="SELECT"></el-option>
                                <el-option label="不采集该参数" value="NOT"></el-option>
                            </el-select>
                        </el-col>

                        <div v-if="form.p1method == 'FILL'">
                            <el-col class="line" :span="3">&nbsp;&nbsp; 校验规则</el-col>
                            <el-col :span="5">
                                <el-select v-model="form.p1code" placeholder="请选择填校验规则">
                                    <el-option label="非空校验" value="NOTEMPTY"></el-option>
                                    <el-option label="手机号校验" value="PHONE"></el-option>
                                    <el-option label="身份证校验" value="ID"></el-option>
                                </el-select>
                            </el-col>
                        </div>


                    </el-form-item>

                    <div v-if="form.p1method == 'SELECT'">
                        <el-form-item label="参数1选项"
                                      v-for="(option, index) in form.p1opt"
                                      :key="option.key">

                            <el-col :span="6">
                                <el-form-item label="">
                                    <el-input v-model="option.value"></el-input>
                                </el-form-item>
                            </el-col>

                            <el-col :span="3">
                                &nbsp;
                            </el-col>

                            <el-col :span="6">
                                <el-button @click.prevent="removeP1Opt(option)">删除</el-button>
                            </el-col>

                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" @click="addP1Opt">添加参数1选项</el-button>
                        </el-form-item>

                    </div>

                </div>

                <!--参数 1 end-->


                <!--参数 2 start-->
                <div v-if="form.p2method != 'NOT'">
                    <el-form-item label="参数2名称">
                        <el-col :span="6">
                            <el-input v-model="form.p2name"></el-input>
                        </el-col>
                        <el-col class="line" :span="3">&nbsp;&nbsp; 填入方式</el-col>
                        <el-col :span="5">
                            <el-select v-model="form.p2method" placeholder="请选择填入方式">
                                <el-option label="手动填入" value="FILL"></el-option>
                                <el-option label="用户选择" value="SELECT"></el-option>
                                <el-option label="不采集该参数" value="NOT"></el-option>
                            </el-select>
                        </el-col>

                        <div v-if="form.p2method == 'FILL'">
                            <el-col class="line" :span="3">&nbsp;&nbsp; 校验规则</el-col>
                            <el-col :span="5">
                                <el-select v-model="form.p2code" placeholder="请选择填校验规则">
                                    <el-option label="非空校验" value="NOTEMPTY"></el-option>
                                    <el-option label="手机号校验" value="PHONE"></el-option>
                                    <el-option label="身份证校验" value="ID"></el-option>
                                </el-select>
                            </el-col>
                        </div>


                    </el-form-item>

                    <div v-if="form.p2method == 'SELECT'">
                        <el-form-item label="参数2选项"
                                      v-for="(option, index) in form.p2opt"
                                      :key="option.key">

                            <el-col :span="6">
                                <el-form-item label="">
                                    <el-input v-model="option.value"></el-input>
                                </el-form-item>
                            </el-col>

                            <el-col :span="3">
                                &nbsp;
                            </el-col>

                            <el-col :span="6">
                                <el-button @click.prevent="removeP2Opt(option)">删除</el-button>
                            </el-col>

                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" @click="addP2Opt">添加参数1选项</el-button>
                        </el-form-item>

                    </div>
                </div>
                <!--参数 2 end-->

            </div>


            <!--收费项 start-->
            <el-form-item label="收费项名" v-for="(item, index) in form.items"
                          :key="item.key">


                <el-col :span="6">
                    <el-input v-model="item.name"></el-input>
                </el-col>
                <el-col class="line" :span="3">&nbsp;&nbsp; 填入方式</el-col>
                <el-col :span="6">
                    <el-select v-model="item.method" placeholder="请选择填入方式">
                        <el-option label="手动填入" value="FILL"></el-option>
                        <el-option label="用户选择" value="SELECT"></el-option>
                    </el-select>
                </el-col>

                <el-col :span="3">
                    &nbsp;
                </el-col>

                <el-col :span="6">
                    <el-button @click.prevent="removeItem(item)">删除</el-button>
                </el-col>

                <div style="height: 50px"></div>

                <!--每个收费项的小项 start-->
                <div v-if="item.method == 'SELECT'">

                    <el-form-item v-for="(opti, index) in item.opt"
                                  :key="opti.key" class="opti">

                        <el-col :span="6">
                            <el-input placeholder="项目名" v-model="opti.name"></el-input>
                        </el-col>

                        <el-col class="line" :span="3">&nbsp;&nbsp;</el-col>

                        <el-col :span="6">
                            <el-input placeholder="金额" v-model="opti.amt"></el-input>
                        </el-col>

                        <el-col :span="3">
                            &nbsp;
                        </el-col>


                        <el-col :span="6">
                            <el-button type="primary" @click.prevent="removeAmtOpt(item,opti)">删除
                            </el-button>
                        </el-col>

                    </el-form-item>

                    <el-col :span="6">
                        <el-button type="primary" @click="addAmtOpt(item)" class="optib">添加选项</el-button>
                    </el-col>
                </div>

                <!--每个收费项的小项 end-->


            </el-form-item>


            <el-form-item>
                <el-button @click="addItem">添加收费项</el-button>
            </el-form-item>

            <!--收费项 end-->

            <el-form-item label="采集发票">
                <el-col :span="10">
                    <el-select placeholder="请选择是否采集" v-model="form.isBill">
                        <el-option label="否" value="FALSE"></el-option>
                        <el-option label="是" value="TRUE"></el-option>
                    </el-select>
                </el-col>

            </el-form-item>

            <el-form-item label="备注">
                <el-input type="textarea" v-model="form.remark"></el-input>
            </el-form-item>


            <el-form-item label="subsysid" prop="subsysid">
                <el-input v-model="form.subsysid"></el-input>
            </el-form-item>


            <el-form-item label="sysid" prop="sysid">
                <el-input v-model="form.sysid"></el-input>
            </el-form-item>


            <el-form-item label="feeitemid" prop="feeitemid">
                <el-input v-model="form.feeitemid"></el-input>
            </el-form-item>


            <el-form-item label="cert" prop="cert">
                <el-input v-model="form.cert" type="textarea"></el-input>
            </el-form-item>


            <el-form-item>
                <el-button type="primary" @click="subForm('form')">立即创建</el-button>
            </el-form-item>


        </el-form>


        <el-dialog
                title="错误"
                :visible.sync="err"
                width="30%">
            <span>{{ msgA }}</span>

            <el-button @click="err = false">确 定</el-button>

        </el-dialog>

        <el-dialog
                title="生成成功"
                :visible.sync="qrcode"
                width="30%"
        >
            <span> <img :src="qrcodeurl"> </span>
            <el-button @click="qrcode = false">确 定</el-button>

        </el-dialog>

    </div>

</template>

<script>
    import {create} from '../../api/api.js'

    export default {
        data() {
            return {
                err: false,
                msgA: '',
                qrcode: false,
                qrcodeurl: '',
                loading: false,
                form: {
                    name: '',
                    type: 'NOTSCHOOL',

                    //参数1
                    p1name: '',
                    p1method: 'FILL',
                    p1opt: [],
                    //填入方式
                    p1code: 'NOTEMPTY',

                    //参数2
                    p2name: '',
                    p2method: 'FILL',
                    p2opt: [],
                    p2code: 'NOTEMPTY',

                    //单项
                    items: [
                        {name: '', key: new Date().toString(), method: 'FILL', opt: []}
                    ],

                    isBill: 'FALSE',
                    remark: '',
                    subsysid: '',
                    sysid: '',
                    feeitemid: '',
                    cert: '',
                },
                rules: {
                    name: [
                        {required: true, message: '缴费名称不能为空', trigger: 'blur'},
                    ],
                    subsysid: [
                        {required: true, message: '该参数不能为空', trigger: 'blur'},
                    ],
                    sysid: [
                        {required: true, message: '该参数不能为空', trigger: 'blur'},
                    ],
                    feeitemid: [
                        {required: true, message: '该参数不能为空', trigger: 'blur'},
                    ],
                    cert: [
                        {required: true, message: '该参数不能为空', trigger: 'blur'},
                    ],
                }
            }
        },
        methods: {
            addP1Opt() {
                this.form.p1opt.push({value: "", key: new Date().toString()})
            },
            removeP1Opt(option) {
                let index = this.form.p1opt.indexOf(option);
                if (index !== -1) {
                    this.form.p1opt.splice(index, 1)
                }
            },
            addP2Opt() {
                this.form.p2opt.push({value: "", key: new Date().toString()})
            },
            removeP2Opt(option) {
                let index = this.form.p2opt.indexOf(option);
                if (index !== -1) {
                    this.form.p2opt.splice(index, 1)
                }
            },
            addItem() {
                this.form.items.push({name: '', key: new Date().toString(), method: 'FILL', opt: []})
            },
            removeItem(item) {
                let index = this.form.items.indexOf(item);
                if (index !== -1) {
                    this.form.items.splice(index, 1)
                }
            },
            addAmtOpt(item) {
                item.opt.push(({name: '', key: new Date().toString(), amt: ''}));
            },
            removeAmtOpt(item, opti) {
                let index = item.opt.indexOf(opti);
                if (index !== -1) {
                    item.opt.splice(index, 1)
                }
            },
            msg(msg) {
                this.err = true;
                this.msgA = msg;
            },

            checkNumber(theObj) {
                let reg = /^[0-9]+.?[0-9]*$/;
                if (reg.test(theObj)) {
                    return true;
                }
                return false;
            },

            subForm(formName) {
                let form = this.form;
                let self = this;

                self.loading = true;
                this.$refs[formName].validate((valid) => {

                    //进行二次验证
                    if (valid) {
                        //校外用户采集两个参数
                        if (form.type == 'NOTSCHOOL') {
                            //参数1
                            if (form.p1method != 'NOT' && form.p1name == '') {
                                self.msg('参数1的名称不能为空');
                                return false;
                            }
                            //用户选择
                            if (form.p1method == 'SELECT') {
                                if (form.p1opt == null || form.p1opt.length == 0) {
                                    self.msg('参数1中的选项不能为空');
                                    return false;
                                } else {
                                    for (let i = 0; i < form.p1opt.length; i++) {
                                        if (form.p1opt[i].value == '') {
                                            self.msg('参数1中的选项值不能为空');
                                            return false;
                                        }
                                    }
                                }

                            }
                            //参数2
                            if (form.p2method != 'NOT' && form.p2name == '') {
                                self.msg('参数2的名称不能为空');
                                return false;
                            }
                            //用户选择
                            if (form.p2method == 'SELECT') {
                                if (form.p2opt == null || form.p2opt.length == 0) {
                                    self.msg('参数2中的选项不能为空');
                                    return false;
                                } else {
                                    for (let i = 0; i < form.p2opt.length; i++) {
                                        if (form.p2opt[i].value == '') {
                                            self.msg('参数2中的选项值不能为空');
                                            return false;
                                        }
                                    }
                                }
                            }
                        }
                        //收费项

                        if (form.items == null || form.items.length == 0) {
                            self.msg('至少需要一个收费项');
                            return false;
                        }

                        for (let i = 0; i < form.items.length; i++) {
                            if (form.items[i].name == '') {
                                self.msg('收费项的名称不能为空');
                                return false;
                            }
                            //用户选择
                            if (form.items[i].method == 'SELECT') {
                                if (form.items[i].opt.length == 0) {
                                    self.msg('收费项选项不能为空');
                                    return false;
                                }

                                for (let j = 0; j < form.items[i].opt.length; j++) {
                                    if (form.items[i].opt[j].name == '' || form.items[i].opt[j].amt == '') {
                                        self.msg('收费项选项的名称或金额不能为空');
                                        return false;
                                    }
                                    if (!self.checkNumber(form.items[i].opt[j].amt)) {
                                        self.msg('收费项的金额必须为数字');
                                    }
                                }
                            }

                        }
                        ;

                        // 提交表单
                        create(form).then((res) => {

                            self.loading = false;

                            //提交成功
                            if (res.code == 0) {
                                self.qrcode = true;
                                self.qrcodeurl = res.msg;
                            } else {
                                self.msg(res.msg);
                            }

                        })
                    } else {
                        self.loading = false;
                        return false;
                    }

                });
            }

        }
    }

</script>

<style>
    .opti, .optib {
        margin-top: 10px;
    }
</style>