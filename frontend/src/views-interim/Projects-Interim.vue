<template>
  <div class="interim-projects">
    <DevTitle :title="title" />
    <DevRouterView />
  </div>
</template>

<script lang="ts">
import DevRouterView from '@/components/DevRouter.vue';
import DevTitle from '@/components/DevTitle.vue';
import { Vue, Component } from 'vue-property-decorator';

@Component({
  components: {
    DevRouterView,
    DevTitle
  }
})
export default class InterimProjects extends Vue {
  get title(): string {
    return this.$route.params.id || 'Projects';
  }
}
</script>
