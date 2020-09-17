<template>
    <div class="club-activity">
        <div class="filter-container">
            <el-input style="width: inherit" v-model="listQuery.name" placeholder="请输入商品名字"></el-input>
            <el-button type="primary" @click="findAll(listQuery)" plain>搜索</el-button>
            <el-button type="primary" @click="addUser" plain>添加</el-button>
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
            <el-table-column prop="image" label="图片" align="center" width="375px">
                <!-- 图片的显示 -->
                <template slot-scope="scope">
                    <img :src="scope.row.picture" width="100%" height="170px"/>
                </template>
            </el-table-column>
            <el-table-column label="名字" align="center">
                <template slot-scope="{ row }">
                    <span>{{row.name}}</span>
                </template>
            </el-table-column>
            <el-table-column label="状态" align="center">
                <template slot-scope="{ row }">
                    <span>
                        <el-button type="success" v-if="!row.status" @click="enableGoods(row.id)" cycle>启用</el-button>
                        <el-button type="danger" v-if="row.status" @click="disableGoods(row.id)" cycle>禁用</el-button>
                    </span>
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
                <el-form-item label="名字">
                    <el-input style="width:100%" v-model="temp.name"></el-input>
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
    import SingleImage from '../../../common/components/SingleImage';
    import Pagination from '../../../common/components/Pagination';
    import {
        info,
        enable_goods,
        delete_goods,
        disable_goods,
        add_goods,
        update_goods
    } from '../../../../api/goodsmenu';
    // import { purse_status } from '../../../../utils/common';

    export default {
        name: 'dishmanage',
        data() {
            return {
                listLoading: true, //加载旋转
                list: [], //表格数据
                total: 0, //总数
                listQuery: {
                    pn: 1,
                    ps: 10
                },
                dialogFormVisible: true,
                handleType: '',//dialog 的标题
                temp: {
                    id: null,
                    name: null,
                    picture: null,
                    status: null
                },
                nullTemp: {
                    id: null,
                    name: null,
                    picture: null,
                    status: null
                }

            };
        },
        components: {
            SingleImage,
            Pagination
        },
        created() {
            this.findAll(this.listQuery);
            this.loadref();
        },

        methods: {
            async loadref() {
                await this.$nextTick();
                this.dialogFormVisible = false;
            },
            //禁用
            async disableGoods(id) {
                const res = await disable_goods(id);
                this.$alert_res(res, this);
                this.findAll(this.listQuery);
            },
            //启用
            async enableGoods(id) {
                const res = await enable_goods(id);
                this.$alert_res(res, this);
                this.findAll(this.listQuery);
            },
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
                const res = await delete_goods(row.id);
                this.$alert_res(res, this);
                this.findAll(this.listQuery);
            },
            //添加用户
            addUser() {
                this.temp = Object.assign({}, this.nullTemp);
                this.handleType = '添加';
                this.dialogFormVisible = true;
            },
            //关闭 dialog
            closeDialog() {
                this.dialogFormVisible = false;
            },
            uploadSuccess(pic) {
                this.temp.picture = pic[0];
            },
            //更新
            async update() {
                let params = Object.assign({}, this.temp);//把填的内容复制下来
                const res = await update_goods(params);
                this.$alert_res(res, this);
                this.findAll(this.listQuery);
            },
            //插入
            async insert() {
                let params = Object.assign({}, this.temp);//把填的内容复制下来
                const res = await add_goods(params);
                this.$alert_res(res, this);
                this.findAll(this.listQuery);
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
                // console.log(this.$refs.singleimg);
                // this.$refs.singleimg.rmImages();
                this.temp = Object.assign({}, row);
                this.handleType = '更改';
                this.dialogFormVisible = true;
            },
            //添加
            addActivity() {
                this.temp = Object.assign({}, this.nullTemp);
                // this.$refs.singleimg.rmImages();
                this.handleType = '添加';
                this.dialogFormVisible = true;
            }


        }
    };
</script>

<style scoped>

</style>