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

// tools: string[] = [];

@Component
export default class CreateProject extends Vue {
  public createProject = new CreateProjectDTO();
  public disabled = false;

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
