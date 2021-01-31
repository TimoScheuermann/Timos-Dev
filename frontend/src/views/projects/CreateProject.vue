<template>
  <div class="view-create-project" content>
    <tc-input
      :dark="$store.getters.darkmode"
      title="Title"
      v-model="createProject.title"
    />
    <tc-textarea
      :dark="$store.getters.darkmode"
      title="Description"
      v-model="createProject.description"
    />
    <tc-input
      :dark="$store.getters.darkmode"
      title="Icon"
      v-model="createProject.icon"
    />
    <tc-input
      :dark="$store.getters.darkmode"
      title="Thumbnail"
      v-model="createProject.thumbnail"
    />
    <tc-input
      :dark="$store.getters.darkmode"
      title="Hero"
      v-model="createProject.hero"
    />
    <br />
    <tc-checkbox
      v-model="createProject.displayOnHome"
      tfbackground="error"
      :dark="$store.getters.darkmode"
      title="Display on Home"
    />
    <br />

    <tl-grid minWidth="100" gap="0">
      <tc-select
        :showSelection="false"
        tfbackground="error"
        :multiple="true"
        :dark="$store.getters.darkmode"
        placeholder="Design Tools"
        @selectedItems="i => (createProject.designTools = i)"
      >
        <tc-select-item v-for="i in designTools" :key="i" :title="i" />
      </tc-select>
      <tc-select
        :showSelection="false"
        tfbackground="error"
        :multiple="true"
        :dark="$store.getters.darkmode"
        placeholder="Frameworks"
        @selectedItems="i => (createProject.frameworks = i)"
      >
        <tc-select-item v-for="i in frameworks" :key="i" :title="i" />
      </tc-select>
      <tc-select
        :showSelection="false"
        tfbackground="error"
        :multiple="true"
        :dark="$store.getters.darkmode"
        placeholder="Development"
        @selectedItems="i => (createProject.development = i)"
      >
        <tc-select-item v-for="i in development" :key="i" :title="i" />
      </tc-select>
    </tl-grid>

    <br />
    <tc-divider name="Optional" :dark="$store.getters.darkmode" />

    <tc-input
      :dark="$store.getters.darkmode"
      title="Website"
      v-model="createProject.website"
    />
    <tc-input
      :dark="$store.getters.darkmode"
      title="GitHub"
      v-model="createProject.github"
    />
    <tc-input
      :dark="$store.getters.darkmode"
      title="NPM.js"
      v-model="createProject.npmjs"
    />

    <tc-divider :dark="$store.getters.darkmode" />
    <br />

    <tl-grid>
      <tc-button
        :disabled="disabled"
        @click="submit"
        variant="filled"
        tfbackground="error"
        name="add Project"
      />
    </tl-grid>
  </div>
</template>

<script lang="ts">
import { CreateProjectDTO } from '@/utils/models';
import { Vue, Component } from 'vue-property-decorator';
import backend from '@/utils/backend';
import { designTools, development, frameworks } from '@/utils/constants';

@Component
export default class CreateProject extends Vue {
  public createProject = new CreateProjectDTO();
  public disabled = false;
  public designTools = designTools;
  public frameworks = frameworks;
  public development = development;

  public submit() {
    this.disabled = true;

    backend
      .post('project', this.createProject)
      .then(res => {
        this.$router.push({
          name: 'project-details',
          params: { id: res.data }
        });
      })
      .catch(error => {
        this.disabled = false;
        alert(error.message);
      });
  }
}
</script>
