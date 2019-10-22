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
            <el-table-column prop="title" label="标题"></el-table-column>
            <el-table-column prop="picture" label="封面图">
                <template slot-scope="scope">
                    <Thumbnail :picture="scope.row.picture" />
                </template>
            </el-table-column>
            <el-table-column prop="description" label="简介"></el-table-column>
            <el-table-column prop="order" label="排序"></el-table-column>
            <el-table-column prop="publishTime" label="发布时间"></el-table-column>
            <el-table-column label="操作" align="center" width="100px">
                <template slot-scope="scope">
                    <div>
                        <el-button size="mini" type="text" @click="onEdit(scope.row)">编辑</el-button>
                        <el-button size="mini" type="text" class="el-button__text-delete" @click="onTrash(scope.row)">
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
import { getNewsList, removeNews } from '@/services/media';
import TableHeader from '@/components/table/TableHeader';
import TableFooter from '@/components/table/TableFooter';
import Thumbnail from '@/components/Thumbnail';
import { error, confirm, loading } from '@/utils/message';

export default {
    components: {
        TableHeader,
        TableFooter,
        Thumbnail
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
            let data = null;
            this.loading = true;

            try {
                data = await getNewsList(this.pageSize, this.pageNumber, this.keywords);
            } catch (err) {
                error(err);
                // TODO: service
                // data = { records: [], total: 0 };
                data = {
                    records: [
                        {
                            id: 1,
                            title: '迈入亿级时代，物联网企业成功突围的两种商业模式',
                            publishTime: '2018-11-13',
                            description:
                                '面对碎片化的物联网市场，如何创造商业价值？面对B端这根难啃的骨头，如何找到“肥肉”、如何变现？',
                            picture: 'https://www.apple.com/cn/icloud/images/screen_apps_collaborate_ipad_large_2x.jpg',
                            order: 2
                        }
                    ],
                    total: 1
                };
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
            this.$router.push('/media/news/edit');
        },

        onEdit(item) {
            this.$router.push(`/media/news/edit/?id=${item.id}`);
        },

        async onTrash(item) {
            try {
                await confirm(`确认删除选中的媒体报道吗？`);
            } catch (err) {
                return;
            }

            const ld = loading('删除中');

            try {
                await removeNews(item.id);
                await this.getList();
            } catch (err) {
                await error(err);
            } finally {
                ld.close();
            }
        }
    }
};
</script>
