<template>
    <div>
        <div class="system-header">
            <div class="system-header__brand"></div>
        </div>
        <el-scrollbar>
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
    height: 63px;
    line-height: 63px;
    color: $app-aside-font-color;
    text-align: center;
    &__brand {
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -67px;
        margin-top: -18px;
        width: 134px;
        height: 36px;
        text-align: center;
        line-height: 44px;
        font-size: 20px;
        background: url('../../assets/logo1.png') center no-repeat;
        background-size: contain;
    }
}
.app-aside {
    background-color: $app-aside-bg !important;
}
</style>
