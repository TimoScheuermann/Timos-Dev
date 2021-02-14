<template>
  <div class="view-drive">
    <tc-header :dark="true" variant="sticky" :title="folder || 'Drive'">
      <tc-header-button
        v-if="folder"
        slot="button"
        name="Drive"
        @click="$router.back()"
      />
      <tc-spinner v-if="!files" :dark="true" size="20" />
      <tl-flow v-else>
        <tc-button
          @click="newFolder"
          background="#acacac"
          color="#111"
          icon="folder-plus"
          name="create Folder"
        />
        <b m-left>{{ files.length }} File{{ files.length === 1 ? '' : 's' }}</b>
      </tl-flow>
    </tc-header>

    <div content>
      <div class="drive-items-grid">
        <template v-if="!folder">
          <DevDriveFile v-for="f in folders" :key="f" :folder="f" />
        </template>
        <DevDriveFile v-for="f in files" :key="f._id" :file="f" />
      </div>
      <br />
    </div>
  </div>
</template>

<script lang="ts">
import DevDriveFile from '@/components/DevDriveFile.vue';
import { IAWSFile } from '@/utils/interfaces';
import { Vue, Component } from 'vue-property-decorator';

@Component({
  components: {
    DevDriveFile
  }
})
export default class Drive extends Vue {
  get files(): IAWSFile[] | null {
    const files: IAWSFile[] | null = this.$store.getters.driveFiles;
    if (!files) return null;
    return files
      .filter(f => this.isInCurrentFolder(f))
      .sort((a, b) => a.originalname.localeCompare(b.originalname));
  }

  get folder(): string | null {
    return (this.$route.query.folder as string) || null;
  }

  get folders(): string[] {
    const files: IAWSFile[] | null = this.$store.getters.driveFiles;
    if (!files) return [];
    const folder = files
      .map(x => x.Location.split('.com/drive')[1])
      .map(x => x.split('/')[1])
      .filter(x => !x.includes('.'))
      .sort((a, b) => a.localeCompare(b));
    return [...new Set(folder)];
  }

  public isInCurrentFolder(f: IAWSFile): boolean {
    const path: string = f.Location.split('.com/drive')[1].split('/')[1];
    if (!this.folder && path.includes('.')) return true;
    return path === this.folder;
  }

  public newFolder(): void {
    const name = prompt('Create a new folder');
    if (name) {
      this.$router.push({
        name: 'drive',
        query: { folder: name }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.view-drive {
  .drive-items-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
    grid-auto-rows: 1fr;
    grid-gap: 40px 20px;

    &::before {
      content: '';
      width: 0;
      padding-bottom: 100%;
      grid-row: 1 / 1;
      grid-column: 1 / 1;
    }
    > *:first-child {
      grid-row: 1 / 1;
      grid-column: 1 / 1;
    }
  }

  [m-left] {
    margin-left: 10px;
  }

  .create-folder {
    display: grid;
    place-content: center;
    i {
      transform: rotate(45deg);
      font-size: 3em;
      cursor: pointer;
      opacity: 0.5;
      transition: 0.2s ease-in-out;
      &:hover {
        opacity: 1;
      }
    }
  }
}
</style>
