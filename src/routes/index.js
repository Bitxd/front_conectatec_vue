import { createRouter, createWebHistory } from 'vue-router';
import ChatbotPage from '../pages/ChatbotPage.vue';
import UniversidadesPage from '@/pages/UniversidadesPage.vue';
import ForoPage from '@/pages/ForoPage.vue';
import PublicacionPage from '@/pages/PublicacionPage.vue';
import CalendarioPage from '@/pages/CalendarioPage.vue';
import ConfiguracionPage from '@/pages/ConfiguracionPage.vue';
import MapaVirtualPage from '@/pages/MapaVirtualPage.vue';
import CarrerasPage from '@/pages/CarrerasPage.vue';
import CoordinadoresPage from '@/pages/CoordinadoresPage.vue';
import ProfesoresPage from '@/pages/ProfesoresPage.vue';
import MateriasPage from '@/pages/MateriasPage.vue';
import PerfilPage from '@/pages/PerfilPage.vue';

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
  {
    path: '/publicacion/:id',
    name: 'Publicacion',
    component: PublicacionPage,
  },
  {
    path: '/universidad/:id/calendario',
    name: 'Calendario',
    component: CalendarioPage
  },
  {
    path: '/perfil/configuracion',
    name: 'Configuracion',
    component: ConfiguracionPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/:id/mapa',
    name: 'Mapa',
    component: MapaVirtualPage
  },
  {
    path: '/:id/carreras',
    name: 'Carreras',
    component: CarrerasPage
  },
  {
    path: '/:id/coordinadores',
    name: 'Coordinadores',
    component: CoordinadoresPage
  },
  {
    path: '/:id/profesores',
    name: 'Profesores',
    component: ProfesoresPage
  },
  {
    path: '/:id/materias',
    name: 'Materias',
    component: MateriasPage
  },
  {
    path: '/perfil',
    name: 'Perfil',
    component: PerfilPage
  }



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
