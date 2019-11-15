<template>
    <div v-loading="ld.getLoading">
        <el-form ref="form" :model="formData" :rules="rules" size="mini" class="from" label-width="120px">
            <el-form-item label="标题" prop="title">
                <el-input v-model="formData.title" maxlength="20"></el-input>
            </el-form-item>
            <el-form-item label="简介" prop="description">
                <el-input v-model="formData.description" type="textarea" :rows="2" maxlength="150"></el-input>
            </el-form-item>
            <el-form-item label="时间" prop="publishTime">
                <el-date-picker
                    v-model="formData.publishTime"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd"
                ></el-date-picker>
            </el-form-item>
            <el-form-item label="排序" prop="order">
                <el-input-number v-model.number="formData.order"></el-input-number>
            </el-form-item>
            <el-form-item label="封面" prop="picture" ref="upload" class="uploadPicture">
                <app-upload
                    action="/api/system/uploadPicture"
                    @error="uploadError"
                    @success="imageSuccessCBK"
                    style="display: inline-block"
                >
                    <app-upload-img v-show="formData.picture" :url="formData.picture" />
                    <app-upload-img v-show="!formData.picture" />
                </app-upload>
            </el-form-item>
            <el-form-item label="热点banner" prop="picture" ref="upload" class="uploadPicture" style="margin-top: 8px">
                <app-upload
                    :action="uploadUrl"
                    @error="uploadError"
                    @success="imageSuccessBanner"
                    style="display: inline-block"
                >
                    <app-upload-img v-show="formData.banner" :url="formData.banner" />
                    <app-upload-img v-show="!formData.banner" />
                </app-upload>
            </el-form-item>
            <el-form-item label="是否热点新闻">
                <el-switch
                    v-model="formData.hot"
                    active-color="#13ce66"
                    inactive-color="#000000"
                    :active-value="active"
                    :inactive-value="inactive"
                ></el-switch>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit('form')" :loading="ld.submitLoading">提交</el-button>
            </el-form-item>
        </el-form>

        <tinymce v-model="formData.content" :height="400" />
    </div>
</template>

<script>
import Tinymce from '@/components/Tinymce';
import AppUpload from '@/components/app/AppUpload';
import AppUploadImg from '@/components/app/AppUploadImg';
import validation from '@/validations/news';
import { uploadUrl } from '@/services/upload';
import { getNewsContent, createNews, updateNews } from '@/services/media';
import { error } from '@/utils/message';
import { success } from '../../../utils/message';

export default {
    name: 'Edit',
    components: { Tinymce, AppUpload, AppUploadImg },
    data() {
        return {
            uploadUrl,
            id: this.$route.query.id,
            ld: {
                getLoading: false,
                submitLoading: false
            },
            formData: {
                title: '',
                banner: '',
                description: '',
                order: '',
                picture: '',
                hot: null,
                publishTime: '',
                content: ''
            },
            rules: validation(this),
            active: true,
            inactive: false
        };
    },
    computed: {
        createUpdateNews() {
            return this.id ? updateNews : createNews;
        }
    },
    created() {
        if (this.id) {
            this.getContent();
        }
    },
    methods: {
        async getContent() {
            let data = null;
            this.ld.getLoading = true;

            try {
                data = await getNewsContent(this.id);
            } catch (err) {
                error(err);
                data = {};
            } finally {
                this.ld.getLoading = false;
            }

            this.formData = data;
        },

        imageSuccessCBK(data) {
            const url = data.url;
            this.$refs.upload.clearValidate();
            this.formData.picture = url;
        },

        imageSuccessBanner(data) {
            const url = data.url;
            this.$refs.upload.clearValidate();
            this.formData.banner = url;
        },

        uploadError(err) {
            console.log(err);
        },

        async onSubmit(formName) {
            try {
                await this.$refs[formName].validate();
            } catch (err) {
                return;
            }
            if (!this.formData.content) {
                this.$message.error('请编辑报道内容！');
                return false;
            }

            this.ld.submitLoading = true;
            try {
                await this.createUpdateNews(this.formData);
                success('编辑成功！');
                this.$router.push('/media/news');
            } catch (err) {
                error(err);
            } finally {
                this.ld.submitLoading = false;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.from {
    width: 500px;
    padding: 20px 0;
}
.uploadPicture .editor-upload-btn {
    width: 101px;
}
</style>
