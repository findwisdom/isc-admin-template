<template>
    <app-dialog :visible.sync="visible2" @close="onClose" @open="onOpen" @sure="onSure" :loading="loading">
        <template v-slot:title>
            {{ actionName }}
        </template>

        <template v-slot:default>
            <el-form
                ref="form"
                :model="form"
                :rules="rules"
                label-width="130px"
                class="dialog-form gateway-form"
                size="mini"
            >
                <!--<el-form-item label="业务类型key" prop="businessKey" class="is-required">-->
                <!--<el-input v-model="form.businessKey" placeholder="请输入唯一key" :disabled="isEdit"></el-input>-->
                <!--</el-form-item>-->

                <el-form-item label="业务类型名称" prop="name" class="is-required">
                    <el-input
                        v-model="form.name"
                        placeholder="请输入业务类型名称"
                        maxlength="32"
                        :disabled="isEdit"
                    ></el-input>
                </el-form-item>

                <el-form-item label="业务处理角色" prop="handler" class="is-required">
                    <el-select v-model="form.handler" placeholder="请选择业务处理角色">
                        <el-option
                            v-for="option in osTypeOptions"
                            :key="option.value"
                            :label="option.label"
                            :value="option.value"
                        ></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item
                    class="is-required"
                    v-for="(part, index) in form.flowList"
                    :label="'业务审核角色-' + index"
                    :key="index"
                    :prop="'flowList.' + index + '.value'"
                    :rules="{
                        required: true,
                        message: '角色不能为空',
                        trigger: 'blur'
                    }"
                >
                    <el-select v-model="part.value" placeholder="请选择业务处理角色">
                        <el-option
                            v-for="option in osTypeOptions"
                            :key="option.value"
                            :label="option.label"
                            :value="option.value"
                        ></el-option>
                    </el-select>
                    <el-button v-if="form.flowList.length > 1" @click.prevent="removePart(part)" class="button-left">
                        删除
                    </el-button>
                </el-form-item>
                <el-button type="primary" size="mini" plain @click="addParts">新增审核角色</el-button>
            </el-form>
        </template>
    </app-dialog>
</template>

<script>
import AppDialog from '@/components/app/AppDialog';
import { alert, success, error } from '@/utils/message';
import validation from '@/validations/gateway';
import { getOperationList, createBusiness, updateBusiness } from '@/services/operation';

export default {
    name: 'GatewayDialog',
    components: {
        AppDialog
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
            rules: validation(this)
        };
    },
    watch: {},
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
            return (this.form.id !== undefined ? '编辑' : '新增') + '工单业务类型';
        },
        isEdit() {
            return this.form.id !== undefined ? true : false;
        }
    },
    methods: {
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
                let form = {
                    ...this.form,
                    flowList: this.form.flowList.map((item, key) => ({
                        // businessKey: this.form.businessKey,
                        sort: key + 1,
                        approver: item.value
                    }))
                };
                if (this.form.id) {
                    await updateBusiness(form);
                } else {
                    await createBusiness(form);
                }
            } catch (err) {
                return await alert(err);
            } finally {
                this.loading = false;
            }

            success(`${this.actionName}成功`);
            this.visible2 = false;
            this.$emit('success');
        },

        removePart(item) {
            let index = this.form.flowList.indexOf(item);
            if (index !== -1) {
                this.$emit('removePart', item, index);
            }
        },
        addParts() {
            if (this.form.flowList.length > 9) {
                alert('最多只能增加10个审核角色');
                return;
            }
            this.$emit('addPart');
        }
    },
    async created() {
        let data = null;
        try {
            data = await getOperationList();
            this.osTypeOptions = data.map(item => ({ label: item.name, value: item.roleKey }));
        } catch (err) {
            error(err);
        }
    }
};
</script>

<style scoped lang="scss">
@import '../../../scss/variables';

.gateway-form {
    &__mac {
        display: flex;
        justify-content: space-between;

        .el-input {
            width: 230px;
        }
    }
    .button-left {
        margin-left: 10px;
    }
}
</style>
