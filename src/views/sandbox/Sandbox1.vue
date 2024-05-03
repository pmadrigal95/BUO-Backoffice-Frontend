<script>
/**
 * Descripción: Pantalla  Sandbox 1
 *
 */

// const BaseCustomsButtonsGrid = () =>
//     import('@/components/core/grids/BaseCustomsButtonsGrid');

// const BaseBasicCardViewComponent = () =>
//     import(
//         '@/views/dashboard/components/shared/card/BaseBasicCardViewComponent'
//     );

// const BaseHeaderMenu = () => import('@/components/core/drawers/BaseHeaderMenu');

// const ProgressCircularComponent = () =>
//     import(
//         '@/views/dashboard/components/shared/chart/progressCircularChart/ProgressCircularComponent'
//     );

// const BaseStatusHeaderViewComponent = () =>
//     import(
//         '@/views/dashboard/components/shared/header/BaseStatusHeaderViewComponent'
//     );

// const BaseListStatusHeaderViewComponent = () =>
//     import(
//         '@/views/dashboard/components/shared/header/BaseListStatusHeaderViewComponent'
//     );

// const BaseNotFoundCardViewComponent = () =>
//     import(
//         '@/views/dashboard/components/shared/card/BaseNotFoundCardViewComponent'
//     );

// const ActionCardViewComponent = () =>
//     import(
//         '@/views/dashboard/buoDashboard/components/recruitment/card/ActionCardViewComponent'
//     );

// const BaseRowDisplayViewComponent = () =>
//     import(
//         '@/views/dashboard/components/shared/row-display/BaseRowDisplayViewComponent'
//     );

// const OpenVacantViewComponent = () =>
//     import(
//         '@/views/dashboard/buoDashboard/components/recruitment/card/OpenVacantViewComponent'
//     );

const OpenVacantListViewComponent = () =>
    import(
        '@/views/dashboard/buoDashboard/components/recruitment/card/OpenVacantListViewComponent'
    );

const NotFoundCardViewComponent = () =>
    import('@/views/recruitment/components/card/NotFoundCardViewComponent');

const ActionCardViewComponent = () =>
    import('@/views/recruitment/components/card/ActionCardViewComponent');

const CandidateInfoListCardViewComponent = () =>
    import(
        '@/views/recruitment/components/card/CandidateInfoListCardViewComponent'
    );

const HeaderVacantDetailsViewComponent = () =>
    import(
        '@/views/recruitment/components/header/HeaderVacantDetailsViewComponent'
    );

const CoincidenceCardViewComponent = () =>
    import('@/views/recruitment/components/card/CoincidenceCardViewComponent');

const StatusCardViewComponent = () =>
    import('@/views/recruitment/components/card/StatusCardViewComponent');

const CandidateInfoModalViewComponent = () =>
    import(
        '@/views/recruitment/components/modal/CandidateInfoModalViewComponent'
    );

export default {
    name: 'sandbox',

    components: {
        // BaseHeaderMenu,
        // BaseCustomsButtonsGrid,
        // BaseBasicCardViewComponent,
        // ProgressCircularComponent,
        // BaseStatusHeaderViewComponent,
        // BaseListStatusHeaderViewComponent,
        // BaseNotFoundCardViewComponent,
        // ActionCardViewComponent,
        // BaseRowDisplayViewComponent,
        // OpenVacantViewComponent,
        OpenVacantListViewComponent,
        NotFoundCardViewComponent,
        ActionCardViewComponent,
        CandidateInfoListCardViewComponent,
        HeaderVacantDetailsViewComponent,
        CoincidenceCardViewComponent,
        StatusCardViewComponent,
        CandidateInfoModalViewComponent,
    },

    computed: {
        list() {
            return [
                { title: 'Título Universitario', type: 'Success' },
                { title: 'Título Universitario', type: 'Success' },
                { title: 'Título Universitario', type: 'Error' },
            ];
        },

        chartData() {
            return [
                {
                    name: 'Laura Vargas',
                    email: 'l.vargas@gmail.com',
                    value: 50,
                },
                {
                    name: 'Laura Vargas',
                    email: 'l.vargas@gmail.com',
                    value: 80,
                },
                {
                    name: 'Laura Vargas',
                    email: 'l.vargas@gmail.com',
                    value: 100,
                },
                {
                    name: 'Laura Vargas',
                    email: 'l.vargas@gmail.com',
                    value: 10,
                },
            ];
        },

        cardList() {
            return [
                {
                    title: 'Agente de Servicio al cliente',
                    maxNumber: 1000,
                    list: [
                        {
                            name: 'Seleccionados',
                            value: 300,
                            isPercentage: false,
                            isChart: true,
                        },
                        {
                            name: 'Coincidencia',
                            value: 86,
                            isPercentage: true,
                            isChart: true,
                        },
                        {
                            name: 'Candidatos',
                            value: 2400,
                            isPercentage: false,
                            isChart: false,
                        },
                        {
                            name: 'Posiciones',
                            value: 1000,
                            isPercentage: false,
                            isChart: false,
                        },
                        {
                            name: 'Días abierto',
                            value: null,
                            isPercentage: false,
                            isChart: false,
                        },
                    ],
                },
                {
                    title: 'Agente de Servicio al cliente',
                    maxNumber: 1000,
                    list: [
                        {
                            name: 'Seleccionados',
                            value: 300,
                            isPercentage: false,
                            isChart: true,
                        },
                        {
                            name: 'Coincidencia',
                            value: 86,
                            isPercentage: true,
                            isChart: true,
                        },
                        {
                            name: 'Candidatos',
                            value: 2400,
                            isPercentage: false,
                            isChart: false,
                        },
                        {
                            name: 'Posiciones',
                            value: 1000,
                            isPercentage: false,
                            isChart: false,
                        },
                        {
                            name: 'Días abierto',
                            value: null,
                            isPercentage: false,
                            isChart: false,
                        },
                    ],
                },
                {
                    title: 'Agente de Servicio al cliente',
                    maxNumber: 1000,
                    list: [
                        {
                            name: 'Seleccionados',
                            value: 300,
                            isPercentage: false,
                            isChart: true,
                        },
                        {
                            name: 'Coincidencia',
                            value: 86,
                            isPercentage: true,
                            isChart: true,
                        },
                        {
                            name: 'Candidatos',
                            value: 2400,
                            isPercentage: false,
                            isChart: false,
                        },
                        {
                            name: 'Posiciones',
                            value: 1000,
                            isPercentage: false,
                            isChart: false,
                        },
                        {
                            name: 'Días abierto',
                            value: null,
                            isPercentage: false,
                            isChart: false,
                        },
                    ],
                },
                {
                    title: 'Agente de Servicio al cliente',
                    maxNumber: 1000,
                    list: [
                        {
                            name: 'Seleccionados',
                            value: 300,
                            isPercentage: false,
                            isChart: true,
                        },
                        {
                            name: 'Coincidencia',
                            value: 86,
                            isPercentage: true,
                            isChart: true,
                        },
                        {
                            name: 'Candidatos',
                            value: 2400,
                            isPercentage: false,
                            isChart: false,
                        },
                        {
                            name: 'Posiciones',
                            value: 1000,
                            isPercentage: false,
                            isChart: false,
                        },
                        {
                            name: 'Días abierto',
                            value: null,
                            isPercentage: false,
                            isChart: false,
                        },
                    ],
                },
                {
                    title: 'Agente de Servicio al cliente',
                    maxNumber: 1000,
                    list: [
                        {
                            name: '30% Finalizado',
                            value: 300,
                            isPercentage: false,
                            isChart: true,
                        },
                        {
                            name: 'Cierre',
                            value: 86,
                            isPercentage: true,
                            isChart: true,
                        },
                    ],
                },
            ];
        },

        headerEntity() {
            return {
                status: 2,
                openDate: '21/05/2024',
                endDate: 'ilimitado',
                missingDates: null,
                coincidence: 90,
            };
        },

        coincidenceList() {
            return [
                {
                    title: 'total',
                    value: 90,
                },
                {
                    title: 'Educación',
                    value: 55,
                },
                {
                    title: 'Exp. Laboral',
                    value: 10,
                },
            ];
        },

        statusList1() {
            return [
                {
                    title: 'Título Universitario',
                    type: 'Success',
                    value: null,
                },
                {
                    title: 'Certificación ISO 9001',
                    type: 'Success',
                    value: null,
                },
                {
                    title: 'Certificación de Manejo de Dataview Software, nivel 4',
                    type: 'Success',
                    value: null,
                },
                {
                    title: 'CCNA Routing & Switching',
                    type: 'Error',
                    value: null,
                },
            ];
        },

        statusList2() {
            return [
                {
                    title: '3 Exp Laborales',
                    type: 'Success',
                    value: null,
                },
            ];
        },

        statusList3() {
            return [
                {
                    title: 'Personalidad: Tenaz',
                    type: 'Success',
                    value: null,
                },
                {
                    title: 'Orientado a servicios',
                    type: 'Success',
                    value: 34,
                },
                {
                    title: 'Riesgo',
                    type: 'Error',
                    value: 34,
                },
                {
                    title: 'Extroversión',
                    type: 'Success',
                    value: 34,
                },
                {
                    title: 'Paciencia',
                    type: 'Success',
                    value: 34,
                },
                {
                    title: 'Normas',
                    type: 'Success',
                    value: 34,
                },
                {
                    title: 'Autocontrol',
                    type: 'Success',
                    value: 34,
                },
            ];
        },

        modal1() {
            return [
                {
                    id: 1,
                    name: 'Laura Vargas',
                    email: 'l.vargas@gmail.com',
                    coincidence: this.coincidenceList,
                    education: this.statusList1,
                    workExp: this.statusList2,
                    psychometric: this.statusList3,
                },
            ];
        },

        modal2() {
            return [
                {
                    id: 1,
                    name: 'Laura Vargas',
                    email: 'l.vargas@gmail.com',
                    coincidence: this.coincidenceList,
                    education: this.statusList1,
                    workExp: this.statusList2,
                    psychometric: this.statusList3,
                },
                {
                    id: 2,
                    name: 'Alfonso Velazques',
                    email: 'ave234@hotmail.com',
                    coincidence: this.coincidenceList,
                    education: this.statusList1,
                    workExp: this.statusList2,
                    psychometric: this.statusList3,
                },
            ];
        },
    },

    methods: {
        open1() {
            this.$refs['open1'].$_openModal();
        },

        open2() {
            this.$refs['open2'].$_openModal();
        },
    },
};
</script>

<template>
    <div>
        <v-row>
            <v-col cols="12">
                <HeaderVacantDetailsViewComponent :entity="headerEntity" />
            </v-col>

            <v-col cols="12">
                <OpenVacantListViewComponent :cardList="cardList" />
            </v-col>

            <v-col cols="12">
                <CandidateInfoListCardViewComponent :cardList="chartData" />
            </v-col>

            <v-col cols="12">
                <v-card flat color="transparent" width="500px">
                    <CoincidenceCardViewComponent
                        :chartData="coincidenceList"
                    />
                </v-card>
            </v-col>

            <v-col cols="12">
                <StatusCardViewComponent
                    title="Educación"
                    :chartData="statusList1"
                />
            </v-col>

            <v-col cols="12">
                <StatusCardViewComponent
                    title="Exp. Laboral"
                    :chartData="statusList2"
                />
            </v-col>

            <v-col cols="12">
                <StatusCardViewComponent
                    title="Psicométricos"
                    :chartData="statusList3"
                />
            </v-col>

            <v-col cols="12">
                <CandidateInfoModalViewComponent
                    :chartData="modal1"
                    ref="open1"
                />
                <CandidateInfoModalViewComponent
                    :chartData="modal2"
                    ref="open2"
                />
                <v-layout justify-center justify-space-around>
                    <v-btn depressed @click="open1"> Single </v-btn>
                    <v-btn depressed @click="open2"> Multiple </v-btn>
                </v-layout>
            </v-col>

            <v-col cols="12">
                <NotFoundCardViewComponent />
            </v-col>

            <v-col cols="12">
                <ActionCardViewComponent />
            </v-col>

            <!-- <v-col cols="12">
            <BaseBasicCardViewComponent title="Vacantes abiertas">
                <section slot="top-actions">
                    <BaseCustomsButtonsGrid
                        icon="mdi-plus"
                        :outlined="false"
                        label="Abrir vacantes"
                        :fnMethod="() => {}"
                    />
                </section>
                <section slot="card-text">
                    <span>1</span>
                </section>
            </BaseBasicCardViewComponent>
        </v-col>
        <v-col cols="12">
            <v-layout align-center justify-center class="d-flex flex-column">
                <v-progress-circular
                    :width="10"
                    size="111"
                    :value="82"
                    color="blue-grey"
                >
                    <span class="BUO-Paragraph-Small-SemiBold grey700--text"
                        >82%</span
                    >
                </v-progress-circular>
                <span class="BUO-Label-XSmall-SemiBold grey700--text pt-3"
                    >Coincidencia</span
                >
            </v-layout>
        </v-col>

        <v-col cols="12">
            <v-layout align-center justify-center class="d-flex flex-row">
                <v-progress-circular
                    :width="8"
                    size="40"
                    :value="82"
                    color="blue-grey"
                />
                <section class="ml-4">
                    <div class="BUO-Label-Small-SemiBold grey700--text">
                        Coincidencia
                    </div>
                    <div class="BUO-Label-Small grey700--text">99%</div>
                </section>
            </v-layout>
        </v-col>

        <v-col cols="12">
            <v-list dense color="transparent">
                <v-list-item>
                    <v-list-item-icon class="mr-3">
                        <v-icon color="greenA800"
                            >mdi-checkbox-marked-circle</v-icon
                        >
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title
                            class="BUO-Label-XSmall-SemiBold grey700--text"
                            >Título Universitario</v-list-item-title
                        >
                    </v-list-item-content>
                </v-list-item>

                <v-list-item>
                    <v-list-item-icon class="mr-3">
                        <v-icon color="grey500">mdi-close-circle</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title
                            class="BUO-Label-XSmall-SemiBold grey700--text"
                            >Certificación de Manejo de Dataview Software, nivel
                            4</v-list-item-title
                        >
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-col>

        <v-col cols="12">
            <v-card flat color="grey200" class="rounded-xxl">
                <v-card-text>
                    <v-list-item>
                        <v-list-item-icon class="ma-auto">
                            <BaseSwitch />
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title
                                class="BUO-Paragraph-Medium-SemiBold grey700--text"
                                >Certificación ISO 9001 Solicitará confirmación
                                de la certificación</v-list-item-title
                            >
                        </v-list-item-content>
                        <v-list-item-action>
                            <v-btn icon>
                                <v-icon color="black">mdi-close-circle</v-icon>
                            </v-btn>
                        </v-list-item-action>
                    </v-list-item>
                </v-card-text>
            </v-card>
            <br />
            <v-card flat color="grey200" class="rounded-xxl">
                <v-card-text>
                    <v-list-item two-line>
                        <v-list-item-content>
                            <v-list-item-title
                                class="BUO-Paragraph-Medium-SemiBold grey700--text"
                                >Correo electrónico
                            </v-list-item-title>
                            <v-list-item-subtitle
                                class="BUO-Label-Small grey600--text"
                                >Solicitar el correo electrónico del
                                candidato.</v-list-item-subtitle
                            >
                        </v-list-item-content>
                    </v-list-item>
                </v-card-text>
            </v-card>

            <br />

            <v-card flat class="rounded-xxl">
                <v-card-text>
                    <BaseCustomsButtonsGrid
                        :dark="false"
                        color="redError600"
                        icon="mdi-delete-outline"
                        :outlined="false"
                        label="Cerrar vacante"
                        :fnMethod="() => {}"
                    />
                </v-card-text>
            </v-card>

            <br />

            <v-card flat class="rounded-xxl">
                <v-card-text>
                    <v-card flat color="grey200" class="rounded-xxl">
                        <v-card-text>
                            <h1
                                class="BUO-Paragraph-Small grey700--text text-center"
                            >
                                Una vez que los candidatos completen el proceso
                                los resultados aparecerán aca.
                            </h1>
                        </v-card-text>
                    </v-card>
                </v-card-text>
            </v-card>
        </v-col>

        <v-col cols="12">
            <v-card flat color="grey200" class="rounded-xxl">
                <v-card-text>
                    <v-list-item two-line>
                        <v-list-item-icon class="mx-auto">
                            <BaseSwitch />
                        </v-list-item-icon>
                        <v-list-item-content class="mb-n10">
                            <v-list-item-title
                                class="BUO-Paragraph-Medium-SemiBold grey700--text ml-2"
                            >
                                <v-layout justify-space-between>
                                    <div>Riesgo</div>
                                    <div class="mr-3">60%</div>
                                </v-layout>
                            </v-list-item-title>
                            <v-list-item-subtitle
                                class="BUO-Label-Small grey600--text"
                                ><v-slider
                                    :value="60"
                                    color="primary"
                                    track-color="grey"
                                    always-dirty
                            /></v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-card-text>
            </v-card>
        </v-col>

        <v-col cols="12">
            <section>
                <v-list dense color="transparent">
                    <v-list-item>
                        <v-list-item-icon class="mr-3">
                            <v-icon color="greenA800"
                                >mdi-checkbox-marked-circle</v-icon
                            >
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title
                                class="BUO-Label-XSmall grey700--text"
                                >Título Universitario</v-list-item-title
                            >
                        </v-list-item-content>
                    </v-list-item>
                    <v-layout justify-space-between align-start>
                        <v-slider
                            :value="60"
                            color="primary"
                            track-color="grey"
                            always-dirty
                        />
                        <span class="BUO-Label-XSmall grey700--text pt-2"
                            >34%</span
                        >
                    </v-layout>
                </v-list>
            </section>
        </v-col>

        <v-col cols="12">
            <BaseHeaderMenu
                title="Pablo Madrigal"
                subtitle="pablomadrigal@getbuo.com"
                userAvatar="PM"
            />
        </v-col>
        <v-col cols="12">
            <ProgressCircularComponent
                title="Seleccionados"
                :value="300"
                :maxValue="500"
            />
        </v-col>
        <v-col cols="12">
            <ProgressCircularComponent
                title="Coincidencia"
                :value="93"
                isLandscape
                isPercentage
            />
        </v-col>

        <v-col cols="12">
            <v-list dense color="transparent">
                <BaseStatusHeaderViewComponent title="Coincidencia" />
                <BaseStatusHeaderViewComponent
                    title="Coincidencia 2"
                    type="error"
                />
            </v-list>
        </v-col>

        <v-col cols="12">
            <BaseListStatusHeaderViewComponent :list="list" />
        </v-col>

        <v-col cols="12">
            <BaseNotFoundCardViewComponent
                description="Una vez que los candidatos completen el proceso los resultados aparecerán aca."
            />
        </v-col>

        <v-col cols="12">
            <ActionCardViewComponent
                description="Una vez que los candidatos completen el proceso los resultados aparecerán aca."
            />
        </v-col>
        <v-col cols="12">
            <BaseRowDisplayViewComponent title="Candidatos" />
            <BaseRowDisplayViewComponent title="Candidatos" value="40" />
        </v-col> -->
        </v-row>
    </div>
</template>
