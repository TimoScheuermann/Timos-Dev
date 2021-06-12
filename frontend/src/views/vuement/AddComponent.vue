<template>
  <div class="vuement-add-component" content>
    <vm-title title="Add Component" subtitle="Vuement" />

    <br /><br />

    <vm-grid gap="3px">
      <vm-input title="Name" :floatingTitle="true" v-model="dto.name" />
      <vm-input title="Image" :floatingTitle="true" v-model="dto.image" />
      <vm-checkbox v-model="dto.isChild" title="is child?" />
    </vm-grid>
    <vm-spacer />
    <vm-flow horizontal="start">
      <vm-select
        title="Children"
        placeholder="Children"
        :multiple="true"
        @selection="childrenChanged"
      >
        <vm-select-item
          v-for="c in $store.getters.vmComponents.filter(
            x => x.name.includes(dto.name) && x.name !== dto.name
          )"
          :key="c.id"
          :id="c.id"
          :title="c.name"
        />
      </vm-select>

      <vm-select
        title="Properties"
        placeholder="Properties"
        :multiple="true"
        @selection="propertiesChanged"
      >
        <vm-select-item
          v-for="p in $store.getters.vmProps"
          :key="p.id"
          :id="p.id"
          :title="p.name + ' (' + p.value + ') [' + p.type + ']'"
        />
      </vm-select>
    </vm-flow>

    <br />
    <vm-flow horizontal="center">
      <vm-button title="add component" :block="true" @click="addComponent" />
    </vm-flow>
  </div>
</template>

<script lang="ts">
import backend from '@/utils/backend';
import { Vue, Component } from 'vue-property-decorator';
import { VMSelectSelection } from 'vuement';
@Component
export default class VuementAddComponent extends Vue {
  public dto = {
    name: '',
    image: '',
    isChild: false,
    children: [] as string[],
    props: [] as string[]
  };

  public childrenChanged(data: VMSelectSelection[]): void {
    this.dto.children = data.filter(x => x.state).map(x => x.id);
  }

  public propertiesChanged(data: VMSelectSelection[]): void {
    this.dto.props = data.filter(x => x.state).map(x => x.id);
  }

  public addComponent(): void {
    backend
      .post('vuement/component', this.dto)
      .then(({ data }) => {
        this.$store.commit('addVMComponent', data);
        this.$router.push({ name: 'vuement' });
      })
      .catch(({ message }) => {
        this.$vm.sendNotification({
          title: 'Fehler beim erstellen',
          text: message
        });
      });
  }
}
</script>
