<template>
  <div class="view-edit-portfolio-sections" content>
    <tl-flow horizontal="space-between">
      <h2>Section Editor</h2>
      <tc-button
        variant="filled"
        tfbackground="success"
        name="Save Changes"
        icon="database-upload"
        @click="saveChanges"
      />
      <h3>{{ sections.length }} Sections</h3>
    </tl-flow>

    <div class="section-wrapper">
      <template v-for="(s, i) in sections">
        <tl-flow :key="s.title + 'b'">
          <tc-button
            icon="plus"
            variant="filled"
            tfbackground="error"
            @click="newSection(i)"
          />
        </tl-flow>
        <section :key="s.title" :dark="true">
          <div class="title">{{ s.title }}</div>
          <div class="subtitle">{{ s.subtitle }}</div>
          <tc-button
            seditor
            icon="pencil"
            variant="opaque"
            tfbackground="alarm"
            @click="editSection(s)"
          />
          <tc-button
            sremover
            icon="minus"
            variant="opaque"
            tfbackground="error"
            @click="removeSection(i)"
          />
          <tl-flow v-if="s.items.length === 0">
            <tc-button
              variant="filled"
              icon="plus"
              tfbackground="success"
              @click="newItem(i, -1)"
            />
          </tl-flow>
          <tl-grid minWidth="250">
            <template v-for="(it, j) in s.items">
              <PSectionItemLarge
                v-if="it.size === 'large'"
                :key="it.title"
                :item="it"
                @insertBefore="newItem(i, j)"
                @insertAfter="newItem(i, j + 1)"
                @deleteItem="removeItem(i, j)"
                @updateItem="editItem(it)"
              />
              <PSectionItemNormal
                v-else-if="it.size === 'normal'"
                :key="it.title"
                :item="it"
                @insertBefore="newItem(i, j)"
                @insertAfter="newItem(i, j + 1)"
                @deleteItem="removeItem(i, j)"
                @updateItem="editItem(it)"
              />
            </template>
          </tl-grid>
          <div class="spacer" />
        </section>
      </template>
      <tl-flow>
        <tc-button
          icon="plus"
          variant="filled"
          tfbackground="error"
          @click="newSection(-1)"
        />
      </tl-flow>
    </div>

    <tc-modal v-model="sectionModalOpened" title="Add Section" :dark="true">
      <tc-input v-model="sectionTitle" :dark="true" title="Title" />
      <tc-input v-model="sectionSubtitle" :dark="true" title="Subtitle" />
      <br />
      <tl-grid>
        <tc-button
          tfbackground="error"
          variant="filled"
          name="Add Section"
          @click="addSection"
        />
      </tl-grid>
    </tc-modal>

    <tc-modal :value="!!sectionToEdit" title="Edit Section" :dark="true">
      <template v-if="sectionToEdit">
        <tc-input v-model="sectionToEdit.title" :dark="true" title="Title" />
        <tc-input
          v-model="sectionToEdit.subtitle"
          :dark="true"
          title="Subtitle"
        />
        <br />
        <tl-grid>
          <tc-button
            tfbackground="alarm"
            variant="filled"
            name="Update Section"
            @click="sectionToEdit = null"
          />
        </tl-grid>
      </template>
    </tc-modal>

    <tc-modal v-model="itemModalOpened" title="Add Item" :dark="true">
      <tc-segments v-model="itemLarge" :dark="true">
        <tc-segment-item title="Normal" />
        <tc-segment-item title="Large" />
      </tc-segments>
      <tc-input v-model="itemTitle" :dark="true" title="Title" />
      <tc-textarea v-model="itemDescription" :dark="true" title="Description" />
      <tc-input v-model="itemAsset" :dark="true" title="Asset" />
      <tc-input v-model="itemBackground" :dark="true" title="Background" />

      <br />
      <tl-grid>
        <tc-button
          tfbackground="success"
          variant="filled"
          name="Add Item"
          @click="addItem"
        />
      </tl-grid>
    </tc-modal>

    <tc-modal :value="!!itemToEdit" title="Edit Item" :dark="true">
      <template v-if="itemToEdit">
        <tc-segments
          :value="itemToEdit.size === 'large' ? 1 : 0"
          @input="i => (itemToEdit.size = i === 1 ? 'large' : 'normal')"
          :dark="true"
        >
          <tc-segment-item title="Normal" />
          <tc-segment-item title="Large" />
        </tc-segments>
        <tc-input v-model="itemToEdit.title" :dark="true" title="Title" />
        <tc-textarea
          v-model="itemToEdit.description"
          :dark="true"
          title="Description"
        />
        <tc-input v-model="itemToEdit.asset" :dark="true" title="Asset" />
        <tc-input
          v-model="itemToEdit.background"
          :dark="true"
          title="Background"
        />

        <br />
        <tl-grid>
          <tc-button
            tfbackground="alarm"
            variant="filled"
            name="Update Item"
            @click="itemToEdit = null"
          />
        </tl-grid>
      </template>
    </tc-modal>
  </div>
</template>

<script lang="ts">
import PSectionItemLarge from '@/components/port-portfolio/PSectionItemLarge.vue';
import PSectionItemNormal from '@/components/port-portfolio/PSectionItemNormal.vue';
import backend from '@/utils/backend';
import {
  IProject,
  IProjectSection,
  IProjectSectionItem
} from '@/utils/interfaces';
import { UpdateSectionsDTO } from '@/utils/models';
import { Vue, Component } from 'vue-property-decorator';

@Component({
  components: {
    PSectionItemLarge,
    PSectionItemNormal
  }
})
export default class EditPortfolioSections extends Vue {
  public sections: IProjectSection[] = [];
  public sectionModalOpened = false;
  public sectionTitle = '';
  public sectionSubtitle = '';
  public newSectionPosition = -2;

  public itemModalOpened = false;
  public itemTitle = '';
  public itemDescription = '';
  public itemBackground = '';
  public itemAsset = '';
  public itemLarge = 0;
  public itemBelongsTo = -2;
  public newItemPosition = -2;

  public itemToEdit: null | IProjectSectionItem = null;
  public sectionToEdit: null | IProjectSection = null;

  async mounted() {
    if (!this.project) {
      const { data } = await backend.get('project/all');
      this.$store.commit('updateProjects', data);
    }

    if (!this.project) {
      this.$router.push({ name: 'projects' });
      return;
    } else {
      this.$parent.$parent.$emit('hero-bg', this.project.hero);
      this.sections = this.project.sections || [];
    }
  }

  get projects(): IProject[] | null {
    return this.$store.getters.projects;
  }

  get project(): IProject | null {
    if (!this.projects) return null;
    return (
      this.projects.filter(
        x =>
          x._id === this.$route.params.id || x.title === this.$route.params.id
      )[0] || null
    );
  }

  public saveChanges(): void {
    const project = this.project;
    if (!project) return;
    backend
      .put('project/sections', {
        _id: project._id,
        sections: this.sections
      } as UpdateSectionsDTO)
      .then(res => {
        this.$store.commit('updateSections', {
          _id: project._id,
          sections: res.data
        } as UpdateSectionsDTO);
        this.$router.push({
          name: 'project-details',
          params: { id: this.$route.params.id }
        });
      });
  }

  public newSection(index: number): void {
    this.newSectionPosition = index;
    if (this.newSectionPosition === -2) return;
    this.sectionTitle = '';
    this.sectionSubtitle = '';
    this.sectionModalOpened = true;
  }

  public addSection(): void {
    if (this.newSectionPosition !== -2) {
      if (this.sectionTitle.length === 0) return;
      if (this.sectionSubtitle.length === 0) return;

      const section: IProjectSection = {
        title: this.sectionTitle,
        subtitle: this.sectionSubtitle,
        items: []
      };
      if (this.newSectionPosition === -1) {
        this.sections.push(section);
      } else {
        this.sections.splice(this.newSectionPosition, 0, section);
      }
      this.sectionModalOpened = false;
      this.newSectionPosition = -2;
    }
  }

  public removeSection(index: number): void {
    this.sections.splice(index, 1);
  }

  public editSection(section: IProjectSection): void {
    this.sectionToEdit = section;
  }

  public newItem(section: number, index: number): void {
    this.itemBelongsTo = section;
    if (this.itemBelongsTo === -2) return;
    this.newItemPosition = index;
    if (this.newItemPosition === -2) return;
    this.itemTitle = '';
    this.itemDescription = '-';
    this.itemAsset = '-';
    this.itemBackground = '-';
    this.itemLarge = 0;
    this.itemModalOpened = true;
  }

  public removeItem(section: number, item: number): void {
    const s = this.sections[section];
    if (s) {
      s.items.splice(item, 1);
    }
  }

  public editItem(item: IProjectSectionItem): void {
    this.itemToEdit = item;
  }

  public addItem(): void {
    if (this.newItemPosition !== -2) {
      if (this.itemTitle.length === 0) return;
      if (this.itemDescription.length === 0) return;
      if (this.itemAsset.length === 0) return;

      const item: IProjectSectionItem = {
        title: this.itemTitle,
        description: this.itemDescription,
        background: this.itemBackground,
        asset: this.itemAsset,
        size: this.itemLarge === 1 ? 'large' : 'normal'
      };
      const section = this.sections[this.itemBelongsTo];
      if (!section) {
        this.itemModalOpened = false;
        return;
      }

      if (
        this.newItemPosition === -1 ||
        section.items.length < this.newItemPosition
      ) {
        section.items.push(item);
      } else {
        section.items.splice(this.newItemPosition, 0, item);
      }
      this.itemModalOpened = false;
      this.newItemPosition = -2;
    }
  }
}
</script>

<style lang="scss" scoped>
.section-wrapper {
  max-width: 1000px;
  margin: 0 auto;
}

section {
  position: relative;
  animation: move-up 0.4s ease-in-out 0.3s both;
  background: $paragraph;
  &[dark] {
    background: $paragraph_dark;
  }
  border-radius: $border-radius;
  margin: 30px -5vw;
  padding: 20px 5vw 0;

  .tc-button[sremover] {
    position: absolute;
    top: 10px;
    right: 10px;
  }
  .tc-button[seditor] {
    position: absolute;
    top: 10px;
    left: 10px;
  }

  .spacer {
    height: 5vw;
    max-height: 60px;
  }

  .title,
  .subtitle {
    text-align: center;
  }
  .title {
    font-weight: bold;
    font-size: 30px;
    margin: 10px 0;
  }
  .subtitle {
    font-weight: 500;
    font-size: 20px;
    margin-bottom: 30px;
  }
}
</style>
