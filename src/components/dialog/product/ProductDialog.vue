<template>
    <app-dialog :visible.sync="visible2" @close="onClose" @open="onOpen" @sure="onSure" :loading="loading">
        <template v-slot:title>
            {{ actionName }}
        </template>

        <template v-slot:default>
            <el-form ref="form" :model="form" :rules="rules" label-position="top" size="mini">
                <el-form-item label="产品名称" prop="name" class="is-required">
                    <el-input v-model="form.name" placeholder="请输入产品名称" maxlength="40"></el-input>
                </el-form-item>
                <el-form-item label="顺序" prop="order">
                    <el-input-number v-model="form.order"></el-input-number>
                </el-form-item>
                <el-form-item label="产品所属" prop="productTypeId" class="is-required">
                    <el-select v-model="form.productTypeId" placeholder="请选择产品所属">
                        <el-option
                            v-for="option in osTypeOptions"
                            :key="option.value"
                            :label="option.label"
                            :value="option.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="产品banner图" prop="banner" class="is-required">
                    <app-upload
                        :action="uploadUrl"
                        @error="uploadBannerError"
                        @success="UploadBannerSuccess"
                        style="display: inline-block"
                    >
                        <app-upload-img v-show="form.banner" :url="form.banner" />
                        <app-upload-img v-show="!form.banner" />
                    </app-upload>
                </el-form-item>
                <el-form-item label="封面图" prop="picture" class="is-required">
                    <app-upload
                        :action="uploadUrl"
                        @error="uploadPictureError"
                        @success="UploadPictureSuccess"
                        style="display: inline-block"
                    >
                        <app-upload-img v-show="form.picture" :url="form.picture" />
                        <app-upload-img v-show="!form.picture" />
                    </app-upload>
                </el-form-item>
                <el-form-item label="产品介绍" prop="description" class="is-required">
                    <el-input
                        v-model="form.description"
                        placeholder="请输入产品介绍"
                        type="textarea"
                        :rows="4"
                        maxlength="300"
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
import { alertel, success, error } from '@/utils/message';
import validation from '@/validations/product';
import { uploadUrl } from '@/services/upload';
import { createProduct, updateProduct, getProductType } from '@/services/product';
export default {
    name: 'ProductDialog',
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
            return (this.form.id ? '编辑' : '添加') + '产品';
        }
    },
    methods: {
        uploadPictureError(error) {
            console.log(error);
        },
        UploadPictureSuccess(data) {
            this.form.picture = data.url;
            success('上传成功');
        },
        uploadBannerError(error) {
            console.log(error);
        },
        UploadBannerSuccess(data) {
            this.form.banner = data.url;
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
                    await updateProduct(this.form);
                } else {
                    await createProduct(this.form);
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
    async created() {
        let data = null;
        try {
            data = await getProductType();
            if (data.list && data.list instanceof Array) {
                this.osTypeOptions = data.list.map(item => ({ label: item.name, value: item.id }));
            }
        } catch (err) {
            error(err);
        }
    }
};
</script>
