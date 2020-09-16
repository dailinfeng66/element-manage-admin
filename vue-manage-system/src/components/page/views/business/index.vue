<template>
    <div class="club-activity">
        <div class="filter-container">
            <el-input style="width: inherit" v-model="listQuery.schoolId" placeholder="请输入学校ID"></el-input>
            <el-input style="width: inherit" v-model="listQuery.shopCategory" placeholder="请输入商家种类"></el-input>
            <el-input style="width: inherit" v-model="listQuery.shopName" placeholder="请输入商家名字"></el-input>
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
            <el-table-column prop="image" label="图片" align="center" width="375px">
                <!-- 图片的显示 -->
                <template slot-scope="scope">
                    <img :src="scope.row.pic" width="100%" height="170px"/>
                </template>
            </el-table-column>
            <el-table-column label="创建时间" class-name="status-col">
                <template slot-scope="{ row }">
                    <span>{{ row.createTime}}</span>
                </template>
            </el-table-column>
            <el-table-column label="截止日期" align="center">
                <template slot-scope="{ row }">
                    <span>{{ row.deadTime }}</span>
                </template>
            </el-table-column>
            <el-table-column label="备注" align="center">
                <template slot-scope="{ row }">
                    <span>{{ row.memo }}</span>
                </template>
            </el-table-column>
            <el-table-column label="商家种类" align="center">
                <template slot-scope="{ row }">
                    <span>{{ row.shopCategory }}</span>
                </template>
            </el-table-column>
            <el-table-column label="商家详情" align="center">

                <template slot-scope="{ row }">
                    <el-button type="success" plain @click="showDetailPage(row.shopDetail)">查看详情页</el-button>
                </template>
            </el-table-column>
            <el-table-column label="商家名字" align="center">
                <template slot-scope="{ row }">
                    <span>{{ row.shopName }}</span>
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
                <el-form-item label="商店种类">
                    <el-input style="width:100%" v-model="temp.shopCategory"></el-input>
                </el-form-item>
                <el-form-item label="商店详情">
                    <el-input style="width:100%" v-model="temp.shopDetail"></el-input>
                </el-form-item>
                <el-form-item label="商店名">
                    <textarea style="width:100%" v-model="temp.shopName"></textarea>
                </el-form-item>
                <el-form-item label="备注">
                    <textarea style="width:100%" v-model="temp.memo"></textarea>
                </el-form-item>
                <el-date-picker
                        v-model="temp.deadTime"
                        type="date"
                        placeholder="截止时间">
                </el-date-picker>
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
    import { findAll, addMessage, updateMessage, deleteMessage, ableShop, disableShop } from '../../../../api/business';

    export default {
        name: 'business',
        data() {
            return {
                listLoading: true, //加载旋转
                list: [], //表格数据
                total: 0, //总数
                detailhtml: '', //详情页面html
                detailPage: false, //详情页面,
                deadLine: '',
                listQuery: {
                    pn: 1,
                    ps: 10
                },
                //dialog的类型 是添加还是修改
                handleType: '修改',
                dialogFormVisible: false, //dialog是否可见
                //dialog中间变量
                temp: {
                    id: '',
                    schoolId: '',
                    shopName: '',
                    shopDetail: '',
                    shopCategory: '',
                    state: '',
                    createTime: '',
                    pic: '',
                    deadTime: '',
                    memo: ''

                },
                nullTemp: {
                    id: '',
                    schoolId: '',
                    shopName: '',
                    shopDetail: '',
                    shopCategory: '',
                    state: '',
                    createTime: '',
                    pic: '',
                    deadTime: '',
                    memo: ''
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
                    const res = await ableShop(row.id);
                    if (res.code === 10000) {
                        this.$message({
                            type: 'info',
                            message: '操作成功'
                        });
                    }
                } else {
                    const res2 = await disableShop(row.id);
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
            //上传图片回调
            uploadSuccess(pic) {
                this.temp.pic = pic[0];
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
                const res = await deleteMessage(row.id);
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
                this.temp = this.nullTemp;
            },
            //更改
            async update() {
                let params = Object.assign({}, this.temp);
                if (params.state == true) {
                    params.state = 1;
                } else {
                    params.state = 0;
                }
                let date1 = this.formatDate(params.deadTime);
                params.deadTime = date1;
                const res = await updateMessage(params);
                if (res.code === 10000) {
                    this.$message({
                        type: 'info',
                        message: '操作成功'
                    });
                }
                // this.temp = this.nullTemp;
                this.findAll(this.listQuery);
            },
            //插入
            async insert() {
                let params = Object.assign({}, this.temp);
                console.log(params.deadTime);
                let date1 = new Date(params.deadTime);
                params.deadTime = date1;
                const res = await addMessage(params);

                if (res.code === 10000) {
                    this.$message({
                        type: 'info',
                        message: '操作成功'
                    });
                }
                // this.temp = this.nullTemp;
                this.findAll(this.listQuery);
            },

            //确定提交
            comfirm(val) {
                if (val === '更改') {
                    this.update();
                } else {
                    this.insert();
                }
                this.findAll(this.listQuery);
                this.dialogFormVisible = false;
            },

            //inputTime 参数是毫秒级时间戳
            formatDate(inputTime) {
                var date = new Date(inputTime);
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                m = m < 10 ? ('0' + m) : m;
                var d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                var h = date.getHours();
                h = h < 10 ? ('0' + h) : h;
                var minute = date.getMinutes();
                var second = date.getSeconds();
                minute = minute < 10 ? ('0' + minute) : minute;
                second = second < 10 ? ('0' + second) : second;
                return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
            }
        }
    }
    ;
</script>

<style scoped>
</style>
