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

        callback: {
            type: Function,
            required: true,
        },
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
                image: 'https://ztdqsurxcyrlabzyhrud.supabase.co/storage/v1/object/public/src/images/Cloudy.svg',
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
                        this.callback();
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
            image="https://ztdqsurxcyrlabzyhrud.supabase.co/storage/v1/object/public/src/images/Cloudy.svg"
        />
        <BaseAdvertisementDesktopViewComponent
            v-else
            :title="componentProps.title"
            styleTitle="BUO-Heading-Small white--text text-shadow"
            :description="componentProps.description"
            styleDescription="BUO-Paragraph-Small white--text text-shadow"
            :icon="componentProps.icon"
            :fnIcon="componentProps.fnIcon"
            image="https://ztdqsurxcyrlabzyhrud.supabase.co/storage/v1/object/public/src/images/Cloudy.svg"
            :nameButton="componentProps.nameButton"
            :fnButton="componentProps.fnButton"
        />
    </section>
</template>
