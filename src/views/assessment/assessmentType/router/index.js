/**
 * Type Assesments CODES ROUTES
 */
const routes = [
    {
        path: '/Assessments/Type/Filter',
        name: 'AssessmentTypeFilterViewComponent',
        component:
            'assessment/assessmentType/AssessmentTypeFilterViewComponent',
        meta: {
            module: 'CategoryViewComponent',
        },
    },

    {
        path: '/Assessments/Type/Editor/:Id?',
        name: 'AssessmentTypeEditorViewComponent',
        component:
            'assessment/assessmentType/AssessmentTypeEditorViewComponent',
        meta: {
            module: 'CategoryViewComponent',
        },
    },
];

export default routes;
