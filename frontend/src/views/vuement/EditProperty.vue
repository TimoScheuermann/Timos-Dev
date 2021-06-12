<template>
  <div class="vuement-edit-property" content>
    <vm-title
      :title="'Edit ' + (property ? property.name : 'Property')"
      subtitle="Vuement"
    />

    <br /><br />

    <template v-if="property">
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
        <vm-button
          title="update property"
          :block="true"
          @click="updateProperty"
        />
      </vm-flow>
    </template>
  </div>
</template>

<script lang="ts">
import backend from '@/utils/backend';
import { VMProp } from '@/utils/interfaces';
import { Vue, Component } from 'vue-property-decorator';
@Component
export default class VuementEditProperty extends Vue {
  public dto = { name: '', value: '', description: '', type: '' };

  mounted(): void {
    const prop = this.property;

    if (!prop) {
      this.$router.push({ name: 'vuement' });
      return;
    }
    this.dto.name = prop.name;
    this.dto.value = prop.value;
    this.dto.description = prop.description;
    this.dto.type = prop.type;
  }

  get property(): VMProp | null {
    return (
      (this.$store.getters.vmProps as VMProp[]).filter(
        x => x.id === this.$route.params.id
      )[0] || null
    );
  }

  public updateProperty(): void {
    backend
      .patch('vuement/prop/' + this.$route.params.id, this.dto)
      .then(({ data }) => {
        this.$store.commit('addVMProp', data);
        this.$router.push({ name: 'vuement' });
      })
      .catch(({ message }) => {
        this.$vm.sendNotification({
          title: "Couldn't update property",
          text: message
        });
      });
  }
}
</script>
