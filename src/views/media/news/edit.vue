<template>
    <div>
        <el-form ref="form" :model="formData" :rules="rules" size="mini" class="from" label-width="80px">
            <el-form-item label="标题" prop="title">
                <el-input v-model="formData.title"></el-input>
            </el-form-item>
            <el-form-item label="简介" prop="intro">
                <el-input v-model="formData.intro"></el-input>
            </el-form-item>
            <el-form-item label="排序" prop="order">
                <el-input-number v-model.number="formData.order"></el-input-number>
            </el-form-item>
            <el-form-item label="封面" prop="cover" ref="upload">
                <AppUpload class="editor-upload-btn" action="https://httpbin.org/post" @success="imageSuccessCBK">
                    <el-button icon="el-icon-upload" size="mini" type="primary" @click="dialogVisible = true">
                        上传封面
                    </el-button>
                </AppUpload>
                <AppUploadList :data="uploadList" @deleteItem="deleteCover"></AppUploadList>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submit('form')" size="mini">提交</el-button>
            </el-form-item>
        </el-form>

        <tinymce v-model="content" :height="400" />
    </div>
</template>

<script>
import Tinymce from '@/components/Tinymce';
import AppUpload from '@/components/app/AppUpload';
import AppUploadList from '@/components/app/AppUploadList';
import validation from '@/validations/news';

export default {
    name: 'TinymcePage',
    components: { Tinymce, AppUpload, AppUploadList },
    data() {
        return {
            formData: {
                title: '',
                intro: '',
                order: '',
                cover: ''
            },
            uploadList: [],
            content: `<h1 style="text-align: center;">Welcome to the TinyMCE demo!</h1>`,
            rules: validation(this)
        };
    },
    methods: {
        imageSuccessCBK(data) {
            // TODO:根据接口返回值调整
            this.$refs.upload.clearValidate();
            this.formData.cover = data.files.file;
            this.uploadList = [{ name: data.name }];
        },
        deleteCover() {
            this.formData.cover = '';
            this.uploadList = [];
        },
        submit(formName) {
            this.$refs[formName].validate(valid => {
                if (!valid) {
                    return false;
                }
                if (!this.content) {
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
</style>
