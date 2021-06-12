/* eslint-disable */
import App from '@/App.vue';
import router, { getTitle } from '@/router';
import store from '@/store';
import * as TCComponents from 'tccomponents_vue';
import 'tccomponents_vue/lib/tccomponents_vue.css';
import Vue from 'vue';
import { Route } from 'vue-router';
import Vuement from 'vuement';
import './registerServiceWorker';
import { getUserFromJWT, verfiyUser } from './utils/auth';

Vue.use(Vuement, { theme: 'dark' });
Vue.config.productionTip = false;

Vue.prototype.$translatorBanner =
  'https://timos.s3.eu-central-1.amazonaws.com/drive/timos-translator/6c1fb33c-5a9e-4e08-bae6-913d6d6c682c.png';
Vue.prototype.$newsroomBanner =
  'https://timos.s3.eu-central-1.amazonaws.com/drive/newsroom/36d4b0ca-cdb8-40e1-8e90-d57433544d70.png';
Vue.prototype.$iconsBanner =
  'https://timos.s3.eu-central-1.amazonaws.com/drive/newsroom-introductions/db856341-a4bc-4e77-bf8d-158f336131de.jpeg';

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
