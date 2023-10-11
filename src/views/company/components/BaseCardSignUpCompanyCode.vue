<script>
/**
 * Descripción: Pantalla BaseCardSignUpCompanyCode
 *
 * @displayName BaseCardSignUpCompanyCode
 *
 */

import httpService from '@/services/axios/httpService';

import sharingLinks from '@/services/sharing/sharingLinks';

import baseSecurityHelper from '@/helpers/baseSecurityHelper';

const BaseSocialLinkSharing = () =>
    import('@/components/core/sharing/BaseSocialLinkSharing');

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
        BaseSocialLinkSharing,
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
                image: 'https://buo-resources.s3.us-east-2.amazonaws.com/compartidos/Cloudy.svg',
            };
        },

        write() {
            const result = baseSecurityHelper.$_ReadPermission(
                'CompanyViewComponent',
                baseSecurityHelper.$_write
            );
            return result;
        },

        actions() {
            return [
                {
                    name: 'Compartir código',
                    style: 'BUO-Paragraph-Small-SemiBold ma-2 no-uppercase rounded-lg',
                    color: 'blue900',
                    fn: this.$_sharedCode,
                    disabled: false,
                },
                {
                    name: 'Nuevo código',
                    style: 'BUO-Paragraph-Small-SemiBold ma-2 no-uppercase rounded-lg',
                    color: 'blue900',
                    fn: this.$_replaceSignUpCode,
                    disabled: !this.write,
                },
            ];
        },

        sharing() {
            return {
                url: `${window.location.origin}/wallet/#/SignUp/${this.code}`,
                title: 'Código de registro',
                copy: this.copyURL,
                socialNetworks: ['email', 'whatsapp'],
            };
        },
    },

    methods: {
        $_sharedCode() {
            sharingLinks.$_share(
                `${window.location.origin}/wallet/#/SignUp/${this.code}`,
                'Código de registro',
                this.$refs.baseSocialLinkSharing.$_open,
                false
            );
        },

        copyURL() {
            sharingLinks.$_copyLink(
                `${window.location.origin}/wallet/#/SignUp/${this.code}`
            );
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
        <BaseSocialLinkSharing ref="baseSocialLinkSharing" :sharing="sharing" />
        <BaseAdvertisementMobileViewComponent
            v-if="$vuetify.breakpoint.mobile"
            :title="componentProps.title"
            styleTitle="BUO-Heading-Small white--text text-shadow text-center"
            :description="componentProps.description"
            styleDescription="BUO-Paragraph-Small white--text text-shadow text-center"
            :icon="componentProps.icon"
            :fnIcon="componentProps.fnIcon"
            image="https://buo-resources.s3.us-east-2.amazonaws.com/compartidos/Cloudy.svg"
            :actions="actions"
        />
        <BaseAdvertisementDesktopViewComponent
            v-else
            :title="componentProps.title"
            styleTitle="BUO-Heading-Small white--text text-shadow"
            :description="componentProps.description"
            styleDescription="BUO-Paragraph-Small white--text text-shadow"
            :icon="componentProps.icon"
            :fnIcon="componentProps.fnIcon"
            image="https://buo-resources.s3.us-east-2.amazonaws.com/compartidos/Cloudy.svg"
            :actions="actions"
        />
    </section>
</template>
