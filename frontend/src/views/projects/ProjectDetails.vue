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
      <br />
      <tl-flow horizontal="space-around" class="buttons">
        <a v-if="portfolio" :href="portfolio" target="_blank">P</a>
        <a v-if="website" :href="website" target="_blank">
          <i class="ti-share" />
        </a>
        <a v-if="github" :href="github" target="_blank">
          <i class="ti-github" />
        </a>
        <a v-if="npmjs" :href="npmjs" target="_blank">N</a>
        <router-link
          edit
          :to="{ name: 'update-project', params: { id: $route.params.id } }"
        >
          <i class="ti-pencil" />
        </router-link>
      </tl-flow>

      <tc-divider :dark="$store.getters.darkmode" />

      <p line-break>{{ project.description }}</p>

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

  get portfolio(): string | null {
    if (this.project)
      return `https://timos.design/projects/${this.project.title}`;
    return null;
  }

  get website(): string | null {
    if (this.project && this.project.website) return this.project.website;
    return null;
  }

  get github(): string | null {
    if (this.project && this.project.github) return this.project.github;
    return null;
  }

  get npmjs(): string | null {
    if (this.project && this.project.npmjs) return this.project.npmjs;
    return null;
  }

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
      this.projects.filter(
        x =>
          x._id === this.$route.params.id || x.title === this.$route.params.id
      )[0] || null
    );
  }
}
</script>

<style lang="scss" scoped>
.buttons {
  a {
    $scale: 44px;
    height: $scale;
    width: $scale;
    border-radius: $scale;
    color: inherit;
    text-decoration: none;
    font-weight: bold;
    cursor: pointer;
    display: grid;
    place-content: center;

    transition: 0.2s ease-in-out;
    &:hover {
      filter: brightness(120%);
    }

    background: $container;
    @media #{$isDark} {
      background: $container_dark;
    }

    &[edit] {
      color: #fff;
      background: $error;
    }
  }
}
</style>
