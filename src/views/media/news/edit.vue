<template>
    <div>
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
                    <el-button icon="el-icon-upload" size="mini" type="primary" @click="dialogVisible = true">
                        上传封面
                    </el-button>
                </AppUpload>
                <AppUploadList :data="uploadList" @deleteItem="deletePicture"></AppUploadList>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submit('form')" size="mini">提交</el-button>
            </el-form-item>
        </el-form>

        <tinymce v-model="formData.content" :height="400" />
    </div>
</template>

<script>
import Tinymce from '@/components/Tinymce';
import AppUpload from '@/components/app/AppUpload';
import AppUploadList from '@/components/app/AppUploadList';
import validation from '@/validations/news';
import { getNewsContent } from '@/services/media';
import { error } from '@/utils/message';

export default {
    name: 'TinymcePage',
    components: { Tinymce, AppUpload, AppUploadList },
    data() {
        return {
            formData: {
                title: '',
                description: '',
                order: '',
                picture: '',
                publishTime: '',
                content: ''
            },
            uploadList: [],
            rules: validation(this)
        };
    },
    created() {
        this.getContent();
    },
    methods: {
        async getContent() {
            let data = null;
            this.loading = true;

            try {
                data = await getNewsContent();
            } catch (err) {
                error(err);
                // TODO: service
                // data = {};
                data = {
                    title: '迈入亿级时代，物联网企业成功突围的两种商业模式',
                    description:
                        '面对碎片化的物联网市场，如何创造商业价值？面对B端这根难啃的骨头，如何找到“肥肉”、如何变现？',
                    order: '1',
                    picture: 'http://zlj.80hl.net/Upload/news/2018/11/26/20181126143844kzdv.jpg',
                    publishTime: '2018-11-13',
                    content: '<h1 style="text-align: center;">Welcome to the TinyMCE demo!</h1>'
                };
            } finally {
                this.loading = false;
            }

            this.formData = data;
        },
        imageSuccessCBK(data) {
            // TODO:根据接口返回值调整
            this.$refs.upload.clearValidate();
            this.formData.picture = data.files.file;
            this.uploadList = [{ name: data.name }];
        },
        deletePicture() {
            this.formData.cover = '';
            this.uploadList = [];
        },
        submit(formName) {
            this.$refs[formName].validate(valid => {
                if (!valid) {
                    return false;
                }
                if (!this.formData.content) {
                    this.$message.error('请编辑报道内容！');
                    return false;
                }
                // TODO:提交接口
            });
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
