/**
 * HOME ROUTES
 */
const routes = [
    {
        path: '/PromotionalCodes/Filter',
        name: 'PromotionalCodesFilterViewComponent',
        component: 'promotionalCodes/PromotionalCodesFilterViewComponent',
        meta: {
            module: 'PromotionalCodesViewComponent',
        },
    },

    {
        path: '/PromotionalCodes/Editor/:Id?',
        name: 'PromotionalCodesEditorViewComponent',
        component: 'promotionalCodes/PromotionalCodesEditorViewComponent',
        meta: {
            module: 'PromotionalCodesViewComponent',
        },
    },
];

export default routes;
