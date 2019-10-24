<template>
    <div style="height: 100vh;overflow: hidden">
        <el-scrollbar style="height: 100%">
            <div class="system-header">
                <div class="system-header__brand">
                    <span class="system-header__logo">
                        <svg-icon name="logo" style="height: 44px;width: 35px"></svg-icon>
                    </span>
                    <span class="system-header__logo-font">官网管理</span>
                </div>
            </div>
            <el-menu
                router
                class="app-aside"
                :default-active="activeMenu"
                :unique-opened="false"
                :collapse-transition="false"
                mode="vertical"
            >
                <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import SidebarItem from '@/components/SidebarItem';

export default {
    name: 'AppAside',
    components: { SidebarItem },
    data() {
        return {};
    },
    computed: {
        ...mapGetters(['isAdmin']),
        routes() {
            return this.$router.options.routes;
        },
        activeMenu() {
            const route = this.$route;
            const { meta, name } = route;
            // if set path, the sidebar will highlight the path you set
            if (meta.activeMenu) {
                return meta.activeMenu;
            }
            return name;
        }
    }
};
</script>

<style scoped lang="scss">
.system-header {
    position: relative;
    color: $app-aside-font-color;
    text-align: center;
    margin-bottom: 14px;
    &__brand {
        margin-top: 10px;
        text-align: left;
        margin-left: 20px;
        background-size: contain;
        vertical-align: middle;
    }
    &__logo {
        font-size: 46px;
        display: inline-block;
        padding-right: 16px;
        vertical-align: middle;
    }
    &__logo-font {
        font-weight: bold;
        margin-top: -10px;
        vertical-align: middle;
        font-size: 16px;
        display: inline-block;
        border-left: 2px solid #ffffff;
        padding-left: 16px;
    }
}
.app-aside {
    background-color: $app-aside-bg !important;
}
</style>
