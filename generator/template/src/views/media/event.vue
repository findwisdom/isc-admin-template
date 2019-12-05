<template>
    <div>
        <TableHeader :keywords.sync="keywords" placeholder="请输入时间例:201908" @search="onSearch">
            <ul class="table-actions">
                <li>
                    <el-button type="primary" icon="el-icon-plus" size="mini" @click="onAdd">新建</el-button>
                </li>
            </ul>
        </TableHeader>

        <el-table :data="pageList" size="mini" v-loading="loading">
            <el-table-column prop="id" label="编号"></el-table-column>
            <el-table-column prop="date" label="时间"></el-table-column>
            <el-table-column prop="event" label="事记" :show-overflow-tooltip="true"></el-table-column>
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

        <EventDialog @success="onDialogSuccess" :form="dialog.form" :visible.sync="dialog.visible"></EventDialog>
    </div>
</template>

<script>
import { getEventList, removeEvent } from '@/services/media';
import TableHeader from '@/components/table/TableHeader';
import TableFooter from '@/components/table/TableFooter';
import TableDelete from '@/components/table/TableDelete';
import EventDialog from '@/components/dialog/media/EventDialog';
import { fill } from '@/utils/object';
import { success, error, loading } from '@/utils/message';

export default {
    name: 'Event',
    components: {
        TableHeader,
        TableFooter,
        TableDelete,
        EventDialog
    },
    data() {
        return {
            keywords: '',
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
                    date: null,
                    event: null
                },
                item
            );
        },

        async getList() {
            let data = null;
            this.loading = true;

            // yyyyMM
            let date = this.keywords.split('-').join('');
            if (this.keywords) {
                const y = this.keywords.slice(0, 4).padStart(4, '0');
                const m = this.keywords.slice(4, 6).padStart(2, '0');
                date = m === '00' ? y : y + m;
            }

            try {
                data = await getEventList(this.pageSize, this.pageNumber, date);
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
                await removeEvent(item.id);
                success('删除成功！');
                await this.getList();
            } catch (err) {
                return await error(err);
            } finally {
                ld.close();
            }
        }
    }
};
</script>
