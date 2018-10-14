<template>
	<div>
		<el-upload
				class="upload-demo"
				drag
				:action="uploadurl"
				multiple
				:on-success="fileUpload">
			<i class="el-icon-upload"></i>
			<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>

		</el-upload>

		<a href="http://wxsportscard.upc.edu.cn/download/example2.xlsx">模板下载</a>

		<el-table :data="bills" highlight-current-row style="">

			<el-table-column label="操作" width="100">

				<template scope="scope">
					<el-button type="danger" size="small" @click="deletBill(scope.$index, scope.row)">删除</el-button>
				</template>

			</el-table-column>


			<el-table-column prop="zzUnit" label="单位名" width="200" sortable>
			</el-table-column>

			<el-table-column prop="taxCode" label="税号" width="200" sortable>
			</el-table-column>

			<el-table-column prop="zzAddress" label="地址" width="200" sortable>
			</el-table-column>

			<el-table-column prop="zzBnkName" label="银行名称" width="200" sortable>
			</el-table-column>

			<el-table-column prop="zzBank" label="银行卡号" width="200" sortable>
			</el-table-column>

			<el-table-column prop="zzTel" label="电话" width="100" sortable>
			</el-table-column>



		</el-table>


	</div>
</template>

<script>

	import { getBillRequest ,uploadurl,deletBillRequest} from '../../api/api.js'

	export default {
		data(){
		    return {
                bills: [],
				uploadurl: uploadurl,
			}
		},
		methods: {
            fileUpload(response, file, fileList){
                var self = this;
                if(response.code == 0){
                    this.$message({
                        message: '添加成功',
                        type: 'success'
                    });
                    self.getBill()
                }else {
                    this.$message({
                        message: '上传失败，请检查文件格式',
                        type: 'warning'
                    });
                }
            },

            deletBill(index, row){
                var id = row.taxCode;
                var postdata = {
                    id: id
                };
                let self = this;

                deletBillRequest(postdata).then(()=>{
                    self.getBill();
				});

            },
			getBill(){
                let self = this;
                getBillRequest().then((res)=>{
                    if(res.code == 0){
                        self.bills = res.data
					}
				})
			}
		},
		mounted(){
		    this.getBill();
		}
	}
</script>