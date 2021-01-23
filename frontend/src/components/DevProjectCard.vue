<template>
  <div
    class="dev-project-card"
    :style="style"
    :class="{ 'dev-project-card__dark': dark }"
    @click="open"
  >
    <div class="content">
      <div class="subtitle">{{ subtitle }}</div>
      <div class="title">{{ title }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
@Component
export default class DevProjectCard extends Vue {
  @Prop() background!: string;
  @Prop() title!: string;
  @Prop() subtitle!: string;
  @Prop() dark!: boolean;
  @Prop() to!: { name: string };

  public open(): void {
    this.$router.push(this.to);
  }

  get style(): string {
    return `background-image: url(${this.background})`;
  }
}
</script>

<style lang="scss" scoped>
.dev-project-card {
  color: $color;
  &__dark {
    color: $color_dark;
  }

  background-position: center right;
  background-size: cover;
  border-radius: $border-radius;
  cursor: pointer;

  transition: 0.1s ease-in-out;
  box-shadow: $shadow-light;
  &:hover {
    box-shadow: $shadow;
    transform: scale(1.007);
  }

  height: 174px;

  .content {
    padding: 20px;
    .title {
      font-weight: bold;
    }
    .subtitle {
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 4px;
      opacity: 0.75;
    }
  }
}
</style>
