<script>
/**
 * Descripción: Pantalla BaseCardSignUpCompanyCode
 *
 * @displayName BaseCardSignUpCompanyCode
 *
 */

import httpService from '@/services/axios/httpService';

const BaseAdvertisementMobileViewComponent = () =>
    import(
        '@/components/backoffice/covers/advertisement/BaseAdvertisementMobileViewComponent'
    );

const BaseAdvertisementDesktopViewComponent = () =>
    import(
        '@/components/backoffice/covers/advertisement/BaseAdvertisementDesktopViewComponent'
    );

export default {
    name: 'BaseCardSignUpCompanyCode',

    props: {
        code: {
            type: String,
            required: true,
        },

        organizationId: {
            type: Number,
            required: true,
        },
    },

    data() {
        return {
            componentKey: 0,
        };
    },

    components: {
        BaseAdvertisementMobileViewComponent,
        BaseAdvertisementDesktopViewComponent,
    },

    computed: {
        componentProps() {
            return {
                title: 'Tu Código de Acceso',
                styleTitle: 'BUO-Heading-Small white--text text-shadow',
                description: `Usa nuestro este código único ${this.code} para que tus colaboradores se unan a nosotros. Dale clic en compartir y descubre nuestros beneficios.`,
                styleDescription: 'BUO-Paragraph-Small white--text text-shadow',
                icon: 'share',
                fnIcon: this.$_sharedCode,
                image: '@/assets/Cloudy(9).svg',
                nameButton: 'Crear nuevo código',
                fnButton: this.$_replaceSignUpCode,
            };
        },
    },

    methods: {
        $_sharedCode() {
            alert('hola');
        },

        $_replaceSignUpCode() {
            httpService
                .post('organizacion/replaceSignUpCode', {
                    organizacionId: this.organizationId,
                })
                .then((response) => {
                    if (response != undefined) {
                        this.componentKey++;
                    }
                });
        },
    },
};
</script>

<template>
    <section>
        <BaseAdvertisementMobileViewComponent
            v-if="$vuetify.breakpoint.mobile"
            :fnButton="$_sharedCode"
            :title="componentProps.title"
            styleTitle="BUO-Heading-Small white--text text-shadow text-center"
            :description="componentProps.description"
            styleDescription="BUO-Paragraph-Small white--text text-shadow text-center"
            :icon="componentProps.icon"
            :fnIcon="componentProps.fnIcon"
            :image="require('@/assets/Cloudy(9).svg')"
        />
        <BaseAdvertisementDesktopViewComponent
            v-else
            :title="componentProps.title"
            styleTitle="BUO-Heading-Small white--text text-shadow"
            :description="componentProps.description"
            styleDescription="BUO-Paragraph-Small white--text text-shadow"
            :icon="componentProps.icon"
            :fnIcon="componentProps.fnIcon"
            :image="require('@/assets/Cloudy(9).svg')"
            :nameButton="componentProps.nameButton"
            :fnButton="componentProps.fnButton"
            key="componentKey"
        />
    </section>
</template>
