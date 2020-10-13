<template>
  <main
    id="main"
    class="main main--blog"
    role="main"
    data-page="Blog"
  >
    <article class="content content--post post">
      <Hero
        :page="page"
        class-name="blog"
        bg-colour="#fff"
        type="blog"
      >
        <BlogFilter
          v-if="categories"
          :categories="categories"
          :years="years"
          :selected-category="category"
          :selected-year="year"
          :on-filter="handleFilter"
        />
      </Hero>

      <div class="inner">
        <section ref="list" class="posts">
          <fragment v-if="posts.length > 0">
            <article
              v-for="item in posts"
              :key="item.title"
              class="item"
              :style="getItemStyle(item.textColour, item.backgroundColour)"
            >
              <div class="item__inner">
                <div class="item__head">
                  <img
                    v-if="item.thumbnail"
                    :src="item.thumbnail"
                    alt="Thumbnail"
                    class="item__thumbnail"
                  >
                  <h2 class="item__title">
                    {{ item.title }}
                  </h2>

                  <div class="item__info" data-aos="fade-in">
                    <span class="item__date">
                      {{ formatDate(item.createdAt) }}
                    </span>
                    <i class="divider" />
                    <span v-if="item.category" class="item__category">
                      {{ item.category[0].label }}
                    </span>
                  </div>
                </div>
                <div class="item__content">
                  <div class="item__description">
                    <div v-html="item.excerpt" />
                    <!-- <nuxt-content :document="item" excerpt /> -->
                  </div>
                  <nuxtLink
                    v-tilt
                    class="item__button"
                    data-cursor="standard"
                    :to="item.path"
                    :style="getButtonStyle(item.buttonTextColour, item.buttonColour)"
                  >
                    Read
                  </nuxtLink>
                </div>
              </div>
            </article>
          </fragment>
          <article v-else class="item not-found">
            <h3>No blog is found</h3>
          </article>
        </section>

        <Sidebar :on-search="setFilter" />
      </div>

      <div v-if="posts.length > 0" class="pagination-container">
        <Pagination :total="pageCount" :current="pageCurrent" :on-click="handlePaginate" />
      </div>

      <NewsLetter />
    </article>
  </main>
</template>

<script>
import { gsap } from 'gsap';
import mixinGlobal from '~/mixins/global';
import Pagination from '~/components/Pagination.vue';
import NewsLetter from '~/components/NewsLetter.vue';
import Hero from '~/components/Collection/Hero.vue';
import BlogFilter from './-Filter.vue';
import Sidebar from './-Sidebar.vue';
// eslint-disable-next-line
import { getPosts, pagination } from './-post';

const POSTS_PER_PAGE = 5;

export default {
  components: {
    Hero,
    Pagination,
    BlogFilter,
    NewsLetter,
    Sidebar,
  },

  mixins: [mixinGlobal],

  async asyncData({
    $content,
    // $config,
    query,
    route,
    page,
  }) {
    // eslint-disable-next-line
    const pageCurrent = parseInt(query.page || '1') || 1;
    const category = query.category || 0;
    const year = query.year || null;
    const search = query.year || '';
    const instance = await $content('blog').only(['createdAt']).fetch();

    const count = category
      ? Math.ceil((
        await $content('blog')
          .where({ 'type.value': { $contains: category } })
          .only([])
          .fetch()
      ).length / POSTS_PER_PAGE)
      : Math.ceil((instance).length / POSTS_PER_PAGE);

    const years = [];

    if (instance) {
      instance.forEach(post => {
        const fullYear = new Date(post.createdAt).getFullYear();
        const match = years.find(y => y === String(fullYear));
        if (!match) years.push(String(fullYear));
      });
    }

    const { pageCount, posts, index } = await getPosts({
      $content,
      category,
      year,
      search,
      count,
      type: route.name,
      // size: $config.postSize,
      current: pageCurrent,
    });

    const categories = await $content('page/blog-categories').fetch();

    return {
      index,
      posts,
      pageCurrent,
      pageCount,
      years,
      search,
      categories: categories.categories,
      category,
      year,
      page,
    };
  },

  data() {
    return {
      page: {},
      pageCount: 1,
      pageCurrent: 1,
      category: 0,
      years: [],
      search: '',
      year: null,
      isLoading: false,
    };
  },

  watch: {
    $route() {
      if (this.$store.state.widgets && this.$store.state.widgets.cursor) {
        this.$store.state.widgets.cursor.reset();
      }
    },

    async pageCurrent() {
      if (this.isLoading) return;

      this.posts = await pagination.getPostsOfPage({
        $content: this.$content,
        page: this.pageCurrent,
        category: this.category,
        year: this.year,
        search: this.search,
        // size: this.$config.postSize,
      });

      this.$router.replace({
        path: this.$route.path,
        query: {
          page: this.pageCurrent,
          category: this.category,
          year: this.year,
          s: this.search,
        },
      });
    },

    category() {
      this.onFilter();
    },

    year() {
      this.onFilter();
    },

    search() {
      this.onFilter();
    },
  },

  methods: {
    async handlePaginate(index) {
      if (this.$refs.list) {
        await gsap.to(this.$refs.list, 0.4, { opacity: 0 });
        this.paginate(index);
        await gsap.to(window, 0.4, { scrollTo: this.$refs.list.offsetTop - (15 * 6.666) });
        await gsap.to(this.$refs.list, 0.4, { opacity: 1 });
      }
    },

    async handleFilter(key, selected) {
      if (this.$refs.list) {
        await gsap.to(this.$refs.list, 0.4, { opacity: 0 });
        this.setFilter(key, selected);
        await gsap.to(window, 0.4, { scrollTo: this.$refs.list.offsetTop - (15 * 6.666) });
        await gsap.to(this.$refs.list, 0.4, { opacity: 1 });
      }
    },

    async onFilter() {
      this.isLoading = true;

      const { pageCount, pageCurrent, posts } = await getPosts({
        $content: this.$content,
        category: this.category,
        year: this.year,
        search: this.search,
        // size: this.$config.postSize,
        current: this.pageCurrent,
      });

      this.pageCount = pageCount;
      this.pageCurrent = pageCurrent;
      this.posts = posts;

      this.$router.replace({
        path: this.$route.path,
        query: {
          page: this.pageCurrent,
          category: this.category,
          year: this.year,
          s: this.search,
        },
      });

      this.isLoading = false;
    },

    paginate(page) {
      this.pageCurrent = Number(page);
    },

    setFilter(key, selected) {
      this[key] = selected;
    },

    getItemStyle(colour, background) {
      const styles = {};

      if (colour) {
        styles.color = `var(--${colour[0].value})`;
      }

      if (background) {
        styles.backgroundColor = `var(--${background[0].value})`;
      }

      return styles;
    },

    getButtonStyle(colour, background) {
      const styles = {};

      if (colour) {
        styles.color = `var(--${colour[0].value})`;
      }

      if (background) {
        styles.backgroundColor = `var(--${background[0].value})`;
      }

      return styles;
    },

    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString('en', options);
    },
  },
};
</script>

<style lang="postcss" scoped>
.inner {
  display: flex;
  justify-content: space-between;
  padding: 0 var(--grid-margin);
  margin-top: -20vh;
}

.posts {
  width: 65.5%;
}

.item {
  position: relative;
  padding-top: 50%;
  overflow: hidden;

  &__inner {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    width: 100%;
    height: 100%;
  }

  &__head {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 50%;
    height: 100%;
  }

  &__thumbnail {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    width: 50%;
    height: 100%;
    padding: 54px 75px;
    margin: auto;
    margin-bottom: 0;
  }

  &__description {
    max-height: 66.666%;
    overflow: hidden;
  }

  &__button {
    display: inline-flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 70px;
    height: 70px;
    margin-top: 2rem;
    border: none;
    border-radius: 50%;
    outline: none;
  }

  &__info {
    display: flex;
    align-items: center;
    justify-content: space-between;
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

  &__category {
    position: relative;

    &::before {
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 100%;
      height: 2px;
      content: '';
      background-color: currentColor;
      opacity: 0;
      transition: opacity 0.4s;
      transition-delay: 0.8s;

      .aos-animate & {
        opacity: 1;
      }
    }
  }
}

.not-found {
  display: block;
  margin-top: 1rem;
  font-size: 17px;
  text-align: center;
}

.pagination-container {
  margin-bottom: var(--space-s);
}
</style>
