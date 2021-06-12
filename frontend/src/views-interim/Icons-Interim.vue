<template>
  <div class="interim-icons">
    <DevTitle title="Icons" />
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
export default class InterimIcons extends Vue {}
</script>
