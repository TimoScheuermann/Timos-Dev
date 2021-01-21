<template>
  <div class="view-project-details" content>
    <tl-flow v-if="doesntExist" flow="column">
      <br />
      <i error huge class="ti-exclamation-triangle" />
      <p>Project not found</p>
    </tl-flow>
    <tl-flow v-else-if="!project" flow="column">
      <br />
      <tc-spinner size="20" :dark="$store.getters.darkmode" />
      <p>Loading project</p>
    </tl-flow>
    <template v-else>
      <h1 center>{{ project.title }}</h1>
      <p>{{ project }}</p>
    </template>
  </div>
</template>

<script lang="ts">
import backend from '@/utils/backend';
import { IProject } from '@/utils/interfaces';
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class ProjectDetails extends Vue {
  public doesntExist = false;

  async mounted() {
    if (!this.project) {
      const { data } = await backend.get('project/all');
      this.$store.commit('updateProjects', data);
    }

    if (!this.project) {
      this.doesntExist = true;
    } else {
      this.$parent.$parent.$emit('hero-bg', this.project.thumbnail);
    }
  }

  get projects(): IProject[] | null {
    return this.$store.getters.projects;
  }

  get project(): IProject | null {
    if (!this.projects) return null;
    return (
      this.projects.filter(x => x._id + '' === this.$route.params.id + '')[0] ||
      null
    );
  }
}
</script>
