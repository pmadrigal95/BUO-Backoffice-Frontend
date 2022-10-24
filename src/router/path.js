/**
 * Descripción: Gestor de Rutas de las vistas
 *
 * @displayName path
 */

import appRoutes from '@/layouts/app/router';
import authenticationRoutes from '@/layouts/authentication/router';

/**
 * Se obtienen rutas de las vistas
 */
const routes = [...appRoutes, ...authenticationRoutes];

routes.forEach(filter);

/**
 * asignar lazyload y rutas hijas
 */
function filter(item) {
    if (item.component != undefined) {
        item.component = lazyLoad(item.component);
    }

    //recursiva
    if (item.children != undefined) {
        item.children.forEach(filter);
    }
}

/**
 * lazy load
 */
function lazyLoad(view) {
    return view == 'app'
        ? () => import('@/layouts/app/Index.vue')
        : () => import(`@/views/${view}.vue`);
}

export default routes;
