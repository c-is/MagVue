<template>
  <div v-if="posts" class="post-index">
    <div class="post-index__inner">
      <div
        v-if="prev && !$store.state.status.isMobile"
        class="post-index__button post-index__button--prev"
        data-aos="fade-right"
        data-aos-delay="800"
      >
        <nuxtLink
          :to="prev.path"
          data-type="single"
          data-transition="prev"
          data-cursor="standard"
        >
          <i class="arrow arrow--head">
            <ArrowSmallLeft />
          </i>
          Previous project
        </nuxtLink>
      </div>

      <h2
        v-if="isPost"
        class="post-index__title post-index__title--latest"
        data-aos="fade-right"
      >
        Latest
        <i v-if="!$store.state.status.isMobile" class="post-index__arrow">
          <ArrowNextLong />
        </i>
      </h2>

      <h2
        v-else
        class="post-index__title"
        data-aos="fade-right"
      >
        See also
        <i v-if="!$store.state.status.isMobile" class="post-index__arrow">
          <ArrowNextLong />
        </i>
      </h2>

      <div class="post-index__collection">
        <ul class="post-index__list">
          <li v-for="(post, index) in posts" :key="post.path">
            <nuxtLink
              class="u-decoration-link"
              :to="post.path"
              data-cursor="small"
              data-aos="fade-up"
              :data-aos-delay="index * 100"
              data-type="single"
            >
              {{ post.title }}
            </nuxtLink>
          </li>
        </ul>
      </div>

      <div
        v-if="next && !$store.state.status.isMobile"
        class="post-index__button post-index__button--next"
        data-aos="fade-left"
        data-aos-delay="800"
      >
        <nuxtLink
          :to="next.path"
          data-type="single"
          data-transition="next"
          data-cursor="standard"
        >
          Next project
          <i class="arrow arrow--tail">
            <ArrowSmallRight />
          </i>
        </nuxtLink>
      </div>
    </div>

    <div class="post-scrolltop" data-aos="fade-up" data-aos-delay="800">
      <button
        class="button button--scrolltop post-scrolltop__button"
        data-cursor="standard"
        :class="{ 'is-alt': isButtonSecondary }"
        @click="handleScroll"
      >
        <ArrowSmallUp />
      </button>
    </div>
  </div>
</template>

<script>
import { gsap } from 'gsap';
import ArrowSmallUp from '../svgs/arrow-small-up.svg';
import ArrowSmallLeft from '../svgs/arrow-small-left.svg';
import ArrowSmallRight from '../svgs/arrow-small-right.svg';
import ArrowNextLong from '../svgs/arrow-next-long.svg';

export default {
  components: {
    ArrowSmallUp,
    ArrowSmallLeft,
    ArrowSmallRight,
    ArrowNextLong,
  },
  props: {
    posts: Array,
    isPost: Boolean,
    isButtonSecondary: Boolean,
    prev: Object,
    next: Object,
  },
  methods: {
    handleScroll(event) {
      event.preventDefault();
      gsap.to(window, 1.6, { scrollTo: 0, ease: 'circ.easeInOut' });
    },
  },
};
</script>

<style lang="postcss" scoped>
.post-index {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10vh 0 20vh;
  margin-top: 20vh;

  @media (--screen-sm-max) {
    margin-top: 0;
  }

  a {
    display: inline-block;
    margin-top: -1rem;
    transition: transform 0.4s;
  }

  &__inner {
    display: grid;
    grid-template-columns: repeat(12, minmax(auto, var(--grid-width)));
    grid-column-gap: var(--gutter-space);
    justify-content: space-between;
    max-width: var(--content-max-width);
    padding: 0 var(--grid-margin);
    padding: 0;
    margin-right: auto;
    margin-left: auto;
    .is-post-industrial & { color: var(--colour-font-contrast); }
    .is-post-visual & { color: var(--colour-primary); }

    @media (--screen-sm-max) {
      display: grid;
      grid-template-columns: repeat(12, var(--grid-width));
      grid-column-gap: var(--gutter-space-tablet);
      justify-content: center;
      padding: 0;
    }

    @media (--screen-xs-max) {
      position: relative;
      display: block;
      max-width: var(--content-width-mobile);
      padding: 0 var(--content-space-mobile);
      margin-right: auto;
      margin-left: auto;
      text-align: center;
    }
  }

  &__title {
    display: inline-flex;
    grid-column-start: 5;
    grid-column-end: 7;
    align-items: center;
    justify-content: space-between;
    height: auto;
    margin-top: -0.66rem;
    margin-bottom: auto;

    &--latest {
      padding-left: 2.2rem;

      @media (--screen-xs-max) {
        padding-left: 0;
      }
    }

    @media (--screen-xs-max) {
      display: block;
      margin-bottom: 1.5em;
      font-size: var(--fsize-xxl-mobile);
      text-align: center;
    }
  }

  &__arrow {
    display: inline-block;
    width: 59px;
    height: 16px;
    line-height: 0;
    vertical-align: 0.266rem;

    svg {
      width: 0;
      height: 16px;
      transition: width 1s var(--ease-in-out-circ);
      transition-delay: 0.6s;

      .aos-animate & {
        width: 100%;
      }
    }
  }

  &__collection {
    grid-column-start: 7;
    grid-column-end: 10;

    a {
      position: relative;
      font-weight: 500;
      color: var(--colour-font);

      .is-post-industrial & { color: var(--colour-font-contrast); }
      .is-post-visual & { color: var(--colour-primary); }

      &::before {
        .is-post-industrial & { background-color: var(--colour-font-contrast); }
        .is-post-visual & { background-color: var(--colour-primary); }
      }
    }
  }

  &__button {
    padding-top: 0;
    font-weight: 700;

    @media (--screen-xs-max) {
      position: absolute;
      top: 0;
    }

    &--prev {
      grid-column-start: 2;
      grid-column-end: 4;

      @media (--screen-xs-max) {
        left: var(--content-space-mobile);
      }

      a:hover { transform: translateX(-4px); }
    }

    &--next {
      grid-column-start: 11;
      grid-column-end: 13;

      @media (--screen-xs-max) {
        right: var(--content-space-mobile);
      }

      a:hover { transform: translateX(4px); }
    }
  }

  .arrow { transition: transform 0.4s; }
}

.post-scrolltop {
  margin-top: var(--space-xs);
  text-align: center;

  @media (--screen-xs-max) {
    margin-top: var(--space-xl-mobile);
  }

  &__button {
    padding-top: 0;
    cursor: none;
    transition: transform 1.2s var(--ease-out-circ);

    &:hover {
      transform: scale(1.125);

      .arrow--tail {
        transform: translateY(-2px);
      }
    }
  }

  .arrow { transition: transform 0.4s; }
}
</style>
