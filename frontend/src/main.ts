/* eslint-disable */
import App from '@/App.vue';
import router, { getTitle } from '@/router';
import store from '@/store';
import * as TCComponents from 'tccomponents_vue';
import 'tccomponents_vue/lib/tccomponents_vue.css';
import Vue from 'vue';
import { Route } from 'vue-router';
import './registerServiceWorker';
import { getUserFromJWT, verfiyUser } from './utils/auth';

Vue.config.productionTip = false;

for (const component in TCComponents) {
  Vue.component(component, TCComponents[component]);
}

const getDepth = (route: Route): number => {
  let path = route.fullPath;
  if (path.endsWith('/')) path = path.slice(0, -1);
  return path.split('/').length;
};

router.beforeEach(async (to: Route, from: Route, next: Function) => {
  const toDepth = getDepth(to);
  const fromDepth = getDepth(from);
  const toPath = to.fullPath.split('/').slice(0, 2);
  const fromPath = from.fullPath.split('/').slice(0, 2);

  if (fromPath.join('/') !== toPath.join('/')) {
    store.commit('routeTransition', 'slide-bottom');
  } else {
    store.commit(
      'routeTransition',
      toDepth < fromDepth ? 'slide-right' : 'slide-left'
    );
  }

  if (!store.getters.valid && (await verfiyUser())) {
    store.commit('signIn', getUserFromJWT());
  }

  if (to.name !== 'login' && !store.getters.valid) {
    await next({ name: 'login' });
  }

  if (to.name === 'login' && store.getters.valid) {
    await next({ name: 'home' });
  }

  const title = getTitle(to);
  document.title = title;

  const gt = document.querySelector('meta[name="title"]');
  if (gt) gt.setAttribute('content', title);

  const twitter = document.querySelector('meta[property="twitter:title"]');
  if (twitter) twitter.setAttribute('content', title);

  const og = document.querySelector('meta[property="og:title"]');
  if (og) og.setAttribute('content', title);

  next();
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
