<script>
/**
 * Descripción: Pantalla Inicio
 *
 * @displayName HomeViewComponent
 */

import { mapGetters } from 'vuex';

import baseSecurityHelper from '@/helpers/baseSecurityHelper';

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

const CardActivitiesViewComponent = () =>
    import('@/views/home/components/CardActivitiesViewComponent');

export default {
    name: 'HomeViewComponent',

    components: {
        BaseCardViewComponent,
        CardActivitiesViewComponent,
    },

    computed: {
        ...mapGetters('security', ['permissionList', 'loadingSecurity']),

        filterList() {
            let originalList = JSON.parse(JSON.stringify(this.permissionList));
            originalList = originalList.filter(
                (x) =>
                    x.acciones.filter(
                        (item) => item === baseSecurityHelper.$_read
                    ) &&
                    x.activo &&
                    x.rutaURL != null &&
                    x.nombre != 'HomeViewComponent'
            );

            originalList.push({
                nombreUI: 'Cerrar sesión',
                icono: 'login-variant',
                rutaURL: 'LoginViewComponent',
            });

            return originalList;
        },

        editorList() {
            let originalList = JSON.parse(JSON.stringify(this.permissionList));

            originalList = originalList
                .filter(
                    (x) =>
                        x.acciones.filter(
                            (item) => item === baseSecurityHelper.$_write
                        ) &&
                        x.activo &&
                        x.rutaURL != null &&
                        x.nombre != 'HomeViewComponent'
                )
                .map((x) => {
                    x.rutaURL = x.rutaURL.replace('Filter', 'Editor');
                    x.nombreUI = `Agregar ${x.nombreUI}`;
                    return x;
                });

            return originalList;
        },
    },
};
</script>

<template>
    <BaseCardViewComponent md="12" offset="0">
        <div slot="card-text">
            <h2 class="BUO-Heading-Small Buo-Blue700 pl-2">¡Hola!</h2>
            <h2 class="BUO-Heading-Large Buo-Blue900 pb-8 pl-2 pt-2">
                ¿Qué quieres hacer hoy?
            </h2>
            <CardActivitiesViewComponent
                :menuItems="filterList"
                md="4"
                min-width="320"
                max-width="320"
                :large="true"
                :fontTypeSubtitle="'BUO-Paragraph-Medium-SemiBold Buo-Black'"
                iconColor="blue900"
                bottonDisplay="Ver más"
            />
        </div>
    </BaseCardViewComponent>
</template>
