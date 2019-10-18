<template>
    <div>
        <TableHeader :keywords.sync="keywords" placeholder="请输入案例名称" @search="onSearch">
            <ul class="table-actions">
                <li>
                    <el-button type="primary" icon="el-icon-plus" size="mini" @click="onAdd">新建</el-button>
                </li>
            </ul>
        </TableHeader>

        <el-table :data="pageList" size="mini" v-loading="loading">
            <el-table-column prop="serialNumber" label="案例名称"></el-table-column>
            <el-table-column prop="title" label="简介"></el-table-column>
            <el-table-column prop="business" label="图片"></el-table-column>
            <el-table-column prop="owner" label="归属"></el-table-column>
            <el-table-column label="操作" align="center" width="100px">
                <template slot-scope="scope">
                    <div>
                        <el-button v-if="scope.row.flowId === 0" size="mini" type="text" @click="onEdit(scope.row)">
                            编辑
                        </el-button>
                        <el-button v-if="scope.row.flowId === 0" size="mini" type="text" @click="onEdit(scope.row)">
                            删除
                        </el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>

        <TableFooter :page-number.sync="pageNumber" :page-size.sync="pageSize" :page-total="pageTotal"></TableFooter>
    </div>
</template>

<script>
// import { getTodoRepair, setOrderDetail } from '@/services/order';
import TableHeader from '@/components/table/TableHeader';
import TableFooter from '@/components/table/TableFooter';
// import { error } from '@/utils/message';

export default {
    components: {
        TableHeader,
        TableFooter
    },
    data() {
        return {
            keywords: null,
            loading: false,
            pageNumber: 1,
            pageSize: 10,
            pageTotal: 0,
            pageList: []
        };
    },
    filters: {
        orderFlow(value) {
            if (value.finished) {
                return '查看详情';
            } else if (value.handleState) {
                let handler = value.business.handler;
                let isApproval = false;
                let groupList = window.sessionStorage.getItem('groupList');
                if (groupList) {
                    isApproval = JSON.parse(groupList).some(item => item.roleKey === handler);
                }
                return isApproval ? '待处理' : '处理中';
            } else {
                let isApproval = false;
                let handler = value.flow && value.flow.approver ? value.flow : 'no'; // 代码防御：预防后端错误返回
                let groupList = window.sessionStorage.getItem('groupList');
                if (groupList) {
                    isApproval = JSON.parse(groupList).some(item => item.roleKey === handler);
                }
                return isApproval ? '待处理' : '处理中';
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
        async getList() {
            // let data = null;
            this.loading = true;

            // try {
            //     data = await getTodoRepair(this.pageSize, this.pageNumber, this.keywords);
            // } catch (err) {
            //     error(err);
            //     data = { records: [], total: 0 };
            // } finally {
            this.loading = false;
            // }
            //
            // this.pageList = data.records;
            // this.pageTotal = data.total;
        },

        onSearch() {
            this.pageNumber = 1;
            this.getList();
        },

        onAdd() {
            this.$router.push({ path: '/order/create' });
        },

        onEdit(row) {
            console.log(row);
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
</style>
