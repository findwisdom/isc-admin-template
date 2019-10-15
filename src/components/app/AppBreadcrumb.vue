<template>
    <el-breadcrumb separator="/" class="header-breadcrumb">
        <el-breadcrumb-item v-for="item in breadcrumbList" :key="item">{{ item }}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
export default {
    name: 'AppBreadcrumb',
    data() {
        return {
            breadcrumbList: []
        };
    },
    watch: {
        $route() {
            this.getBreadcrumb();
        }
    },
    methods: {
        getBreadcrumb() {
            this.breadcrumbList = this.$route.matched.map(item => {
                return item.meta.title;
            });
        }
    },
    mounted() {
        this.getBreadcrumb();
    }
};
</script>

<style scoped lang="scss">
.header-breadcrumb {
    font-size: 16px !important;
    font-weight: bold;
}
</style>
