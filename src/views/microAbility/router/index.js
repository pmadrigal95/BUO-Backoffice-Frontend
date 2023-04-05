/**
 * microAbility CODES ROUTES
 */
const routes = [
    {
        path: '/MicroAbility/Filter',
        name: 'MicroAbilityFilterViewComponent',
        component: 'microAbility/MicroAbilityFilterViewComponent',
        meta: {
            module: 'MicroAbilityViewComponent',
        },
    },

    {
        path: '/MicroAbility/Editor/:Id?',
        name: 'MicroAbilityEditorViewComponent',
        component: 'microAbility/MicroAbilityEditorViewComponent',
        meta: {
            module: 'MicroAbilityViewComponent',
        },
    },
];

export default routes;
