<template>
    <div>
        <TableHeader :keywords.sync="keywords" placeholder="请输入伙伴名称进行搜索" @search="onSearch" :search="search">
            <ul class="table-actions">
                <li>
                    <el-button type="primary" icon="el-icon-plus" size="mini" @click="onAdd">新建</el-button>
                </li>
            </ul>
        </TableHeader>

        <el-table :data="pageList" size="mini" v-loading="loading">
            <el-table-column prop="id" label="编号" width="50px"></el-table-column>
            <el-table-column prop="order" label="排序"></el-table-column>
            <el-table-column prop="name" label="伙伴名称"></el-table-column>
            <el-table-column prop="picture" label="图片">
                <template slot-scope="scope">
                    <Thumbnail :picture="scope.row.picture" />
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="100px">
                <template slot-scope="scope">
                    <div>
                        <el-button size="mini" type="text" @click="onEdit(scope.$index, scope.row)">编辑</el-button>
                        <TableDelete class="table-operations-gap" @handleDelete="onTrash(scope.row)"></TableDelete>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <TableFooter :page-number.sync="pageNumber" :page-size.sync="pageSize" :page-total="pageTotal"></TableFooter>

        <PartnerDialog @success="onDialogSuccess" :form="dialog.form" :visible.sync="dialog.visible"></PartnerDialog>
    </div>
</template>

<script>
import { getPartnerList, deletePartner } from '@/services/about';
import TableHeader from '@/components/table/TableHeader';
import TableFooter from '@/components/table/TableFooter';
import TableDelete from '@/components/table/TableDelete';
import PartnerDialog from '@/components/dialog/about/PartnerDialog';
import Thumbnail from '@/components/Thumbnail';
import { fill } from '@/utils/object';
import { error, loading, alertel } from '@/utils/message';

export default {
    components: {
        TableHeader,
        TableFooter,
        PartnerDialog,
        Thumbnail,
        TableDelete
    },
    data() {
        return {
            search: false,
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
    filters: {},
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
                    name: null,
                    order: null,
                    picture: null
                },
                item
            );
        },
        async getList() {
            let data = null;
            this.loading = true;
            try {
                data = await getPartnerList(this.pageSize, this.pageNumber, this.keywords);
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
                await deletePartner(item.id);
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
