<template>
    <div class="form-wrapper">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px" size="mini">
            <el-form-item label="简介" prop="description">
                <el-input type="textarea" :rows="4" v-model="form.description"></el-input>
            </el-form-item>
            <el-form-item label="功能点" prop="function">
                <el-input type="textarea" :rows="10" v-model="form.function"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit('form')" v-loading="loading">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import validation from '@/validations/detail';
import { updateDetail } from '@/services/integration';
import { success, error } from '@/utils/message';

export default {
    name: 'Detail',
    data() {
        return {
            form: {},
            rules: validation(this),
            loading: false
        };
    },
    methods: {
        async onSubmit(formName) {
            try {
                await this.$refs[formName].validate();
            } catch (err) {
                return;
            }

            try {
                this.loading = true;
                await updateDetail(this.form);
            } catch (err) {
                return await error(err);
            } finally {
                this.loading = false;
            }

            success(`${this.actionName}成功`);
            this.visible2 = false;
            this.$emit('success');
        }
    }
};
</script>

<style scoped>
.form-wrapper {
    padding: 20px 50px 20px 0;
}
</style>
