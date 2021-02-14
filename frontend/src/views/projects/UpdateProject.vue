<template>
  <div class="view-update-project" v-if="project" content max-width>
    <tc-input
      :dark="$store.getters.darkmode"
      title="Title"
      v-model="updateDTO.title"
      :placeholder="project.title"
    />
    <tc-textarea
      :dark="$store.getters.darkmode"
      title="Description"
      v-model="updateDTO.description"
      :placeholder="project.description"
    />
    <tc-input
      :dark="$store.getters.darkmode"
      title="Icon"
      v-model="updateDTO.icon"
      :placeholder="project.icon"
    />
    <tc-input
      :dark="$store.getters.darkmode"
      title="Thumbnail"
      v-model="updateDTO.thumbnail"
      :placeholder="project.thumbnail"
    />
    <tc-input
      :dark="$store.getters.darkmode"
      title="Hero"
      v-model="updateDTO.hero"
      :placeholder="project.hero"
    />
    <br />
    <tc-checkbox
      v-model="updateDTO.displayOnHome"
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
        @selectedItems="i => (updateDTO.designTools = i)"
      >
        <tc-select-item
          v-for="i in designTools"
          :key="i"
          :title="i"
          :defaultSelected="project.designTools.includes(i)"
        />
      </tc-select>
      <tc-select
        :showSelection="false"
        tfbackground="error"
        :multiple="true"
        :dark="$store.getters.darkmode"
        placeholder="Frameworks"
        @selectedItems="i => (updateDTO.frameworks = i)"
      >
        <tc-select-item
          v-for="i in frameworks"
          :key="i"
          :title="i"
          :defaultSelected="project.frameworks.includes(i)"
        />
      </tc-select>
      <tc-select
        :showSelection="false"
        tfbackground="error"
        :multiple="true"
        :dark="$store.getters.darkmode"
        placeholder="Development"
        @selectedItems="i => (updateDTO.development = i)"
      >
        <tc-select-item
          v-for="i in development"
          :key="i"
          :title="i"
          :defaultSelected="project.development.includes(i)"
        />
      </tc-select>
    </tl-grid>

    <br />
    <tc-divider name="Optional" :dark="$store.getters.darkmode" />

    <tc-input
      :dark="$store.getters.darkmode"
      title="Website"
      v-model="updateDTO.website"
      :placeholder="project.website"
    />
    <tc-input
      :dark="$store.getters.darkmode"
      title="GitHub"
      v-model="updateDTO.github"
      :placeholder="project.github"
    />
    <tc-input
      :dark="$store.getters.darkmode"
      title="NPM.js"
      v-model="updateDTO.npmjs"
      :placeholder="project.npmjs"
    />

    <tc-divider :dark="$store.getters.darkmode" />
    <br />

    <tl-grid>
      <tc-button
        :disabled="disabled"
        @click="submit"
        variant="filled"
        tfbackground="error"
        name="update Project"
      />
    </tl-grid>
  </div>
</template>

<script lang="ts">
import backend from '@/utils/backend';
import { designTools, development, frameworks } from '@/utils/constants';
import { IProject } from '@/utils/interfaces';
import { UpdateProjectDTO } from '@/utils/models';
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class UpdateProject extends Vue {
  public disabled = false;
  public updateDTO: UpdateProjectDTO = new UpdateProjectDTO();
  public designTools = designTools;
  public frameworks = frameworks;
  public development = development;

  async mounted() {
    if (!this.project) {
      const { data } = await backend.get('project/all');
      this.$store.commit('updateProjects', data);
    }

    if (!this.project) {
      this.$router.push({ name: 'projects' });
    } else {
      this.$parent.$parent.$emit('hero-bg', this.project.thumbnail);
      this.updateDTO = new UpdateProjectDTO();
      this.updateDTO.displayOnHome = this.project.displayOnHome;
      this.updateDTO._id = this.project._id;
      this.updateDTO.designTools = this.project.designTools;
      this.updateDTO.frameworks = this.project.frameworks;
      this.updateDTO.development = this.project.development;
    }
  }

  public async submit(): Promise<void> {
    this.disabled = true;

    backend
      .put('project', this.updateDTO)
      .then(async () => {
        const { data } = await backend.get('project/all');
        this.$store.commit('updateProjects', data);

        this.$router.push({
          name: 'project-details',
          params: { id: this.$route.params.id }
        });
      })
      .catch(error => {
        this.disabled = false;
        alert(error.message);
      });
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
}
</script>
