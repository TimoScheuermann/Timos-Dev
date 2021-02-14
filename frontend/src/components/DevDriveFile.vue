<template>
  <div
    class="dev-drive-file"
    v-if="file || folder"
    :style="style"
    @click="openDetails"
  >
    <div class="file-title" :folder="!!folder">
      {{ folder || file.originalname }}
    </div>
    <i v-if="folder" class="ti-folder-cloud"></i>
  </div>
</template>

<script lang="ts">
import { copyToClipboard } from '@/utils/functions';
import { IAWSFile } from '@/utils/interfaces';
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class DevDriveFile extends Vue {
  @Prop() file!: IAWSFile;
  @Prop() folder!: string;

  get style(): string {
    if (!this.file) return '';
    return `background-image: url(${this.file.Location})`;
  }

  public openDetails(e: MouseEvent): void {
    if (this.file) {
      if (e.shiftKey) {
        copyToClipboard(this.file.Location);
      } else {
        this.$router.push({
          name: 'drive-item',
          params: { item: this.file._id }
        });
      }
    }
    if (this.folder) {
      this.$router.push({
        name: 'drive',
        query: { folder: this.folder }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.dev-drive-file {
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;

  cursor: pointer;
  border-radius: $border-radius;
  box-sizing: border-box;
  position: relative;

  transition: all 0.2s ease-in-out;
  &:hover {
    transform: scale(1.0174);
    .file-title {
      opacity: 1;
    }
  }

  .file-title {
    opacity: 0.5;
    transition: all 0.2s ease-in-out;
    text-align: center;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: -25px;
    max-width: 100%;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    &[folder] {
      -webkit-line-clamp: 3;
    }
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
  }

  i {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 4em;
    color: $error;
  }
}
</style>
