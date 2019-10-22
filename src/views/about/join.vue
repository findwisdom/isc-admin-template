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
            <el-table-column prop="name" label="岗位名称"></el-table-column>
            <el-table-column prop="city" label="城市"></el-table-column>
            <el-table-column prop="duty" label="岗位职责"></el-table-column>
            <el-table-column prop="qualification" label="任职资格"></el-table-column>
            <el-table-column prop="publishTime" label="发布时间"></el-table-column>
            <el-table-column prop="browserTimes" label="浏览次数"></el-table-column>
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

        <JoinDialog @success="onDialogSuccess" :form="dialog.form" :visible.sync="dialog.visible"></JoinDialog>
    </div>
</template>

<script>
// import { getUserList } from '@/services/user';
import TableHeader from '@/components/table/TableHeader';
import TableFooter from '@/components/table/TableFooter';
import JoinDialog from '@/components/dialog/about/JoinDialog';
import { fill } from '@/utils/object';
// import { error } from '@/utils/message';

export default {
    components: {
        TableHeader,
        TableFooter,
        JoinDialog
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
                    city: '上海',
                    name: '前端',
                    duty: '写代码',
                    publishTime: '2018-03-12',
                    qualification: '任职资格'
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
                    id: null,
                    city: null,
                    name: null,
                    address: null,
                    email: null,
                    phone: null,
                    postCode: null,
                    mainCompany: false
                },
                item
            );
        },

        handlePicturePreview(file) {
            this.viewImg = file.picture;
            this.dialogVisible = true;
        },

        async getList() {
            // let data = null;
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

        async onTrash(item) {
            try {
                await confirm(`确认删除选中的角色吗？`);
                console.log(item);
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
