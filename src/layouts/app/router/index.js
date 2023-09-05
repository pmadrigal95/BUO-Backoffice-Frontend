/**
 * Views Routers
 */

import b2bRoutes from '@/views/b2b/router';

import homeRoutes from '@/views/home/router';

import userRoutes from '@/views/user/router';

import abilityRoutes from '@/views/ability/router';

import companyRoutes from '@/views/company/router';

import reportsRoutes from '@/views/reports/router';

import categoryRoutes from '@/views/category/router';

import approvalRoutes from '@/views/approval/router';

import analyticsRoutes from '@/views/analytics/router';

import assessmentRoutes from '@/views/assessment/router';

import departmentRoutes from '@/views/department/router';

import microAbilityRoutes from '@/views/microAbility/router';

import setIndicatorRoutes from '@/views/setIndicator/router';

import promotionalCodesRoutes from '@/views/promotionalCodes/router';

const routes = [
    {
        path: '/',
        redirect: '/Authentication',
        name: 'TheMain',
        component: 'app',
        children: [
            ...b2bRoutes,
            ...homeRoutes,
            ...userRoutes,
            ...abilityRoutes,
            ...reportsRoutes,
            ...categoryRoutes,
            ...approvalRoutes,
            ...companyRoutes,
            ...analyticsRoutes,
            ...assessmentRoutes,
            ...departmentRoutes,
            ...microAbilityRoutes,
            ...setIndicatorRoutes,
            ...promotionalCodesRoutes,
        ],
    },
];

export default routes;
