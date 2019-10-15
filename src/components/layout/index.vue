<template>
    <div>
        <app-header />
        <div class="container">
            <div class="container__aside">
                <app-aside />
            </div>
            <keep-alive>
                <app-main class="container__main" />
            </keep-alive>
        </div>
    </div>
</template>

<script>
import AppHeader from '@/components/app/AppHeader';
import AppAside from '@/components/app/AppAside';
import AppMain from '@/components/app/AppMain';

export default {
    name: 'App',
    components: {
        AppHeader,
        AppAside,
        AppMain
    }
};
</script>
<style scoped lang="scss">
@import './../../scss/variables';

.container {
    padding-top: 62px;
    padding-left: $app-aside-width;
    position: relative;

    &__aside {
        position: fixed;
        background: $app-aside-bg;
        top: 0;
        bottom: 0;
        left: 0;
        width: $app-aside-width;
        box-shadow: 0 2px 4px 0 rgba(214, 229, 255, 1);
    }

    &__breadcrumb {
        padding: 20px 0 0 16px;
    }

    &__main {
        margin: 16px 16px 16px 16px;
        box-shadow: 0 2px 4px 0 rgba(214, 229, 255, 1);
        background: #fff;
    }
}
</style>
