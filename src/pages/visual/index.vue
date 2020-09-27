<template>
  <Collection
    v-if="!!posts"
    :page="page"
    :posts="posts"
    :page-current="pageCurrent"
    :page-count="pageCount"
    :categories="categories"
    default-title="3D/2D Design"
    type="visual"
    class-name="visual"
    bg-colour="#2727ff"
    shop-button="Shop design products"
    drawer-href="/industrial"
    drawer-type="industrial"
    drawer-dir="right"
    drawer-title="Industrial design"
    fade-dir="fadeRight"
    :on-paginate="paginate"
    :category="category"
    :set-category="setCategory"
    :post-index="index"
  />
</template>

<script>
import mixinCollection from '../../mixins/collection';

export default {
  mixins: [mixinCollection],
};
</script>
