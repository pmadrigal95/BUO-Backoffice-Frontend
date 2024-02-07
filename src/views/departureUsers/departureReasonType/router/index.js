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
            module: 'AssessmentTypeViewComponent',
        },
    },

    {
        path: '/DepartureUsers/Type/Editor/:Id?',
        name: 'DepartureReasonTypeEditorViewComponent',
        component:
            'departureUsers/departureReasonType/DepartureReasonTypeEditorViewComponent',
        meta: {
            module: 'AssessmentTypeViewComponent',
        },
    },
];

export default routes;
