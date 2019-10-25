<template>
    <div>
        <TableHeader :keywords.sync="keywords" placeholder="请输入文档名称搜索" @search="onSearch">
            <ul class="table-actions">
                <li>
                    <el-button type="primary" icon="el-icon-plus" size="mini" @click="onAdd">新建</el-button>
                </li>
            </ul>
        </TableHeader>

        <el-table :data="pageList" size="mini" v-loading="loading">
            <el-table-column prop="id" label="编号"></el-table-column>
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column prop="description" label="简介" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="link" label="链接"></el-table-column>
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

        <DocumentDialog @success="onDialogSuccess" :form="dialog.form" :visible.sync="dialog.visible"></DocumentDialog>
    </div>
</template>

<script>
import { getDocumentListAll, getDocumentListByName, removeDocument } from '@/services/integration';
import TableHeader from '@/components/table/TableHeader';
import TableFooter from '@/components/table/TableFooter';
import TableDelete from '@/components/table/TableDelete';
import DocumentDialog from '@/components/dialog/integration/DocumentDialog';
import { fill } from '@/utils/object';
import { error, loading } from '@/utils/message';
import { success } from '../../utils/message';

export default {
    name: 'Document',
    components: {
        TableHeader,
        TableFooter,
        TableDelete,
        DocumentDialog
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
    computed: {
        getDocumentList() {
            return this.keywords ? getDocumentListByName : getDocumentListAll;
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
                    id: undefined,
                    link: null,
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
                data = await this.getDocumentList(this.pageSize, this.pageNumber, this.keywords);
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
                await removeDocument(item.id);
                success('删除成功！');
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
