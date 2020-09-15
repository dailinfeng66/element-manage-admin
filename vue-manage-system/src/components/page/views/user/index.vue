<template>
    <div class="club-activity">
        <!-- <div class="filter-container">
            <el-input style="width: inherit" v-model="listQuery.schoolId" placeholder="请输入学校ID"></el-input>
            <el-input style="width: inherit" v-model="listQuery.title" placeholder="请输入标题  还没写"></el-input>
            <el-button type="primary" @click="findAll(listQuery)" plain>搜索</el-button>
            <el-button type="primary" @click="addActivity" plain>添加</el-button>
        </div>-->
        <!-- 以下是表格内容 -->
        <el-table
                v-loading="listLoading"
                :data="list"
                border
                fit
                highlight-current-row
                style="width: 100%;"
        >
            <el-table-column label="openId" align="center">
                <template slot-scope="{ row }">
                    <span>{{row.openId}}</span>
                </template>
            </el-table-column>

            <el-table-column label="用户名" class-name="status-col">
                <template slot-scope="{ row }">
                    <span>{{ row.userName}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="image" label="图片" align="center" width="375px">
                <!-- 图片的显示 -->
                <template slot-scope="{ row }">
                    <img :src="row.avatar" width="80%" height="170px"/>
                </template>
            </el-table-column>
            <el-table-column label="上一次登录时间" class-name="status-col">
                <template slot-scope="{ row }">
                    <span>{{ row.lastLoginTime}}</span>
                </template>
            </el-table-column>
            <el-table-column label="状态" class-name="status-col">
                <template slot-scope="{ row }">
                    <span>{{ row.state}}</span>
                </template>
            </el-table-column>
            <el-table-column label="等级" class-name="status-col">
                <template slot-scope="{ row }">
                    <span>{{ row.grade}}</span>
                </template>
            </el-table-column>
            <el-table-column label="消息数量" class-name="status-col">
                <template slot-scope="{ row }">
                    <span>{{ row.messageCount}}</span>
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
    </div>
</template>

<script>
    import SingleImage from '../../../common/components/SingleImage';
    import Pagination from '../../../common/components/Pagination';
    import { findAll } from '../../../../api/user';

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
                //dialog的类型 是添加还是修改
                handleType: '修改',
                dialogFormVisible: false, //dialog是否可见
                //dialog中间变量
                temp: {},
                nullTemp: {}
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
                this.temp = row;
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
                let resData = res.queryResult.list;
                resData.forEach(e => {
                    if (e.state == 1 || e.state == '1') {
                        e.state = '启用';
                    } else {
                        e.state = '禁用';
                    }
                });
                this.list = resData;
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
