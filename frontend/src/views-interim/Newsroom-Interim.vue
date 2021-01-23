<template>
  <div class="interim-newsroom">
    <tc-hero :dark="$store.getters.darkmode" :hasFixedHeader="false">
      <img :src="$newsroomBanner" slot="background" alt="" />
    </tc-hero>
    <DevRouterView />
  </div>
</template>

<script lang="ts">
import DevRouterView from '@/components/DevRouter.vue';
import { Vue, Component } from 'vue-property-decorator';

@Component({
  components: {
    DevRouterView
  }
})
export default class InterimNewsroom extends Vue {}
</script>
