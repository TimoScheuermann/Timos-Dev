<template>
  <div class="dev">
    <DevRouterView />

    <template v-if="$store.getters.valid">
      <tc-tabbar :dark="$store.getters.darkmode" :key="$route.name">
        <tc-tabbar-item
          tfcolor="error"
          routeName="home"
          icon="house"
          title="Home"
        />
        <tc-tabbar-item
          tfcolor="error"
          routeName="projects"
          icon="book-p-filled"
          title="Projekte"
        />
        <tc-tabbar-item tfcolor="error" icon="chart-bar" title="Statistik" />
      </tc-tabbar>
    </template>
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
html {
  background: $background;
  color: $color;
  @media #{$isDark} {
    background: $background_dark;
    color: $color_dark;
  }
}
body {
  min-height: 100vh;
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
  color: $error;
}

[huge] {
  font-size: 40px;
}

[content] {
  padding: 20px 5vw calc(20px + env(safe-area-inset-bottom));
  @media #{$isMobile} {
    padding-bottom: calc(70px + env(safe-area-inset-bottom));
  }
}

[line-break] {
  white-space: pre-line;
}
</style>
