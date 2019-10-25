<template>
    <app-dialog :visible.sync="visible2" @close="onClose" @open="onOpen" @sure="onSure" :loading="loading">
        <template v-slot:title>
            {{ actionName }}
        </template>

        <template v-slot:default>
            <el-form ref="form" :model="form" :rules="rules" label-width="60px" size="mini">
                <el-form-item label="问题" prop="content">
                    <el-input type="textarea" :rows="2" v-model="form.content" maxlength="50"></el-input>
                </el-form-item>
                <el-form-item label="内容" prop="answer">
                    <el-input type="textarea" :rows="4" v-model="form.answer" maxlength="200"></el-input>
                </el-form-item>
            </el-form>
        </template>
    </app-dialog>
</template>

<script>
import AppDialog from '@/components/app/AppDialog';
import { success, error } from '@/utils/message';
import validation from '@/validations/question';
import { createQuestion, updateQuestion } from '@/services/integration';
export default {
    name: 'QuestionDialog',
    components: {
        AppDialog
    },
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        form: {
            type: Object,
            default: () => {
                return {};
            }
        }
    },
    data() {
        return {
            loading: false,
            rules: validation(this)
        };
    },
    computed: {
        visible2: {
            get() {
                return this.visible;
            },
            set(value) {
                this.$emit('update:visible', value);
            }
        },
        actionName() {
            return (this.form.id ? '编辑' : '添加') + '问题';
        },
        createUpdateQuestion() {
            return this.form.id ? updateQuestion : createQuestion;
        }
    },
    methods: {
        clearValidate() {
            this.$nextTick(() => {
                const form = this.$refs.form;
                form && form.clearValidate();
            });
        },

        onClose() {
            this.clearValidate();
        },

        onOpen() {
            this.clearValidate();
        },

        async onSure() {
            try {
                await this.$refs.form.validate();
            } catch (err) {
                return;
            }

            try {
                this.loading = true;
                await this.createUpdateQuestion(this.form);
            } catch (err) {
                return await error(err);
            } finally {
                this.loading = false;
            }

            success(`${this.actionName}成功`);
            this.visible2 = false;
            this.$emit('success');
        }
    }
};
</script>
