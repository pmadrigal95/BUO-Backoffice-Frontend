/**
 * DepartureUsers ROUTES
 */
import departureReasonTypeRoutes from '@/views/departureUsers/departureReasonType/router';

import departureUsersRoutes from '@/views/departureUsers/departureUsers/router';

const routes = [...departureUsersRoutes, ...departureReasonTypeRoutes];

export default routes;
