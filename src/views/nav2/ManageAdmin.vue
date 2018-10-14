<template>

    <div>
        <div class="manage-admin">
            <el-input v-model="form.name" placeholder="姓名/部门" class="admin-input"></el-input>
            <el-input v-model="form.un" placeholder="工号" class="admin-input"></el-input>
            <el-button round class="admin-btn" @click="add">添加</el-button>
        </div>
        <el-table highlight-current-row class="admin-table" :data="adminList">
            <el-table-column prop="uname" label="姓名/部门" width="300" sortable>

            </el-table-column>

            <el-table-column prop="unit" label="工号" width="300" sortable>
            </el-table-column>

            <el-table-column label="操作" sortable>
                <template scope="scope">
                    <el-button type="danger" size="small" @click="delAdmin(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>

</template>

<script>
    import {addAdmin, getAdminList, deleteManage} from '../../api/api.js'

    export default {
        data() {
            return {
                form: {},
                adminList: []
            }
        },
        mounted() {

            this.getAdmin();
        },
        methods: {
            add() {
                let self = this;
                addAdmin(self.form).then((res) => {
                    if (res.code == 0) {
                        self.$message({
                            message: '创建成功！',
                            type: 'success'
                        });
                        self.getAdmin();
                    } else {
                        self.$message({
                            message: res.msg
                        });
                    }
                });
                this.form = {}

            },
            getAdmin() {
                let self = this;
                getAdminList().then((res) => {
                    self.adminList = res.data
                })
            },
            delAdmin(index, row) {
                let self = this;
                let param = {
                    id: row.id
                };
                deleteManage(param).then((res)=>{
                    if(res.code == 0){
                        self.$message({
                            message: '删除成功！',
                            type: 'success'
                        });
                    }
                    self.getAdmin();
                })

            }
        }
    }

</script>

<style scoped>
    .manage-admin {
        width: 100%;
        margin: 20px auto;
    }

    .admin-input {
        width: 40%;
        float: left;
        margin-right: 20px;

    }

    .admin-btn {
        float: left;
        margin-left: 10px;
    }

    .manage-admin:after {
        display: block;
        content: '';
        clear: both;
    }
</style>