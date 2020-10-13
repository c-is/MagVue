<template>
  <main
    id="main"
    class="main main--coming-soon"
    role="main"
    data-page="Coming Soon"
  >
    <article class="content content--coming-soon coming-soon">
      <Hero
        :page="page"
        :type="type"
        class-name="coming-soon"
        bg-colour="#2727ff"
      />
    </article>
  </main>
</template>

<script>
import mixinGlobal from '~/mixins/global';
import Hero from '~/components/Collection/Hero.vue';

export default {
  components: { Hero },
  mixins: [mixinGlobal],
  data() {
    return {
      page: { title: 'Coming Soon' },
      type: this.$route.query ? this.$route.query.type : null,
    };
  },
};
</script>

<style lang="postcss" scoped>
  .main {
    background-color: var(--colour-bg-secondary);
  }
</style>
