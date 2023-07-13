/**
 * Type Assesments CODES ROUTES
 */
const routes = [
    {
        path: '/Assessments/Filter',
        name: 'AssessmentFilterViewComponent',
        component: 'assessment/assessment/AssessmentFilterViewComponent',
        meta: {
            module: 'CategoryViewComponent',
        },
    },

    {
        path: '/Assessments/Editor/:Id?',
        name: 'AssessmentEditorViewComponent',
        component: 'assessment/assessment/AssessmentEditorViewComponent',
        meta: {
            module: 'CategoryViewComponent',
        },
    },
];

export default routes;
