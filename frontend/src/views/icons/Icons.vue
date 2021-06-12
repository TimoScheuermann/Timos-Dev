<template>
  <div class="view-icons" max-width>
    <div content>
      <tc-list :dark="$store.getters.darkmode">
        <tc-list-item error title="Publish new version" />
      </tc-list>
      <br />
      <tc-list :dark="$store.getters.darkmode" title="Versions">
        <tc-list-item title="2.0" />
      </tc-list>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Icons extends Vue {}
</script>
