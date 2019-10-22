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
                <el-form-item label="名称" prop="name" class="is-required">
                    <el-input v-model="form.name" placeholder="请输入名称" maxlength="40"></el-input>
                </el-form-item>
                <el-form-item label="排序" prop="order">
                    <el-input-number v-model="form.order"></el-input-number>
                </el-form-item>
                <el-form-item label="图片" prop="name" class="is-required">
                    <app-upload
                        :action="uploadUrl"
                        @error="uploadError"
                        @success="onUploadSuccess"
                        style="display: inline-block"
                    >
                        <app-upload-img v-show="form.picture" :url="form.picture" />
                        <app-upload-img v-show="!form.picture" />
                    </app-upload>
                </el-form-item>
                <el-form-item label="获得时间" prop="email" class="is-required">
                    <el-date-picker v-model="form.obtainTime" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="备注" prop="remark" class="is-required">
                    <el-input
                        type="textarea"
                        :rows="4"
                        v-model="form.remark"
                        placeholder="请输入备注"
                        maxlength="200"
                    ></el-input>
                </el-form-item>
            </el-form>
        </template>
    </app-dialog>
</template>

<script>
import AppDialog from '@/components/app/AppDialog';
import AppUpload from '@/components/app/AppUpload';
import AppUploadImg from '@/components/app/AppUploadImg';
import { alert, success } from '@/utils/message';
import validation from '@/validations/honour';
import { createPatent, updatePatent } from '@/services/about';
export default {
    name: 'RoleDialog',
    components: {
        AppDialog,
        AppUpload,
        AppUploadImg
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
        uploadError(err) {
            console.log(err);
        },
        onUploadSuccess(data) {
            this.form.picture = data.url;
            success('上传成功');
        },
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
                    await createPatent(this.form);
                } else {
                    await updatePatent(this.form);
                }
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
    async created() {}
};
</script>
