<template>
  <div class="dev-vuement-component-form">
    <vm-title
      subtitle="Vuement"
      :title="component ? 'Edit ' + component.name : 'Register component'"
    />

    <br /><br />

    <vm-grid gap="20px 5px">
      <vm-input :floatingTitle="true" title="Name" v-model="dto.name" />
      <vm-input :floatingTitle="true" title="Image" v-model="dto.image" />
      <vm-checkbox title="is child" v-model="dto.isChild" />
      <vm-select
        title="Available vmComponents"
        placeholder="Select childs"
        :multiple="true"
        @selection="childrenChanged"
      >
        <vm-select-item
          v-for="c in $store.getters.vmComponents"
          :key="c.id"
          :id="c.id"
          :title="c.name"
          :selected="dto.children.includes(c.id)"
        />
      </vm-select>
    </vm-grid>

    <br />

    <vm-table>
      <template slot="head">
        <vm-th>Name</vm-th>
        <vm-th>Type</vm-th>
        <vm-th>Default</vm-th>
        <vm-th>Description</vm-th>
        <vm-th right>
          <vm-button
            size="small"
            icon="ti-plus"
            :round="true"
            @click="newProp"
          />
        </vm-th>
      </template>
      <vm-tr v-for="(p, i) in dto.props" :key="i">
        <vm-td input>
          <vm-input placeholder="Name" v-model="dto.props[i].name" />
        </vm-td>
        <vm-td input>
          <vm-input placeholder="Type" v-model="dto.props[i].type" />
        </vm-td>
        <vm-td input>
          <vm-input placeholder="Default" v-model="dto.props[i].value" />
        </vm-td>
        <vm-td input>
          <vm-input
            placeholder="Description"
            v-model="dto.props[i].description"
          />
        </vm-td>
        <vm-td right>
          <vm-button
            size="small"
            background="error"
            icon="ti-minus"
            :round="true"
            @click="removeProp(i)"
          />
        </vm-td>
      </vm-tr>
    </vm-table>

    <br /><br />

    <vm-button
      v-if="component"
      title="update component"
      :block="true"
      :disabled="disabled"
      @click="update"
    />

    <vm-button
      v-else
      title="create component"
      :block="true"
      :disabled="disabled"
      @click="create"
    />
  </div>
</template>

<script lang="ts">
import backend from '@/utils/backend';
import { VMComponent, VMProp } from '@/utils/interfaces';
import { Vue, Component, Prop } from 'vue-property-decorator';
import { VMSelectSelection } from 'vuement';
@Component
export default class DevVuementComponentForm extends Vue {
  @Prop() component!: VMComponent;

  public disabled = false;
  public dto = {
    name: '',
    image: '',
    isChild: false,
    children: [] as string[],
    props: [] as VMProp[]
  };

  mounted(): void {
    if (this.component) {
      const { name, image, isChild, children, props } = this.component;
      this.dto.name = name;
      this.dto.image = image ? image : '';
      this.dto.isChild = isChild ? isChild : false;
      this.dto.children = children;
      this.dto.props = props;
    } else {
      this.newProp();
    }
  }

  public newProp(): void {
    this.dto.props.push({ name: '', value: '', description: '', type: '' });
  }

  public removeProp(index: number): void {
    this.dto.props.splice(index, 1);
  }

  public childrenChanged(data: VMSelectSelection[]): void {
    this.dto.children = data.filter(x => x.state).map(x => x.id);
  }

  public update(): void {
    this.disabled = true;
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
        this.disabled = false;
      });
  }

  public create(): void {
    this.disabled = true;
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
        this.disabled = false;
      });
  }
}
</script>

<style lang="scss" scoped>
.dev-vuement-component-form {
  .vm-td[input] {
    min-width: 100px;
  }
  .vm-th {
    text-align: center;
  }
  [right] {
    text-align: right;
  }

  .vm-button {
    margin: 0 auto;
  }
}
</style>
