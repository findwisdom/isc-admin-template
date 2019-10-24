<template>
    <div v-loading="ld.getLoading">
        <el-form ref="form" :model="formData" :rules="rules" size="mini" class="from" label-width="80px">
            <el-form-item label="标题" prop="title">
                <el-input v-model="formData.title" maxlength="20"></el-input>
            </el-form-item>
            <el-form-item label="简介" prop="description">
                <el-input v-model="formData.description" type="textarea" :rows="2" maxlength="15"></el-input>
            </el-form-item>
            <el-form-item label="时间" prop="publishTime">
                <el-date-picker v-model="formData.publishTime" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
            <el-form-item label="排序" prop="order">
                <el-input-number v-model.number="formData.order"></el-input-number>
            </el-form-item>
            <el-form-item label="封面" prop="picture" ref="upload" class="uploadPicture">
                <AppUpload class="editor-upload-btn" action="https://httpbin.org/post" @success="imageSuccessCBK">
                    <el-button icon="el-icon-upload" type="primary" @click="dialogVisible = true">
                        上传封面
                    </el-button>
                </AppUpload>
                <AppUploadList
                    :data="uploadList"
                    @deleteItem="deletePicture"
                    @clickItem="previewPicture"
                ></AppUploadList>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit('form')" :loading="ld.submitLoading">提交</el-button>
            </el-form-item>
        </el-form>

        <tinymce v-model="formData.content" :height="400" />

        <el-dialog :visible.sync="visible">
            <img width="100%" :src="formData.picture" alt="封面图" />
        </el-dialog>
    </div>
</template>

<script>
import Tinymce from '@/components/Tinymce';
import AppUpload from '@/components/app/AppUpload';
import AppUploadList from '@/components/app/AppUploadList';
import validation from '@/validations/news';
import { getNewsContent, createNews, updateNews } from '@/services/media';
import { error } from '@/utils/message';
import { success } from '../../../utils/message';

export default {
    name: 'Edit',
    components: { Tinymce, AppUpload, AppUploadList },
    data() {
        return {
            id: this.$route.query.id,
            ld: {
                getLoading: false,
                submitLoading: false
            },
            formData: {
                title: '',
                description: '',
                order: '',
                picture: '',
                publishTime: '',
                content: ''
            },
            uploadList: [],
            visible: false,
            rules: validation(this)
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
                this.uploadList = this.generateUploadList(data.picture);
            } catch (err) {
                error(err);
                data = {};
                this.uploadList = this.generateUploadList(data.picture);
            } finally {
                this.ld.getLoading = false;
            }

            this.formData = data;
        },
        imageSuccessCBK(data) {
            // TODO:根据接口返回值调整
            const url = data.files.file;
            this.$refs.upload.clearValidate();
            this.formData.picture = url;
            this.uploadList = this.generateUploadList(url);
        },
        generateUploadList(url) {
            let name = '封面图';
            if (typeof url === 'string') {
                const arr = url.split('/');
                const len = arr.length - 1;
                name = arr[len];
            }
            return [{ name, url }];
        },
        deletePicture() {
            this.formData.picture = '';
            this.uploadList = [];
        },
        previewPicture() {
            this.visible = true;
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
            // TODO:暂无图片上传...
            this.formData.picture = 'https://www.apple.com/cn/icloud/images/screen_apps_collaborate_ipad_large_2x.jpg';

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
