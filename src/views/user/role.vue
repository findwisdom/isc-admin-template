<template>
    <div>
        <TableHeader :keywords.sync="keywords" placeholder="请输入用户名进行搜索" @search="onSearch">
            <ul class="table-actions">
                <li>
                    <el-button type="primary" icon="el-icon-plus" size="mini" @click="onAdd">新建用户</el-button>
                </li>
            </ul>
        </TableHeader>

        <el-table :data="pageList" size="mini" v-loading="loading">
            <el-table-column prop="id" label="编号"></el-table-column>
            <el-table-column prop="name" label="用户名"></el-table-column>
            <el-table-column prop="email" label="邮箱"></el-table-column>
            <el-table-column label="操作" align="center" width="100px">
                <template slot-scope="scope">
                    <div>
                        <el-button size="mini" type="text" @click="onEdit(scope.$index, scope.row)">编辑</el-button>
                        <TableDelete v-if="!scope.row.admin" @handleDelete="onTrash(scope.row)"></TableDelete>
                    </div>
                </template>
            </el-table-column>
        </el-table>

        <TableFooter :page-number.sync="pageNumber" :page-size.sync="pageSize" :page-total="pageTotal"></TableFooter>

        <RoleDialog
            @success="onRoleDialogSuccess"
            :form="dialog.roleForm"
            :visible.sync="dialog.roleVisible"
        ></RoleDialog>
    </div>
</template>

<script>
import { getUserList, deleteUser } from '@/services/user';
import TableHeader from '@/components/table/TableHeader';
import TableFooter from '@/components/table/TableFooter';
import TableDelete from '@/components/table/TableDelete';
import RoleDialog from '@/components/dialog/user/RoleDialog';
import { fill } from '@/utils/object';
import { error, loading } from '@/utils/message';

export default {
    components: {
        TableHeader,
        TableFooter,
        TableDelete,
        RoleDialog
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
                    password: 'xxx',
                    email: 'xxx'
                }
            ],
            dialog: {
                roleVisible: false,
                roleForm: this.generateRoleFrom()
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
        generateRoleFrom(item) {
            return fill(
                {
                    id: undefined,
                    name: null,
                    password: null,
                    email: null,
                    admin: false
                },
                item
            );
        },

        async getList() {
            let data = null;
            this.loading = true;

            try {
                data = await getUserList(this.pageSize, this.pageNumber, this.keywords);
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
            this.dialog.roleForm = this.generateRoleFrom();
            this.dialog.roleVisible = true;
        },

        onRoleDialogSuccess() {
            this.getList();
        },

        onEdit(index, item) {
            this.dialog.roleForm = this.generateRoleFrom({ ...item, role: item.groupList[0].roleKey });
            this.dialog.roleVisible = true;
        },

        async onTrash(index, item) {
            const ld = loading('删除中');

            try {
                await deleteUser(item.id);
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
.table-item-space {
    padding: 0 10px;
    cursor: pointer;
    width: 200px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
</style>
