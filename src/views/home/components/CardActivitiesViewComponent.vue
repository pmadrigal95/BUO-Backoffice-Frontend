<script>
/**
 * Descripción: Card about main activities
 *
 * @displayName CardMainActivitiesViewComponent
 */

const BaseCardMenu = () => import('@/components/core/cards/BaseCardMenu');

export default {
    name: 'CardMainActivitiesViewComponent',

    props: {
        menuItems: {
            type: Array,
            required: true,
        },

        size: {
            type: String,
            default: undefined,
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
            default: undefined,
        },

        minHeight: {
            type: String,
            default: undefined,
        },

        maxWidth: {
            type: String,
            default: undefined,
        },

        maxHeight: {
            type: String,
            default: undefined,
        },

        fontTypeSubtitle: {
            type: String,
            default: 'BUO-Paragraph-Small-SemiBold Buo-Black',
        },

        iconColor: {
            type: String,
            required: undefined,
        },

        slider: {
            type: Boolean,
            required: false,
        },

        bottonDisplay: {
            type: String,
            required: undefined,
        },

        large: {
            type: Boolean,
            default: false,
        },

        small: {
            type: Boolean,
            default: false,
        },
    },

    components: {
        BaseCardMenu,
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
        <div v-for="(item, i) in menuItems" :key="i" class="pb-4">
            <BaseCardMenu
                :icon="item.icono"
                :to="item.rutaURL"
                :subtitle="item.nombreUI"
                positionSubtitle="align-center"
                :iconColor="iconColor"
                :min-width="minWidth"
                :max-width="maxWidth"
                :min-height="minHeight"
                :max-height="maxHeight"
                :size="size"
                :small="small"
                :large="large"
                :fontTypeSubtitle="fontTypeSubtitle"
                :bottonDisplay="bottonDisplay"
                :centerBotton="true"
                :centerIcon="true"
            />
        </div>
    </v-row>

    <v-layout justify-center v-else-if="$vuetify.breakpoint.smAndDown">
        <v-slide-group v-if="slider">
            <v-slide-item v-for="(item, i) in menuItems" :key="i">
                <BaseCardMenu
                    :icon="item.icono"
                    :to="item.rutaURL"
                    :subtitle="item.nombreUI"
                    :iconColor="iconColor"
                    positionSubtitle="align-center"
                    :min-width="minWidth"
                    :max-width="maxWidth"
                    :min-height="minHeight"
                    :max-height="maxHeight"
                    :size="size"
                    :small="small"
                    :large="large"
                    :fontTypeSubtitle="fontTypeSubtitle"
                    :bottonDisplay="bottonDisplay"
                    :centerBotton="true"
                    :centerIcon="true"
                />
            </v-slide-item>
        </v-slide-group>
        <v-row :justify="positionJustify" v-else>
            <v-col cols="12" :md="md" v-for="(item, i) in menuItems" :key="i">
                <BaseCardMenu
                    :icon="item.icono"
                    :to="item.rutaURL"
                    :subtitle="item.nombreUI"
                    :iconColor="iconColor"
                    positionSubtitle="align-center"
                    :min-width="minWidth"
                    :max-width="maxWidth"
                    :min-height="minHeight"
                    :max-height="maxHeight"
                    :size="size"
                    :small="small"
                    :large="large"
                    :fontTypeSubtitle="fontTypeSubtitle"
                    :bottonDisplay="bottonDisplay"
                    :centerBotton="true"
                    :centerIcon="true"
                />
            </v-col>
        </v-row>
    </v-layout>
</template>
