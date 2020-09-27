import Collection from '../components/Collection/index.vue';
import mixinGlobal from './global';

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

    const page = await $content(`page/${route.name}`, { deep: true }).fetch();
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
};
