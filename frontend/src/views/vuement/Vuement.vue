<template>
  <div class="view-vuement" content>
    <vm-grid mode="auto-fit">
      <div>
        <vm-title title="Components" subtitle="Vuement" />
        <br />
        <vm-list v-if="components.length > 0">
          <vm-list-item>
            <vm-flow>
              <vm-input placeholder="Search" v-model="queryComp" />
              <vm-checkbox title="Show children" v-model="showChildren" />
            </vm-flow>
          </vm-list-item>
          <vm-list-item
            v-for="c in componentList"
            :key="c.id"
            :title="c.name"
            :description="
              c.children.length + ' children, ' + c.props.length + ' properties'
            "
            :to="{ name: 'vuement-edit-component', params: { id: c.id } }"
            :showChevron="false"
          >
            <vm-action slot="action" :title="c.name">
              <vm-action-item
                icon="ti-pencil"
                title="Edit"
                :to="{ name: 'vuement-edit-component', params: { id: c.id } }"
              />
              <vm-action-item
                v-if="!c.isChild"
                icon="ti-share"
                title="View on Vuement"
                :href="`https://vuement.com/component/${c.name}`"
              />
              <vm-spacer />
              <vm-action-item color="error" icon="ti-trashcan" title="Remove" />
            </vm-action>
            <div class="vm-image" slot="media" v-if="c.image">
              <img :src="c.image" :alt="c.name" />
            </div>
          </vm-list-item>
        </vm-list>
      </div>
      <div>
        <vm-title subtitle="Vuement" title="Properties" />
        <br />
        <vm-list v-if="props.length > 0">
          <vm-list-item>
            <vm-flow>
              <vm-input placeholder="Search" v-model="queryProp" />
            </vm-flow>
          </vm-list-item>
          <vm-list-item
            v-for="p in propertyList"
            :key="p.id"
            :title="p.name"
            :description="'value: ' + p.value + ', type: ' + p.type"
            :to="{ name: 'vuement-edit-property', params: { id: p.id } }"
            :showChevron="false"
          >
            <vm-action slot="action" :title="p.name">
              <vm-action-item
                icon="ti-pencil"
                title="Edit"
                :to="{ name: 'vuement-edit-property', params: { id: p.id } }"
              />
              <vm-spacer />
              <vm-action-item color="error" icon="ti-trashcan" title="Remove" />
            </vm-action>
          </vm-list-item>
        </vm-list>
      </div>
    </vm-grid>
    <br />
  </div>
</template>

<script lang="ts">
import { VMComponent, VMProp } from '@/utils/interfaces';
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class Vuement extends Vue {
  @Prop() components!: VMComponent[];
  @Prop() props!: VMProp[];

  public showChildren = false;
  public queryComp = '';
  public queryProp = '';

  get componentList(): VMComponent[] {
    return this.components
      .filter(x => {
        if (this.showChildren) return true;
        return !x.isChild;
      })
      .filter(x => {
        if (this.queryComp.length === 0) return true;
        return x.name.toLowerCase().includes(this.queryComp.toLowerCase());
      });
  }

  get propertyList(): VMProp[] {
    return this.props.filter(x => {
      if (this.queryProp.length === 0) return true;
      return x.name.toLowerCase().includes(this.queryProp.toLowerCase());
    });
  }
}
</script>

<style lang="scss" scoped>
.view-vuement {
  margin-top: 40.33px;
  .vm-image {
    display: grid;
    place-content: center;
    height: 34px;
    width: 34px;
    margin: 5px;
    border-radius: 13px;
    background: rgba(var(--vm-primary), 1);
    img {
      height: 25px;
      width: 25px;
    }
  }
}
</style>
