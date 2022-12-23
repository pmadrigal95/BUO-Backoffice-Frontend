/**
 * HOME ROUTES
 */
const routes = [
    {
        path: '/PromotionalCodes/Editor/:id?',
        name: 'PromotionalCodesEditorViewComponent',
        component: 'promotionalCodes/PromotionalCodesEditorViewComponent',
        meta: {
            module: 'Códigos Promocionales',
        },
    },
    {
        path: '/PromotionalCodes/Filter',
        name: 'PromotionalCodesFilterViewComponent',
        component: 'promotionalCodes/PromotionalCodesFilterViewComponent',
        meta: {
            module: 'Códigos Promocionales',
        },
    },
];

export default routes;
