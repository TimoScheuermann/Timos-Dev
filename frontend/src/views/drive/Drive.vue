<template>
  <div class="view-drive" content>
    <tl-flow horizontal="space-between">
      <h2>Drive</h2>
      <tc-spinner v-if="!files" :dark="true" size="20" />
      <h3 v-else>{{ files.length }} Files</h3>
    </tl-flow>

    <input type="file" multiple @change="filesLoaded" accept="image/*" />

    <div class="file-list">
      <div class="file-list-item" v-for="f in uploadFiles" :key="f.name">
        <span>{{ f.name }}</span>
        <i @click="removeFile(f.name)" class="ti-cross-circle-filled" />
      </div>
    </div>

    <tc-button
      name="upload files"
      tfbackground="error"
      variant="filled"
      icon="upload"
      @click="upload"
    />

    <tl-flow horizontal="end">
      <tc-checkbox
        :dark="true"
        title="Change View"
        iconChecked="tiles-four"
        iconAnimation="flip"
        iconUnchecked="list"
        v-model="gridView"
      />
    </tl-flow>

    <br />
    <tl-grid v-if="gridView" arrangement="auto-fill">
      <div class="file-tile" v-for="f in files" :key="f._id">
        <img :src="f.filename" :alt="f.originalname" />
        <div class="container">
          <button cop @click="copyFileUrl(f)">
            <i class="ti-link" />
          </button>
          <button del @click="deleteItem(f)">
            <i class="ti-trashcan-alt" />
          </button>
        </div>
      </div>
    </tl-grid>

    <tc-list :dark="true" v-else>
      <tc-list-item v-for="f in files" :key="f._id" :title="f.originalname" />
    </tc-list>
  </div>
</template>

<script lang="ts">
import backend from '@/utils/backend';
import { backendURL } from '@/utils/constants';
import { copyToClipboard } from '@/utils/functions';
import { IDriveItem } from '@/utils/interfaces';
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Drive extends Vue {
  public uploadFiles: File[] = [];
  public gridView = true;

  public files: IDriveItem[] | null = null;

  mounted() {
    if (!this.files) {
      backend.get('drive/files').then(res => {
        if (!this.files) this.files = [];
        this.files.push(...res.data);
      });
    }
  }

  public removeFile(name: string) {
    this.uploadFiles = this.uploadFiles.filter(x => x.name !== name);
  }

  public filesLoaded(e: Event): void {
    const element = e.target as HTMLInputElement;
    if (element.files) {
      Array.from(element.files).forEach(f => {
        if (this.uploadFiles.filter(x => x.name !== f.name)) {
          this.uploadFiles.push(f);
        }
      });
    }
  }

  public deleteItem(f: IDriveItem): void {
    if (this.files) {
      backend.delete('drive/' + f._id);
      this.files = this.files.filter(x => x._id !== f._id);
    }
  }

  public copyFileUrl(f: IDriveItem): void {
    copyToClipboard(f.filename);
  }

  public upload(): void {
    if (this.uploadFiles.length === 0) return;
    const formData = new FormData();
    this.uploadFiles.forEach(x => {
      formData.append('files[]', x, x.name);
    });

    this.uploadFiles = [];

    backend
      .put('drive', formData)
      .then(res => {
        if (!this.files) this.files = [];
        this.files.push(...res.data);
      })
      .catch(error => {
        alert(error.message);
      });
  }
}
</script>

<style lang="scss" scoped>
.view-drive {
  input {
    display: inline-block;
    width: 100%;
    padding: 120px 0 0 0;
    height: 100px;
    overflow: hidden;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    outline: none;
    box-sizing: border-box;
    background: url('https://cdn1.iconfinder.com/data/icons/hawcons/32/698394-icon-130-cloud-upload-512.png')
      center center no-repeat $paragraph_dark;
    border-radius: $border-radius;
    background-size: 60px 60px;
  }

  .file-list {
    display: flex;
    flex-wrap: wrap;
    .file-list-item {
      padding: 5px;
      background: $container_dark;
      border-radius: $border-radius;
      margin: 3px;
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        margin: 0 5px;
        white-space: nowrap;
      }
      i {
        font-size: 18px;
        cursor: pointer;
        margin-left: 5px;
      }
    }
  }

  .file-tile {
    position: relative;
    height: 200px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .container {
      position: absolute;
      bottom: 0;
      right: 0;
      left: 0;
      padding: 50px 10px 10px;
      background: linear-gradient(to top, black, transparent);
      display: flex;
      justify-content: flex-end;
      button {
        &[del] {
          color: $color_dark;
          background: $error;
        }
        border: none;
        outline: none;
        padding: 7.5px 15px;
        margin-left: 10px;
        border-radius: $border-radius;
        cursor: pointer;

        opacity: 0.5;
        &:hover {
          opacity: 1;
        }
      }
    }
  }
}
</style>
