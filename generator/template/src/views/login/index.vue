<template>
    <div class="login-container">
        <el-form ref="loginForm" :model="loginForm" class="login-form" auto-complete="on" label-position="left">
            <div class="title-container">
                <h3 class="title">指 令 集 官 网 后 台 管 理</h3>
            </div>
            <el-form-item prop="username">
                <span class="svg-container"></span>
                <el-input
                    ref="username"
                    v-model="loginForm.username"
                    placeholder="请输入邮箱"
                    name="username"
                    type="text"
                    suffix-icon="el-icon-s-custom"
                    tabindex="1"
                    auto-complete="on"
                ></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <span class="svg-container"></span>
                <el-input
                    ref="password"
                    suffix-icon="el-icon-s-tools"
                    v-model="loginForm.password"
                    placeholder="请输入密码"
                    type="password"
                    tabindex="2"
                    auto-complete="on"
                    @keyup.enter.native="handleLogin"
                ></el-input>
            </el-form-item>
            <el-button
                :loading="loading"
                type="primary"
                style="width:100%;margin-bottom:30px;"
                @click.native.prevent="handleLogin"
            >
                登录
            </el-button>
        </el-form>
    </div>
</template>

<script>
import { success, error } from '@/utils/message';
// import { login } from '@/services/user';
export default {
    name: 'index',
    data() {
        return {
            loginForm: {
                username: '',
                password: ''
            },
            loading: false,
            redirect: undefined
        };
    },
    async created() {
        let userInfo = window.sessionStorage.getItem('userInfo');
        if (userInfo) {
            this.$router.push({ path: '/' });
        }
    },
    methods: {
        handleLogin() {
            this.$refs.loginForm.validate(async valid => {
                if (valid) {
                    try {
                        this.loading = true;
                        // let data = await login(this.loginForm.username, this.loginForm.password);
                        let data = {
                            name: 'admin',
                            admin: 'true',
                            email: '826206931@qq.com',
                            roles: ['admin']
                        };
                        let userInfo = {
                            login: true,
                            admin: data.admin,
                            name: data.name,
                            email: data.email,
                            roles: data.admin ? ['admin'] : ['user']
                        };
                        window.sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
                        success('登录成功');
                        this.$router.push({ path: '/' });
                    } catch (err) {
                        return await error(err);
                    } finally {
                        this.loading = false;
                    }
                } else {
                    return false;
                }
            });
        }
    }
};
</script>

<style lang="scss">
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;
$dark_gray: #889aa4;
.login-container {
    height: 100vh;
    width: 100vw;
    background-color: $bg;
    overflow: hidden;

    .el-input {
        display: inline-block;
        height: 47px;
        width: 85%;
        background: #242f3c;
        border: none;

        .el-input__inner {
            background: #242f3c;
            border: none;
            -webkit-appearance: none;
            border-radius: 0;
            padding: 12px 5px 12px 15px;
            color: $light_gray;
            height: 47px;
            caret-color: $cursor;

            &:-webkit-autofill {
                box-shadow: 0 0 0 1000px $bg inset !important;
                -webkit-text-fill-color: $cursor !important;
            }
        }
    }

    .el-form-item {
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        color: #454545;
    }

    .login-form {
        position: relative;
        width: 520px;
        max-width: 100%;
        padding: 160px 35px 0;
        margin: 0 auto;
        overflow: hidden;
    }

    .tips {
        font-size: 14px;
        color: #fff;
        margin-bottom: 10px;

        span {
            &:first-of-type {
                margin-right: 16px;
            }
        }
    }

    .svg-container {
        padding: 6px 5px 6px 15px;
        color: $dark_gray;
        vertical-align: middle;
        width: 30px;
        display: inline-block;
    }

    .title-container {
        position: relative;

        .title {
            font-size: 26px;
            color: $light_gray;
            margin: 0px auto 40px auto;
            text-align: center;
            font-weight: bold;
        }
    }

    .show-pwd {
        position: absolute;
        right: 10px;
        top: 7px;
        font-size: 16px;
        color: $dark_gray;
        cursor: pointer;
        user-select: none;
    }
}
</style>
