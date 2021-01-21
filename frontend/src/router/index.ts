import Vue from 'vue';
import VueRouter, { Route } from 'vue-router';

Vue.use(VueRouter);
const prefix = 'Dev | ';

const router = new VueRouter({
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  mode: 'history',

  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
      meta: {
        title: prefix + 'Home'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      meta: {
        title: prefix + 'Login'
      }
    },
    {
      path: '/projects',
      component: () => import('@/views-interim/Projects-Interim.vue'),
      children: [
        {
          path: '',
          name: 'projects',
          component: () => import('@/views/projects/Projects.vue'),
          meta: {
            title: prefix + 'Projects',
            hero: {
              title: 'Projects'
            }
          }
        },
        {
          path: 'create',
          name: 'create-project',
          component: () => import('@/views/projects/CreateProject.vue'),
          meta: {
            title: prefix + 'Create Projects',
            hero: {
              title: 'Create Project'
            }
          }
        },
        {
          path: ':id',
          name: 'project-details',
          component: () => import('@/views/projects/ProjectDetails.vue'),
          meta: {
            title: prefix + 'Update Projects',
            hero: {
              title: 'Project Detail'
            }
          }
        },
        {
          path: ':id/update',
          name: 'update-project',
          component: () => import('@/views/projects/UpdateProject.vue'),
          meta: {
            title: prefix + 'Update Project',
            hero: {
              title: 'Update Project'
            }
          }
        },
        {
          path: '*',
          redirect: { name: 'projects' }
        }
      ]
    },
    {
      path: '*',
      redirect: { name: 'home' }
    }
  ]
});

export default router;

export function getTitle(route: Route = router.currentRoute): string {
  const name: string = route.meta.title;
  if (!name) prefix;
  return name;
}
