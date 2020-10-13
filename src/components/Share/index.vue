<template>
  <div class="share" :class="customClass">
    <ul v-if="data" class="share__list">
      <li
        v-for="(item, index) in data"
        :key="item.name"
        class="share__item"
        data-aos="fade-up"
        :data-aos-delay="100 + (100 * index)"
        data-aos-duration="300"
      >
        <Item
          v-if="item"
          :item="item"
          :title="title"
          :url="url"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import Item from './Item.vue';

export default {
  components: {
    Item,
  },
  props: {
    data: Array,
    title: String,
    url: String,
    customClass: String,
  },
};
</script>

<style lang="postcss" scoped>
.share {
  @media (--screen-sm-max) {
    position: absolute;
    bottom: 5rem;
    left: 0;
    width: 100%;
  }

  &__list {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
