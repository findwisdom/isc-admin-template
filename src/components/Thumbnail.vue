<template>
    <div>
        <div class="table-thumbnail" @click="onPreview()" :style="{ width, height }">
            <img :src="picture" :alt="alt" class="table-thumbnail-img" />
            <span class="table-thumbnail-actions">
                <svg-icon name="icon-enlarge"></svg-icon>
            </span>
        </div>
        <el-dialog :visible.sync="visible">
            <img width="100%" :src="picture" :alt="alt" />
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'Thumbnail',
    data() {
        return {
            visible: false
        };
    },
    props: {
        picture: {
            type: String,
            required: true
        },
        alt: {
            type: String,
            default: '缩略图'
        },
        width: {
            type: String,
            default: '50px'
        },
        height: {
            type: String,
            default: '38px'
        }
    },
    methods: {
        onPreview() {
            this.visible = true;
        }
    }
};
</script>

<style scoped lang="scss">
.table-thumbnail {
    cursor: pointer;
    color: #fff;
    position: relative;
    &-img {
        width: 100%;
        height: 100%;
    }
    &-actions {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: $app-base-color;
        opacity: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        &:hover {
            opacity: 0.5;
        }
    }
}
</style>
