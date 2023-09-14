/**
 * Reports ROUTES
 */
import buoPdaRoutes from '@/views/reports/buo-pda/router/index';

import assessmentRoutes from '@/views/reports/assessment/router/index';

const routes = [...buoPdaRoutes, ...assessmentRoutes];

export default routes;
