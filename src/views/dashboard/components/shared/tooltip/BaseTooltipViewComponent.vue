<script>
/**
 * Descripción: Pantalla  BaseTooltipViewComponent
 *
 * @displayName BaseTooltipViewComponent
 *
 */

const BaseTooltipViewComponent = () =>
    import('@/components/core/tooltip/BaseTooltipViewComponent');

export default {
    name: 'BaseTooltipViewComponent',

    components: {
        BaseTooltipViewComponent,
    },
};
</script>

<template>
    <BaseTooltipViewComponent>
        <div slot="activator">
            <slot name="activator"></slot>
        </div>
        <div slot="title">
            <slot name="title"></slot>
        </div>

        <div slot="text">
            <slot name="text"></slot>
        </div>

        <div slot="actions">
            <slot name="actions"></slot>
        </div>
    </BaseTooltipViewComponent>
</template>
