/**
 * Reports ROUTES
 */
import buoPdaRoutes from '@/views/reports/buo-pda/router/index';

import assessmentRoutes from '@/views/reports/assessment/router/index';

import demographicsRoutes from '@/views/reports/demographics/router/index';

const routes = [...buoPdaRoutes, ...assessmentRoutes, ...demographicsRoutes];

export default routes;
