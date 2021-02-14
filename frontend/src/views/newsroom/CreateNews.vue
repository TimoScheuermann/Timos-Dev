<template>
  <div class="view-create-news" content max-width v-if="projects">
    <tc-input
      title="Title"
      v-model="createDTO.title"
      :dark="$store.getters.darkmode"
    />
    <tc-textarea
      title="News"
      v-model="createDTO.content"
      :dark="$store.getters.darkmode"
    />

    <tc-input
      title="Thumbnail"
      v-model="createDTO.thumbnail"
      :dark="$store.getters.darkmode"
    />

    <tc-input
      type="datetime-local"
      title="Date"
      :dark="$store.getters.darkmode"
      v-model="createDTO.timestamp"
    />
    <br />
    <tl-grid minWidth="100" gap="10">
      <tc-select
        tfbackground="error"
        placeholder="Project"
        :dark="$store.getters.darkmode"
        @selectedItems="p => setProject(p[0])"
      >
        <tc-select-item
          v-for="p in projects"
          :key="p._id"
          :title="p.title"
          :icon="p.icon"
        />
      </tc-select>
      <tc-select
        tfbackground="error"
        placeholder="News-Type"
        :dark="$store.getters.darkmode"
        @selectedItems="t => (createDTO.type = t[0].toLowerCase())"
      >
        <tc-select-item title="Update" :defaultSelected="true" />
        <tc-select-item title="Release" />
        <tc-select-item title="Feature" />
      </tc-select>
    </tl-grid>

    <br />
    <tl-grid>
      <tc-button
        :disabled="disabled"
        @click="submit"
        variant="filled"
        tfbackground="error"
        name="post News"
      />
    </tl-grid>
  </div>
</template>

<script lang="ts">
import backend from '@/utils/backend';
import { IProject } from '@/utils/interfaces';
import { CreateNewsDTO } from '@/utils/models';
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class CreateNews extends Vue {
  public disabled = false;
  public createDTO: CreateNewsDTO = new CreateNewsDTO();
  public projects: IProject[] | null = null;

  async mounted() {
    if (!this.projects) {
      backend
        .get('project')
        .then(res => {
          this.projects = res.data;
        })
        .catch(error => {
          alert(error.message);
        });
    }
  }

  public setProject(name: string): void {
    this.createDTO.project =
      (this.projects || []).filter(x => x.title === name).map(x => x._id)[0] ||
      '';
  }

  public submit(): void {
    if (this.disabled) return;
    this.disabled = true;

    if (this.createDTO.timestamp) {
      this.createDTO.timestamp = new Date(this.createDTO.timestamp).getTime();
    }
    backend
      .post('newsroom', this.createDTO)
      .then(res => {
        this.$store.commit('addNews', res.data);
        this.$router.push({ name: 'newsroom' });
      })
      .catch(error => {
        this.disabled = false;
        alert(error.message);
      });
  }
}
</script>
