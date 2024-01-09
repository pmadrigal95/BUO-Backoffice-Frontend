<script>
/**
 * Descripción: Pantalla  SandBox1
 *
 * @displayName SandBox1
 *
 */

const DashboardViewComponent = () =>
    import('@/views/sandBox/components/dashboard/DashboardViewComponent');

export default {
    name: 'SandBox1',

    components: {
        DashboardViewComponent,
    },

    created() {
        this.$_fnBreakpoint();
        this.$_fnTablet();
    },

    data() {
        return {
            isTablet: false,
        };
    },

    methods: {
        $_fnBreakpoint() {
            alert(`Ancho ${window.innerWidth} Alto ${window.innerHeight}`);
        },

        $_fnTablet() {
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;

            this.isTablet =
                screenWidth >= 768 && screenHeight >= 834 && screenWidth < 1024;
        },
    },
};
</script>

<template>
    <div>
        <h1 v-if="$vuetify.breakpoint.lgAndUp">Laptop</h1>
        <h1 v-if="$vuetify.breakpoint.mdOnly">Tablet vertical o horizontal</h1>
        <h1 v-if="$vuetify.breakpoint.xsOnly">Celular</h1>
        <v-container fluid>
            <DashboardViewComponent />
        </v-container>
    </div>
</template>
