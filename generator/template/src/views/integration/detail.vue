<template>
    <div class="form-wrapper" v-loading="ld.getLoading">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px" size="mini">
            <el-form-item label="简介" prop="description">
                <el-input type="textarea" :rows="4" v-model="form.description"></el-input>
            </el-form-item>
            <el-form-item label="功能点" prop="function">
                <el-input type="textarea" :rows="10" v-model="form.function"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit('form')" v-loading="ld.submitLoading">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import validation from '@/validations/detail';
import { getDetail, updateDetail } from '@/services/integration';
import { success, error } from '@/utils/message';

export default {
    name: 'Detail',
    data() {
        return {
            form: {},
            rules: validation(this),
            ld: {
                getLoading: false,
                submitLoading: false
            }
        };
    },
    created() {
        this.getList();
    },
    methods: {
        async getList() {
            let data = null;
            this.ld.getLoading = true;

            try {
                data = await getDetail();
            } catch (err) {
                error(err);
                data = {};
            } finally {
                this.ld.getLoading = false;
            }

            this.form = data;
        },

        async onSubmit(formName) {
            try {
                await this.$refs[formName].validate();
            } catch (err) {
                return;
            }

            try {
                this.ld.submitLoading = true;
                await updateDetail(this.form);
            } catch (err) {
                return await error(err);
            } finally {
                this.ld.submitLoading = false;
            }

            success(`编辑成功`);
        }
    }
};
</script>

<style scoped>
.form-wrapper {
    padding: 20px 50px 20px 0;
}
</style>
