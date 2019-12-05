<template>
    <div v-if="!item.hidden" class="menu-wrapper">
        <template
            v-if="
                hasOneShowingChild(item.children, item) &&
                    (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
                    !item.alwaysShow
            "
        >
            <el-menu-item :key="onlyOneChild.name" :index="onlyOneChild.name" :route="{ name: onlyOneChild.name }">
                <template slot="title">
                    <svg-icon
                        v-if="item.meta && item.meta.icon"
                        :name="item.meta.icon"
                        class="app-aside__icon"
                    ></svg-icon>
                    <span>{{ item.meta.title }}</span>
                </template>
            </el-menu-item>
        </template>

        <el-submenu v-else ref="subMenu" :index="item.path" popper-append-to-body>
            <template slot="title">
                <svg-icon v-if="item.meta && item.meta.icon" :name="item.meta.icon" class="app-aside__icon"></svg-icon>
                <span>{{ item.meta.title }}</span>
            </template>
            <sidebar-item
                v-for="child in item.children"
                :key="child.path"
                :is-nest="true"
                :item="child"
                :base-path="child.path"
                class="nest-menu"
            />
        </el-submenu>
    </div>
</template>

<script>
export default {
    name: 'SidebarItem',
    props: {
        // route object
        item: {
            type: Object,
            required: true
        },
        isNest: {
            type: Boolean,
            default: false
        },
        basePath: {
            type: String,
            default: ''
        }
    },
    data() {
        // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
        // TODO: refactor with render function
        this.onlyOneChild = null;
        return {};
    },
    methods: {
        hasOneShowingChild: function(children = [], parent) {
            const showingChildren = children.filter(item => {
                if (item.hidden) {
                    return false;
                } else {
                    // Temp set(will be used if only has one showing child)
                    this.onlyOneChild = item;
                    return true;
                }
            });

            // When there is only one child router, the child router is displayed by default
            if (showingChildren.length === 1) {
                return true;
            }

            // Show parent if there are no child router to display
            if (showingChildren.length === 0) {
                this.onlyOneChild = { ...parent, path: '', noShowingChildren: true };
                return true;
            }

            return false;
        }
    }
};
</script>
<style scoped lang="scss">
.app-aside {
    background-color: $app-aside-bg !important;
    &__icon {
        display: inline-block;
        width: 18px;
        height: 18px;
        font-size: 14px;
        margin-right: 16px;
    }
    .el-menu-item {
        height: 44px;
        line-height: 44px;
        color: $app-aside-font-color;
        min-width: 200px;
    }
    .el-menu-item.is-active {
        background-color: $app-aside-item-hover;
        color: $app-aside-font-active;
    }
    .el-menu-item:focus,
    .el-menu-item:hover {
        background-color: $app-aside-item-hover;
        color: $app-aside-font-active;
    }
}
</style>
