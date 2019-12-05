<template>
    <div>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'App',
    async created() {
        let userInfo = window.sessionStorage.getItem('userInfo');
        if (!userInfo) {
            this.$router.push({ path: 'login' });
        }
    }
};
</script>

<style scoped lang="scss">
@import 'scss/variables';
</style>
