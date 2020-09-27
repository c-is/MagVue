<template>
  <a
    :href="item.link"
    target="_blank"
    class="social-item js-button-standrd"
    data-cursorSize="small"
  >
    <component :is="componentInstance" />
  </a>
</template>

<script>
// import { defineAsyncComponent } from 'vue';

export default {
  // components: {
  //   ProductInfo,
  //   ShapeContact,
  //   ArrowDown,
  //   ProgressCircle,
  //   Check,
  //   Cross,
  // },
  props: {
    item: Object,
  },
  computed: {
    componentInstance() {
      const name = this.item.iconPath;
      return () => import(`../../svgs/social/${name}`);
    },
  },
};
</script>

<style lang="postcss" scoped>
  .social-item {
    display: inline-block;
    color: var(--colour-font-contrast);
    transition: transform 1.2s var(--ease-out-circ);

    @media (--screen-sm-max) {
      color: var(--colour-font);
    }

    &:hover {
      transform: scale(1.25);
    }

    svg {
      width: 25px;
      height: 25px;
    }

    img {
      width: 25px;
      height: auto;
    }
  }

</style>
