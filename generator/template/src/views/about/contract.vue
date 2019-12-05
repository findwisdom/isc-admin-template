<template>
    <div>
        <TableHeader :keywords.sync="keywords" placeholder="请输入名称进行搜索" @search="onSearch" :search="search">
            <ul class="table-actions">
                <li>
                    <el-button type="primary" icon="el-icon-plus" size="mini" @click="onAdd">新建</el-button>
                </li>
            </ul>
        </TableHeader>

        <el-table :data="pageList" size="mini" v-loading="loading">
            <el-table-column prop="id" label="编号" width="50px"></el-table-column>
            <el-table-column prop="city" label="城市"></el-table-column>
            <el-table-column prop="name" label="公司名称" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="address" label="公司地址" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="email" label="邮箱" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="phone" label="电话" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="postCode" label="邮编"></el-table-column>
            <el-table-column label="操作" align="center" width="100px">
                <template slot-scope="scope">
                    <div>
                        <el-button size="mini" type="text" @click="onEdit(scope.$index, scope.row)">编辑</el-button>
                        <TableDelete class="table-operations-gap" @handleDelete="onTrash(scope.row)"></TableDelete>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="viewImg" alt="" />
        </el-dialog>
        <TableFooter :page-number.sync="pageNumber" :page-size.sync="pageSize" :page-total="pageTotal"></TableFooter>

        <ContractDialog @success="onDialogSuccess" :form="dialog.form" :visible.sync="dialog.visible"></ContractDialog>
    </div>
</template>

<script>
import { getCompanyList, deleteCompany } from '@/services/about';
import TableHeader from '@/components/table/TableHeader';
import TableFooter from '@/components/table/TableFooter';
import TableDelete from '@/components/table/TableDelete';
import ContractDialog from '@/components/dialog/about/ContractDialog';
import { fill } from '@/utils/object';
import { error, loading, alertel } from '@/utils/message';

export default {
    components: {
        TableHeader,
        TableFooter,
        ContractDialog,
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
            },
            viewImg: '',
            dialogVisible: false
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
                    id: null,
                    city: null,
                    name: null,
                    address: null,
                    email: null,
                    phone: null,
                    postCode: null,
                    mainCompany: null
                },
                item
            );
        },

        handlePicturePreview(file) {
            this.viewImg = file.picture;
            this.dialogVisible = true;
        },

        async getList() {
            let data = null;
            this.loading = true;
            try {
                data = await getCompanyList(this.pageSize, this.pageNumber, this.keywords);
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
                await deleteCompany(item.id);
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
