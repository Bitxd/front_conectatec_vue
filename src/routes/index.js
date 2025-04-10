import { createRouter, createWebHistory } from 'vue-router';
import ChatbotPage from '../pages/ChatbotPage.vue';
import UniversidadesPage from '@/pages/UniversidadesPage.vue';
import ForoPage from '@/pages/ForoPage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/components/BienvenidaComponent.vue')
  },
  {
    path: '/chatbot',
    name: 'Chatbot',
    component: ChatbotPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/universidades',
    name: 'Universidades',
    component: UniversidadesPage
  },
  {
    path: '/universidades/:id',
    name: 'DetallesUniversidad',
    component: () => import('@/pages/DetallesUniversidad.vue')
  },
  {
    path: '/:id/foro',
    name: 'Foro',
    component: ForoPage,
    props: true, 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('token');
    
    if (!token) {
      window.dispatchEvent(new CustomEvent('show-auth-warning', {
        detail: {
          message: 'Debes iniciar sesión para acceder a esta función'
        }
      }));
      return next(false);
    }
  }
  next();
});

export default router;
