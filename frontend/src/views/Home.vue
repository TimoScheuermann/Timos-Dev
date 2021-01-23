<template>
  <div class="view-home">
    <tc-hero :hasFixedHeader="false" :dark="$store.getters.darkmode">
      <img src="pwa/maskIcon.svg" alt="" />
      <h1 center>Dev</h1>
    </tc-hero>

    <div content>
      <tl-grid>
        <DevProjectCard
          :dark="false"
          subtitle="Manage news"
          title="Timo's Newsroom"
          :background="$newsroomBanner"
          :to="{ name: 'newsroom' }"
        />
        <DevProjectCard
          :dark="true"
          subtitle="Manage translations"
          title="Timo's Translator"
          :background="$translatorBanner"
          :to="{ name: 'translator' }"
        />
      </tl-grid>
    </div>
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
import DevProjectCard from '@/components/DevProjectCard.vue';
import { signIn } from '@/utils/auth';
import { Vue, Component } from 'vue-property-decorator';

@Component({
  components: {
    DevProjectCard
  }
})
export default class Home extends Vue {
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
.view-home {
  .tc-hero {
    img {
      margin-top: env(safe-area-inset-top);
      max-height: 80px;
    }
  }
}
</style>
