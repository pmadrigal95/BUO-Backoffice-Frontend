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
        path: '/PromotionalCodes/Editor/:Id?',
        name: 'AbilityEditorViewComponent',
        component: 'promotionalCodes/AbilityEditorViewComponent',
        meta: {
            module: 'PromotionalCodesViewComponent',
        },
    },
];

export default routes;
