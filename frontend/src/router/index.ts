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
      path: '/drive',
      component: () => import('@/views-interim/Drive-Interim.vue'),
      children: [
        {
          path: '',
          name: 'drive',
          component: () => import('@/views/drive/Drive.vue'),
          meta: {
            title: prefix + 'Drive'
          }
        },
        {
          path: ':item',
          name: 'drive-item',
          component: () => import('@/views/drive/DriveItem.vue'),
          meta: {
            title: prefix + 'Drive Item'
          }
        }
      ]
    },

    {
      path: '/playground',
      name: 'playground',
      component: () => import('@/views/playground/Playground.vue'),
      meta: {
        title: prefix + 'Playground'
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
          path: ':id/sections',
          name: 'edit-portfolio-sections',
          component: () => import('@/views/projects/EditPortfolioSections.vue'),
          meta: {
            title: prefix + 'Update Sections',
            hero: {
              title: 'Update Sections'
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
      path: '/translator',
      component: () => import('@/views-interim/Translator-Interim.vue'),
      children: [
        {
          path: '',
          name: 'translator',
          component: () => import('@/views/translator/Translator.vue'),
          meta: {
            title: prefix + "Timo's Translator"
          }
        },
        {
          path: 'word/create',
          name: 'create-word',
          component: () => import('@/views/translator/CreateWord.vue'),
          meta: {
            title: prefix + 'Create Word'
          }
        },
        {
          path: 'word/:id',
          name: 'edit-word',
          component: () => import('@/views/translator/EditWord.vue'),
          meta: {
            title: prefix + 'Edit Word'
          }
        },
        {
          path: '*',
          redirect: { name: 'translator' }
        }
      ]
    },
    {
      path: '/newsroom',
      component: () => import('@/views-interim/Newsroom-Interim.vue'),
      children: [
        {
          path: '',
          name: 'newsroom',
          component: () => import('@/views/newsroom/Newsroom.vue'),
          meta: {
            title: prefix + "Timo's Newsroom"
          }
        },
        {
          path: 'news/create',
          name: 'create-news',
          component: () => import('@/views/newsroom/CreateNews.vue'),
          meta: {
            title: prefix + 'Create News'
          }
        },
        {
          path: 'news/generate-icon-thumbnail',
          name: 'generate-icon-thumbnail',
          component: () => import('@/views/newsroom/GenerateIconThumbnail.vue'),
          meta: {
            title: prefix + 'Generate Icon Thumbnail'
          }
        },
        {
          path: 'news/:id',
          name: 'update-news',
          component: () => import('@/views/newsroom/UpdateNews.vue'),
          meta: {
            title: prefix + 'Update News'
          }
        },
        {
          path: '*',
          redirect: { name: 'newsroom' }
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
