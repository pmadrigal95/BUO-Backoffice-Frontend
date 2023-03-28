<script>
export default {
    name: 'HeaderViewComponent',

    props: {
        entity: {
            type: Object,
            requiered: true,
        },
    },
};
</script>

<template>
    <v-card flat>
        <v-row justify="start">
            <div class="BUO-Label-XSmall grey600--text">Reporte BUO - PDA</div>
        </v-row>
        <br />
        <v-row dense>
            <img
                v-if="entity.pda && entity.pda.hotcakeSimpleURL"
                height="95"
                width="70"
                :src="entity.pda.hotcakeSimpleURL"
            />
            <div class="px-10">
                <div class="BUO-Heading-XSmall grey700--text">
                    {{ entity.nombreCompleto }}
                </div>
                <div class="pt-2">
                    <v-layout>
                        <div class="pr-3" v-if="entity.pda">
                            <div class="BUO-Label-XSmall grey600--text pb-1">
                                Eres una persona:
                            </div>
                            <v-chip
                                outlined
                                color="grey500"
                                class="BUO-Label-XSmall-SemiBold"
                            >
                                {{ entity.pda.perfilPDAVisual }}
                            </v-chip>
                        </div>
                        <v-divider vertical></v-divider>
                        <div class="pl-3" v-if="entity.pda">
                            <div class="BUO-Label-XSmall grey600--text pb-1">
                                Tu super poder es:
                            </div>
                            <v-chip
                                color="grey500"
                                outlined
                                class="BUO-Label-XSmall-SemiBold"
                            >
                                {{ entity.pda.superpoder }}
                            </v-chip>
                        </div>
                    </v-layout>
                </div>
            </div>
        </v-row>
    </v-card>
</template>
