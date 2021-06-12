<template>
  <div class="vuement-edit-component" content>
    <vm-title
      :title="'Edit ' + (component ? component.name : 'Component')"
      subtitle="Vuement"
    />

    <br /><br />

    <template v-if="component">
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
              x => x.name.includes(component.name) && x.name !== component.name
            )"
            :key="c.id"
            :id="c.id"
            :title="c.name"
            :selected="component.children.includes(c.id)"
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
            :selected="component.props.includes(p.id)"
          />
        </vm-select>
      </vm-flow>

      <br />
      <vm-flow horizontal="center">
        <vm-button
          title="update component"
          :block="true"
          @click="updateComponent"
        />
      </vm-flow>
    </template>

    <p>{{ dto }}</p>
  </div>
</template>

<script lang="ts">
import backend from '@/utils/backend';
import { VMComponent } from '@/utils/interfaces';
import { Vue, Component } from 'vue-property-decorator';
import { VMSelectSelection } from 'vuement';
@Component
export default class VuementEditComponent extends Vue {
  public dto = {
    name: '',
    image: '',
    isChild: false,
    children: [] as string[],
    props: [] as string[]
  };

  mounted(): void {
    const comp = this.component;

    if (!comp) {
      this.$router.push({ name: 'vuement' });
      return;
    }
    this.dto.name = comp.name;
    this.dto.image = comp.image || '';
    this.dto.isChild = comp.isChild || false;
    this.dto.children = comp.children;
    this.dto.props = comp.props;
  }

  get component(): VMComponent | null {
    return (
      (this.$store.getters.vmComponents as VMComponent[]).filter(
        x => x.id === this.$route.params.id
      )[0] || null
    );
  }

  public childrenChanged(data: VMSelectSelection[]): void {
    console.log(
      'hi',
      data.filter(x => x.state)
    );

    this.dto.children = data.filter(x => x.state).map(x => x.id);
  }

  public propertiesChanged(data: VMSelectSelection[]): void {
    this.dto.props = data.filter(x => x.state).map(x => x.id);
  }

  public updateComponent(): void {
    backend
      .patch('vuement/component/' + this.$route.params.id, this.dto)
      .then(({ data }) => {
        this.$store.commit('addVMComponent', data);
        this.$router.push({ name: 'vuement' });
      })
      .catch(({ message }) => {
        this.$vm.sendNotification({
          title: "Couldn't update component",
          text: message
        });
      });
  }
}
</script>
