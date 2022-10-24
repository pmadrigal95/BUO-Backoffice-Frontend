import authGuard from '@/router/authGuard';

const router = authGuard.$_instance();

router.beforeEach((to, from, next) => {
    authGuard.$_authGuard(to, from, next);
});

export default router;
