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
                        <TableDelete class="table-operations-gap" @handleDelete="onTrash(scope.row)"></TableDelete>
                    </div>
                </template>
            </el-table-column>
        </el-table>

        <TableFooter :page-number.sync="pageNumber" :page-size.sync="pageSize" :page-total="pageTotal"></TableFooter>
    </div>
</template>

<script>
import { getNewsListAll, getNewsListByTitle, removeNews } from '@/services/media';
import TableHeader from '@/components/table/TableHeader';
import TableFooter from '@/components/table/TableFooter';
import TableDelete from '@/components/table/TableDelete';
import Thumbnail from '@/components/Thumbnail';
import { success, error, loading } from '@/utils/message';

export default {
    name: 'News',
    components: {
        TableHeader,
        TableFooter,
        TableDelete,
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
    computed: {
        getNewsList() {
            return this.keywords ? getNewsListByTitle : getNewsListAll;
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
            let data = null;
            this.loading = true;

            try {
                data = await this.getNewsList(this.pageSize, this.pageNumber, this.keywords);
            } catch (err) {
                error(err);
                data = { list: [], totalSize: 0 };
                data = {
                    list: [
                        {
                            id: 1,
                            title: 'xx',
                            picture: 'https://www.apple.com/cn/icloud/images/screen_apps_collaborate_ipad_large_2x.jpg'
                        }
                    ],
                    totalSize: 1
                };
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
            this.$router.push('/media/news/edit');
        },

        onEdit(item) {
            this.$router.push(`/media/news/edit/?id=${item.id}`);
        },

        async onTrash(item) {
            const ld = loading('删除中');

            try {
                await removeNews(item.id);
                success('删除成功！');
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
