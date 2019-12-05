<template>
    <app-dialog :visible.sync="visible2" @close="onClose" @open="onOpen" @sure="onSure" :loading="loading">
        <template v-slot:title>
            {{ actionName }}
        </template>

        <template v-slot:default>
            <el-form ref="form" :model="form" :rules="rules" label-position="top" size="mini">
                <el-form-item label="城市" prop="city" class="is-required">
                    <el-input v-model="form.city" placeholder="请输入城市"></el-input>
                </el-form-item>
                <el-form-item label="岗位名称" prop="name" class="is-required">
                    <el-input v-model="form.name" placeholder="请输入岗位名称"></el-input>
                </el-form-item>
                <el-form-item label="岗位职责" prop="duty" class="is-required">
                    <el-input
                        type="textarea"
                        :rows="4"
                        v-model="form.duty"
                        placeholder="请输入岗位职责"
                        maxlength="200"
                    ></el-input>
                </el-form-item>
                <el-form-item label="任职资格" prop="qualification" class="is-required">
                    <el-input
                        type="textarea"
                        :rows="4"
                        v-model="form.qualification"
                        placeholder="请输入任职资格"
                        maxlength="200"
                    ></el-input>
                </el-form-item>
                <el-form-item label="发布时间" prop="publishTime" class="is-required">
                    <el-date-picker
                        v-model="form.publishTime"
                        value-format="yyyy-MM-dd"
                        type="date"
                        placeholder="选择日期"
                    ></el-date-picker>
                </el-form-item>
            </el-form>
        </template>
    </app-dialog>
</template>

<script>
import AppDialog from '@/components/app/AppDialog';
import { error, success } from '@/utils/message';
import validation from '@/validations/join';
import { createCareer, updateCareer } from '@/services/about';
export default {
    name: 'RoleDialog',
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
            osTypeOptions: [],
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
            return (this.form.id ? '编辑' : '添加') + '岗位';
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
                if (this.form.id) {
                    await updateCareer(this.form);
                } else {
                    await createCareer(this.form);
                }
            } catch (err) {
                return await error(err);
            } finally {
                this.loading = false;
            }

            success(`${this.actionName}成功`);
            this.visible2 = false;
            this.$emit('success');
        }
    },
    async created() {}
};
</script>
