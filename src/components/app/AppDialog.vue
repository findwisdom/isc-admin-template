<template>
    <el-dialog
        class="dialog"
        :visible.sync="visible2"
        :width="width"
        :append-to-body="true"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="true"
        :top="top"
        @open="onOpen"
        @close="onClose"
    >
        <template v-slot:title>
            <div class="dialog__title">
                <slot name="title"></slot>
            </div>
        </template>

        <template v-slot:default>
            <slot name="default"></slot>
        </template>

        <template v-slot:footer>
            <div class="dialog__footer" v-if="footer">
                <el-button type="default" @click="onCancel" size="small" :loading="loading">取消</el-button>
                <el-button type="primary" @click="onSure" size="small" :loading="loading">确定</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script>
export default {
    name: 'AppDialog',
    props: {
        width: {
            type: String,
            default: '600px'
        },
        visible: {
            type: Boolean,
            default: false
        },
        loading: {
            type: Boolean,
            default: false
        },
        footer: {
            type: Boolean,
            default: true
        },
        top: {
            type: String,
            default: '10vh'
        }
    },
    computed: {
        visible2: {
            get() {
                return this.visible;
            },
            set(value) {
                this.$emit('update:visible', value);
            }
        }
    },
    methods: {
        onOpen() {
            this.$emit('open');
        },
        onClose() {
            this.$emit('close');
        },
        onCancel() {
            this.visible2 = false;
        },
        onSure() {
            this.$emit('sure');
        }
    }
};
</script>

<style scoped lang="scss">
.dialog {
    /deep/ .el-dialog {
        &__body {
            padding-top: 10px;
            padding-bottom: 10px;
        }
    }

    &__title {
        color: $app-base-color;
        min-height: 20px;
    }

    &__footer {
        text-align: center;
    }
}
</style>
