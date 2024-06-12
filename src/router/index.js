import { createRouter, createWebHistory } from 'vue-router'

import LoginPage from '@/pages/LoginPage.vue'
import RegisterPage from '@/pages/RegistroPage.vue'
import SelectionTeamPage from '@/pages/SelectionTeamPage.vue'
import CreateTeamPage from "@/pages/CreateTeamPage.vue";
import CreateMasterKeyPage from "@/pages/CreateMasterKeyPage.vue";
import DownloadPage from "@/pages/DownloadPage.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/iniciar-sesion' },
    {
      path: '/iniciar-sesion',
      name: 'iniciar-sesion',
      component: LoginPage
    },
    {
      path: '/registro',
      name: 'registro',
      component: RegisterPage
    },
    {
      path: '/seleccionar-equipo',
      name: 'seleccionar-equipo',
      component: SelectionTeamPage
    },
    {
      path: '/crear-equipo',
      name: 'crear-equipo',
      component: CreateTeamPage
    },
    {
      path: '/team/:teamNumber/:teamName',
      name: 'team',
      component: CreateMasterKeyPage,
      props: true
    },
    {
      path: '/descargar',
      name: 'descargar',
      component: DownloadPage
    },
  ]
})

export default router
