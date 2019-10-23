<template>
    <el-popover placement="top" width="220" trigger="click" v-model="deleteVisible">
        <span class="table-delete-font">
            <span class="table-delete-font__icon">
                <i class="el-icon-warning"></i>
            </span>
            确定要进行删除操作吗？
        </span>
        <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" plain @click="deleteVisible = false">取消</el-button>
            <el-button size="mini" type="danger" plain @click="handleDelete">
                删除
            </el-button>
        </div>
        <el-button size="mini" type="text" class="el-button__text-delete table-delete-button" slot="reference">
            删除
        </el-button>
    </el-popover>
</template>

<script>
export default {
    name: 'TableOperation',
    data() {
        return {
            deleteVisible: false
        };
    },
    methods: {
        handleDelete() {
            this.deleteVisible = false;
            this.$emit('handleDelete');
        }
    }
};
</script>

<style scoped lang="scss">
.table-delete-button {
    padding-left: 8px;
    border-left: 1px solid rgba(207, 207, 207, 1);
    margin-left: 8px;
}
.table-delete-font {
    &__icon {
        color: rgba(255, 186, 0, 1);
    }
    font-size: 12px;
    padding: 4px 8px;
    display: inline-block;
    margin-bottom: 10px;
}
</style>
