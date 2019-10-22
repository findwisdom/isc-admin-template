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
                <el-form-item label="案例名称" prop="name" class="is-required">
                    <el-input v-model="form.name" placeholder="请输入案例名称" maxlength="40"></el-input>
                </el-form-item>
                <el-form-item label="案例排序" prop="order">
                    <el-input-number v-model="form.order"></el-input-number>
                </el-form-item>
                <el-form-item label="案例图片" prop="picture" class="is-required">
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
                <el-form-item label="案例介绍" prop="description" class="is-required">
                    <el-input
                        v-model="form.description"
                        placeholder="请输入案例介绍"
                        type="textarea"
                        :rows="4"
                        maxlength="300"
                    ></el-input>
                </el-form-item>
                <el-form-item label="所属解决方案" prop="solutionId" class="is-required">
                    <el-select v-model="form.solutionId" placeholder="请选择所属解决方案">
                        <el-option
                            v-for="option in osTypeOptions"
                            :key="option.value"
                            :label="option.label"
                            :value="option.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </template>
    </app-dialog>
</template>

<script>
import AppDialog from '@/components/app/AppDialog';
import AppUpload from '@/components/app/AppUpload';
import AppUploadImg from '@/components/app/AppUploadImg';
import validation from '@/validations/case';
import { alert, success, error } from '@/utils/message';
import { uploadUrl } from '@/services/upload';
import { createCase, getSolutionList } from '@/services/solution';
export default {
    name: 'CaseDialog',
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
            uploadUrl,
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
            return (this.form.id ? '编辑' : '添加') + '案例';
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
                await createCase(this.form.id, this.form.role);
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
            data = await getSolutionList();
            this.osTypeOptions = data.map(item => ({ label: item.name, value: item.id }));
        } catch (err) {
            error(err);
        }
    }
};
</script>
