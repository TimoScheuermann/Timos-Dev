<template>
  <div class="portfolio-section-item-large" v-if="item" :style="background">
    <tc-button
      left
      tfbackground="success"
      variant="opaque"
      icon="plus"
      @click="insertBefore"
    />
    <tc-button
      right
      tfbackground="success"
      variant="opaque"
      icon="plus"
      @click="insertAfter"
    />
    <tc-button
      top
      tfbackground="error"
      variant="opaque"
      icon="minus"
      @click="deleteItem"
    />
    <tc-button
      bottom
      tfbackground="alarm"
      variant="opaque"
      icon="pencil"
      @click="updateItem"
    />

    <tl-grid minWidth="150">
      <div class="asset" :style="asset" />
      <tl-flow flow="column" class="container" vertical="start">
        <div class="title">{{ item.title }}</div>
        <div class="description">{{ item.description }}</div>
      </tl-flow>
    </tl-grid>
  </div>
</template>
<script lang="ts">
import { IProjectSectionItem } from '@/utils/interfaces';
import { Vue, Component, Prop } from 'vue-property-decorator';
@Component
export default class PSectionItemLarge extends Vue {
  @Prop() item!: IProjectSectionItem;

  public insertBefore() {
    this.$emit('insertBefore');
  }
  public insertAfter() {
    this.$emit('insertAfter');
  }
  public deleteItem() {
    this.$emit('deleteItem');
  }
  public updateItem() {
    this.$emit('updateItem');
  }

  get background(): string {
    if (!this.item) return '';
    const bg = this.item.background;
    if (bg.startsWith('https')) return `background-image: url(${bg})`;
    if (bg.startsWith('background-image:')) return bg;
    if (bg.startsWith('background-color:')) return bg;
    return `background: ${bg}`;
  }

  get asset(): string {
    if (!this.item) return '';
    return `background-image: url(${this.item.asset})`;
  }
}
</script>
<style lang="scss" scoped>
.portfolio-section-item-large {
  grid-column: 1 / -1;
  border-radius: $border-radius;
  padding: 20px;

  position: relative;
  &:hover {
    .tc-button {
      opacity: 1;
    }
  }

  .tc-button {
    opacity: 0;
    position: absolute;

    &[left],
    &[right] {
      top: 50%;
      transform: translateY(-50%);
    }
    &[left] {
      left: 0px;
    }
    &[right] {
      right: 0px;
    }

    &[top],
    &[bottom] {
      left: 50%;
      transform: translateX(-50%);
    }
    &[top] {
      top: 0px;
    }
    &[bottom] {
      bottom: 0px;
    }
  }

  background-size: cover;
  &,
  .asset {
    background-position: center;
    background-repeat: no-repeat;
  }
  .asset {
    height: 100%;
    min-height: 250px;
    background-size: contain;
  }

  .container {
    color: #fff;

    .title {
      font-weight: bold;
      font-size: 24px;
      margin-bottom: 10px;
    }
    .description {
      font-weight: 500;
    }
  }
}
</style>
