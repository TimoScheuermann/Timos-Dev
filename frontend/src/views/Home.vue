<template>
  <div class="home" content>
    <p v-if="!$store.getters.valid" @click="login">No signed in</p>
    <p v-else>{{ $store.getters.user }}</p>
    <!--
    <tc-input v-model="title" title="Title" type="text" />
    <tc-input type="file" title="Thumbnail" @change="fileChanged" />

    <tc-button @click="submit" name="submit"></tc-button>

    <img
      src="http://localhost:3000/newsroom/thumbnail/45f4f968011a0803245c8426b99d5817"
      alt=""
    /> -->
  </div>
</template>

<script lang="ts">
import { signIn } from '@/utils/auth';
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class EmptyRouter extends Vue {
  public title = 'news title';
  public file: null | File = null;

  public login(): void {
    signIn('google');
  }

  public fileChanged(e: Event): void {
    const element = e.target as HTMLInputElement;
    if (element.files) {
      this.file = element.files[0];
    }
  }

  public submit(): void {
    if (!this.file) return;
    const formData = new FormData();
    formData.append('thumbnail', this.file, this.file.name);
    formData.append('title', this.title);

    fetch('http://localhost:3000/newsroom', {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(json => console.log(json))
      .catch(err => console.log('Request Failed', err));
  }
}
</script>

<style lang="scss" scoped>
.home {
  max-width: 300px;
}
</style>
