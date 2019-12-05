<template>
    <div class="table-footer">
        <div class="table-footer__left"><slot></slot></div>

        <div class="table-footer__right">
            <el-pagination
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange"
                :current-page="pageNumber2"
                :page-sizes="[10, 20, 50]"
                :page-size="pageSize2"
                layout="total, prev, pager, next, sizes, jumper"
                :total="pageTotal"
            ></el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TableFooter',
    props: {
        pageNumber: {
            type: Number,
            default: 1
        },
        pageSize: {
            type: Number,
            default: 10
        },
        pageTotal: {
            type: Number,
            default: 1
        }
    },
    computed: {
        pageNumber2: {
            get() {
                return this.pageNumber;
            },
            set(value) {
                this.$emit('update:pageNumber', value);
            }
        },
        pageSize2: {
            get() {
                return this.pageSize;
            },
            set(value) {
                this.$emit('update:pageSize', value);
            }
        }
    },
    methods: {
        handleCurrentChange(value) {
            this.$emit('update:pageNumber', value);
        },
        handleSizeChange(value) {
            this.$emit('update:pageNumber', 1);
            this.$emit('update:pageSize', value);
        }
    }
};
</script>

<style scoped lang="scss">
@import '../../scss/variables';

.table-footer {
    display: flex;
    padding: 15px;
    justify-content: space-between;
    align-items: center;

    &__left {
        color: $app-text-2-color;
    }

    &__right {
        display: inline-flex;
        align-items: center;
        font-size: 13px;
        color: $app-text-2-color;
        font-weight: normal;
    }
}
</style>
