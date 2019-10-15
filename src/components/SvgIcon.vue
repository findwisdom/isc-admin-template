<template>
    <svg :class="className" class="svg-icon svg-external-icon" xmlns="http://www.w3.org/2000/svg">
        <title v-if="title">{{ title }}</title>
        <use :xlink:href="iconPath" xmlns:xlink="http://www.w3.org/1999/xlink" />
    </svg>
</template>

<script>
export default {
    name: 'svg-icon',

    props: {
        name: {
            type: String,
            required: true
        },

        title: {
            type: String,
            default: null
        }
    },

    computed: {
        iconPath() {
            let icon = require(`../assets/svg/${this.name}.svg`);
            icon = icon.default || icon;
            // {id: '...', url: '...', viewBox: '0 0 24 24'}
            return icon.url;
        },

        className() {
            return 'svg-icon svg-icon--' + this.name;
        }
    }
};
</script>

<style>
.svg-icon {
    fill: currentColor;
    height: 24px;
    width: 24px;
}
.svg-external-icon {
    mask-size: cover !important;
    display: inline-block;
}
</style>
