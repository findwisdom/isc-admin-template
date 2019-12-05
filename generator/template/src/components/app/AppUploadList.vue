<template>
    <div class="app-upload-list">
        <ul class="el-upload-list el-upload-list--text">
            <li v-for="(item, index) in data" class="el-upload-list__item is-success" :key="index">
                <a class="el-upload-list__item-name" @click="clickItem(item, index)">
                    <i class="el-icon-document"></i>
                    {{ item.name }}
                </a>
                <label @click="deleteItem(item, index)" v-show="!detaill">
                    <i class="el-icon-close"></i>
                </label>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'AppUploadList',
    props: {
        detaill: {
            type: Boolean,
            default() {
                return false;
            }
        },
        data: {
            type: Array,
            required: true,
            default() {
                return {};
            }
        }
    },
    mounted() {},
    methods: {
        deleteItem(item, index) {
            this.$emit('deleteItem', item, index);
        },
        clickItem(item, index) {
            this.$emit('clickItem', item, index);
        }
    }
};
</script>

<style scoped lang="scss"></style>
