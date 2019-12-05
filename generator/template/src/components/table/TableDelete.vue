<template>
    <el-popover placement="top-start" offset="-10" width="220" trigger="click" v-model="visible">
        <svg-icon class="icon" name="icon-wring"></svg-icon>
        <span class="content">确定要进行删除操作吗？</span>

        <div class="actions">
            <el-button size="mini" type="primary" plain @click="visible = false">取消</el-button>
            <el-button size="mini" type="primary" @click="handleDelete">
                确定
            </el-button>
        </div>

        <el-button size="mini" type="text" class="el-button__text-delete" slot="reference">
            删除
        </el-button>
    </el-popover>
</template>

<script>
export default {
    name: 'TableOperation',
    data() {
        return {
            visible: false
        };
    },
    methods: {
        handleDelete() {
            this.visible = false;
            this.$emit('handleDelete');
        }
    }
};
</script>

<style scoped lang="scss">
.icon,
.content {
    vertical-align: middle;
}
.content {
    margin-left: 6px;
}
.actions {
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
}
</style>
