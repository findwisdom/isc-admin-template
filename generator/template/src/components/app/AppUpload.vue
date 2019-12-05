<template>
    <div class="app-upload" @click="onClick">
        <slot></slot>
    </div>
</template>

<script>
import { loading, error } from '@/utils/message';
import axiox from 'axios';
import { each } from '@/utils/object';

let ld = null;

export default {
    name: 'AppUpload',
    props: {
        action: {
            type: String,
            required: true
        },
        accept: {
            type: String,
            default: '.png,.jpg,.jpeg'
        },
        name: {
            type: String,
            default: 'file'
        },
        data: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    mounted() {
        this.resetInputFile();
    },
    methods: {
        resetInputFile() {
            const parentEl = this.$el;
            const inputEl1 = this.$refs.inputEl;

            if (inputEl1) {
                inputEl1.onchange = null;
                parentEl.removeChild(inputEl1);
            }

            const inputEl2 = document.createElement('input');
            inputEl2.style.display = 'none';
            inputEl2.type = 'file';
            inputEl2.accept = this.accept;
            inputEl2.name = this.name;
            inputEl2.onchange = this.onChange.bind(this);
            parentEl.appendChild(inputEl2);
            this.$refs.inputEl = inputEl2;
        },

        async uploadFile(file, value) {
            const fd = new FormData();

            each(this.data, function(key, val) {
                fd.append(key, val);
            });

            fd.append(this.name, file, value);

            axiox.interceptors.response.use(
                res => {
                    const { code, message } = res.data;

                    if (code && message) {
                        console.log(message);
                        throw new Error(message);
                    }

                    return res;
                },
                err => {
                    const message = (err.response && err.response.data && err.response.data.message) || err.message;
                    throw new Error(message);
                }
            );

            try {
                this.onUploadStart(value.match(/([^/\\]+)$/)[1]);
                const res = await axiox({
                    url: this.action,
                    data: fd,
                    method: 'post'
                });
                res.data.name = file.name;
                // this.onUploadError(new Error('模拟失败'));
                this.onUploadSuccess(res.data);
            } catch (err) {
                this.onUploadError(`上传失败-${err}`);
            }
        },

        onClick() {
            const inputEl = this.$refs.inputEl;
            inputEl.click();
        },

        onChange() {
            const inputEl = this.$refs.inputEl;
            const files = inputEl.files;
            const value = inputEl.value;

            if (files.length) {
                this.uploadFile(files[0], value);
            }
        },

        onUploadStart(fileName) {
            ld = loading('上传中');
            this.$emit('start', fileName);
        },

        onUploadSuccess(data) {
            this.resetInputFile();
            ld.close();
            this.$emit('success', data);
        },

        onUploadError(err) {
            this.resetInputFile();
            ld.close();
            this.$emit('error', err);
            error(err);
        }
    }
};
</script>

<style scoped lang="scss"></style>
