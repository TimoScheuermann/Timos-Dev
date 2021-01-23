<template>
  <div class="view-edit-word" v-if="word" content>
    <tc-input
      title="Acronym"
      v-model="updateDTO.acronym"
      :dark="$store.getters.darkmode"
      :placeholder="word.acronym"
    />
    <tc-input
      title="Meaning"
      v-model="updateDTO.meaning"
      :dark="$store.getters.darkmode"
      :placeholder="word.meaning"
    />
    <tc-textarea
      title="Description"
      v-model="updateDTO.description"
      :dark="$store.getters.darkmode"
      :placeholder="word.description"
    />
    <br />

    <tl-grid minWidth="100" gap="0">
      <tc-button
        :disabled="disabled"
        @click="updateWord"
        variant="filled"
        tfbackground="success"
        name="update word"
      />
      <tc-button
        :disabled="disabled"
        @click="deleteWord"
        variant="filled"
        tfbackground="error"
        name="remove word"
      />
    </tl-grid>
  </div>
</template>

<script lang="ts">
import backend from '@/utils/backend';
import { IWord } from '@/utils/interfaces';
import { UpdateWordDTO } from '@/utils/models';
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class EditWord extends Vue {
  public updateDTO: UpdateWordDTO = new UpdateWordDTO();
  public disabled = false;

  async mounted() {
    if (!this.word) {
      const { data } = await backend.get('translator');
      this.$store.commit('setWords', data);
    }

    if (!this.word) {
      this.$router.push({ name: 'translator' });
    } else {
      this.updateDTO = new UpdateWordDTO();
      this.updateDTO._id = this.word._id;
    }
  }

  get word(): IWord | null {
    const words: IWord[] | null = this.$store.getters.words;
    if (!words || words.length === 0) return null;
    return words.filter(x => x._id === this.$route.params.id)[0] || null;
  }

  public updateWord(): void {
    if (this.disabled) return;
    this.disabled = true;
    backend
      .put('translator', this.updateDTO)
      .then(res => {
        this.$store.commit('addWord', res.data);
        this.$router.push({ name: 'translator' });
      })
      .catch(error => {
        this.disabled = false;
        alert(error.message);
      });
  }

  public deleteWord(): void {
    if (this.disabled) return;
    this.disabled = true;
    const id = this.$route.params.id;
    backend
      .delete(`translator/${id}`)
      .then(() => {
        this.$store.commit('removeWord', id);
        this.$router.push({ name: 'translator' });
      })
      .catch(error => {
        this.disabled = false;
        alert(error.message);
      });
  }
}
</script>
