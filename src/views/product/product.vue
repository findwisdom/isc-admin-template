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
            <el-table-column prop="id" label="编号"></el-table-column>
            <el-table-column prop="name" label="产品名称"></el-table-column>
            <el-table-column prop="banner" label="产品banner图">
                <template slot-scope="scope">
                    <Thumbnail :picture="scope.row.banner" />
                </template>
            </el-table-column>
            <el-table-column prop="picture" label="封面图">
                <template slot-scope="scope">
                    <Thumbnail :picture="scope.row.picture" />
                </template>
            </el-table-column>
            <el-table-column prop="description" label="简介"></el-table-column>
            <el-table-column prop="productTypeId" label="所属类型"></el-table-column>
            <el-table-column prop="order" label="顺序"></el-table-column>
            <el-table-column label="操作" align="center" width="100px">
                <template slot-scope="scope">
                    <div>
                        <el-button size="mini" type="text" @click="onEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                            size="mini"
                            type="text"
                            class="el-button__text-delete"
                            @click="onTrash(scope.$index, scope.row)"
                        >
                            删除
                        </el-button>
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
import ProductDialog from '@/components/dialog/product/ProductDialog';
import Thumbnail from '@/components/Thumbnail';
import { fill } from '@/utils/object';
import { error, loading } from '@/utils/message';

export default {
    components: {
        TableHeader,
        TableFooter,
        ProductDialog,
        Thumbnail
    },
    data() {
        return {
            x: '',
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
                    banner: null,
                    order: null,
                    picture: null,
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
            try {
                await confirm(`确认删除选中的产品吗？`);
                console.log(item);
            } catch (err) {
                return;
            }

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

<style scoped lang="scss">
.table-des {
    margin-left: 40px;
    .table-count {
        font-size: 22px;
        color: $app-primary-color;
        margin: 0 5px;
    }
}
.table-img {
    width: 50px;
    height: 38px;
}
.table-item-space {
    padding: 0 10px;
    cursor: pointer;
    width: 200px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
.img-hover {
    cursor: pointer;
}
</style>
