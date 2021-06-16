<template>
  <div class="vuement-edit-component" content>
    <DevVuementComponentForm v-if="ready" :component="component" />
  </div>
</template>

<script lang="ts">
import DevVuementComponentForm from '@/components/vuement/DevVuementComponentForm.vue';
import { VMComponent } from '@/utils/interfaces';
import { Vue, Component } from 'vue-property-decorator';

@Component({
  components: {
    DevVuementComponentForm
  }
})
export default class VuementEditComponent extends Vue {
  public ready = false;

  mounted(): void {
    if (!this.component) {
      this.$router.push({ name: 'vuement' });
      return;
    }

    this.ready = true;
  }

  get component(): VMComponent | null {
    return (
      (this.$store.getters.vmComponents as VMComponent[]).filter(
        x => x.id === this.$route.params.id
      )[0] || null
    );
  }
}
</script>
