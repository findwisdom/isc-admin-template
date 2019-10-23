<template>
    <div class="header">
        <div class="header__inner">
            <div class="header__left">
                <app-breadcrumb />
            </div>
            <div class="header__right">
                <div class="header__user" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
                    <div class="user_image">
                        <svg-icon name="login-user" class="user_icon_svg"></svg-icon>
                    </div>
                    <div class="user_name">{{ userName }}</div>
                    <!--<div class="user_icon">-->
                    <!--<svg-icon name="icon-down" class="user_icon_svg"></svg-icon>-->
                    <!--</div>-->
                    <div class="header__user__menu" v-show="userPanel">
                        <app-menu
                            @mouseenter="onMouseEnter"
                            @mouseleave="onMouseLeave"
                            :accountName="userName"
                            :accountRole="role"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AppMenu from '@/components/app/AppMenu';
import AppBreadcrumb from '@/components/app/AppBreadcrumb';

let timeId = 0;

export default {
    name: 'AppHeader',
    components: { AppMenu, AppBreadcrumb },
    data() {
        return {
            role: '',
            userPanel: false,
            userName: '无名'
        };
    },

    computed: {},

    methods: {
        onMouseEnter() {
            this.userPanel = true;
            clearTimeout(timeId);
        },
        onMouseLeave() {
            timeId = setTimeout(() => {
                this.userPanel = false;
            }, 567);
        },
        getUserName() {
            let userInfo = window.localStorage.getItem('userInfo');
            let role = window.sessionStorage.getItem('groupList');
            if (userInfo) {
                this.userName = JSON.parse(userInfo).name;
            }
            if (role) {
                this.role = JSON.parse(role)[0].name;
            }
        }
    },
    created() {
        this.getUserName();
    }
};
</script>

<style scoped lang="scss">
.header {
    position: fixed;
    top: 0;
    right: 0;
    left: 200px;
    z-index: 9;
    background-color: $app-body-bg;

    &__inner {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 62px;
        padding: 0 15px;
    }

    &__left {
        display: flex;
        align-items: center;
    }

    &__park {
        color: $app-text-1-color;
        margin-left: 20px;
        display: flex;
        align-items: center;

        &__icon {
            width: 20px;
            height: 20px;
            background: url('../../assets/icons/out.png') center no-repeat;
            margin-right: 5px;
        }
    }

    &__user {
        display: flex;
        justify-content: center;
        .user_image {
            height: 30px;
            width: 30px;
            border-radius: 100%;
            background: $app-primary-bg;
            color: $app-primary-color;
        }
        .user_name {
            height: 30px;
            line-height: 30px;
            margin-left: 8px;
            color: rgba(56, 70, 96, 1);
            font-size: 14px;
        }
        .user_icon_svg {
            color: #ffffff;
            margin-top: 6px;
            overflow: hidden;
            margin-left: 6px;
            font-size: 6px;
            height: 18px;
            width: 18px;
            /*border: 1px dashed #000;*/
        }

        &__menu {
            position: absolute;
            background: #fff;
            width: 140px;
            top: 100%;
            right: 0;
            box-shadow: 0px 2px 4px 0px rgba(214, 229, 255, 1);
        }
    }
}
</style>
