<template>
  <div class="interim-drive">
    <tc-hero :dark="true">
      <input type="file" multiple @change="fileChanged" accept="image/*" />
    </tc-hero>
    <DevRouterView />
  </div>
</template>

<script lang="ts">
import DevRouterView from '@/components/DevRouter.vue';
import backend from '@/utils/backend';
import { IAWSFile } from '@/utils/interfaces';
import { Vue, Component } from 'vue-property-decorator';

@Component({
  components: {
    DevRouterView
  }
})
export default class InterimDrive extends Vue {
  mounted() {
    if (!this.files) {
      backend.get('drive').then(res => {
        res.data.forEach((f: IAWSFile) =>
          this.$store.commit('addDriveFile', f)
        );
      });
    }
  }

  get files(): IAWSFile[] | null {
    return this.$store.getters.driveFiles;
  }

  get driveFolder(): string {
    if (this.$route.query.folder) {
      return '/' + this.$route.query.folder;
    }
    return '';
  }

  public fileChanged(e: Event): void {
    const element = e.target as HTMLInputElement;
    if (element.files && element.files[0]) {
      Array.from(element.files)
        .filter(x => !!x)
        .forEach(f => {
          const formData = new FormData();
          formData.append('file', f, f.name);
          backend.post('drive' + this.driveFolder, formData).then(res => {
            this.$store.commit('addDriveFile', res.data);
          });
        });
      element.value = '';
      if (this.$route.name !== 'drive') {
        this.$router.push({ name: 'drive' });
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.interim-drive {
  input {
    display: inline-block;
    cursor: pointer;
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
}
</style>
