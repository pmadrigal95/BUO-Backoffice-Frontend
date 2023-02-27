<script>
export default {
    name: 'ProfileViewComponent',

    props: {
        entity: {
            type: Object,
            requiered: true,
        },
    },
};
</script>

<template>
    <v-card flat class="pt-6">
        <v-card flat outlined class="rounded-lg">
            <v-card-title class="grey700--text BUO-Paragraph-Large-SemiBold"
                >Descripción del perfil</v-card-title
            >
            <v-card-subtitle class="black--text BUO-Label-Small">{{
                entity.perfilPDAVisual
            }}</v-card-subtitle>
            <v-card-text>
                <v-row dense>
                    <v-col cols="12" md="8">
                        <div class="black--text BUO-Label-Small">
                            {{ entity.descripcion }}
                        </div>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-layout justify-center align-center>
                            <v-img
                                contain
                                max-height="120"
                                v-if="entity.hotcakeSimpleURL"
                                :lazy-src="entity.hotcakeSimpleURL"
                                :src="entity.hotcakeSimpleURL"
                            />
                        </v-layout>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
        <v-row class="pt-6">
            <v-col cols="12" md="6">
                <div class="grey700--text BUO-Paragraph-Large">
                    Características del perfil
                </div>
                <v-list dense flat>
                    <v-list-item
                        class="buo-headerAbility-position"
                        v-for="(item, i) in entity.caracteristicas"
                        :key="i"
                    >
                        <v-list-item-avatar>
                            <v-icon :color="entity.perfilPDA.toLowerCase()"
                                >mdi-check-circle-outline</v-icon
                            >
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title
                                class="BUO-Paragraph-Small buo-word-break buo-white-space Buo-Black"
                                >{{ item }}</v-list-item-title
                            >
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-col>
            <v-col cols="12" md="6">
                <div class="grey700--text BUO-Paragraph-Large">Motivadores</div>
                <v-list dense flat>
                    <v-list-item
                        class="buo-headerAbility-position"
                        v-for="(item, i) in entity.motivadores"
                        :key="i"
                    >
                        <v-list-item-avatar>
                            <v-icon :color="entity.perfilPDA.toLowerCase()"
                                >mdi-check-circle-outline</v-icon
                            >
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title
                                class="BUO-Paragraph-Small buo-word-break buo-white-space Buo-Black"
                                >{{ item }}</v-list-item-title
                            >
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-col>
        </v-row>
    </v-card>
</template>
