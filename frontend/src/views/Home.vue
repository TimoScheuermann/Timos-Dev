<template>
  <div class="view-home" content>
    <vm-grid width="220px">
      <DevProjectCard
        subtitle="Manage Components"
        title="Vuement"
        :background="$vuementBanner"
        :to="{ name: 'vuement' }"
      />
      <DevProjectCard
        :dark="false"
        subtitle="Manage news"
        title="Timo's Newsroom"
        :background="$newsroomBanner"
        :to="{ name: 'newsroom' }"
      />
      <DevProjectCard
        :dark="true"
        subtitle="Manage Icons"
        title="Timo's Icons"
        :background="$iconsBanner"
        :to="{ name: 'icons' }"
      />
      <DevProjectCard
        :dark="true"
        subtitle="Manage translations"
        title="Timo's Translator"
        :background="$translatorBanner"
        :to="{ name: 'translator' }"
      />
      <DevProjectCard
        subtitle="Manage files"
        title="Drive"
        background="https://images.unsplash.com/photo-1562414962-a6b4f966070d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=20"
        :to="{ name: 'drive' }"
      />
      <DevProjectCard
        :dark="true"
        :darkbg="true"
        subtitle="Have Fun"
        title="Playground"
        background="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=20"
        :to="{ name: 'playground' }"
      />
    </vm-grid>
  </div>
</template>

<script lang="ts">
import DevProjectCard from '@/components/DevProjectCard.vue';
import DevTitle from '@/components/DevTitle.vue';
import { Vue, Component } from 'vue-property-decorator';

@Component({
  components: {
    DevProjectCard,
    DevTitle
  }
})
export default class Home extends Vue {}
</script>
