<template>
  <div class="view-projects" content>
    <tl-flow flow="column" v-if="!projects">
      <tc-spinner size="20" :dark="$store.getters.darkmode" />
      <p>Loading projects</p>
    </tl-flow>

    <template v-else>
      <tl-flow horizontal="space-between">
        <h2>Projects</h2>
        <tc-button
          routeName="create-project"
          tfbackground="error"
          name="add"
          variant="opaque"
        />
      </tl-flow>

      <p v-if="projects.length === 0">There are no projects yet...</p>

      <template v-else>
        <br />
        <tc-list :dark="$store.getters.darkmode">
          <tc-list-item
            v-for="p in projects"
            :key="p._id"
            :icon="p.icon"
            :title="p.title"
            :to="{ name: 'project-details', params: { id: p.title } }"
          />
        </tc-list>
      </template>
    </template>
  </div>
</template>

<script lang="ts">
import backend from '@/utils/backend';
import { IProject } from '@/utils/interfaces';
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Projects extends Vue {
  mounted() {
    if (!this.projects) {
      backend
        .get('project/all')
        .then(res => {
          this.$store.commit('updateProjects', res.data);
        })
        .catch(error => {
          alert(error.message);
        });
    }
  }

  get projects(): IProject[] | null {
    return this.$store.getters.projects;
  }
}
</script>

<style lang="scss" scoped></style>
