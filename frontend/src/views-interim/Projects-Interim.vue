<template>
  <div class="interim-projects">
    <tc-hero :dark="$store.getters.darkmode" :hasFixedHeader="false">
      <img :src="hero" slot="background" alt="" />
    </tc-hero>
    <DevRouterView />
  </div>
</template>

<script lang="ts">
import DevRouterView from '@/components/DevRouter.vue';
import { Vue, Component, Watch } from 'vue-property-decorator';

const defaultHero =
  'https://images.unsplash.com/photo-1572177812156-58036aae439c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=20';

@Component({
  components: {
    DevRouterView
  }
})
export default class InterimProjects extends Vue {
  public hero = defaultHero;

  mounted() {
    this.$on('hero-bg', (url: string) => {
      console.log('change hero');
      this.hero = url;
    });
  }

  @Watch('$route', { deep: true, immediate: true })
  routeChanged() {
    this.hero = defaultHero;
  }
}
</script>
