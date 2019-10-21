<template>
    <div>
        <tinymce v-model="content" :height="400" />
    </div>
</template>

<script>
import Tinymce from '@/components/Tinymce';

export default {
    name: 'TinymcePage',
    components: { Tinymce },
    data() {
        return {
            content: `<h1 style="text-align: center;">Welcome to the TinyMCE demo!</h1>`
        };
    }
};
</script>
