<template>
    <div class="club-activity">
        <div class="filter-container">
            <el-input style="width: inherit" v-model="listQuery.username" placeholder="请输入用户名字"></el-input>
            <el-button type="primary" @click="findAll(listQuery)" plain>搜索</el-button>
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
            <el-table-column label="id" align="center">
                <template slot-scope="{ row }">
                    <span>{{row.id}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="image" label="头像" align="center" width="375px">
                <!-- 图片的显示 -->
                <template slot-scope="scope">
                    <img :src="scope.row.picture" width="100%" height="170px"/>
                </template>
            </el-table-column>
            <el-table-column label="类型" align="center">
                <template slot-scope="{ row }">
                    <span>{{row.type}}</span>
                </template>
            </el-table-column>
            <el-table-column label="电话" align="center">
                <template slot-scope="{ row }">
                    <span>{{row.phone}}</span>
                </template>
            </el-table-column>
            <el-table-column label="用户名" align="center">
                <template slot-scope="{ row }">
                    <span>{{row.username}}</span>
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
        <el-dialog :title="handleType" :visible.sync="dialogFormVisible" @close="closeDialog()">
            <el-form
                    ref="dataForm"
                    label-position="left"
                    label-width="150px"
                    style="width:90%; margin-left:50px;"
            >
                <el-form-item label="id">
                    <el-input style="width:100%" disabled v-model="temp.id"></el-input>
                </el-form-item>
                <el-form-item label="用户名">
                    <el-input style="width:100%" v-model="temp.username"></el-input>
                </el-form-item>
                <el-form-item label="图片">
                    <SingleImage
                            style="width:100%"
                            v-bind:limit="1"
                            listType="picture"
                            ref="singleimg"
                            @uploadSuccess="uploadSuccess"
                    />
                    <!--
                    @error="error"-->
                </el-form-item>
                <el-form-item label="密码">
                    <el-input style="width:100%" v-model="temp.password"></el-input>
                </el-form-item>
                <el-form-item label="电话">
                    <el-input style="width:100%" v-model="temp.phone"></el-input>
                </el-form-item>
                <el-form-item label="用户类型">
                    <textarea style="width:100%" v-model="temp.type"></textarea>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="comfirm(handleType)">确定</el-button>
            </div>
        </el-dialog>
        <!-- 分页组件 -->
        <Pagination
                v-show="total > 0"
                :total="total"
                :page.sync="listQuery.pn"
                :limit.sync="listQuery.ps"
                @pagination="findAll(listQuery)"
        />
    </div>
</template>

<script>
    import Pagination from '../../../common/components/Pagination';
    import { info, delete_user, add_user } from '../../../../api/user';

    export default {
        name: 'user',
        data() {
            return {
                listLoading: true, //加载旋转
                list: [], //表格数据
                total: 0, //总数
                listQuery: {
                    pn: 1,
                    ps: 10
                },
                dialogFormVisible: false,
                handleType: '',//dialog 的标题
                temp: {
                    id: null,
                    username: null,
                    password: null,
                    phone: null,
                    type: null,
                    picture: null
                },
                nullTemp: {
                    id: null,
                    username: null,
                    password: null,
                    phone: null,
                    type: null,
                    picture: null
                }

            };
        },
        components: {
            Pagination
        },
        created() {
            this.findAll(this.listQuery);
        },
        methods: {
            //查询全部
            async findAll(data) {
                this.listLoading = true;
                const res = await info(data);
                this.list = res.data.list;
                this.total = res.data.total;
                this.listLoading = false;
            },

            //删除操作
            async handleDelete(row) {
                const res = await delete_user(row.id);
                this.$alert_res(res, this);
                this.findAll(this.listQuery);
            },
            //关闭 dialog
            closeDialog() {
                this.dialogFormVisible = false;
            },
            uploadSuccess(pic) {
                this.temp.picture = pic[0];
            },
            //更新
            update() {

            },
            //插入
            insert() {

            },
            async comfirm(val) {
                if (val === '更改') {
                    this.update();
                } else {
                    this.insert();
                }
                this.findAll(this.listQuery);
                this.dialogFormVisible = false;
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
            }


        }
    };
</script>

<style scoped>

</style>