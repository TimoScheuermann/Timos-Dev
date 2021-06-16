<template>
  <div class="dev">
    <vm-navbar v-if="$store.getters.valid" :title="$route.meta.title">
      <template v-if="$store.getters.isDesktop">
        <vm-navbar-item routeName="home" icon="ti-house" title="Home" />
        <vm-navbar-item
          routeName="projects"
          icon="ti-book-p-filled"
          title="Projects"
        />
        <vm-navbar-item icon="ti-chart-bar" title="Statistics" />
      </template>
    </vm-navbar>

    <DevRouterView />

    <vm-tabbar v-if="$store.getters.valid && !$store.getters.isDesktop">
      <vm-tabbar-item routeName="home" icon="ti-house" title="Home" />
      <vm-tabbar-item
        routeName="projects"
        icon="ti-book-p-filled"
        title="Projects"
      />
      <vm-tabbar-item icon="ti-chart-bar" title="Statistics" />
    </vm-tabbar>

    <vm-notification />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import {
  registerMediaQueries,
  unregisterMediaQueries
} from '@/utils/mediaQueries';
import DevRouterView from './components/DevRouter.vue';

@Component({
  components: {
    DevRouterView
  }
})
export default class App extends Vue {
  mounted() {
    registerMediaQueries();
  }
  beforeDestroy() {
    unregisterMediaQueries();
  }
}
</script>

<style lang="scss">
html {
  font-family: -apple-system, BlinkMacSystemFont, SF Pro Display, Segoe UI,
    Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji,
    Segoe UI Symbol;
  scroll-behavior: smooth;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
}

body {
  margin: 0;
}

h1,
h2 {
  margin: 0;
}

[center] {
  text-align: center;
}

[error] {
  color: rgba(var(--vm-error), 1);
}

[huge] {
  font-size: 40px;
}

[content] {
  padding: calc(70px + env(safe-area-inset-bottom)) 5vw
    calc(20px + env(safe-area-inset-bottom));
  @media #{$isMobile} {
    padding-bottom: calc(70px + env(safe-area-inset-bottom));
  }
  max-width: 800px;
  margin: 0 auto;
}

[line-break] {
  white-space: pre-line;
}

[input-and-button] {
  display: grid;
  grid-template-columns: 1fr auto;
}
</style>
