<template>
    <div>
        <TableHeader :keywords.sync="keywords" placeholder="请输入案例名称进行搜索" @search="onSearch">
            <ul class="table-actions">
                <li>
                    <el-button type="primary" icon="el-icon-plus" size="mini" @click="onAdd">新建</el-button>
                </li>
            </ul>
        </TableHeader>

        <el-table :data="pageList" size="mini" v-loading="loading">
            <el-table-column prop="id" label="编号"></el-table-column>
            <el-table-column prop="name" label="案例名称"></el-table-column>
            <el-table-column prop="picture" label="案例图片">
                <template slot-scope="scope">
                    <div @click="handlePicturePreview(scope.row)" class="img-hover">
                        <img :src="scope.row.picture" :alt="scope.row.name" class="table-img" />
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="description" label="案例介绍"></el-table-column>
            <el-table-column prop="solutionId" label="所属解决方案"></el-table-column>
            <el-table-column prop="time" label="更新时间"></el-table-column>
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
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="viewImg" alt="" />
        </el-dialog>
        <TableFooter :page-number.sync="pageNumber" :page-size.sync="pageSize" :page-total="pageTotal"></TableFooter>

        <CaseDialog @success="onDialogSuccess" :form="dialog.form" :visible.sync="dialog.visible"></CaseDialog>
    </div>
</template>

<script>
// import { getUserList } from '@/services/user';
import TableHeader from '@/components/table/TableHeader';
import TableFooter from '@/components/table/TableFooter';
import CaseDialog from '@/components/dialog/solution/CaseDialog';
import { fill } from '@/utils/object';
// import { error } from '@/utils/message';

export default {
    components: {
        TableHeader,
        TableFooter,
        CaseDialog
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
                    picture: 'http://b-ssl.duitang.com/uploads/blog/201312/04/20131204184148_hhXUT.jpeg',
                    description: 'xxx',
                    solutionId: 'xxx',
                    updatedAt: 'xx'
                }
            ],
            dialog: {
                visible: false,
                form: this.generateFrom()
            },
            viewImg: '',
            dialogVisible: false
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
                    name: null,
                    order: null,
                    picture: null,
                    description: null,
                    solutionId: null
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
            this.loading = false;

            // try {
            //     data = await getUserList(this.pageSize, this.pageNumber, this.keywords);
            // } catch (err) {
            //     error(err);
            //     data = { records: [], total: 0 };
            // } finally {
            //     this.loading = false;
            // }

            // this.pageList = data.records;
            // this.pageTotal = data.total;
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

        async onTrash(index, item) {
            try {
                await confirm(`确认删除选中的角色吗？`);
            } catch (err) {
                return;
            }

            // const ld = loading('删除中');

            // try {
            //     await remove(item.id);
            //     await this.getList();
            // } catch (err) {
            //     await alert(err);
            // } finally {
            //     ld.close();
            // }
        }
    }
};
</script>

<style scoped lang="scss"></style>
