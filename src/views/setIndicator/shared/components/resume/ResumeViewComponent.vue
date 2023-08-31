<script>
/**
 * Descripción: Pantalla Busqueda de talento
 *
 * @displayName FilterViewComponent
 *
 */
import { mapGetters } from 'vuex';

const StepViewComponent = () =>
    import('@/views/user/bulkLoad/components/StepViewComponent');

export default {
    name: 'ConfirmationViewComponent',

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
        StepViewComponent,
    },

    data() {
        return {
            panel: [1],
        };
    },

    computed: {
        ...mapGetters('theme', ['app']),
    },

    methods: {
        $_goBack() {
            if (!this.requiredTutors) {
                delete this.entity.selected.abilityIdList;
                delete this.entity.selected.abilityList;
            }

            delete this.entity.selected.tutorList;
            this.entity.step = this.requiredTutors ? 2 : 1;
        },
    },
};
</script>

<template>
    <section v-if="entity.step == 3">
        <v-layout justify-space-between>
            <StepViewComponent
                :icon="`mdi-numeric-${requiredTutors ? '4' : '3'}-circle`"
                :description="`Seleccionar Micro-Indicadores ${
                    requiredTutors ? 'a evaluar' : ''
                }`"
                iconColor="greenC900"
                :font="`BUO-Paragraph-Large-SemiBold ${
                    app ? 'white--text' : 'grey700--text'
                }`"
            />
            <section>
                <v-btn
                    fab
                    x-small
                    color="primary"
                    @click="$_goBack"
                    elevation="0"
                    class="mx-1"
                >
                    <v-icon dark> mdi-chevron-left </v-icon>
                </v-btn>

                <v-btn fab x-small elevation="0" disabled>
                    <v-icon dark> mdi-chevron-right </v-icon>
                </v-btn>
            </section>
        </v-layout>
        <v-expansion-panels multiple flat v-model="panel">
            <v-expansion-panel v-if="entity.selected.userList">
                <v-expansion-panel-header
                    ><section
                        :class="[
                            $vuetify.breakpoint.smAndDown
                                ? 'BUO-Paragraph-Large'
                                : 'BUO-Heading-Small',
                        ]"
                    >
                        Colaboradores
                    </section></v-expansion-panel-header
                >
                <v-expansion-panel-content>
                    <span>Hola</span>
                </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel v-if="entity.selected.abilityIdList">
                <v-expansion-panel-header
                    ><section
                        :class="[
                            $vuetify.breakpoint.smAndDown
                                ? 'BUO-Paragraph-Large'
                                : 'BUO-Heading-Small',
                        ]"
                    >
                        Indicadores
                    </section></v-expansion-panel-header
                >
                <v-expansion-panel-content>
                    <span>Hola</span>
                </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel
                v-if="
                    entity.selected.tutorList &&
                    entity.selected.tutorList.length > 0
                "
            >
                <v-expansion-panel-header
                    ><section
                        :class="[
                            $vuetify.breakpoint.smAndDown
                                ? 'BUO-Paragraph-Large'
                                : 'BUO-Heading-Small',
                        ]"
                    >
                        Supervisores
                    </section></v-expansion-panel-header
                >
                <v-expansion-panel-content>
                    <span>Hola</span>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
        <v-divider class="my-3"></v-divider>
        <span>Hola</span>
    </section>
</template>
