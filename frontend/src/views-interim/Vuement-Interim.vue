<template>
  <div class="interim-vuement">
    <router-view :components="components" />
  </div>
</template>

<script lang="ts">
import backend from '@/utils/backend';
import { VMComponent } from '@/utils/interfaces';
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class InterimVuement extends Vue {
  mounted(): void {
    if (this.components.length === 0) {
      backend.get('vuement/components').then(({ data }) => {
        data.forEach((x: VMComponent) =>
          this.$store.commit('addVMComponent', x)
        );
      });
    }
  }

  get components(): VMComponent[] {
    return this.$store.getters.vmComponents;
  }
}
</script>
