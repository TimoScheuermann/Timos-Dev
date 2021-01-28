<template>
  <div class="view-home">
    <tc-hero :hasFixedHeader="false" :dark="$store.getters.darkmode">
      <img src="pwa/maskIcon.svg" alt="" />
      <h1 center>Dev</h1>
    </tc-hero>

    <div content>
      <tl-grid>
        <DevProjectCard
          :dark="false"
          subtitle="Manage news"
          title="Timo's Newsroom"
          :background="$newsroomBanner"
          :to="{ name: 'newsroom' }"
        />
        <DevProjectCard
          :dark="true"
          subtitle="Manage translations"
          title="Timo's Translator"
          :background="$translatorBanner"
          :to="{ name: 'translator' }"
        />
      </tl-grid>
    </div>
  </div>
</template>

<script lang="ts">
import DevProjectCard from '@/components/DevProjectCard.vue';
import { Vue, Component } from 'vue-property-decorator';

@Component({
  components: {
    DevProjectCard
  }
})
export default class Home extends Vue {}
</script>

<style lang="scss" scoped>
.view-home {
  .tc-hero {
    img {
      margin-top: env(safe-area-inset-top);
      max-height: 80px;
    }
  }
}
</style>
