<template>
  <div class="view-generate-icon-thumbnail" content max-width>
    <h2 center>Generate Icon Thumbnail</h2>
    <br />

    <tc-select
      :dark="true"
      @selectedItems="v => (selectedVersion = v[0])"
      placeholder="Select version"
    >
      <tc-select-item
        v-for="(v, i) in versions"
        :key="v"
        :title="v"
        :defaultSelected="i === 0"
      />
    </tc-select>

    <template v-if="selectedVersion">
      <tl-grid gap="0 10" minWidth="20">
        <tc-input
          v-model="color"
          title="Color"
          placeholder="#Text Color"
          :dark="true"
        />
        <tc-input
          v-model="gradient"
          title="Gradient"
          placeholder="Paste css gradient here"
          :dark="true"
        />
      </tl-grid>

      <div class="container" :style="style">
        <div class="icon" v-for="(n, i) in names" :key="i">
          <i :class="'ti-' + n" />
        </div>
        <img src="assets/ti-logo.svg" alt="" />
      </div>

      <h3>Title</h3>
      <p>Timo's Icons v{{ selectedVersion }} has been released</p>

      <h3>Content</h3>
      <p>
        This update brings {{ iconNamesOfVersion.length }} new icons. Featuring
        {{
          iconNamesOfVersion
            .join(', ')
            .split('-')
            .join(' ')
        }}
      </p>
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class GenerateIconThumbnail extends Vue {
  public icons: Record<string, string>[] = [];
  public selectedVersion: string | null = null;
  public gradient = '';
  public color = '#fff';

  get style(): string {
    let style = '';
    if (this.color.length > 3) {
      style += `color:${this.color};`;
    }
    if (this.gradient.length > 20) {
      style += `${this.gradient}`;
    }
    return style;
  }

  mounted() {
    if (this.icons.length === 0)
      fetch(
        'https://raw.githubusercontent.com/TimoScheuermann/Timos-Icons/master/public/resources/icons.json'
      )
        .then(res => res.json())
        .then(res => (this.icons = res));
  }

  get versions(): string[] {
    return [...new Set(this.icons.map(x => x.version))];
  }

  get iconNamesOfVersion(): string[] {
    if (!this.selectedVersion) {
      return [];
    }
    return [...this.icons]
      .filter(x => x.version === this.selectedVersion)
      .map(x => x.name);
  }

  get names(): string[] {
    if (!this.selectedVersion) {
      return [];
    }
    const req = 12 * 4;
    const names = [...this.iconNamesOfVersion];
    const orgLength = names.length;
    for (let i = orgLength - 1; i < req; i++) {
      names.push(names[i % (orgLength - 1)]);
    }
    if (names.length > req) names.splice(req);
    return names;
  }
}
</script>

<style lang="scss" scoped>
.tc-select,
.tl-grid {
  max-width: 400px;
  margin: 0 auto;
}

.container {
  margin: 30px auto;
  height: 180px;
  padding: 10px;
  width: 580px;
  background: #eaeaec;

  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 20px;

  .icon {
    height: 30px;
    width: 30px;
    display: grid;
    place-content: center;
    font-size: 24px;
  }

  position: relative;

  img {
    position: absolute;
    z-index: 10;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: 0;
    padding: 0;
    // background: inherit;
    backdrop-filter: saturate(180%) blur(20px);
  }
}
</style>
