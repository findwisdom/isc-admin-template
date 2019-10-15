<template>
    <div class="menu">
        <ul class="menu__group">
            <li class="menu__item menu__item--full">
                <a href="javascript:;">
                    <p class="menu__item__main">{{ accountName }}</p>
                    <!--<p class="menu__item__main">{{ accountRole }}</p>-->
                    <p class="menu__item__sub">{{ accountRole }}</p>
                </a>
            </li>
        </ul>
        <ul class="menu__group">
            <li class="menu__item">
                <a href="javascript:;" @click="onSignOut">
                    <i class="menu__item__icon menu__item__icon--sign-out"></i>
                    <span class="menu__item__text">退出登录</span>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
import { loginOut, redirect } from '@services/login';
import { error, confirm } from '@utils/message';
export default {
    name: 'AppMenu',
    props: {
        accountName: {
            default: '',
            type: String
        },
        accountMobile: {
            default: '',
            type: String
        },
        accountRole: {
            default: '',
            type: String
        }
    },
    methods: {
        onSignOut() {
            confirm('确定要退出当前登录吗', {
                callback: async () => {
                    try {
                        localStorage.removeItem('userInfo');
                        redirect();
                        await loginOut();
                    } catch (err) {
                        localStorage.removeItem('userInfo');
                        redirect();
                        error(err);
                    }
                }
            });
        }
    }
};
</script>

<style scoped lang="scss">
.menu {
    background: #fff;

    &__group {
        border-bottom: 1px solid $app-border-color;
    }

    &__item {
        &__main {
            font-size: 16px;
            line-height: 30px;
            color: $app-base-color;
        }

        &__sub {
            font-size: 12px;
            line-height: 20px;
            color: $app-muted-color;
        }

        a {
            display: flex;
            align-items: center;
            padding: 8px 16px;

            &:hover {
                background: $app-light-color;
            }
        }

        &--full a {
            flex-direction: column;
            align-items: flex-start;
        }

        &__icon {
            width: 16px;
            height: 16px;
            background: no-repeat center;
            background-size: cover;

            &--settings {
                background-image: url(../../assets/icons/settings.png);
            }

            &--help {
                background-image: url(../../assets/icons/help.png);
            }

            &--sign-out {
                background-image: url(../../assets/icons/sign-out.png);
            }
        }

        &__text {
            margin-left: 5px;
            color: $app-base-color;
        }
    }
}
</style>
