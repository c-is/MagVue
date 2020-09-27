<template>
  <div
    class="product-info"
    :class="{ 'is-passed': isLoaded }"
  >
    <strong class="product-info__text--first">{{ first }}</strong>
    <span class="svg-container">
      <ArrowNext />
    </span>
    <span class="product-info__text--second">{{ second }}</span>
  </div>
</template>

<script>
import ArrowNext from '../svgs/arrow-next-short.svg';

export default {
  components: { ArrowNext },
  props: {
    first: String,
    second: String,
  },
  data() {
    return { isLoaded: false };
  },
  mounted() {
    console.log('prod mounted');
    setTimeout(() => {
      this.isLoaded = true;
    }, 400);
  },
};
</script>

<style lang="postcss" scoped>
.product-info {
  position: absolute;
  top: -4.5rem;
  left: 0;
  display: flex;
  align-items: center;
  text-align: left;

  svg {
    width: 0;
    transition: width 1s var(--ease-in-out-circ);
    transition-delay: 0.6s;
  }

  .hero--visual & {
    right: 0;
    left: auto;
  }

  .single__text & {
    svg { color: var(--colour-font); }
  }

  .svg-container {
    display: inline-flex;
    width: 2.5rem;
    margin: 0 1rem;
    vertical-align: middle;
  }

  &__text {
    &--second {
      opacity: 0;
      transition: opacity 0.6s;
      transition-delay: 1.6s;
    }
  }

  &.is-passed {
    svg { width: 100%; }
    .product-info__text--second { opacity: 1; }
  }
}

</style>
