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
            <el-form ref="form" :model="form" :rules="rules" label-width="80px" size="mini">
                <el-form-item label="用户名" prop="name" class="is-required">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="email" class="is-required">
                    <el-input type="password" v-model="form.password" :disabled="form.admin"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email" class="is-required">
                    <el-input v-model="form.email"></el-input>
                </el-form-item>
            </el-form>
        </template>
    </app-dialog>
</template>

<script>
import AppDialog from '@/components/app/AppDialog';
import { alertel, success } from '@/utils/message';
import validation from '@/validations/gateway';
import { createUser, updateUser } from '@/services/user';
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
            return (this.form.id ? '编辑' : '添加') + '用户';
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
                    await updateUser(this.form);
                } else {
                    await createUser(this.form);
                }
            } catch (err) {
                return await alertel(err);
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
