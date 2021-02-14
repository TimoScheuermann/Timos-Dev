<template>
  <div class="view-drive-item" v-if="file">
    <tc-header :dark="true" :title="file.originalname" variant="sticky">
      <tc-button @click="deleteFile" icon="trashcan-alt" tfbackground="error" />
      <tc-button
        @click="copyURL"
        icon="link"
        name="Copy URL"
        tfbackground="success"
      />
    </tc-header>
    <div content>
      <div max-width>
        <div class="image">
          <img :src="file.Location" alt="" />
        </div>

        <br />
        <tc-table :dark="true">
          <tc-tr v-for="k in Object.keys(file)" :key="k">
            <tc-td>{{ k }}</tc-td>
            <tc-td>{{ file[k] }}</tc-td>
          </tc-tr>
        </tc-table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import backend from '@/utils/backend';
import { copyToClipboard } from '@/utils/functions';
import { IAWSFile } from '@/utils/interfaces';
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class DriveItem extends Vue {
  get files(): IAWSFile[] | null {
    return this.$store.getters.driveFiles;
  }

  get file(): IAWSFile | null {
    if (!this.files) return null;
    const file = this.files.filter(x => x._id === this.$route.params.item)[0];
    if (!file) {
      this.$router.push({ name: 'drive' });
    }
    return file;
  }

  public deleteFile(): void {
    if (!this.file) return;
    backend.delete('drive/' + this.file._id);
    this.$router.back();
    this.$store.commit('removeDriveFile', this.file._id);
  }

  public copyURL(): void {
    if (!this.file) return;
    copyToClipboard(this.file.Location);
  }
}
</script>

<style lang="scss" scoped>
.view-drive-item {
  .image {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 400px;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
