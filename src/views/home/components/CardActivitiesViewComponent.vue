<script>
/**
 * Descripción: Card about main activities
 *
 * @displayName CardMainActivitiesViewComponent
 */

const BaseCardTest = () => import('@/components/core/cards/BaseCardTest');

export default {
    name: 'CardMainActivitiesViewComponent',

    props: {
        menuItems: {
            type: Array,
            required: true,
        },

        size: {
            type: String,
            default: 'small',
        },

        position: {
            type: String,
            default: 'start',
        },

        imgSmall: {
            type: Boolean,
            default: false,
        },

        md: {
            type: String,
            default: '9',
        },

        minWidth: {
            type: String,
            default: '317px',
        },

        minHeight: {
            type: String,
            default: '258px',
        },

        fontTypeSubtitle: {
            type: String,
            default: 'BUO-Paragraph-Small-SemiBold Buo-Black',
        },

        iconColor: {
            type: String,
            required: undefined,
        },

        movil: {
            type: Boolean,
            required: false,
        },
    },

    components: {
        BaseCardTest,
    },

    computed: {
        positionJustify() {
            return this.menuItems.lenght > 1 ? 'center' : this.position;
        },
    },

};
</script>

<template>
    <v-row :justify="positionJustify" v-if="$vuetify.breakpoint.mdAndUp">
        <v-col cols="12" :md="md" v-for="(item, i) in menuItems" :key="i">
            <BaseCardTest
                :icon="item.icono"
                :to="item.rutaURL"
                :subtitle="item.nombreUI"
                :iconColor="iconColor"
                :minWidth="minWidth"
                :minHeight="minHeight"
                :size="size"
                :fontTypeSubtitle="fontTypeSubtitle"
            />
        </v-col>
    </v-row>

    <v-layout justify-center v-else-if="$vuetify.breakpoint.smAndDown && movil">
        <v-slide-group>
            <v-slide-item v-for="(item, i) in menuItems" :key="i">
                <BaseCardTest
                    :icon="item.icono"
                    :to="item.rutaURL"
                    :subtitle="item.nombreUI"
                    :iconColor="iconColor"
                    :minWidth="minWidth"
                    :minHeight="minHeight"
                    :size="size"
                    :fontTypeSubtitle="fontTypeSubtitle"
                />
            </v-slide-item>
        </v-slide-group>
    </v-layout>

    <v-layout
        justify-center
        v-else-if="$vuetify.breakpoint.smAndDown && !movil"
    >
        <v-col cols="12" md="1" v-for="(item, i) in menuItems" :key="i">
            <BaseCardTest
                :icon="item.icono"
                :to="item.rutaURL"
                :subtitle="item.nombreUI"
                :iconColor="iconColor"
                :minWidth="minWidth"
                :minHeight="minHeight"
                :size="size"
                :fontTypeSubtitle="fontTypeSubtitle"
            />
        </v-col>
    </v-layout>
</template>
