<script>
const BaseServerDataTable = () =>
    import('@/components/core/grids/BaseServerDataTable');

export default {
    name: 'dummy',

    components: {
        BaseServerDataTable,
    },

    computed: {
        setting() {
            return {
                endpoint: 'departamento/findBy',
                columns: [
                    {
                        text: 'Nombre',
                        align: 'start',
                        value: 'nombre',
                        show: true,
                    },
                    {
                        text: 'Empresa',
                        align: 'start',
                        value: 'nombreOrganizacion',
                        type: 'color',
                        //color: 'purple',
                        sortable: false,
                        show: true,
                    },
                    {
                        text: 'Estado',
                        align: 'center',
                        value: 'nombreEstado',
                        type: 'chip',
                        //itemKey: 'estadoId',
                        show: true,
                    },
                ],
                key: 'id',
            };
        },

        setting2() {
            return {
                endpoint: 'departamento/findBy',
                columns: [
                    {
                        text: 'Nombre',
                        align: 'start',
                        value: 'nombre',
                        width: '20%',
                        show: true,
                    },
                    {
                        text: '',
                        align: 'start',
                        value: 'nombreOrganizacion',
                        width: '80%',
                        type: 'color',
                        sortable: false,
                        //color: 'purple',
                        show: true,
                    },
                ],
                key: 'id',
            };
        },

        setting3() {
            return {
                endpoint: 'departamento/findBy',
                columns: [
                    {
                        text: 'Nombre',
                        align: 'start',
                        value: 'nombre',
                        type: 'chip',
                        width: '20%',
                        show: true,
                    },
                    {
                        text: '',
                        align: 'start',
                        value: 'nombreOrganizacion',
                        width: '80%',
                        type: 'percentage',
                        sortable: false,
                        //color: 'purple',
                        show: true,
                    },
                ],
                key: 'id',
            };
        },
    },
};
</script>

<template>
    <div>
        <BaseServerDataTable ref="departmentFilter" :setting="setting" />
        <br />
        <BaseServerDataTable ref="departmentFilter2" :setting="setting2" />
        <br />
        <BaseServerDataTable ref="departmentFilter3" :setting="setting3" />
    </div>
</template>
