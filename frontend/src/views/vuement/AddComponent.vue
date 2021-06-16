<template>
  <div class="vuement-add-component" content>
    <DevVuementComponentForm />
  </div>
</template>

<script lang="ts">
import DevVuementComponentForm from '@/components/vuement/DevVuementComponentForm.vue';
import { Vue, Component } from 'vue-property-decorator';

@Component({
  components: {
    DevVuementComponentForm
  }
})
export default class VuementAddComponent extends Vue {}
</script>
