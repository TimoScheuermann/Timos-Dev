<template>
  <div class="view-translator" content>
    <tl-flow flow="column" v-if="!words">
      <tc-spinner size="20" :dark="$store.getters.darkmode" />
      <p>Loading words</p>
    </tl-flow>

    <template v-else>
      <tl-flow horizontal="space-between">
        <h2>Translations</h2>
        <tc-button
          routeName="create-word"
          tfbackground="error"
          name="add"
          variant="opaque"
        />
      </tl-flow>

      <p v-if="words.length === 0">There are no words yet...</p>

      <template v-else>
        <br />
        <tc-list :dark="$store.getters.darkmode">
          <tc-list-item
            v-for="w in words"
            :key="w._id"
            :title="w.acronym"
            :to="{ name: 'edit-word', params: { id: w._id } }"
          />
        </tc-list>
      </template>
    </template>
  </div>
</template>

<script lang="ts">
import backend from '@/utils/backend';
import { IWord } from '@/utils/interfaces';
import { Vue, Component } from 'vue-property-decorator';
@Component
export default class Translator extends Vue {
  mounted() {
    if (!this.words) {
      backend
        .get('translator')
        .then(res => {
          this.$store.commit('setWords', res.data);
        })
        .catch(error => {
          alert(error.message);
        });
    }
  }

  get words(): IWord[] | null {
    return this.$store.getters.words;
  }
}
</script>
