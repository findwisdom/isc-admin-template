<template>
    <app-dialog :visible.sync="visible2" @close="onClose" @open="onOpen" @sure="onSure" :loading="loading">
        <template v-slot:title>
            {{ actionName }}
        </template>

        <template v-slot:default>
            <el-form ref="form" :model="form" :rules="rules" label-position="top" size="mini">
                <el-form-item label="名称" prop="name" class="is-required">
                    <el-input v-model="form.name" placeholder="请输入名称" maxlength="40"></el-input>
                </el-form-item>
                <el-form-item label="排序" prop="order" class="is-required">
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
                <el-form-item label="类型" prop="productTypeId" class="is-required">
                    <el-select v-model="form.type" placeholder="请选择产品所属">
                        <el-option
                            v-for="option in osTypeOptions"
                            :key="option.value"
                            :label="option.label"
                            :value="option.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="获得时间" prop="email" class="is-required">
                    <el-date-picker
                        v-model="form.obtainTime"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期"
                    ></el-date-picker>
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
import { error, success } from '@/utils/message';
import validation from '@/validations/honour';
import { uploadUrl } from '@/services/upload';
import { honourTypeOptions } from '@/enums/honour-type';
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
            osTypeOptions: honourTypeOptions,
            uploadUrl,
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
            return (this.form.id ? '编辑' : '添加') + '专利荣誉';
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
                    await updatePatent(this.form);
                } else {
                    await createPatent(this.form);
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
