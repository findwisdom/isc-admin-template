<template>
    <div class="tree-wrapper">
        <el-button size="mini" type="primary" icon="el-icon-plus" @click="() => onAdd()">新建一级问题</el-button>
        <el-tree :data="TreeData" node-key="id" default-expand-all :expand-on-click-node="false">
            <span class="custom-tree-node" slot-scope="{ node, data }">
                <span class="question">问：{{ data.question }}</span>
                <span class="actions">
                    <el-button
                        type="primary"
                        size="mini"
                        icon="el-icon-plus"
                        circle
                        @click="() => onAdd(data)"
                    ></el-button>
                    <el-button
                        type="primary"
                        size="mini"
                        icon="el-icon-edit"
                        circle
                        @click="() => onEdit(data)"
                    ></el-button>
                    <el-button
                        type="danger"
                        size="mini"
                        icon="el-icon-delete"
                        circle
                        @click="() => onTrash(data)"
                    ></el-button>
                </span>
                <el-popover placement="top-end" width="400" trigger="hover" :content="`答：${data.answer}`">
                    <p class="answer" slot="reference">答：{{ data.answer }}</p>
                </el-popover>
            </span>
        </el-tree>

        <QuestionDialog @success="onDialogSuccess" :form="dialog.form" :visible.sync="dialog.visible"></QuestionDialog>
    </div>
</template>

<script>
import { getQuestionList, removeQuestion } from '@/services/integration';
import QuestionDialog from '@/components/dialog/integration/QuestionDialog';
import { fill } from '@/utils/object';
import { error, confirm, loading } from '@/utils/message';
import { testData } from './testData';

export default {
    name: 'Question',
    components: { QuestionDialog },
    data() {
        return {
            dialog: {
                visible: false,
                form: this.generateFrom()
            },
            TreeData: []
        };
    },
    created() {
        this.getList();
    },
    methods: {
        async getList() {
            let data = null;
            this.loading = true;

            try {
                data = await getQuestionList();
            } catch (err) {
                error(err);
                // TODO: service
                // data = { records: [], total: 0 };
                data = testData;
            } finally {
                this.loading = false;
            }

            this.TreeData = data;
        },

        generateFrom(item) {
            return fill(
                {
                    id: undefined,
                    parentId: null,
                    question: null,
                    answer: null
                },
                item
            );
        },

        onDialogSuccess() {
            this.getList();
        },

        onAdd() {
            this.dialog.form = this.generateFrom();
            this.dialog.visible = true;
        },

        onEdit(data) {
            this.dialog.form = this.generateFrom(data);
            this.dialog.visible = true;
        },

        async onTrash(data) {
            try {
                await confirm(`确认删除选中的问题吗？`);
            } catch (err) {
                return;
            }

            const ld = loading('删除中');

            try {
                await removeQuestion(data.id);
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

<style scoped lang="scss">
.tree-wrapper {
    padding: 20px;
    overflow: hidden;
    /deep/ .el-tree-node__content {
        height: auto;
    }
    .custom-tree-node {
        width: 700px;
        overflow: hidden;
        padding: 10px;
        .answer,
        .question {
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
        }
        .question {
            max-width: 400px;
            display: inline-block;
            margin-right: 40px;
            text-align: center;
        }
        .actions {
            width: 120px;
            display: inline-flex;
            justify-content: space-around;
            text-align: center;
        }
    }
}
</style>
