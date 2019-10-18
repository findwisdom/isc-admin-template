<template>
    <div class="create">
        <div class="form-wrap">
            <el-form label-width="115px" :model="form" :rules="rules" ref="form">
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="业务类型" prop="businessKey">
                            <el-select
                                v-model="form.businessKey"
                                placeholder="业务类型"
                                size="small"
                                style="width: 220px"
                            >
                                <el-option
                                    v-for="option in businessTypeOptions"
                                    :key="option.value"
                                    :label="option.label"
                                    :value="option.value"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="工单标题" prop="title">
                            <el-input v-model="form.title" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="期望完成时间" prop="startTime">
                            <el-date-picker
                                :picker-options="pickerOptionsStart"
                                size="small"
                                v-model="form.startTime"
                                type="datetime"
                                placeholder="选择日期时间"
                            ></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="结束时间" prop="endTime">
                            <el-date-picker
                                :picker-options="pickerOptionsEnd"
                                size="small"
                                v-model="form.endTime"
                                type="datetime"
                                placeholder="选择日期时间"
                            ></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-form-item label="上传附件">
                        <app-upload-list
                            :data="attachments"
                            @deleteItem="deleteUploadItem"
                            @clickItem="clickUploadItem"
                        ></app-upload-list>
                        <app-upload
                            :action="uploadUrl"
                            @error="uploadError"
                            @success="onUploadSuccess"
                            style="display: inline-block"
                        >
                            <el-button type="primary" size="small">
                                上传
                            </el-button>
                        </app-upload>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="工单详情">
                        <el-input type="textarea" v-model="form.description" rows="5"></el-input>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('form', 'create')" size="small">提交</el-button>
                        <el-button type="success" @click="submitForm('form', 'save')" size="small">保存</el-button>
                        <el-button v-if="isSave" type="danger" @click="deleteForm('form')" size="small">删除</el-button>
                        <el-button @click="goblack()" size="small">返回</el-button>
                    </el-form-item>
                </el-row>
            </el-form>
        </div>
    </div>
</template>
<script>
import AppUpload from '@/components/app/AppUpload';
import AppUploadList from '@/components/app/AppUploadList';
import { createRepair, saveRepair, getOrderDetail, getAttachmentList, deleteRepair } from '@/services/order';
import { getBusinessList } from '@/services/operation';
import { success, error } from '@/utils/message';
import { fill } from '@/utils/object';
import validation from '@/validations/create';
import donwload from '@/utils/donwload';
import moment from 'moment';
export default {
    name: 'create',
    data() {
        return {
            uploadUrl: '/common/api/file/uploadOSS',
            businessTypeOptions: [],
            pickerOptionsStart: {
                disabledDate: time => {
                    let endDateVal = this.form.endTime;
                    if (endDateVal) {
                        return time.getTime() > new Date(endDateVal).getTime() && time.getTime() < new Date().getTime();
                    } else {
                        return time.getTime() < new Date().getTime();
                    }
                }
            },
            pickerOptionsEnd: {
                disabledDate: time => {
                    let beginDateVal = this.form.startTime;
                    if (beginDateVal) {
                        return time.getTime() < new Date(beginDateVal).getTime();
                    }
                }
            },
            form: {
                serialNumber: '',
                businessKey: '',
                title: '',
                startTime: '',
                endTime: '',
                description: ''
            },
            rules: validation(this),
            attachments: []
        };
    },
    filters: {},
    watch: {},
    methods: {
        generateOrderTypeFrom(item) {
            return fill(
                {
                    repairId: '',
                    serialNumber: '',
                    businessKey: '',
                    title: '',
                    startTime: '',
                    endTime: '',
                    description: ''
                },
                item
            );
        },
        async deleteForm() {
            try {
                await deleteRepair(this.$route.query.repairId);
                success('删除成功');
                this.$router.push({ path: 'order/backlog' });
            } catch (err) {
                error(err);
            }
        },
        submitForm(formName, tag) {
            this.$refs[formName].validate(async valid => {
                if (valid) {
                    let form = {
                        ...this.generateOrderTypeFrom(this.form),
                        startTime: moment(this.form.startTime).format('YYYY-MM-DD hh:mm:ss'),
                        endTime: this.form.endTime ? moment(this.form.endTime).format('YYYY-MM-DD hh:mm:ss') : '',
                        attachments: this.attachments
                    };
                    try {
                        if (tag === 'create') {
                            await createRepair(form);
                            success('工单申请成功');
                        }
                        if (tag === 'save') {
                            await saveRepair(form);
                            success('工单保存成功');
                        }
                        this.$router.push({ path: 'order/backlog' });
                    } catch (err) {
                        error(err);
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        onUploadSuccess(suc) {
            this.attachments.push({ name: suc.name, url: suc.model });
            success('上传成功');
        },
        uploadError(err) {
            console.log(err);
            // error(err);
        },
        deleteUploadItem(item, index) {
            this.attachments.splice(index, 1);
        },
        clickUploadItem(item) {
            donwload(item.url);
        },
        goblack() {
            this.$router.go(-1);
        }
    },
    components: {
        AppUpload,
        AppUploadList
    },

    computed: {
        isSave() {
            return this.$route.query.repairId !== undefined ? true : false;
        }
    },

    async created() {
        let data = null;
        let repairId = this.$route.query.repairId;
        try {
            data = await getBusinessList();
            this.businessTypeOptions = data.map(item => ({ label: item.name, value: item.businessKey }));
            if (this.isSave) {
                let form = getOrderDetail();
                this.form = {
                    ...form,
                    repairId: repairId,
                    startTime: new Date(form.startTime),
                    endTime: form.endTime ? new Date(form.endTime) : ''
                };
                let attachments = await getAttachmentList(repairId);
                this.attachments = attachments;
            }
        } catch (err) {
            error(err);
        }
    }
};
</script>

<style scoped lang="scss">
@import '../../scss/variables';
.create {
    padding: 20px 30px;
}
.form-wrap {
    margin-top: 20px;
}
</style>
