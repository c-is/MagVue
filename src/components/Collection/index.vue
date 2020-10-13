<template>
  <main
    id="main"
    class="main main--post"
    role="main"
    data-page="Post"
    :data-class="`post-${className}`"
    :data-posttype="className"
  >
    <div
      class="drawer js-drawer"
      data-cursor="arrow"
      :data-target="type"
    >
      <div class="drawer__inner anim-drawer-inner" />
    </div>

    <article class="content content--post post">
      <Hero
        :page="page"
        :class-name="className"
        :bg-colour="bgColour"
        :type="type"
        :categories="categories"
        :selected="category"
        :on-filter="handleFilter"
      />

      <section class="post__section">
        <div ref="list" class="post__list">
          <div
            v-for="post in posts"
            :key="post.title"
            class="post-item-container"
            :data-filter="post.type[0].value "
          >
            <div
              :class="`post__item post__item--${post.itemLayout}`"
              :style="getItemStyle(post.titleColour, post.itemBackground)"
            >
              <i
                v-if="post.isVideoButton"
                :style="getVideoButtonStyle(post.iconColour)"
                class="icon icon--video"
              >
                <IconVideo />
              </i>

              <div
                class="post__item-inner"
                :style="getInnerStyle(post.circleColour, post.circleLine)"
              >
                <div class="post-text">
                  <h3 class="post-text__title">
                    {{ post.title }}
                  </h3>

                  <div v-if="!!post.subtitle" class="post-text__desc">
                    <p>{{ post.subtitle }}</p>
                  </div>
                </div>

                <nuxtLink
                  v-if="post.path"
                  :to="post.path"
                  class="post__link"
                  data-type="single"
                  data-cursor="standard"
                >
                  <img
                    v-if="post.thumbnail && post.thumbnail !== ''"
                    class="post-image"
                    :src="post.thumbnail"
                    :alt="post.title"
                  >
                </nuxtLink>
              </div>
            </div>
          </div>
        </div>

        <Pagination :total="pageCount" :current="pageCurrent" :on-click="handlePaginate" />
      </section>

      <PostIndex :posts="postIndex" :is-button-secondary="isButtonSecondary" />
      <NewsLetter />
    </article>
  </main>
</template>

<script lang="ts">
import { gsap } from 'gsap';
import IconVideo from '~/svgs/icon-video.svg';
import Hero from './Hero.vue';
import Pagination from '../Pagination.vue';
import PostIndex from '../PostIndex.vue';
import NewsLetter from '../NewsLetter.vue';

interface Styles {
  color?: string
  backgroundColor?: string;
  border?: string;
}

export default {
  components: {
    Hero,
    Pagination,
    IconVideo,
    NewsLetter,
    PostIndex,
  },
  props: {
    page: Object,
    posts: Array,
    pageCurrent: Number,
    pageCount: Number,
    postIndex: Array,
    categories: Array,
    defaultTitle: String,
    type: String,
    className: String,
    bgColour: String,
    shopButton: String,
    drawerHref: String,
    drawerType: String,
    drawerDir: String,
    drawerTitle: String,
    fadeDir: String,
    onPaginate: Function,
    category: [String, Number],
    setCategory: Function,
    isButtonSecondary: Boolean,
  },
  methods: {
    async handlePaginate(index) {
      if (this.$refs.list) {
        await gsap.to(this.$refs.list, 0.4, { opacity: 0 });
        this.onPaginate(index);
        await gsap.to(window, 0.4, { scrollTo: this.$refs.list.offsetTop });
        await gsap.to(this.$refs.list, 0.4, { opacity: 1 });
      }
    },

    async handleFilter(type) {
      if (this.$refs.list) {
        await gsap.to(this.$refs.list, 0.4, { opacity: 0 });
        this.setCategory(type);
        await gsap.to(window, 0.4, { scrollTo: this.$refs.list.offsetTop });
        await gsap.to(this.$refs.list, 0.4, { opacity: 1 });
      }
    },

    getItemStyle(titleColour, background) {
      const styles: Styles = {};

      if (titleColour) {
        styles.color = `var(--${titleColour[0].value})`;
      }

      if (background) {
        styles.backgroundColor = `var(--${background[0].value})`;
      }

      return styles;
    },

    getVideoButtonStyle(iconColour) {
      const styles: Styles = {};

      if (iconColour) {
        styles.color = `var(--${iconColour[0].value})`;
      }

      return styles;
    },

    getInnerStyle(circleColour, circleLine) {
      const styles: Styles = {};

      if (circleColour) {
        styles.backgroundColor = `var(--${circleColour[0].value})`;
      }

      if (circleLine) {
        styles.border = `2px solid var(--${circleLine[0].value});`;
      }

      return styles;
    },
  },
};
</script>

<style lang="postcss" scoped>
.post {
  position: relative;
  z-index: 4;

  .icon--video {
    position: absolute;
    top: 16px;
    left: 16px;
    z-index: 2;
    color: var(--colour-icon);
  }

  &__section {
    padding: 0 var(--grid-margin);
    margin-top: -20vh;

    @media (--screen-sm-max) {
      padding: 0 0 var(--space-xl-mobile);
      background-color: transparent;
    }

    @media (--screen-xs-max) {
      margin: auto;
    }
  }

  &__title {
    padding: 0 calc(var(--space-m) - (var(--gutter-space) / 2));
    margin-bottom: var(--content-space);
    text-align: right;

    @media (--screen-xs-max) {
      padding: 0;
    }
  }

  &__list {
    display: flex;
    flex-wrap: wrap;

    @media (--screen-xs-max) {
      display: block;
    }
  }

  &__item {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    text-align: center;
    transform-origin: center;
  }

  &__item-inner {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    overflow: hidden;

    .post__item--circle & { border-radius: 50%; }
  }

  &__link {
    position: absolute;
    top: 0;
    left: 0;
    display: inline-block;
    width: 100%;
    height: 100%;
    padding: 0;
    color: transparent;
  }
}

.post-item-container {
  position: relative;
  width: 33.333%;
  height: 0;
  padding-top: 33.333%;

  @media (--screen-xs-max) {
    width: 100%;
    padding-top: 100%;
  }
}

.post-text {
  position: relative;
  z-index: 2;
  pointer-events: none;
  &__desc { padding: 0 12px; }

  .post-text__title.is-passed + .post-text__desc {
    p {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &__title {
    flex-shrink: 0;
    margin-bottom: 0;
    font-size: var(--fsize-xxl);
  }
}

.post-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: filter 0.4s ease, transform 0.4s;
}

html:not(.safari) .post__item-inner:hover .post-image { transform: scale(1.1); }

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

      .is-passed & {
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

.post-single-image {
  position: fixed;
  top: 0;
  right: 0;
  width: 50%;
  overflow: hidden;
  visibility: hidden;
  background-size: cover;
  opacity: 0;

  &__measure { width: var(--gutter-space); }
}

.drawer {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  width: 0;
  height: 100%;
  will-change: width;
  color: var(--colour-font-contrast);

  &[data-target=industrial] {
    right: 0;
    left: auto;
  }

  @media (--screen-sm-max) {
    top: auto;
    right: 0;
    bottom: 0;
    left: 0 !important;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 0;
    margin: auto;

    &::before {
      display: block;
    }
  }

  &__inner {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
    width: 100vw;
    height: 100%;
    padding: 0 var(--space-m);
    background-color: var(--colour-bg-secondary);

    .drawer[data-target=industrial] & {
      right: auto;
      left: 0;
      justify-content: flex-end;
      background-color: var(--colour-bg);
    }

    @media (--screen-sm-max) {
      left: 0;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      width: 100%;
      height: 100vh;
      padding: 0 var(--content-space-mobile);
      text-align: center;
    }
  }
}
</style>
