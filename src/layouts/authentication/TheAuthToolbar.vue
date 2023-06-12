<script>
import baseSharedFnHelper from '@/helpers/baseSharedFnHelper';

export default {
    name: 'TheToolbar',

    methods: {
        $_landing() {
            baseSharedFnHelper.$_redirect('');
        },
    },
};
</script>

<template>
    <v-toolbar id="core-toolbar" color="transparent" flat>
        <v-spacer />

        <v-img
            src="https://buo-resources.s3.us-east-2.amazonaws.com/compartidos/logo-buo.png"
            class="mr-3"
            contain
            max-width="150"
            width="100%"
            @click="$_landing"
            style="cursor: pointer"
        />
    </v-toolbar>
</template>
