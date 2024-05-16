<script>
/**
 * Descripción: Pantalla  Sandbox 1
 *
 */

import { mapGetters } from 'vuex';

import {
    baseFilterSettingsHelper,
    baseDataTableColumnsHelper,
} from '@/helpers/baseFilterSettingsHelper';

const BaseSelectModalServerDataTable = () =>
    import(
        '@/views/recruitment/components/grid/BaseSelectModalServerDataTable'
    );

export default {
    name: 'sandbox',

    components: {
        BaseSelectModalServerDataTable,
    },

    data() {
        return {
            arr: [],
            arr2: [],
        };
    },

    computed: {
        ...mapGetters('authentication', ['user', 'buoId']),

        ...mapGetters('filters', ['filtersBypageView', 'pageViewById']),

        pageView() {
            return this.pageViewById('DepartureReasonTypeFilter');
        },

        extraParams() {
            return this.user.companyId != this.buoId
                ? baseFilterSettingsHelper.$_setExtraParams({
                      companyId: this.user.companyId,
                  })
                : undefined;
        },

        setting() {
            return baseFilterSettingsHelper.$_setDepartureReasonTypeSetting({
                companyId: this.user.companyId,
                list: this.filtersBypageView(this.pageView),
                pageView: this.pageView,
                // singleSelect: true,
            });
        },
    },

    methods: {
        open1() {
            this.$refs['open1'].$_openModal();
        },

        open2() {
            this.$refs['open2'].$_openModal();
        },

        $_setFilter() {
            baseDataTableColumnsHelper.$_setDepartureReasonTypeColumns({
                pageView: this.pageView,
                companyId: this.user.companyId,
            });
            this.key++;
        },
    },
};
</script>

<template>
    <div>
        <v-row>
            <v-col cols="12">
                <BaseSelectModalServerDataTable
                    :pageView="pageView"
                    :setting="setting"
                    :extraParams="extraParams"
                    :fnResetConfig="$_setFilter"
                    itemText="nombre"
                    itemDesc="nombreOrganizacion"
                    v-model="arr"
                />
            </v-col>

            <v-col cols="12">
                <BaseSelectModalServerDataTable
                    :pageView="pageView"
                    :setting="setting"
                    :extraParams="extraParams"
                    :fnResetConfig="$_setFilter"
                    itemText="nombre"
                    v-model="arr2"
                    label="Agregar requerimiento"
                    :requiresPercentage="true"
                />
            </v-col>
        </v-row>
    </div>
</template>
