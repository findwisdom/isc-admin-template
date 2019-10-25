<template>
    <app-dialog
        :visible.sync="visible2"
        @close="onClose"
        @open="onOpen"
        @sure="onSure"
        :loading="loading"
        width="400px"
    >
        <template v-slot:title>
            {{ actionName }}
        </template>

        <template v-slot:default>
            <el-form ref="form" :model="form" :rules="rules" label-position="top" size="mini">
                <el-form-item label="步骤" prop="order">
                    <el-input-number v-model.number="form.order"></el-input-number>
                </el-form-item>
                <el-form-item label="名称" prop="name">
                    <el-input v-model="form.name" maxlength="10"></el-input>
                </el-form-item>
                <el-form-item label="内容" prop="description">
                    <el-input type="textarea" :rows="2" v-model="form.description" maxlength="150"></el-input>
                </el-form-item>
            </el-form>
        </template>
    </app-dialog>
</template>

<script>
import AppDialog from '@/components/app/AppDialog';
import { success, error } from '@/utils/message';
import validation from '@/validations/eduction';
import { createEduction, updateEduction } from '@/services/integration';
export default {
    name: 'EductionDialog',
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
            return (this.form.id ? '编辑' : '添加') + '步骤';
        },
        createUpdateEduction() {
            return this.form.id ? updateEduction : createEduction;
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
                await this.createUpdateEduction(this.form);
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
