<script>
/**
 * Descripción: Pantalla Busqueda de talento
 *
 * @displayName CardViewComponent
 *
 */

export default {
    name: 'CardViewComponent',

    props: {
        entity: {
            type: Object,
            requiered: true,
        },
    },
};
</script>

<template>
    <div>
        <v-row justify="start" class="pl-3">
            <v-col cols="12" md="8">
                <div class="BUO-Heading-Small blue900--text">
                    Encontramos a las personas que andas buscando
                </div>
            </v-col>
        </v-row>
        <p class="pl-3">Aca van los cards!</p>
    </div>
</template>
