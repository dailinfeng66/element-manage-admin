<template>
    <div class="club-activity">
        <div class="filter-container">
            <el-input style="width: inherit" v-model="listQuery.schoolId" placeholder="请输入学校ID"></el-input>

            <el-button type="primary" @click="findAll(listQuery)" plain>搜索</el-button>
            <el-button type="primary" @click="addActivity" plain>添加</el-button>
        </div>
        <!-- 以下是表格内容 -->
        <el-table
                v-loading="listLoading"
                :data="list"
                border
                fit
                highlight-current-row
                style="width: 100%;"
        >
            <el-table-column label="学校简称" align="center">
                <template slot-scope="{ row }">
                    <span>{{row.schoolId}}</span>
                </template>
            </el-table-column>

            <el-table-column label="审核群" class-name="status-col">
                <template slot-scope="{ row }">
                    <span>{{ row.auditGroup}}</span>
                </template>
            </el-table-column>
            <el-table-column label="大群" class-name="status-col">
                <template slot-scope="{ row }">
                    <span>{{ row.allGroup}}</span>
                </template>
            </el-table-column>
            <el-table-column label="消息数量" class-name="status-col">
                <template slot-scope="{ row }">
                    <span>{{ row.schoolNum}}</span>
                </template>
            </el-table-column>
            <el-table-column label="对接人" class-name="status-col">
                <template slot-scope="{ row }">
                    <span>{{ row.dockingPeople}}</span>
                </template>
            </el-table-column>
            <el-table-column label="schoolUserId" class-name="status-col">
                <template slot-scope="{ row }">
                    <span>{{ row.schoolUserId}}</span>
                </template>
            </el-table-column>
            <el-table-column label="全名" class-name="status-col">
                <template slot-scope="{ row }">
                    <span>{{ row.schoolAllName}}</span>
                </template>
            </el-table-column>
            <el-table-column label="所在省份" class-name="status-col">
                <template slot-scope="{ row }">
                    <span>{{ row.schoolProvince}}</span>
                </template>
            </el-table-column>
            <el-table-column label="学校链接" class-name="status-col">
                <template slot-scope="{ row }">
                    <span>{{ row.schoolUrl}}</span>
                </template>
            </el-table-column>
            <el-table-column label="学校机器人QQ" class-name="status-col">
                <template slot-scope="{ row }">
                    <span>{{ row.schoolRobotQq}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="操作"
                    align="center"
                    class-name="small-padding fixed-width"
                    width="210%"
            >
                <!-- 右边按钮区域 -->
                <template slot-scope="scope">
                    <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <Pagination
                v-show="total > 0"
                :total="total"
                :page.sync="listQuery.pn"
                :limit.sync="listQuery.ps"
                @pagination="findAll(listQuery)"
        />
        <el-dialog :title="handleType" :visible.sync="dialogFormVisible" @close="closeDialog()">
            <el-form
                    ref="dataForm"
                    label-position="left"
                    label-width="150px"
                    style="width:90%; margin-left:50px;"
            >
                <el-form-item label="学校ID">
                    <el-input style="width:100%" v-model="temp.schoolId"></el-input>
                </el-form-item>

                <el-form-item label="审核群">
                    <el-input style="width:100%" v-model="temp.auditGroup"></el-input>
                </el-form-item>
                <el-form-item label="大群">
                    <el-input style="width:100%" v-model="temp.allGroup"></el-input>
                </el-form-item>
                <el-form-item label="对接人">
                    <textarea style="width:100%" v-model="temp.dockingPeople"></textarea>
                </el-form-item>
                <el-form-item label="对接人">
                    <textarea style="width:100%" v-model="temp.schoolUserId"></textarea>
                </el-form-item>
                <el-form-item label="全名">
                    <textarea style="width:100%" v-model="temp.schoolAllName"></textarea>
                </el-form-item>
                <el-form-item label="省份">
                    <textarea style="width:100%" v-model="temp.schoolProvince"></textarea>
                </el-form-item>
                <el-form-item label="链接">
                    <textarea style="width:100%" v-model="temp.schoolUrl"></textarea>
                </el-form-item>
                <el-form-item label="机器人QQ">
                    <textarea style="width:100%" v-model="temp.schoolRobotQq"></textarea>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="comfirm(handleType)">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import SingleImage from '../../../common/components/SingleImage';
    import Pagination from '../../../common/components/Pagination';
    import { findAll, addSchool, updateSchool, deleteSchool } from '../../../../api/school';

    export default {
        name: 'school',
        data() {
            return {
                listLoading: true, //加载旋转
                list: [], //表格数据
                total: 0, //总数
                listQuery: {
                    pn: 1,
                    ps: 10
                },
                //dialog的类型 是添加还是修改
                handleType: '修改',
                dialogFormVisible: false, //dialog是否可见
                //dialog中间变量
                temp: {
                    schoolId: '',
                    auditGroup: '',
                    allGroup: '',
                    schoolNum: '',
                    dockingPeople: '',
                    schoolUserId: '',
                    schoolAllName: '',
                    schoolProvince: '',
                    schoolUrl: '',
                    schoolRobotQq: ''
                },
                nullTemp: {
                    schoolId: '',
                    auditGroup: '',
                    allGroup: '',
                    schoolNum: '',
                    dockingPeople: '',
                    schoolUserId: '',
                    schoolAllName: '',
                    schoolProvince: '',
                    schoolUrl: '',
                    schoolRobotQq: ''
                }
            };
        },
        components: {
            SingleImage,
            Pagination
        },
        created() {
            this.findAll(this.listQuery);
        },
        methods: {
            //上传图片回调
            uploadSuccess(pic) {
                this.temp = pic;
            },
            //修改
            handleEdit(row) {
                this.temp = Object.assign({}, row);
                this.handleType = '更改';
                this.dialogFormVisible = true;
            },
            //添加
            addActivity() {
                this.temp = Object.assign({}, this.nullTemp);
                this.handleType = '添加';
                this.dialogFormVisible = true;
            },
            //删除
            async handleDelete(row) {
                const res = await deleteSchool(row.schoolId);
                if (res.code === 10000) {
                    this.$message({
                        type: 'info',
                        message: '操作成功'
                    });
                }
                this.findAll(this.listQuery);
            },
            //查找
            async findAll(data) {
                const res = await findAll(data);
                this.list = res.queryResult.list;
                console.log(this.list);
                this.total = res.queryResult.total;
                this.listLoading = false;
            },
            //关闭dialog
            closeDialog() {
                this.dialogFormVisible = false;
                this.temp = this.nullTemp;
            },
            //更改
            async update() {
                const res = await updateSchool(this.temp);
                if (res.code === 10000) {
                    this.$message({
                        type: 'info',
                        message: '操作成功'
                    });
                }
            },
            //插入
            async insert() {
                const res = await addSchool(this.temp);
                if (res.code === 10000) {
                    this.$message({
                        type: 'info',
                        message: '操作成功'
                    });
                }
            },

            //确定提交
            comfirm(val) {
                if (val === '更改') {
                    this.update();
                } else {
                    this.insert();
                }
                this.dialogFormVisible = false;
                this.findAll(this.listQuery);
            }
        }
    };
</script>

<style scoped>
</style>
