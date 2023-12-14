/**
 * Type Assesments CODES ROUTES
 */
const routes = [
    {
        path: '/Assessments/Type/Filter',
        name: 'AssessmentTypeFilterViewComponent',
        component: 'assessmentType/AssessmentTypeFilterViewComponent',
        meta: {
            module: 'AssessmentTypeViewComponent',
        },
    },

    {
        path: '/Assessments/Type/Editor/:Id?',
        name: 'AssessmentTypeEditorViewComponent',
        component: 'assessmentType/AssessmentTypeEditorViewComponent',
        meta: {
            module: 'AssessmentTypeViewComponent',
        },
    },
];

export default routes;
