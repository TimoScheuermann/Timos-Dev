<template>
  <div class="interim-vuement">
    <router-view :components="components" :props="props" />
  </div>
</template>

<script lang="ts">
import backend from '@/utils/backend';
import { VMComponent, VMProp } from '@/utils/interfaces';
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

    if (this.props.length === 0) {
      backend.get('vuement/props').then(({ data }) => {
        data.forEach((x: VMProp) => this.$store.commit('addVMProp', x));
      });
    }
  }

  get components(): VMComponent[] {
    return this.$store.getters.vmComponents;
  }
  get props(): VMProp[] {
    return this.$store.getters.vmProps;
  }
}
</script>
