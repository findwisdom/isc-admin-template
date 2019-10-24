<template>
    <div>
        <TableHeader :keywords.sync="keywords" placeholder="请输入标题进行搜索" @search="onSearch">
            <ul class="table-actions">
                <li>
                    <el-button type="primary" icon="el-icon-plus" size="mini" @click="onAdd">新建</el-button>
                </li>
            </ul>
        </TableHeader>

        <el-table :data="pageList" size="mini" v-loading="loading">
            <el-table-column prop="id" label="编号"></el-table-column>
            <el-table-column prop="order" label="排序"></el-table-column>
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column prop="type" label="类型"></el-table-column>
            <el-table-column prop="obtainTime" label="获得时间"></el-table-column>
            <el-table-column prop="picture" label="图片">
                <template slot-scope="scope">
                    <Thumbnail :picture="scope.row.picture" />
                </template>
            </el-table-column>
            <el-table-column prop="remark" label="备注"></el-table-column>
            <el-table-column label="操作" align="center" width="100px">
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
        <HonourDialog @success="onDialogSuccess" :form="dialog.form" :visible.sync="dialog.visible"></HonourDialog>
    </div>
</template>

<script>
import { getPatentList, deletePatent } from '@/services/about';
import TableHeader from '@/components/table/TableHeader';
import TableFooter from '@/components/table/TableFooter';
import HonourDialog from '@/components/dialog/about/HonourDialog';
import Thumbnail from '@/components/Thumbnail';
import { fill } from '@/utils/object';
import { error, loading, alertel } from '@/utils/message';

export default {
    components: {
        TableHeader,
        TableFooter,
        HonourDialog,
        Thumbnail
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
                    order: 'xx',
                    name: 'XX',
                    type: 'XX',
                    obtainTime: '2019-04-14',
                    picture: 'http://b-ssl.duitang.com/uploads/blog/201312/04/20131204184148_hhXUT.jpeg',
                    remark: 'DSADDSADSA'
                }
            ],
            dialog: {
                visible: false,
                form: this.generateFrom()
            }
        };
    },
    filters: {
        orderFlow(value) {
            if (Array.isArray(value.groupList)) {
                return value.groupList[0].name;
            } else {
                return '';
            }
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
                    order: null,
                    name: null,
                    type: null,
                    obtainTime: null,
                    picture: null,
                    remark: null
                },
                item
            );
        },

        async getList() {
            let data = null;
            this.loading = true;
            try {
                data = await getPatentList(this.pageSize, this.pageNumber, this.keywords);
                this.loading = false;
            } catch (err) {
                error(err);
                data = { records: [], total: 0 };
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
            const ld = loading('删除中');

            try {
                await deletePatent(item.id);
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
