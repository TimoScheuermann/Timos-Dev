<template>
  <div class="vuement-add-property" content>
    <vm-title title="Add Property" subtitle="Vuement" />

    <br /><br />

    <vm-grid gap="25px 3px">
      <vm-input
        v-for="k in Object.keys(dto)"
        :key="k"
        :title="k"
        :floatingTitle="true"
        v-model="dto[k]"
      />
    </vm-grid>

    <br />
    <vm-flow horizontal="center">
      <vm-button title="add property" :block="true" @click="addProperty" />
    </vm-flow>
  </div>
</template>

<script lang="ts">
import backend from '@/utils/backend';
import { Vue, Component } from 'vue-property-decorator';
@Component
export default class VuementAddProperty extends Vue {
  public dto = {
    name: '',
    value: '',
    description: '',
    type: ''
  };

  public addProperty(): void {
    backend
      .post('vuement/prop', this.dto)
      .then(({ data }) => {
        this.$store.commit('addVMProp', data);
        this.$router.push({ name: 'vuement' });
      })
      .catch(({ message }) => {
        this.$vm.sendNotification({
          title: "Coudln't create property",
          text: message
        });
      });
  }
}
</script>
