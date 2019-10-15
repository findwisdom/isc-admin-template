<template>
    <div class="table-header">
        <div class="table-header__left">
            <div class="table-header__search" v-if="search" :style="{ width: searchWidth }">
                <el-input
                    size="mini"
                    v-model="keywords2"
                    :placeholder="placeholder"
                    @keypress.enter.native="onBlur($event)"
                    @blur="onSearch()"
                ></el-input>
                <el-button size="mini" plain type="primary">查询</el-button>
            </div>
            <slot name="right"></slot>
        </div>
        <div class="table-header__right">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TableHeader',
    props: {
        search: {
            type: Boolean,
            default: true
        },
        placeholder: {
            type: String,
            default: '回车搜索'
        },
        searchWidth: {
            type: String,
            default: '230px'
        },
        keywords: {
            type: String,
            require: true
        }
    },
    data() {
        return {};
    },
    computed: {
        keywords2: {
            get() {
                return this.keywords;
            },
            set(value) {
                this.$emit('update:keywords', value);
            }
        }
    },
    methods: {
        onBlur(ev) {
            ev.target.blur();
        },

        onSearch() {
            this.$emit('search', this.keywords);
        }
    }
};
</script>

<style scoped lang="scss">
@import '../../scss/variables';

.table-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;

    &__left,
    &__right {
        display: flex;
        align-items: center;
    }
    &__search {
        display: flex;
        /deep/ button {
            margin-left: 10px;
        }
    }
}
</style>
