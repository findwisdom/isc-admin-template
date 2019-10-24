<template>
    <div>
        <TableHeader :keywords.sync="keywords" placeholder="请输入步骤名称搜索" @search="onSearch">
            <ul class="table-actions">
                <li>
                    <el-button type="primary" icon="el-icon-plus" size="mini" @click="onAdd">新建</el-button>
                </li>
            </ul>
        </TableHeader>

        <el-table :data="pageList" size="mini" v-loading="loading">
            <el-table-column prop="id" label="编号"></el-table-column>
            <el-table-column prop="order" label="步骤"></el-table-column>
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column prop="description" label="内容" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column align="right">
                <template slot-scope="scope">
                    <div>
                        <el-button size="mini" type="text" @click="onEdit(scope.$index, scope.row)">编辑</el-button>
                        <TableDelete class="table-operations-gap" @handleDelete="onTrash(scope.row)"></TableDelete>
                    </div>
                </template>
            </el-table-column>
        </el-table>

        <TableFooter :page-number.sync="pageNumber" :page-size.sync="pageSize" :page-total="pageTotal"></TableFooter>

        <EductionDialog @success="onDialogSuccess" :form="dialog.form" :visible.sync="dialog.visible"></EductionDialog>
    </div>
</template>

<script>
import { getEductionList, removeEduction } from '@/services/integration';
import TableHeader from '@/components/table/TableHeader';
import TableFooter from '@/components/table/TableFooter';
import TableDelete from '@/components/table/TableDelete';
import EductionDialog from '@/components/dialog/integration/EductionDialog';
import { fill } from '@/utils/object';
import { error, confirm, loading } from '@/utils/message';

export default {
    name: 'Eduction',
    components: {
        TableHeader,
        TableFooter,
        TableDelete,
        EductionDialog
    },
    data() {
        return {
            keywords: null,
            loading: false,
            pageNumber: 1,
            pageSize: 10,
            pageTotal: 0,
            pageList: [],
            dialog: {
                visible: false,
                form: this.generateFrom()
            }
        };
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
                    id: undefined,
                    order: null,
                    name: null,
                    description: null
                },
                item
            );
        },

        async getList() {
            let data = null;
            this.loading = true;

            try {
                data = await getEductionList(this.pageSize, this.pageNumber, this.keywords);
            } catch (err) {
                error(err);
                // TODO: service
                // data = { records: [], total: 0 };
                data = {
                    records: [
                        {
                            id: 1,
                            order: 1,
                            name: '登录注册',
                            description: '登录指令集-集成商平台，如果没有账号，请参考账号注册教程。'
                        }
                    ],
                    total: 1
                };
            } finally {
                this.loading = false;
            }

            this.pageList = data.records;
            this.pageTotal = data.total;
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
            try {
                await confirm(`确认删除选中的步骤吗？`);
            } catch (err) {
                return;
            }

            const ld = loading('删除中');

            try {
                await removeEduction(item.id);
                await this.getList();
            } catch (err) {
                await error(err);
            } finally {
                ld.close();
            }
        }
    }
};
</script>
