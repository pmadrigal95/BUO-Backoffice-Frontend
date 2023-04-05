/**
 * Ability CODES ROUTES
 */
const routes = [
    {
        path: '/Ability/Filter',
        name: 'AbilityFilterViewComponent',
        component: 'ability/AbilityFilterViewComponent',
        meta: {
            module: 'AbilityViewComponent',
        },
    },

    {
        path: '/Ability/Editor/:Id?',
        name: 'AbilityEditorViewComponent',
        component: 'ability/AbilityEditorViewComponent',
        meta: {
            module: 'AbilityViewComponent',
        },
    },
];

export default routes;
