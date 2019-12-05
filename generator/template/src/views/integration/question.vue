<template>
    <div class="tree-wrapper" v-loading="loading">
        <el-button size="mini" type="primary" icon="el-icon-plus" @click="() => onAdd({ id: 0 })">
            新建一级问题
        </el-button>

        <el-tree :data="TreeData" node-key="id" default-expand-all :expand-on-click-node="false" :props="defaultProps">
            <span class="custom-tree-node" slot-scope="{ node, data }">
                <span class="question">问：{{ data.content }}</span>
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

                <p class="answer" slot="reference" ref="answer">答：{{ data.answer }}</p>
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

export default {
    name: 'Question',
    components: { QuestionDialog },
    data() {
        return {
            dialog: {
                visible: false,
                form: this.generateFrom()
            },
            TreeData: [],
            defaultProps: {
                children: 'subQuestionList'
            }
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
                data = {};
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
                    content: null,
                    answer: null,
                    parentQuestion: null,
                    subQuestionList: null
                },
                item
            );
        },

        onDialogSuccess() {
            this.getList();
        },

        onAdd(data) {
            this.dialog.form = this.generateFrom();
            // 新增下一级，parentId是当前级id
            Object.assign(this.dialog.form, { parentId: data.id });
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
                return await error(err);
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
        max-width: 80%;
        overflow: hidden;
        padding: 10px;
        .answer,
        .question {
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            outline: none;
        }
        .question {
            max-width: calc(100% - 160px);
            display: inline-block;
            margin-right: 40px;
        }
        .actions {
            width: 120px;
            display: inline-flex;
            justify-content: space-around;
        }
        .actions,
        .question {
            vertical-align: middle;
            margin-bottom: 10px;
        }
    }
}
</style>
