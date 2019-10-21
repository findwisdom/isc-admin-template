<template>
    <div>
        <TableHeader :keywords.sync="keywords" placeholder="请输入工单业务类型" @search="onSearch">
            <ul class="table-actions">
                <li>
                    <el-button type="primary" icon="el-icon-plus" size="mini" @click="onAdd">新建业务类型</el-button>
                </li>
            </ul>
        </TableHeader>

        <el-table :data="pageList" size="mini" v-loading="loading">
            <el-table-column prop="businessKey" label="编码"></el-table-column>
            <el-table-column prop="name" label="业务类型"></el-table-column>
            <el-table-column prop="flow" label="审批流程" width="200px">
                <template slot-scope="scope">
                    <el-tooltip placement="top" effect="light">
                        <div slot="content">{{ scope.row.flowList | orderFlow }}</div>
                        <div class="table-item-space">{{ scope.row.flowList | orderFlow }}</div>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column prop="handlerRole.name" label="处理人"></el-table-column>
            <el-table-column prop="createdAt" label="创建时间"></el-table-column>
            <el-table-column prop="updatedAt" label="修改时间"></el-table-column>
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

        <OrderTypeDialog
            @removePart="onOrderTypeDialogRemovePart"
            @addPart="onOrderTypeDialogAddPart"
            @success="onOrderTypeDialogSuccess"
            :form="dialog.orderTypeForm"
            :visible.sync="dialog.orderTypeVisible"
        />
    </div>
</template>

<script>
import { deleteBusiness, getBusinessListByPage, getFlowListByBusinessKey } from '@/services/operation';
import TableHeader from '../../components/table/TableHeader';
import TableFooter from '../../components/table/TableFooter';
import OrderTypeDialog from '../../components/dialog/backstage/OrderTypeDialog';
import { fill } from '../../utils/object';
import { error, confirm, alert, loading } from '../../utils/message';

export default {
    components: {
        TableHeader,
        TableFooter,
        OrderTypeDialog
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
                    title: 'xx',
                    businessKey: 'xxx',
                    flow: 'xxx',
                    creator: 'xxx',
                    createTime: 'xx',
                    updateTime: 'xxx'
                }
            ],
            dialog: {
                orderTypeVisible: false,
                orderTypeForm: this.generateOrderTypeFrom()
            }
        };
    },
    filters: {
        orderFlow(value) {
            if (Array.isArray(value)) {
                return value.map(item => item.approverRole.name).join('-');
            } else {
                return '';
            }
        }
    },
    watch: {
        pageNumber(val) {
            console.log(val);
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
        generateOrderTypeFrom(item) {
            return fill(
                {
                    id: undefined,
                    name: null,
                    businessKey: '',
                    handler: '',
                    flowList: [{ key: Date.now(), value: undefined }]
                },
                item
            );
        },

        async getList() {
            let data = null;
            this.loading = true;

            try {
                data = await getBusinessListByPage(this.pageSize, this.pageNumber, this.keywords);
            } catch (err) {
                error(err);
                data = { records: [], total: 0 };
            } finally {
                this.loading = false;
            }

            // data.records.forEach(item => {
            //     item.operatingSystem *= 1;
            // });
            this.pageList = data.records;
            this.pageTotal = data.total;
        },

        onSearch() {
            this.pageNumber = 1;
            this.getList();
        },

        onAdd() {
            this.dialog.orderTypeForm = this.generateOrderTypeFrom();
            this.dialog.orderTypeVisible = true;
        },

        onOrderTypeDialogSuccess() {
            this.getList();
        },

        onOrderTypeDialogRemovePart(item, index) {
            this.dialog.orderTypeForm.flowList.splice(index, 1);
        },

        onOrderTypeDialogAddPart() {
            this.dialog.orderTypeForm.flowList.push({ key: Date.now(), value: '' });
        },

        async onEdit(index, item) {
            let data = null;
            let flowList = [];
            try {
                data = await getFlowListByBusinessKey(item.businessKey);
                flowList = data.map(key => ({ key: key.id, value: key.approver }));
            } catch (err) {
                error(err);
            }
            this.dialog.orderTypeForm = this.generateOrderTypeFrom({ ...item, flowList });
            this.dialog.orderTypeVisible = true;
        },

        async onTrash(item) {
            try {
                await confirm(`确认删除选中的工单类型吗？`);
                console.log(item);
            } catch (err) {
                return;
            }

            const ld = loading('删除中');

            try {
                await deleteBusiness(item.businessKey);
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
