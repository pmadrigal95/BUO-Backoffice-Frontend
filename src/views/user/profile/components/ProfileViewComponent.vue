<script>
/**
 * Descripción: Pantalla Perfil
 *
 * @displayName ProfileViewComponent
 *
 */

const ProfileDetailsViewComponent = () =>
    import(
        '@/views/user/profile/components/internalCompontes/ProfileDetailsViewComponent'
    );

export default {
    name: 'ProfileViewComponent',

    props: {
        entity: {
            type: Object,
            requiered: true,
        },
    },

    components: {
        ProfileDetailsViewComponent,
    },

    methods: {
        $_goBack() {
            delete this.entity.userId;
            this.entity.step = 0;
        },
    },
};
</script>

<template>
    <div v-if="entity && entity.userId">
        <v-layout justify-start class="my-4 pl-6">
            <v-btn
                color="blue800"
                class="no-uppercase rounded-lg BUO-Paragraph-Small-SemiBold"
                text
                @click="$_goBack"
            >
                <v-icon left dark> mdi-chevron-left </v-icon>Regresar</v-btn
            >
        </v-layout>
        <ProfileDetailsViewComponent :userId="entity.userId" />
    </div>
</template>
