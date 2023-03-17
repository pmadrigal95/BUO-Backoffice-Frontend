/**
 * Ability CODES ROUTES
 */
const routes = [
    {
        path: '/Ability/Filter',
        name: 'AbilityFilterViewComponent',
        component: 'ability/AbilityFilterViewComponent',
        meta: {
            module: 'PromotionalCodesViewComponent',
        },
    },

    {
        path: '/Ability/Editor/:Id?',
        name: 'AbilityEditorViewComponent',
        component: 'ability/AbilityEditorViewComponent',
        meta: {
            module: 'PromotionalCodesViewComponent',
        },
    },
];

export default routes;
