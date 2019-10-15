<template>
    <div class="create">
        <div class="header-title">
            业务审批流程
            <el-button @click="goblack()" size="small" class="button-right">返回</el-button>
        </div>
        <div class="header-title">
            <el-steps :active="active" finish-status="success">
                <el-step v-for="(item, index) in flowStep" :title="item" :key="index"></el-step>
            </el-steps>
        </div>
        <div class="header-title">
            {{ typeName }}
        </div>
        <div class="form-wrap">
            <el-form label-width="115px" :model="form" :rules="rules" ref="form">
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="流水号">
                            {{ form.serialNumber }}
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="创建时间">
                            {{ form.createdAt }}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="业务类型" prop="type">
                            <el-select
                                v-model="form.type"
                                placeholder="业务类型"
                                size="small"
                                style="width: 220px"
                                disabled
                            >
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="工单标题" prop="title">
                            <el-input v-model="form.title" size="small" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="期望完成时间" prop="startTime" disabled>
                            <el-date-picker
                                size="small"
                                v-model="form.startTime"
                                type="datetime"
                                placeholder="选择日期时间"
                                disabled
                            ></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="结束时间" prop="endTime">
                            <el-date-picker
                                size="small"
                                v-model="form.endTime"
                                type="datetime"
                                placeholder="选择日期时间"
                                disabled
                            ></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-form-item label="上传附件" prop="upload">
                        <div v-if="form.upload.length > 0">
                            <app-upload-list :data="form.upload" @clickItem="clickUploadItem" detaill></app-upload-list>
                        </div>
                        <div v-else>
                            无
                        </div>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="工单详情" prop="detail">
                        <el-input type="textarea" v-model="form.description" rows="4" disabled></el-input>
                    </el-form-item>
                </el-row>
                <div v-show="isApproval">
                    <el-row>
                        <el-form-item label="审批意见" prop="dealMessage">
                            <el-input type="textarea" v-model="form.dealMessage" rows="4"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('form', true)" size="small">同意</el-button>
                            <el-button type="danger" @click="submitForm('form', false)" size="small">拒绝</el-button>
                        </el-form-item>
                    </el-row>
                </div>
                <div v-show="isDeall">
                    <el-row>
                        <el-form-item label="处理意见" prop="dealMessage">
                            <el-input type="textarea" v-model="form.dealMessage" rows="4"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item>
                            <el-button type="primary" @click="dealForm" size="small">处理完成</el-button>
                        </el-form-item>
                    </el-row>
                </div>
            </el-form>
        </div>
        <div class="header-title">操作日志</div>
        <div>
            <el-table :data="flowTable" size="mini">
                <el-table-column prop="flow" label="流程节点"></el-table-column>
                <el-table-column prop="name" label="处理人员"></el-table-column>
                <el-table-column prop="time" label="操作时间"></el-table-column>
                <el-table-column prop="opinion" label="处理意见"></el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
import AppUploadList from '@components/app/AppUploadList';
import validation from '@validations/create';
import { error, success } from '@utils/message';
import { getOrderDetail, getAttachmentList } from '@services/order';
import { getBusinessList, getFlowListByBusinessKey } from '@services/operation';
import { approvalRepair, getApprovalList, handleRepair } from '@services/dispose';
import donwload from '@utils/donwload';
export default {
    name: 'create',
    data() {
        return {
            typeName: '运维流程审批',
            active: 1,
            isApproval: false,
            isDeall: false,
            flowStep: [],
            flowTable: [],
            activeName: 'create',
            form: {
                createdAt: '',
                type: '',
                title: '',
                startTime: '',
                endTime: '',
                description: '',
                dealMessage: '',
                upload: []
            },
            rules: validation(this)
        };
    },
    methods: {
        async submitForm(formName, tag) {
            try {
                await approvalRepair({
                    repairId: Number(this.$route.params.id),
                    success: tag,
                    opinion: this.form.dealMessage
                });
                success('审批成功');
                this.$router.push({ path: '/order/backlog' });
            } catch (err) {
                error(err);
            }
        },
        async dealForm() {
            try {
                await handleRepair({
                    repairId: Number(this.$route.params.id),
                    handleResult: this.form.dealMessage
                });
                success('处理成功');
                this.$router.push({ path: '/order/backlog' });
            } catch (err) {
                error(err);
            }
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        onUploadSuccess(suc) {
            console.log(suc);
        },
        uploadError(err) {
            console.log(err);
        },
        clickUploadItem(item) {
            donwload(item.url);
        },
        goblack() {
            this.$router.go(-1);
        }
    },
    components: {
        AppUploadList
    },

    async created() {
        let data = null;
        let repairId = this.$route.params.id;
        try {
            // 流程处理逻辑
            let form = getOrderDetail();
            let flowList = await getFlowListByBusinessKey(form.businessKey);
            let step = flowList.map(item => item.approverRole.name);
            step.push(`${form.business.handlerRole.name}（处理）`);
            step.push('完成');
            this.flowStep = step;
            if (form.finished) {
                this.active = step.length;
            } else if (form.handleState) {
                this.isDeall = true;
                // this.isApproval = this.$store.state.userLogin.groupList.some((item)=>(item.roleKey === handler))
                this.isApproval = false;
                this.active = step.length - 2;
            } else {
                let handler = form.flow.approver;
                this.isApproval = this.$store.state.userLogin.groupList.some(item => item.roleKey === handler);
                this.active = flowList.filter(item => item.id === form.flowId)[0].sort - 1;
            }
            data = await getBusinessList();
            this.businessTypeOptions = data.map(item => ({
                label: item.name,
                value: item.businessKey
            }));
            // let attachments = await getAttachmentList(repairId);
            let attachments = await getAttachmentList(repairId);
            this.form = {
                ...form,
                repairId: repairId,
                startTime: new Date(form.startTime),
                endTime: new Date(form.endTime),
                upload: attachments
            };
            let approvalList = await getApprovalList(repairId);
            this.flowTable = approvalList.map(item => ({
                flow: item.flow.approverRole.name,
                name: item.approverUser.name,
                time: item.time,
                opinion: item.opinion
            }));
            this.flowTable.unshift({
                flow: '申请人',
                name: form.creatorUser.name,
                time: form.createdAt,
                opinion: ''
            });
            if (form.finished) {
                this.flowTable.push({
                    flow: '处理人',
                    name: form.handlerUser.name,
                    time: form.updatedAt,
                    opinion: form.handleResult
                });
            }
        } catch (err) {
            error(err);
        }
    },
    mounted() {}
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
.header-title {
    font-size: 14px;
    font-weight: bold;
    padding: 12px 0;
}
.button-right {
    float: right;
}
</style>
