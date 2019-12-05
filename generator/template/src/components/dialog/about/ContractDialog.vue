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
                <el-form-item label="公司名称" prop="name" class="is-required">
                    <el-input v-model="form.name" placeholder="请输入公司名称"></el-input>
                </el-form-item>
                <el-form-item label="公司地址" prop="address" class="is-required">
                    <el-input v-model="form.address" placeholder="请输入公司地址"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email" class="is-required">
                    <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="phone" class="is-required">
                    <el-input v-model="form.phone" placeholder="请输入联系电话"></el-input>
                </el-form-item>
                <el-form-item label="邮编" prop="postCode">
                    <el-input v-model="form.postCode" placeholder="请输入邮编"></el-input>
                </el-form-item>
                <el-form-item label="是否主公司">
                    <el-switch
                        v-model="form.mainCompany"
                        active-color="#13ce66"
                        inactive-color="#000000"
                        :active-value="active"
                        :inactive-value="inactive"
                    ></el-switch>
                </el-form-item>
            </el-form>
        </template>
    </app-dialog>
</template>

<script>
import AppDialog from '@/components/app/AppDialog';
import { error, success } from '@/utils/message';
import validation from '@/validations/contract';
import { createCompany, updateCompany } from '@/services/about';
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
            active: true,
            inactive: false,
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
            return (this.form.id ? '编辑' : '添加') + '公司';
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
                    await updateCompany(this.form);
                } else {
                    await createCompany(this.form);
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
