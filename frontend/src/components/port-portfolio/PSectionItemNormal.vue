<template>
  <div class="portfolio-section-item-normal" v-if="item" :dark="true">
    <div class="media" :style="background">
      <div class="asset" :style="asset" />
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
    </div>
    <div class="container">
      <div class="title">{{ item.title }}</div>
      <div class="description">{{ item.description }}</div>
    </div>
  </div>
</template>
<script lang="ts">
import { IProjectSectionItem } from '@/utils/interfaces';
import { Vue, Component, Prop } from 'vue-property-decorator';
@Component
export default class PSectionItemNormal extends Vue {
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
.portfolio-section-item-normal {
  border-radius: $border-radius;
  background: $background;
  &[dark] {
    background: $background_dark;
  }

  .media {
    background-size: cover;
    height: 180px;
    padding: 10px 20px;

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

    .asset {
      background-size: contain;
      height: 100%;
    }

    &,
    .asset {
      background-position: center;
      background-repeat: no-repeat;
      border-radius: $border-radius $border-radius 0 0;
    }
  }
  .container {
    padding: 20px;
    .title {
      font-weight: bold;
      opacity: 0.5;
      margin-bottom: 10px;
    }
    .description {
      font-weight: 500;
    }
  }
}
</style>
