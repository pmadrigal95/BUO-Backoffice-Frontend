/**
 * USER ROUTES
 */

import bulkLoad from '@/views/user/bulkLoad/router';
import users from '@/views/user/users/router';

const routes = [...bulkLoad, ...users];

export default routes;
