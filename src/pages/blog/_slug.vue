<template>
  <main
    id="main"
    class="main main--blog-post"
    role="main"
    data-page="Blog Post"
  >
    <article class="content content--blog-post blog-post">
      <section class="blog-post__inner">
        <div class="blog-post__column is-first">
          <a
            v-if="!$store.state.status.isMobile"
            class="blog-post__back"
            data-cursor="standard"
            data-aos="fade-right"
            data-aos-delay="400"
            @click="$router.back()"
          >
            <ArrowBack />
          </a>

          <h1 class="blog-post__title">
            {{ page.title }}
          </h1>

          <div class="blog-post__info" data-aos="fade-in">
            <span class="blog-post__date">
              {{ formatDate(page.createdAt) }}
            </span>
            <i class="divider" />
            <span v-if="page.category" class="blog-post__category">
              {{ page.category[0].label }}
            </span>
          </div>

          <nuxt-content :document="page" />
        </div>

        <div class="blog-post__column is-last" />
      </section>

      <Share
        :data="page.share"
        :title="page.title"
        :url="url"
        custom-class="share--blog"
      />

      <NewsLetter />
    </article>
  </main>
</template>

<script>
import ArrowBack from '~/svgs/arrow-back.svg';
import mixinGlobal from '~/mixins/global';
import NewsLetter from '~/components/NewsLetter.vue';
import Share from '~/components/Share/index.vue';

export default {
  components: {
    ArrowBack,
    NewsLetter,
    Share,
  },
  mixins: [mixinGlobal],
  asyncData({ route, $config, page }) {
    const url = `${$config.url}${route.path}`;

    // const [prev, next] = await $content(type)
    //   .only(['title', 'slug'])
    //   // .sortBy('createdAt', 'asc')
    //   .surround(page.slug)
    //   .fetch();

    // // console.log({
    // //   next, prev, page, type,
    // // });

    return {
      url,
      page,
      // prev,
      // next,
      // type,
    };
  },

  data() {
    return {
      url: '',
      // url: window.location.href,
    };
  },

  mounted() {
    this.url = window.location.href;
  },

  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString('en', options);
    },
  },
};
</script>

<style lang="postcss" scoped>
.blog-post {
  padding-top: var(--header-height);
  margin: auto;

  &__back {
    display: inline-block;
    margin-top: 1.8rem;
    margin-left: -1rem;
    color: var(--colour-font);
    transition: color 0.4s;

    &:hover {
      color: var(--colour-primary);
    }
  }

  &__inner {
    position: relative;
    display: grid;
    grid-template-columns: repeat(12, minmax(auto, var(--grid-width)));
    grid-column-gap: var(--gutter-space);
    justify-content: space-between;
    width: 100%;
    padding: 0 var(--grid-margin);
    margin-bottom: var(--space-l);
  }

  &__column {
    &.is-first {
      grid-column-start: 3;
      grid-column-end: 7;
    }

    &.is-last {
      grid-column-start: 7;
      grid-column-end: 11;
      padding-top: calc(33px + 2rem + var(--content-space) + 1em + 1.8rem);
    }
  }

  &__title {
    margin-top: var(--content-space);
    font-size: 4.66666666667em;
  }

  &__info {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 5rem;
    font-size: var(--fsize-s);
    font-weight: 500;

    .divider {
      display: inline-block;
      width: 0;
      height: 2px;
      margin: 0 10px;
      background-color: currentColor;
      transition: width 0.4s;
      transition-delay: 0.4s;
    }

    &.aos-animate {
      .divider { width: 35px; }
    }
  }
}

.share--blog {
  margin-bottom: var(--space-l);
}
</style>
