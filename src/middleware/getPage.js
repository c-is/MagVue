export default async context => {
  const {
    route,
    $content,
    redirect,
    from,
  } = context;

  // console.log({ route, from });

  if (route.name === 'index' || route.name === 'coming-soon' || (from && from.path === route.path)) {
    return {};
  }

  const path = route.params.slug
    ? route.path.replace('/', '')
    : `page/${route.path.replace('/', '')}`;

  const page = await $content(path).fetch();
  context.page = page;

  if (page && page.comingSoon) {
    return redirect(`/coming-soon?type=${route.name}`);
  }

  return {};

  // return store.dispatch('page/setPage', page);
};
