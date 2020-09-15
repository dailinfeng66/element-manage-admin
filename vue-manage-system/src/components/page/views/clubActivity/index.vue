<template>
    <div class="club-activity">
        <div class="filter-container">
            <el-input style="width: inherit" v-model="listQuery.schoolId" placeholder="请输入学校查询"></el-input>
            <el-input style="width: inherit" v-model="listQuery.clubName" placeholder="请输入社团名查询"></el-input>
            <el-input style="width: inherit" v-model="listQuery.activityTitle" placeholder="请输入活动标题查询"></el-input>
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
            <!-- 一列的开始 -->
            <!--            <el-table-column label="学校ID" prop="num" width="50" align="center">-->
            <!--                <template slot-scope="{ row }">-->
            <!--                    <span>{{row.id}}</span>-->
            <!--                </template>-->
            <!--            </el-table-column>-->
            <!-- 一列的结束 -->
            <el-table-column label="学校简称" prop="num" width="70" align="center">
                <template slot-scope="{ row }">
                    <span>{{row.schoolId}}</span>
                </template>
            </el-table-column>

            <el-table-column label="社团名称" align="center">
                <template slot-scope="{ row }">
                    <span>{{row.clubName}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="image" label="图片" align="center" width="375px">
                <!-- 图片的显示 -->
                <template slot-scope="{ row }">
                    <img :src="row.pic" width="100%" height="170px"/>
                </template>
            </el-table-column>
            <el-table-column label="创建时间" style="width: inherit" class-name="status-col">
                <template slot-scope="{ row }">
                    <span>{{ row.createTime }}</span>
                </template>
            </el-table-column>
            <el-table-column label="浏览量" align="center">
                <template slot-scope="{ row }">
                    <span>{{ row.clubVisit }}</span>
                </template>
            </el-table-column>

            <el-table-column label="活动标题" align="center">
                <template slot-scope="{ row }">
                    <span>{{ row.activityTitle}}</span>
                </template>
            </el-table-column>
            <el-table-column label="活动详情" align="center">

                <template slot-scope="{ row }">
                    <el-button type="success" plain @click="showDetailPage(row.activityDetail)">查看详情页</el-button>
                </template>
            </el-table-column>
            <el-table-column label="是否启用" align="center">
                <template slot-scope="{ row }">
                    <el-switch
                            v-model="row.state"
                            @change="ableAndDisable(row)"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                    ></el-switch>
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
        <el-dialog title="详情" :visible.sync="detailPage" width="90%" @close="detailPage=false">
            <div v-html="detailhtml"></div>
        </el-dialog>
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
                <el-form-item label="id">
                    <el-input style="width:100%" disabled v-model="temp.id"></el-input>
                </el-form-item>
                <el-form-item label="学校ID">
                    <el-input style="width:100%" v-model="temp.schoolId"></el-input>
                </el-form-item>
                <el-form-item label="主页活动图片">
                    <SingleImage
                            style="width:100%"
                            v-bind:limit="1"
                            listType="picture"
                            @uploadSuccess="uploadSuccess"
                            ref="singleimg"
                    />
                    <!--
                    @error="error"-->
                </el-form-item>
                <el-form-item label="社团名">
                    <el-input style="width:100%" v-model="temp.clubName"></el-input>
                </el-form-item>
                <el-form-item label="主页活动标题">
                    <el-input style="width:100%" v-model="temp.activityTitle"></el-input>
                </el-form-item>
                <el-form-item label="html详细介绍">
                    <textarea style="width:100%" v-model="temp.activityDetail"></textarea>
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
    import {
        getDataList,
        deleteById,
        insertActivity,
        updateActivity,
        ableClubActivity,
        disAbleClubActivity
    } from '../../../../api/clubActivity';
    import { ableInfo, disableInfo } from '../../../../api/info';

    export default {
        name: 'clubActivity',
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
                detailhtml: '', //详情页面html
                detailPage: false, //详情页面
                //dialog中间变量
                temp: {
                    id: '',
                    schoolId: '',
                    pic: '',
                    createTime: '',
                    clubVisit: '',
                    clubName: '',
                    activityTitle: '',
                    activityName: '',
                    activityDetail: ''
                },
                nullTemp: {
                    id: '',
                    schoolId: '',
                    pic: '',
                    createTime: '',
                    clubVisit: '',
                    clubName: '',
                    activityTitle: '',
                    activityName: '',
                    activityDetail: ''
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
            showDetailPage(detail) {
                let html = detail;
                console.log(detail);
                this.detailhtml = html;
                this.detailPage = true;
            },
            //禁用启用
            async ableAndDisable(row) {
                let state = row.state;
                this.listLoading = true;
                if (state) {
                    const res = await ableClubActivity(row.id);
                    if (res.code === 10000) {
                        this.$message({
                            type: 'info',
                            message: '操作成功'
                        });
                    }
                } else {
                    const res2 = await disAbleClubActivity(row.id);
                    if (res2.code === 10000) {
                        this.$message({
                            type: 'info',
                            message: '操作成功'
                        });
                    }
                }


                this.listLoading = false;

                this.findAll(this.listQuery);
            },
            //上传图片成功回调
            uploadSuccess(data) {
                this.temp.pic = data[0];
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
                const res = await deleteById(row.id);
                if (res.success === true) {
                    this.$message({
                        type: 'info',
                        message: '删除成功'
                    });
                }
                this.findAll(this.listQuery);
            },
            //查找
            async findAll(data) {
                let res = await getDataList(data);
                let resData = res.queryResult.list;
                resData.forEach(e => {
                    if (e.state == 1 || e.state == '1') {
                        e.state = true;
                    } else {
                        e.state = false;
                    }
                });
                this.list = resData;
                this.total = res.queryResult.total;
                this.listLoading = false;
            },
            //关闭dialog
            closeDialog() {
                this.dialogFormVisible = false;
                this.temp = Object.assign({}, this.nullTemp);
            },
            //更改
            async update() {
                let params = this.temp;
                if (params.state == true) {
                    params.state = 1;
                } else {
                    params.state = 0;
                }
                const res = await updateActivity(params);
                if (res.code === 10000) {
                    this.$message({
                        type: 'info',
                        message: '更改成功'
                    });
                }
                this.findAll(this.listQuery);
            },
            //插入
            async insert() {
                let data = this.temp;
                const res = await insertActivity(data);
                if (res.code === 10000) {
                    this.$message({
                        type: 'info',
                        message: '添加成功'
                    });
                }
                this.findAll(this.listQuery);
            },
            //确定提交
            comfirm(val) {
                if (val === '更改') {
                    this.update();
                } else {
                    this.insert();
                }

                this.dialogFormVisible = false;
            }
        }
    };
</script>

<style scoped>
</style>
