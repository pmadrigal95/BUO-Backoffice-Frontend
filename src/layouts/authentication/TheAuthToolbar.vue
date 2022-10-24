<script>
export default {
    name: 'TheToolbar',
};
</script>

<template>
    <v-toolbar id="core-toolbar" color="transparent" flat>
        <v-spacer />

        <v-img
            :src="require('@/assets/app/common/logo-buo.png')"
            class="mr-3"
            contain
            max-width="150"
            width="100%"
        />
    </v-toolbar>
</template>
