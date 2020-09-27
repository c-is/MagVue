<template>
  <Collection
    v-if="!!posts"
    :page="page"
    :posts="posts"
    :page-current="pageCurrent"
    :page-count="pageCount"
    :categories="categories"
    default-title="Industrial Design"
    type="industrial"
    class-name="industrial"
    bg-colour="#2727ff"
    shop-button="Shop design products"
    drawer-href="/visual"
    drawer-type="visual"
    drawer-dir="right"
    drawer-title="Visual design"
    fade-dir="fadeRight"
    :on-paginate="paginate"
    :category="category"
    :set-category="setCategory"
    :post-index="index"
    :is-button-secondary="true"
  />
</template>

<script>
import mixinCollection from '../../mixins/collection';

export default {
  mixins: [mixinCollection],
};
</script>
