<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <start-page msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import StartPage from '@/components/StartPage.vue'; // @ is an alias to /src

@Component({
  components: {
      StartPage,
  },
})
export default class Home extends Vue {}
</script>
