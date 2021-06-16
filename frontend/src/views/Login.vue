<template>
  <div class="view-login">
    <div content>
      <vm-flow>
        <img src="pwa/maskIcon.svg" alt="" />
        <vm-title title="Sign in" subtitle="Timos | Dev" />
      </vm-flow>
      <vm-list>
        <vm-list-item
          title="Sign in width Google"
          icon="ti-google"
          @click="signIn('google')"
        >
          <i slot="media" class="ti-google"></i>
        </vm-list-item>
      </vm-list>
    </div>
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

  [content] {
    position: relative;
    padding: env(safe-area-inset-top) env(safe-area-inset-right)
      env(safe-area-inset-bottom) env(safe-area-inset-left);

    img {
      max-height: 40px;
    }

    .vm-list {
      margin-top: 20px;
    }
  }
}
</style>
