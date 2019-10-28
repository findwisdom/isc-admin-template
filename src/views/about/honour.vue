<template>
    <div>
        <TableHeader :keywords.sync="keywords" placeholder="请输入名称进行搜索" searchWidth="350px" @search="onSearch">
            <template slot="left">
                <el-select
                    v-model="searchType"
                    @change="onSearch"
                    class="button-margin-left search-option-width"
                    size="mini"
                    clearable
                    placeholder="请选择类型"
                >
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
            </template>
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
            <el-table-column prop="type" label="类型">
                <template slot-scope="scope">
                    {{ scope.row.type | honourType }}
                </template>
            </el-table-column>
            <el-table-column prop="obtainTime" label="获得时间"></el-table-column>
            <el-table-column prop="picture" label="图片">
                <template slot-scope="scope">
                    <Thumbnail :picture="scope.row.picture" />
                </template>
            </el-table-column>
            <el-table-column prop="remark" label="备注" :show-overflow-tooltip="true"></el-table-column>
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
        <HonourDialog @success="onDialogSuccess" :form="dialog.form" :visible.sync="dialog.visible"></HonourDialog>
    </div>
</template>

<script>
import { getPatentList, deletePatent, getPatentByName } from '@/services/about';
import TableHeader from '@/components/table/TableHeader';
import TableFooter from '@/components/table/TableFooter';
import TableDelete from '@/components/table/TableDelete';
import HonourDialog from '@/components/dialog/about/HonourDialog';
import Thumbnail from '@/components/Thumbnail';
import { fill } from '@/utils/object';
import { error, loading, alertel } from '@/utils/message';
import { honourTypeOptions } from '@/enums/honour-type';

export default {
    components: {
        TableHeader,
        TableFooter,
        HonourDialog,
        Thumbnail,
        TableDelete
    },
    data() {
        return {
            options: honourTypeOptions,
            keywords: null,
            searchType: null,
            loading: false,
            pageNumber: 1,
            pageSize: 10,
            pageTotal: 0,
            pageList: [],
            dialog: {
                visible: false,
                form: this.generateFrom()
            }
        };
    },
    filters: {
        honourType(value) {
            let type = honourTypeOptions.filter(v => v.value === value) || [];
            if (type.length > 0) {
                return type[0].label;
            } else {
                return '未知类型';
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
    computed: {
        getPatent() {
            return this.keywords || this.searchType ? getPatentByName : getPatentList;
        }
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
                data = await this.getPatent(this.pageSize, this.pageNumber, this.keywords, this.searchType);
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

<style scoped lang="scss">
.search-option-width {
    width: 250px;
}
</style>
