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

const SupervisorFilterViewComponent = () =>
    import(
        '@/views/setIndicator/shared/components/user/SupervisorFilterViewComponent'
    );

const ResumeViewComponent = () =>
    import('@/views/setIndicator/shared/components/resume/ResumeViewComponent');

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
        SupervisorFilterViewComponent,
        ResumeViewComponent,
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

        <v-window-item :value="2" v-if="requiredTutors">
            <SupervisorFilterViewComponent :entity="entity" />
        </v-window-item>

        <v-window-item :value="3">
            <ResumeViewComponent
                :entity="entity"
                :requiredTutors="requiredTutors"
            />
        </v-window-item>
    </v-window>
</template>
