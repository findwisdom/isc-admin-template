<template>
    <div class="wrap">
        <span class="wrap__icon-space" @click="handlePicturePreview">
            <svg-icon name="icon-add"></svg-icon>
        </span>
        <img v-show="url" :src="url" alt="img" class="wrap__img" />
        <template v-if="detail">
            <div class="wrap__float">
                <span class="wrap__icon-list">
                    <span class="wrap__icon-item" @click="handlePicturePreview">
                        <svg-icon name="icon-view"></svg-icon>
                    </span>
                </span>
            </div>
            <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="url" alt="" />
            </el-dialog>
        </template>
    </div>
</template>

<script>
export default {
    name: 'AppUploadImg',
    props: {
        detail: {
            type: Boolean,
            default() {
                return false;
            }
        },
        url: String
    },
    data() {
        return {
            dialogVisible: false
        };
    },
    mounted() {},
    methods: {
        handlePicturePreview() {
            this.dialogVisible = true;
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        }
    }
};
</script>

<style scoped lang="scss">
.wrap {
    display: inline-block;
    position: relative;
    background-color: #fbfdff;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    box-sizing: border-box;
    width: 148px;
    height: 148px;
    cursor: pointer;
    line-height: 146px;
    vertical-align: top;
    &__img {
        width: 100%;
        height: 100%;
    }
    &__float {
        overflow: hidden;
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        opacity: 0;
        background: rgba(0, 0, 0, 0.2);
    }
    &__float:hover {
        opacity: 1;
    }
    &__icon-list {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        cursor: default;
        text-align: center;
        color: #fff;
        font-size: 20px;
        background-color: rgba(0, 0, 0, 0.2);
        transition: opacity 0.3s;
    }
    &__icon-space {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        cursor: default;
        text-align: center;
        color: #8c939d;
        font-size: 20px;
    }
    &__icon-item {
        line-height: 150px;
        vertical-align: middle;
        cursor: pointer;
        color: #fff;
        font-size: 20px;
    }
}
</style>
