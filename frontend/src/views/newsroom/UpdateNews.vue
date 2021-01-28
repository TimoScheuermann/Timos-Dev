<template>
  <div class="view-update-news" content v-if="currentNews">
    <tc-input
      title="Title"
      v-model="updateDTO.title"
      :dark="$store.getters.darkmode"
      :placeholder="currentNews.title"
    />
    <tc-textarea
      title="News"
      v-model="updateDTO.content"
      :dark="$store.getters.darkmode"
      :placeholder="currentNews.content"
    />

    <tc-input
      type="file"
      title="Thumbnail"
      :dark="$store.getters.darkmode"
      @change="fileChanged"
    />

    <tc-input
      type="datetime-local"
      title="Date"
      :dark="$store.getters.darkmode"
      v-model="updateDTO.timestamp"
    />
    <br />
    <tl-grid minWidth="100" gap="10">
      <tc-select
        tfbackground="error"
        placeholder="Project"
        :dark="$store.getters.darkmode"
        @selectedItems="p => setProject(p[0])"
      >
        <tc-select-item
          v-for="p in projects"
          :key="p._id"
          :title="p.title"
          :icon="p.icon"
        />
      </tc-select>
      <tc-select
        tfbackground="error"
        placeholder="News-Type"
        :dark="$store.getters.darkmode"
        @selectedItems="
          t => (updateDTO.type = t && t[0] ? t[0].toLowerCase() : null)
        "
      >
        <tc-select-item title="Update" />
        <tc-select-item title="Release" />
        <tc-select-item title="Feature" />
      </tc-select>
    </tl-grid>

    <br />
    <tl-grid minWidth="100" gap="0">
      <tc-button
        :disabled="disabled"
        @click="updateNews"
        variant="filled"
        tfbackground="success"
        name="update news"
      />
      <tc-button
        :disabled="disabled"
        @click="deleteNews"
        variant="filled"
        tfbackground="error"
        name="remove news"
      />
    </tl-grid>

    <br />
    <tc-divider :dark="$store.getters.darkmode" />
    <br />

    <tc-input
      type="file"
      title="Featured"
      :dark="$store.getters.darkmode"
      @change="featuredChanged"
    />

    <br />
    <tl-grid minWidth="100" gap="0">
      <tc-button
        :disabled="disabled"
        @click="updateFeatured"
        variant="filled"
        tfbackground="success"
        name="update featured"
      />
      <tc-button
        :disabled="disabled"
        @click="removeFeatured"
        variant="filled"
        tfbackground="error"
        name="remove featured"
      />
    </tl-grid>
  </div>
</template>

<script lang="ts">
import backend from '@/utils/backend';
import { INewsExtended, IProject } from '@/utils/interfaces';
import { UpdateNewsDTO } from '@/utils/models';
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class UpdateNews extends Vue {
  public file: null | File = null;
  public featuredFile: null | File = null;
  public disabled = false;
  public updateDTO: UpdateNewsDTO = new UpdateNewsDTO();
  public projects: IProject[] | null = null;

  async mounted() {
    if (!this.projects) {
      backend
        .get('project')
        .then(res => {
          this.projects = res.data;
        })
        .catch(error => {
          alert(error.message);
        });
    }
    if (!this.currentNews) {
      const { data } = await backend.get('newsroom');
      this.$store.commit('setNews', data);
    }

    if (!this.currentNews) {
      this.$router.push({ name: 'newsroom' });
    } else {
      this.updateDTO = new UpdateNewsDTO();
      this.updateDTO._id = this.currentNews._id;
    }
  }

  get everyNews(): INewsExtended[] | null {
    return this.$store.getters.news;
  }

  get currentNews(): INewsExtended | null {
    if (!this.everyNews) return null;
    return (
      this.everyNews.filter(x => x._id === this.$route.params.id)[0] || null
    );
  }

  public setProject(name: string): void {
    this.updateDTO.project =
      (this.projects || []).filter(x => x.title === name).map(x => x._id)[0] ||
      '';
  }

  public featuredChanged(e: Event): void {
    const element = e.target as HTMLInputElement;
    if (element.files) {
      this.featuredFile = element.files[0];
    }
  }

  public fileChanged(e: Event): void {
    const element = e.target as HTMLInputElement;
    if (element.files) {
      this.file = element.files[0];
    }
  }

  public removeFeatured(): void {
    if (this.currentNews) {
      backend
        .delete('newsroom/featured/' + this.currentNews._id)
        .then(res => {
          this.$store.commit('addNews', res.data);
          this.$router.push({ name: 'newsroom' });
        })
        .catch(error => {
          this.disabled = false;
          alert(error.message);
        });
    }
  }

  public updateFeatured(): void {
    if (this.currentNews && this.featuredFile) {
      const formData = new FormData();
      formData.append('featured', this.featuredFile, this.featuredFile.name);
      backend
        .put('newsroom/featured/' + this.currentNews._id, formData)
        .then(res => {
          this.$store.commit('addNews', res.data);
          this.$router.push({ name: 'newsroom' });
        })
        .catch(error => {
          this.disabled = false;
          alert(error.message);
        });
    }
  }

  public updateNews(): void {
    if (this.disabled) return;
    this.disabled = true;

    const formData = new FormData();

    if (this.file) {
      formData.append('thumbnail', this.file, this.file.name);
    }

    Object.entries(this.updateDTO).forEach(([key, value]) => {
      if (value) {
        if (key === 'timestamp') {
          formData.append(key, '' + new Date(value).getTime());
        } else {
          formData.append(key, value);
        }
      }
    });

    backend
      .put('newsroom', formData)
      .then(res => {
        this.$store.commit('addNews', res.data);
        this.$router.push({ name: 'newsroom' });
      })
      .catch(error => {
        this.disabled = false;
        alert(error.message);
      });
  }

  public deleteNews(): void {
    const id = this.$route.params.id;
    backend.delete('newsroom/' + id);
    this.$store.commit('removeNews', id);
    this.$router.push({ name: 'newsroom' });
  }
}
</script>
