<script>
/**
 * Descripción: Pantalla Perfil
 *
 * @displayName ProfileViewComponent
 *
 */

import { mapGetters } from 'vuex';

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

    computed: { ...mapGetters('theme', ['app']) },

    methods: {
        $_goBack() {
            delete this.entity.userId;
            this.entity.step = 0;
        },
    },
};
</script>

<template>
    <section v-if="entity.step == 1">
        <v-layout justify-start class="my-4 pl-6">
            <v-btn
                :color="app ? 'blueProgress600' : 'blue800'"
                class="no-uppercase rounded-lg BUO-Paragraph-Small-SemiBold"
                text
                @click="$_goBack"
            >
                <v-icon left dark> mdi-chevron-left </v-icon>Regresar</v-btn
            >
        </v-layout>
        <ProfileDetailsViewComponent :userId="entity.userId" />
    </section>
</template>
