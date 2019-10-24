<template>
    <div>
        <TableHeader :keywords.sync="keywords" placeholder="请输入产品名称进行搜索" @search="onSearch">
            <ul class="table-actions">
                <li>
                    <el-button type="primary" icon="el-icon-plus" size="mini" @click="onAdd">新建</el-button>
                </li>
            </ul>
        </TableHeader>

        <el-table :data="pageList" size="mini" v-loading="loading">
            <el-table-column prop="id" label="编号" width="50px"></el-table-column>
            <el-table-column prop="name" label="产品名称" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="banner" label="产品banner图" width="100px">
                <template slot-scope="scope">
                    <Thumbnail :picture="scope.row.banner" />
                </template>
            </el-table-column>
            <el-table-column prop="picture" label="封面图" width="100px">
                <template slot-scope="scope">
                    <Thumbnail :picture="scope.row.picture" />
                </template>
            </el-table-column>
            <el-table-column prop="description" label="简介" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="productType.name" label="所属类型"></el-table-column>
            <el-table-column prop="order" label="顺序"></el-table-column>
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
        <ProductDialog @success="onDialogSuccess" :form="dialog.form" :visible.sync="dialog.visible"></ProductDialog>
    </div>
</template>

<script>
import { getProductList, deleteProduct } from '@/services/product';
import TableHeader from '@/components/table/TableHeader';
import TableFooter from '@/components/table/TableFooter';
import TableDelete from '@/components/table/TableDelete';
import ProductDialog from '@/components/dialog/product/ProductDialog';
import Thumbnail from '@/components/Thumbnail';
import { fill } from '@/utils/object';
import { error, alert, loading } from '@/utils/message';

export default {
    components: {
        TableHeader,
        TableFooter,
        ProductDialog,
        Thumbnail,
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
                    name: 'xx',
                    banner: 'http://b-ssl.duitang.com/uploads/blog/201312/04/20131204184148_hhXUT.jpeg',
                    picture: 'http://b-ssl.duitang.com/uploads/blog/201312/04/20131204184148_hhXUT.jpeg',
                    description: 'xxx',
                    order: null,
                    productTypeId: null
                }
            ],
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
                    banner: 'http://b-ssl.duitang.com/uploads/blog/201312/04/20131204184148_hhXUT.jpeg',
                    order: null,
                    picture: 'http://b-ssl.duitang.com/uploads/blog/201312/04/20131204184148_hhXUT.jpeg',
                    description: null,
                    productTypeId: null
                },
                item
            );
        },
        async getList() {
            let data = null;
            this.loading = true;
            try {
                data = await getProductList(this.pageSize, this.pageNumber, this.keywords);
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
                await deleteProduct(item.id);
                await this.getList();
            } catch (err) {
                await alert(err);
            } finally {
                ld.close();
            }
        }
    }
};
</script>

<style scoped lang="scss"></style>
