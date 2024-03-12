<script>
/**
 * Descripción: Pantalla  Template
 *
 * @displayName BaseTemplateViewComponent
 *
 */

const BaseHeaderViewComponent = () =>
    import(
        '@/views/dashboard/components/shared/header/BaseHeaderViewComponent'
    );

const BaseContainerTemplateViewComponent = () =>
    import(
        '@/views/dashboard/components/shared/template/BaseContainerTemplateViewComponent'
    );

export default {
    name: 'BaseTemplateViewComponent',

    props: {
        title: {
            type: String,
            default: undefined,
        },

        type: {
            type: String,
            requiered: true,
        },
    },

    components: {
        BaseHeaderViewComponent,
        BaseContainerTemplateViewComponent,
    },
};
</script>

<template>
    <section class="mx-4">
        <BaseHeaderViewComponent :title="title" :type="type">
            <section slot="btns">
                <slot name="custom-btns" />
            </section>
        </BaseHeaderViewComponent>

        <BaseContainerTemplateViewComponent :type="type">
            <section slot="container">
                <slot name="body" />
            </section>
        </BaseContainerTemplateViewComponent>
    </section>
</template>
