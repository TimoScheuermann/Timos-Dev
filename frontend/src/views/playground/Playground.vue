<template>
  <div class="playground" content>
    <h1>Playground</h1>

    <tl-flow flow="column">
      <br />
      <tc-input @change="fileChanged" :dark="true" type="file" />
    </tl-flow>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Playground extends Vue {
  public fileChanged(e: Event): void {
    const element = e.target as HTMLInputElement;
    if (element.files && element.files[0]) {
      const file = element.files[0];
      const formData = new FormData();
      formData.append('file', file, file.name);
      element.value = '';
      // backend.post('drive', formData).then(res => {
      //   console.log('Data', res.data);
      // });
    }
  }
}
</script>
