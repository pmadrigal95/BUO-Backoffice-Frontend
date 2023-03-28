/**
 * microAbility CODES ROUTES
 */
const routes = [
    {
        path: '/MicroAbility/Filter',
        name: 'MicroAbilityFilterViewComponent',
        component: 'microAbility/MicroAbilityFilterViewComponent',
        meta: {
            module: 'PromotionalCodesViewComponent',
        },
    },

    {
        path: '/MicroAbility/Editor/:Id?',
        name: 'MicroAbilityEditorViewComponent',
        component: 'microAbility/MicroAbilityEditorViewComponent',
        meta: {
            module: 'PromotionalCodesViewComponent',
        },
    },
];

export default routes;
