<template>
    <div>
        <div class="table-thumbnail" :style="{ width, height }">
            <img :src="url" :alt="alt" class="table-thumbnail-img" />

            <span :class="['table-thumbnail-actions', loadFail ? 'load-fail' : '']" @click="onPreview()">
                <svg-icon name="icon-enlarge"></svg-icon>
            </span>
        </div>

        <el-dialog :visible.sync="visible">
            <img width="100%" :src="picture" :alt="alt" />
        </el-dialog>
    </div>
</template>

<script>
import imageFail from '@/assets/icons/image-fail.png';
import imageLodading from '@/assets/icons/image-lodading.png';

export default {
    name: 'Thumbnail',
    data() {
        return {
            url: imageLodading,
            loadFail: true,
            visible: false,
            img: {
                imageFail
            }
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
            default: '50px'
        }
    },
    created() {
        this.loadImage();
    },
    watch: {
        picture() {
            this.loadImage();
        }
    },
    methods: {
        onPreview() {
            this.visible = true;
        },
        loadImage() {
            const img = new Image();
            img.onload = () => {
                this.url = this.picture;
                this.loadFail = false;
            };
            img.onerror = () => {
                this.url = this.img.imageFail;
            };
            img.src = this.picture;
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
        background-color: $app-grey-2-color;
        opacity: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        &:hover {
            opacity: 0.7;
        }
    }
    &-actions.load-fail {
        display: none;
    }
}
</style>
