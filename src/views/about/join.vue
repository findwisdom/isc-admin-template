<template>
    <div>
        <TableHeader :keywords.sync="keywords" placeholder="请输入岗位名称进行搜索" @search="onSearch">
            <ul class="table-actions">
                <li>
                    <el-button type="primary" icon="el-icon-plus" size="mini" @click="onAdd">新建</el-button>
                </li>
            </ul>
        </TableHeader>

        <el-table :data="pageList" size="mini" v-loading="loading">
            <el-table-column prop="id" label="编号"></el-table-column>
            <el-table-column prop="name" label="岗位名称"></el-table-column>
            <el-table-column prop="city" label="城市"></el-table-column>
            <el-table-column prop="duty" label="岗位职责" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="qualification" label="任职资格" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="publishTime" label="发布时间"></el-table-column>
            <el-table-column prop="viewCount" label="浏览次数"></el-table-column>
            <el-table-column>
                <template slot-scope="scope">
                    <div>
                        <el-button size="mini" type="text" @click="onEdit(scope.$index, scope.row)">编辑</el-button>
                        <TableDelete class="table-operations-gap" @handleDelete="onTrash(scope.row)"></TableDelete>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <TableFooter :page-number.sync="pageNumber" :page-size.sync="pageSize" :page-total="pageTotal"></TableFooter>

        <JoinDialog @success="onDialogSuccess" :form="dialog.form" :visible.sync="dialog.visible"></JoinDialog>
    </div>
</template>

<script>
import { getCareerList, getCareerByName, deleteCareer } from '@/services/about';
import TableHeader from '@/components/table/TableHeader';
import TableFooter from '@/components/table/TableFooter';
import TableDelete from '@/components/table/TableDelete';
import JoinDialog from '@/components/dialog/about/JoinDialog';
import { fill } from '@/utils/object';
import { error, alertel, loading } from '@/utils/message';

export default {
    components: {
        TableHeader,
        TableFooter,
        JoinDialog,
        TableDelete
    },
    data() {
        return {
            keywords: null,
            loading: false,
            pageNumber: 1,
            pageSize: 10,
            pageTotal: 0,
            pageList: [
                {
                    id: 'xx',
                    city: '上海',
                    name: '前端',
                    duty: '写代码',
                    publishTime: '2018-03-12',
                    viewCount: '245',
                    qualification: '任职资格'
                }
            ],
            dialog: {
                visible: false,
                form: this.generateFrom()
            }
        };
    },
    filters: {},
    computed: {
        getCareer() {
            return this.keywords ? getCareerByName : getCareerList;
        }
    },
    watch: {
        pageNumber() {
            this.getList();
        },
        pageSize() {
            this.getList();
        }
    },
    created() {
        this.getList();
    },
    methods: {
        generateFrom(item) {
            return fill(
                {
                    id: null,
                    city: null,
                    name: null,
                    duty: null,
                    publishTime: null,
                    qualification: null
                },
                item
            );
        },
        async getList() {
            let data = null;
            this.loading = true;
            try {
                data = data = await this.getCareer(this.pageSize, this.pageNumber, this.keywords);
                this.loading = false;
            } catch (err) {
                error(err);
                data = { list: [], totalSize: 0 };
            } finally {
                this.loading = false;
            }

            this.pageList = data.list;
            this.pageTotal = data.totalSize;
        },

        onSearch() {
            this.pageNumber = 1;
            this.getList();
        },

        onAdd() {
            this.dialog.form = this.generateFrom();
            this.dialog.visible = true;
        },

        onDialogSuccess() {
            this.getList();
        },

        onEdit(index, item) {
            this.dialog.form = this.generateFrom(item);
            this.dialog.visible = true;
        },

        async onTrash(item) {
            const ld = loading('删除中');

            try {
                await deleteCareer(item.id);
                await this.getList();
            } catch (err) {
                await alertel(err);
            } finally {
                ld.close();
            }
        }
    }
};
</script>

<style scoped lang="scss"></style>
