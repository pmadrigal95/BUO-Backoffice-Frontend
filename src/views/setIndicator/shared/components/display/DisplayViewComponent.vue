<script>
/**
 * Descripción: Pantalla Display
 *
 * @displayName DisplayViewComponent
 *
 */

const UserFilterViewComponent = () =>
    import(
        '@/views/setIndicator/shared/components/user/UserFilterViewComponent'
    );

const IndicatorFilterViewComponent = () =>
    import(
        '@/views/setIndicator/shared/components/indicator/IndicatorFilterViewComponent'
    );

export default {
    name: 'DisplayViewComponent',

    props: {
        entity: {
            type: Object,
            requiered: true,
        },

        requiredTutors: {
            type: Boolean,
            default: false,
        },
    },

    components: {
        UserFilterViewComponent,
        IndicatorFilterViewComponent,
    },
};
</script>

<template>
    <v-window v-model="entity.step" touchless v-if="entity.companyId">
        <v-window-item :value="0">
            <UserFilterViewComponent
                :entity="entity"
                :requiredTutors="requiredTutors"
            />
        </v-window-item>

        <v-window-item :value="1">
            <IndicatorFilterViewComponent
                :entity="entity"
                :requiredTutors="requiredTutors"
            />
        </v-window-item>

        <v-window-item :value="2">
            <span>2</span>
        </v-window-item>

        <v-window-item :value="3">
            <span>3</span>
        </v-window-item>
    </v-window>
</template>
