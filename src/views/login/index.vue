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
                    placeholder="Username"
                    name="username"
                    type="text"
                    tabindex="1"
                    auto-complete="on"
                ></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <span class="svg-container"></span>
                <el-input
                    :key="passwordType"
                    ref="password"
                    v-model="loginForm.password"
                    :type="passwordType"
                    placeholder="Password"
                    name="password"
                    tabindex="2"
                    auto-complete="on"
                    @keyup.enter.native="handleLogin"
                ></el-input>
                <span class="show-pwd" @click="showPwd"></span>
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
export default {
    name: 'index',
    data() {
        return {
            loginForm: {
                username: 'admin',
                password: '111111'
            },
            loading: false,
            passwordType: 'password',
            redirect: undefined
        };
    },
    methods: {
        showPwd() {
            if (this.passwordType === 'password') {
                this.passwordType = '';
            } else {
                this.passwordType = 'password';
            }
            this.$nextTick(() => {
                this.$refs.password.focus();
            });
        },
        handleLogin() {
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    console.log(this.loginForm);
                    this.$router.push({ path: '/order/backlog/role' });
                } else {
                    console.log('error submit!!');
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
