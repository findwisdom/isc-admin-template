<template>
    <app-dialog
        :visible.sync="visible2"
        @close="onClose"
        @open="onOpen"
        @sure="onSure"
        :loading="loading"
        width="800px"
    >
        <template v-slot:title>
            {{ actionName }}
        </template>

        <template v-slot:default>
            <el-form ref="form" :model="form" :rules="rules" label-width="120px" size="mini">
                <el-form-item label="城市" prop="city" class="is-required">
                    <el-input v-model="form.city" placeholder="请输入城市" maxlength="40"></el-input>
                </el-form-item>
                <el-form-item label="公司名称" prop="name" class="is-required">
                    <el-input v-model="form.name" placeholder="请输入公司名称" maxlength="40"></el-input>
                </el-form-item>
                <el-form-item label="公司地址" prop="address" class="is-required">
                    <el-input v-model="form.address" placeholder="请输入公司地址" maxlength="40"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email" class="is-required">
                    <el-input v-model="form.email" placeholder="请输入公司地址" maxlength="40"></el-input>
                </el-form-item>
                <el-form-item label="公司地址" prop="name" class="is-required">
                    <el-input v-model="form.address" placeholder="请输入公司地址" maxlength="40"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="phone" class="is-required">
                    <el-input v-model="form.phone" placeholder="请输入联系电话" maxlength="40"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="phone" class="is-required">
                    <el-input v-model="form.phone" placeholder="请输入联系电话" maxlength="40"></el-input>
                </el-form-item>
                <el-form-item label="是否主公司" prop="phone" class="is-required">
                    <el-switch
                        v-model="form.mainCompany"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        active-value="100"
                        inactive-value="0"
                    ></el-switch>
                </el-form-item>
            </el-form>
        </template>
    </app-dialog>
</template>

<script>
import AppDialog from '@/components/app/AppDialog';
import { alert, success, error } from '@/utils/message';
import validation from '@/validations/gateway';
import { getOperationList } from '@/services/operation';
import { setUserRole } from '@/services/user';
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
            uploadUrl: '',
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
            return (this.form.id ? '编辑' : '添加') + '伙伴';
        }
    },
    methods: {
        uploadError() {},
        onUploadSuccess() {},
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
                await setUserRole(this.form.id, this.form.role);
            } catch (err) {
                return await alert(err);
            } finally {
                this.loading = false;
            }

            success(`${this.actionName}成功`);
            this.visible2 = false;
            this.$emit('success');
        }
    },
    async created() {
        let data = null;
        try {
            data = await getOperationList();
            this.osTypeOptions = data.map(item => ({ label: item.name, value: item.roleKey }));
        } catch (err) {
            error(err);
        }
    }
};
</script>
