<template>
  <div class="view-login">
    <div content>
      <img src="pwa/maskIcon.svg" alt="" />
      <h1 center>Sign in to continue</h1>
      <tc-list :dark="$store.getters.darkmode">
        <tc-list-item
          icon="google"
          title="Sign in with Google"
          @click="signIn('google')"
        />
      </tc-list>
    </div>

    <svg preserveAspectRatio="none" viewBox="0 0 375 183">
      <path
        d="M-717-3074v-181.934A119.99,119.99,0,0,1-701-3257c65.722,0,72.625,68.7,130.662,81.912,23.875,5.436,49.4-14.732,79.122-34.9,40.055-27.183,87.718-54.368,149.216-18.86V-3074Z"
        transform="translate(717 3257)"
      />
    </svg>
  </div>
</template>

<script lang="ts">
import { signIn } from '@/utils/auth';
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Login extends Vue {
  public signIn(provider = 'google'): void {
    signIn(provider);
  }
}
</script>

<style lang="scss" scoped>
.view-login {
  height: 100vh;
  max-width: 400px;
  margin: auto;
  display: grid;
  place-content: center;
  text-align: center;

  [content] {
    position: relative;
    img {
      max-width: 80px;
    }
    h1 {
      white-space: nowrap;
      margin: 20px 0;
    }
    padding: 20px 10vw;
  }

  svg {
    z-index: -1;
    position: fixed;
    bottom: 0;
    left: 0;
    height: 150px;
    width: 100vw;
    fill: $paragraph;
    @media #{$isDark} {
      fill: $paragraph_dark;
    }
  }
}
</style>
