<template>
    <div>
        <TableHeader :keywords.sync="keywords" placeholder="请输入用户名进行搜索" @search="onSearch">
            <!--<ul class="table-actions">-->
            <!--<li>-->
            <!--<el-button type="primary" icon="el-icon-plus" size="mini" @click="onAdd">新建用户</el-button>-->
            <!--</li>-->
            <!--</ul>-->
        </TableHeader>

        <el-table :data="pageList" size="mini" v-loading="loading">
            <el-table-column prop="id" label="编号"></el-table-column>
            <el-table-column prop="name" label="用户姓名"></el-table-column>
            <el-table-column prop="role" label="角色" width="200px">
                <template slot-scope="scope">
                    {{ scope.row | orderFlow }}
                </template>
            </el-table-column>
            <el-table-column prop="updatedAt" label="修改时间"></el-table-column>
            <el-table-column label="操作" align="center" width="100px">
                <template slot-scope="scope">
                    <div>
                        <el-button size="mini" type="text" @click="onEdit(scope.$index, scope.row)">编辑</el-button>
                        <!--<el-button-->
                        <!--size="mini"-->
                        <!--type="text"-->
                        <!--class="el-button__text-delete"-->
                        <!--@click="onTrash(scope.$index, scope.row)"-->
                        <!--&gt;-->
                        <!--删除-->
                        <!--</el-button>-->
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
import { getUserList } from '@services/user';
import TableHeader from '@components/table/TableHeader';
import TableFooter from '@components/table/TableFooter';
import RoleDialog from '@components/dialog/user/RoleDialog';
import { fill } from '@utils/object';
import { error } from '@utils/message';

export default {
    components: {
        TableHeader,
        TableFooter,
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
                    account: 'xxx',
                    role: 'xxx',
                    department: 'xxx',
                    createTime: 'xx',
                    updateTime: 'xxx'
                }
            ],
            dialog: {
                roleVisible: false,
                roleForm: this.generateRoleFrom()
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
        generateRoleFrom(item) {
            return fill(
                {
                    id: undefined,
                    projectId: this.projectId,
                    name: null,
                    account: null,
                    role: null,
                    department: null,
                    updateTime: null,
                    createTime: null
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
            this.dialog.roleForm = this.generateRoleFrom();
            this.dialog.roleVisible = true;
        },

        onRoleDialogSuccess() {
            this.getList();
        },

        onEdit(index, item) {
            this.dialog.roleForm = this.generateRoleFrom({ ...item, role: item.groupList[0].roleKey });
            this.dialog.roleVisible = true;
        }

        // async onTrash(index, item) {
        //     try {
        //         await confirm(`确认删除选中的角色吗？`);
        //     } catch (err) {
        //         return;
        //     }
        //
        //     const ld = loading('删除中');
        //
        //     try {
        //         await remove(item.id);
        //         await this.getList();
        //     } catch (err) {
        //         await alert(err);
        //     } finally {
        //         ld.close();
        //     }
        // }
    }
};
</script>

<style scoped lang="scss">
@import '../../scss/variables';
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
