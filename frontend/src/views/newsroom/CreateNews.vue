<template>
  <div class="view-create-news" content v-if="projects">
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
      type="file"
      title="Thumbnail"
      :dark="$store.getters.darkmode"
      @change="fileChanged"
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
  public file: null | File = null;
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

  public fileChanged(e: Event): void {
    const element = e.target as HTMLInputElement;
    if (element.files) {
      this.file = element.files[0];
    }
  }

  public submit(): void {
    if (this.disabled) return;
    if (!this.file) return;
    this.disabled = true;

    const formData = new FormData();
    formData.append('thumbnail', this.file, this.file.name);
    Object.entries(this.createDTO).forEach(([key, value]) => {
      if (value) {
        if (key === 'timestamp') {
          formData.append(key, '' + new Date(value).getTime());
        } else {
          formData.append(key, value);
        }
      }
    });

    backend
      .post('newsroom', formData)
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
