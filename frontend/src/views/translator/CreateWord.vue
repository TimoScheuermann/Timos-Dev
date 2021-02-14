<template>
  <div class="view-create-word" max-width content>
    <tc-input
      :title="alreadyExists ? 'Acronym does already exist' : 'Acronym'"
      v-model="createDTO.acronym"
      :dark="$store.getters.darkmode"
    />
    <tc-input
      title="Meaning"
      v-model="createDTO.meaning"
      :dark="$store.getters.darkmode"
    />
    <tc-textarea
      title="Description"
      v-model="createDTO.description"
      :dark="$store.getters.darkmode"
    />
    <br />

    <tl-grid>
      <tc-button
        :disabled="alreadyExists || disabled"
        @click="submit"
        variant="filled"
        tfbackground="error"
        name="add word"
      />
    </tl-grid>
  </div>
</template>

<script lang="ts">
import backend from '@/utils/backend';
import { IWord } from '@/utils/interfaces';
import { CreateWordDTO } from '@/utils/models';
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class CreateWord extends Vue {
  public createDTO: CreateWordDTO = new CreateWordDTO();
  public disabled = false;

  get alreadyExists(): boolean {
    const words: IWord[] | null = this.$store.getters.words;
    if (!words) return false;
    return (
      words.filter(
        x => x.acronym.toLowerCase() === this.createDTO.acronym.toLowerCase()
      ).length > 0
    );
  }

  public submit(): void {
    if (this.disabled || this.alreadyExists) return;
    this.disabled = true;
    backend
      .post('translator', this.createDTO)
      .then(res => {
        this.$store.commit('addWord', res.data);
        this.$router.push({ name: 'translator' });
      })
      .catch(error => {
        this.disabled = false;
        alert(error.message);
      });
  }
}
</script>
