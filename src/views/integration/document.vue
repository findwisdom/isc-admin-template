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
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column prop="description" label="简介" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="link" label="链接"></el-table-column>
            <el-table-column align="right">
                <template slot-scope="scope">
                    <div>
                        <el-button size="mini" type="text" @click="onEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini" type="text" class="el-button__text-delete" @click="onTrash(scope.row)">
                            删除
                        </el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>

        <TableFooter :page-number.sync="pageNumber" :page-size.sync="pageSize" :page-total="pageTotal"></TableFooter>

        <DocumentDialog @success="onDialogSuccess" :form="dialog.form" :visible.sync="dialog.visible"></DocumentDialog>
    </div>
</template>

<script>
import { getDocumentList, removeDocument } from '@/services/integration';
import TableHeader from '@/components/table/TableHeader';
import TableFooter from '@/components/table/TableFooter';
import DocumentDialog from '@/components/dialog/integration/DocumentDialog';
import { fill } from '@/utils/object';
import { error, confirm, loading } from '@/utils/message';

export default {
    name: 'Document',
    components: {
        TableHeader,
        TableFooter,
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
                data = await getDocumentList(this.pageSize, this.pageNumber, this.keywords);
            } catch (err) {
                error(err);
                // TODO: service
                // data = { records: [], total: 0 };
                data = {
                    records: [
                        {
                            id: 1,
                            order: 1,
                            name: '学习文档',
                            description: '如果没有登录指令集-集成商平台账号，请参考账号注册教程。',
                            link: 'http://www.isyscore.com/'
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
                await confirm(`确认删除选中的文档吗？`);
            } catch (err) {
                return;
            }

            const ld = loading('删除中');

            try {
                await removeDocument(item.id);
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
