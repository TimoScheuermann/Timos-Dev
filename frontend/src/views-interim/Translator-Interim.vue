<template>
  <div class="interim-translator">
    <tc-hero :dark="$store.getters.darkmode" :hasFixedHeader="false">
      <img :src="$translatorBanner" slot="background" alt="" />
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
export default class InterimTranslator extends Vue {}
</script>
