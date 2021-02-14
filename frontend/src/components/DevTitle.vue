<template>
  <div class="dev-title" v-if="title">
    <div class="title">{{ title }}</div>
    <div class="head-wrapper" :enhanced="displayHeader">
      <div class="text">
        {{ title }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class DevTitle extends Vue {
  @Prop() title!: string;

  public displayHeader = false;

  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    this.handleScroll();
  }

  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  get parent(): HTMLElement | null {
    return this.$el.parentElement;
  }

  public handleScroll() {
    this.displayHeader = window.scrollY > 20;
  }
}
</script>

<style lang="scss" scoped>
.dev-title {
  .title {
    margin: calc(50px + env(safe-area-inset-top)) 5vw 0;
    font-weight: 700;
    font-size: 1.7em;
  }
  .head-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 50px;
    padding: env(safe-area-inset-top) 5vw 0;
    line-height: 50px;
    text-align: center;
    font-weight: 550;
    z-index: 1000;

    @include backdrop-blur($background_dark);
    .text {
      transition: 0.2s ease-in-out;
    }
    &:not([enhanced]) {
      .text {
        opacity: 0;
      }
    }
  }
}
</style>
