<template>
  <div class="view-newsroom" content max-width>
    <tl-flow flow="column" v-if="!news">
      <tc-spinner size="20" :dark="$store.getters.darkmode" />
      <p>Loading news</p>
    </tl-flow>

    <template v-else>
      <tl-flow horizontal="space-between">
        <h2>Newsroom</h2>
        <tc-button
          routeName="create-news"
          tfbackground="error"
          name="add"
          variant="opaque"
        />
      </tl-flow>

      <p v-if="news.length === 0">There are no news yet...</p>

      <template v-else>
        <br />
        <tc-segments :value="0" :dark="$store.getters.darkmode">
          <tc-segment-item title="List">
            <tc-list :dark="$store.getters.darkmode">
              <tc-list-item
                v-for="n in news"
                :key="n._id"
                :title="n.title"
                :description="n.type"
                :to="{ name: 'update-news', params: { id: n._id } }"
              />
            </tc-list>
          </tc-segment-item>
          <tc-segment-item title="Card">
            <div class="news-cards">
              <DevNewsPreview v-for="n in news" :key="n._id" :news="n" />
            </div>
          </tc-segment-item>
        </tc-segments>
      </template>
    </template>

    <br />
    <tc-button
      name="Create Icon Thumbnail"
      icon="timos-icons"
      variant="filled"
      tfbackground="error"
      routeName="generate-icon-thumbnail"
    />
  </div>
</template>

<script lang="ts">
import DevNewsPreview from '@/components/DevNewsPreview.vue';
import backend from '@/utils/backend';
import { INewsExtended } from '@/utils/interfaces';
import { Vue, Component } from 'vue-property-decorator';

@Component({
  components: {
    DevNewsPreview
  }
})
export default class Newsroom extends Vue {
  mounted() {
    if (!this.news) {
      backend
        .get('newsroom')
        .then(res => {
          this.$store.commit('setNews', res.data);
        })
        .catch(error => {
          alert(error.message);
        });
    }
  }

  get news(): INewsExtended[] | null {
    return this.$store.getters.news;
  }
}
</script>

<style lang="scss" scoped>
.news-cards {
  @media only screen and(min-width: 400px) {
    columns: 2;
  }
  @media only screen and(min-width: 600px) {
    columns: 3;
  }
  @media only screen and(min-width: 800px) {
    columns: 4;
  }
  @media only screen and(min-width: 1000px) {
    columns: 5;
  }
}
.tc-list {
  max-height: 400px;
  overflow: auto;
  @include custom-scrollbar__dark();
}
</style>
