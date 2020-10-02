import { $content as ContentType } from '@nuxt/content';

interface GetNumberOfPages {
  $content: typeof ContentType;
  category?: string | null;
  size: number;
  year?: string;
  search?: string;
}

interface GetPostsOfPage extends GetNumberOfPages {
  page: number;
}

interface GetPosts extends GetNumberOfPages {
  current: number;
  count?: number;
}

const POSTS_PER_PAGE = 5;

const pagination = {
  getPostsOfPage({
    $content,
    page,
    category,
    size = POSTS_PER_PAGE,
    year,
    search,
  }: GetPostsOfPage) {
    let query = {};
    let content = $content('blog');

    if (category && category !== '0') {
      query = { 'type.value': { $contains: category } };
      // content = content.where({ 'type.value': { $contains: category } });
    }

    if (year) {
      const start = new Date().setFullYear(Number(year), 1, 1);
      const end = new Date().setFullYear(Number(year), 11, 31);
      query = { ...query, createdAt: { $between: [start.valueOf(), end.valueOf()] } };
      // content = content.where({ createdAt: { $between: [start.valueOf(), end.valueOf()] } });
    }

    if (search) {
      content = content.search('title', search);
    }

    return content
      .where(query)
      .sortBy('published', 'desc')
      .skip(size * (page - 1))
      .limit(size)
      .fetch();
  },

  async getNumberOfPages({
    $content,
    category,
    year,
    search,
    size = POSTS_PER_PAGE,
  }: GetNumberOfPages) {
    let query = {};
    let content = $content('blog');

    if (category && category !== '0') {
      query = { 'type.value': { $contains: category } };
    }

    if (search) {
      content = content.search('title', search);
    }

    if (year) {
      const start = new Date().setFullYear(Number(year), 1, 1);
      const end = new Date().setFullYear(Number(year), 11, 31);
      query = { ...query, createdAt: { $between: [start.valueOf(), end.valueOf()] } };
      // content = content.where({ createdAt: { $between: [start.valueOf(), end.valueOf()] } });
    }

    return Math.ceil((await content.where(query).only([]).fetch()).length / size);
  },
};

async function getPosts({
  $content,
  category,
  size = POSTS_PER_PAGE,
  current,
  count,
  year,
  search,
}: GetPosts) {
  const pageCount = count || await pagination.getNumberOfPages({
    $content,
    category,
    size,
    year,
    search,
  });

  const modifiedCount = pageCount > 1 ? current : 1;

  const posts = await pagination.getPostsOfPage({
    $content,
    category,
    page: modifiedCount,
    size,
    year,
    search,
  });

  return {
    pageCurrent: modifiedCount,
    pageCount,
    posts,
  };
}

export { getPosts, pagination };
