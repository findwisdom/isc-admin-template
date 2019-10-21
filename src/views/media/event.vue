<template>
    <div>
        <TableHeader :keywords.sync="keywords" placeholder="请输入事件时间搜索" @search="onSearch">
            <ul class="table-actions">
                <li>
                    <el-button type="primary" icon="el-icon-plus" size="mini" @click="onAdd">新建</el-button>
                </li>
            </ul>
        </TableHeader>

        <el-table :data="pageList" size="mini" v-loading="loading">
            <el-table-column prop="id" label="编号"></el-table-column>
            <el-table-column prop="date" label="时间"></el-table-column>
            <el-table-column prop="event" label="事记"></el-table-column>
            <el-table-column>
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
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="viewImg" alt="" />
        </el-dialog>
        <TableFooter :page-number.sync="pageNumber" :page-size.sync="pageSize" :page-total="pageTotal"></TableFooter>

        <EventDialog @success="onDialogSuccess" :form="dialog.form" :visible.sync="dialog.visible"></EventDialog>
    </div>
</template>

<script>
import { getEventList, removeEvent } from '@/services/media';
import TableHeader from '@/components/table/TableHeader';
import TableFooter from '@/components/table/TableFooter';
import EventDialog from '@/components/dialog/media/EventDialog';
import { fill } from '@/utils/object';
import { error, confirm, loading } from '@/utils/message';

export default {
    components: {
        TableHeader,
        TableFooter,
        EventDialog
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
            },
            viewImg: '',
            dialogVisible: false
        };
    },
    watch: {
        pageNumber() {
            this.getList();
        },
        pageSize() {
            this.pageNumber = 1;
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
                    date: null,
                    event: null
                },
                item
            );
        },

        async getList() {
            let data = null;
            this.loading = true;

            try {
                data = await getEventList(this.pageSize, this.pageNumber, this.keywords);
            } catch (err) {
                error(err);
                // TODO: service
                // data = { records: [], total: 0 };
                data = { records: [{ id: 1, date: '2019-10', event: 'xxx' }], total: 1 };
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
                await confirm(`确认删除选中的大事记吗？`);
                console.log(item);
            } catch (err) {
                return;
            }

            const ld = loading('删除中');

            try {
                await removeEvent(item.id);
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
