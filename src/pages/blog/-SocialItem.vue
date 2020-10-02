<template>
  <a
    :href="link"
    target="_blank"
    class="social-item"
    data-cursor="small"
  >
    <component :is="componentInstance" />
  </a>
</template>

<script>
export default {
  props: {
    item: Object,
    url: String,
    title: String,
  },

  data() {
    const link = this.item.link
      .replace(/@tu/g, `&via=${encodeURIComponent(this.twitterUser)}`)
      .replace(/@u/g, encodeURIComponent(this.url))
      .replace(/@t/g, encodeURIComponent(this.title))
      .replace(/@d/g, encodeURIComponent(this.description))
      .replace(/@q/g, encodeURIComponent(this.quote))
      .replace(/@h/g, this.encodedHashtags)
      .replace(/@m/g, encodeURIComponent(this.media));

    return {
      link,
    };
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
    margin: 0 0.5rem;
    color: var(--colour-font);
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
