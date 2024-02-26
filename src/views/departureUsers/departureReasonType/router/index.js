/**
 * Departure Reason Type  CODES ROUTES
 */
const routes = [
    {
        path: '/DepartureUsers/Type/Filter',
        name: 'DepartureReasonTypeFilterViewComponent',
        component:
            'departureUsers/departureReasonType/DepartureReasonTypeFilterViewComponent',
        meta: {
            module: 'DepartureReasonTypeViewComponent',
        },
    },

    {
        path: '/DepartureUsers/Type/Editor/:Id?',
        name: 'DepartureReasonTypeEditorViewComponent',
        component:
            'departureUsers/departureReasonType/DepartureReasonTypeEditorViewComponent',
        meta: {
            module: 'DepartureReasonTypeViewComponent',
        },
    },
];

export default routes;
