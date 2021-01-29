<template>
  <router-link
    v-if="news"
    :to="{ name: 'update-news', params: { id: news._id } }"
    class="dev-news-preview"
  >
    <div class="media">
      <img :src="news.thumbnail" alt="" />
    </div>
    <div class="container">
      <div class="type">{{ news.type }}</div>
      <div class="title">{{ news.title }}</div>
      <!-- <div class="content" line-break>{{ news.content }}</div> -->
    </div>
  </router-link>
</template>

<script lang="ts">
import { INewsExtended } from '@/utils/interfaces';
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class DevNewsPreview extends Vue {
  @Prop() news!: INewsExtended;
}
</script>

<style lang="scss" scoped>
.dev-news-preview {
  text-decoration: none;
  break-inside: avoid;
  display: block;
  color: inherit;
  margin-bottom: 20px;

  background: $paragraph;
  @media #{$isDark} {
    background: $paragraph_dark;
  }

  .media {
    border-top: {
      left-radius: $border-radius;
      right-radius: $border-radius;
    }
    overflow: hidden;

    background: $container;
    @media #{$isDark} {
      background: $container_dark;
    }
    img {
      height: 100%;
      max-height: 174px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }

  border-radius: $border-radius;
  cursor: pointer;

  transition: 0.1s ease-in-out;
  box-shadow: $shadow-light;
  &:hover {
    box-shadow: $shadow;
  }

  .container {
    padding: 20px;
    .title {
      font-weight: bold;
    }
    .type {
      text-transform: capitalize;
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 4px;
      opacity: 0.75;
    }
    .content {
      margin-top: 10px;
    }
  }
}
</style>
