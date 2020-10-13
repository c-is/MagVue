import { gsap } from 'gsap';
import Collection from '~/components/Collection/index.vue';
import mixinGlobal from './global';

const TRANSITION_EASE = 'power3.out';
const TRANSITION_TIMING = 0.8;

const pagination = {
  getPostsOfPage({
    $content,
    type,
    page,
    category,
    size = 9,
  }) {
    const content = $content(type);

    if (category) {
      content.where({ 'type.value': { $contains: category } });
    }

    return content
      .sortBy('published', 'desc')
      .skip(size * (page - 1))
      .limit(size)
      .fetch();
  },

  async getNumberOfPages({
    $content,
    type,
    category,
    size = 9,
  }) {
    if (category) {
      return Math.ceil((await $content(type).where({ 'type.value': { $contains: category } }).only([]).fetch()).length / size);
    }
    return Math.ceil((await $content(type).only([]).fetch()).length / size);
  },
};

async function getPosts({
  $content,
  type,
  category,
  size = 9,
  current,
}) {
  const pageCount = await pagination.getNumberOfPages({
    $content,
    type,
    category,
    size,
  });

  const pageWithCategory = pageCount > 1 ? current : 1;

  const posts = await pagination.getPostsOfPage({
    $content,
    category,
    type,
    page: pageWithCategory,
    size,
  });

  const index = pageCount > 1 ? await (
    $content(type)
      .only(['title', 'path'])
      .skip(size * (pageCount - current))
      .limit(size)
      .fetch()
  ) : null;

  return {
    pageCurrent: pageWithCategory,
    pageCount,
    posts,
    index,
  };
}

export default {
  components: { Collection },
  mixins: [mixinGlobal],
  async asyncData({
    $content,
    $config,
    query,
    route,
    page,
  }) {
    // eslint-disable-next-line
    const pageCurrent = parseInt(query.page || '1') || 1;
    const category = query.category || null;

    const { pageCount, posts, index } = await getPosts({
      $content,
      category,
      type: route.name,
      size: $config.postSize,
      current: pageCurrent,
    });

    // const page = await $content(`page/${route.name}`, { deep: true }).fetch();
    const categories = await $content('page/categories')
      // .where({ 'categories.type': { $contains: 'categories' } });
      .fetch();

    return {
      page,
      index,
      posts,
      pageCurrent,
      pageCount,
      categories: categories.categories
        ? categories.categories.filter(c => c.type === route.name) : [],
    };
  },

  data() {
    return {
      categories: [],
      posts: [],
      page: {},
      // page: {},
      pageCurrent: 1,
      pageCount: 1,
      index: null,
      category: null,
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
        type: this.$route.name,
        page: this.pageCurrent,
        category: this.category,
        size: this.$config.postSize,
      });

      this.index = this.pageCount > 1 ? await (
        this.$content(this.$route.name)
          .only(['title'])
          .skip(this.$config.postSize * (this.pageCount - this.pageCurrent))
          .limit(this.$config.postSize)
          .fetch()
      ) : null;

      this.$router.replace({
        path: this.$route.path,
        query: { page: this.pageCurrent, category: this.category },
      });
    },

    async category() {
      this.isLoading = true;

      const {
        pageCount,
        pageCurrent,
        posts,
        index,
      } = await getPosts({
        $content: this.$content,
        category: this.category,
        type: this.$route.name,
        size: this.$config.postSize,
        current: this.pageCurrent,
      });

      this.pageCount = pageCount;
      this.pageCurrent = pageCurrent;
      this.posts = posts;
      this.index = index;

      this.$router.replace({
        path: this.$route.path,
        query: { page: this.pageCurrent, category: this.category },
      });

      this.isLoading = false;
    },
  },

  methods: {
    paginate(page) {
      this.pageCurrent = Number(page);
    },
    setCategory(selected) {
      this.category = selected;
    },
  },

  transition(to, from) {
    return {
      css: false,
      mode: 'out-in',
      async leave(el, done) {
        if (to.name === 'index') {
          const OUTER_PADDING = window.innerWidth * 0.0935;
          const doc = document.documentElement;
          const drawer = el.querySelector('.js-drawer');
          const st = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);

          gsap.set('.anim-drawer-inner', {
            width: window.innerWidth / 2,
            padding: OUTER_PADDING,
          });

          gsap.to(window, {
            scrollTo: 0,
            ease: 'circ.inOut',
            duration: TRANSITION_TIMING,
          });

          await gsap.to('.content', {
            y: -20,
            opacity: 0,
            ease: 'circ.inOut',
            delay: st > 0 ? 0.8 : 0,
            duration: 0.6,
          });

          // const drawerWidth = (drawer.clientWidth / window.innerWidth) * 100;
          // console.log({ offsetWidth: drawer.clientWidth, window: window.innerWidth });

          await gsap.to(drawer, {
            width: '50%',
            ease: TRANSITION_EASE,
            delay: 0.2,
            duration: TRANSITION_TIMING,
          });
        } else {
          await gsap.to(el, {
            opacity: 0, y: -20, duration: 0.4, ease: 'back',
          });
        }

        done();
      },
      beforeEnter(el) {
        if (from.name !== 'index') {
          gsap.set(el, { opacity: 0 });
        }

        const content = el.querySelector('.content');
        if (content) {
          gsap.set(content, { opacity: 0, y: 20 });
        }
      },
      async enter(el, done) {
        if (from.name !== 'index') {
          gsap.to(el, { opacity: 1, duration: 0.4 });
        }

        const content = el.querySelector('.content');

        if (content) {
          await gsap.to(content, {
            opacity: 1, y: 0, duration: 0.4, ease: 'back',
          });
          gsap.set(content, { clearProps: 'all' });
        }

        done();
      },
    };
  },
};
