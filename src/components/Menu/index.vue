<template>
  <div
    ref="view"
    class="menu"
    :class="{ 'is-active': isOpenLocal, 'is-loaded': !isLoading }"
  >
    <div class="menu__content">
      <div class="menu__container">
        <div class="menu__main">
          <div
            v-for="item in $store.state.page.navigation.left"
            :key="item.name"
            ref="leftItems"
            class="menu__inner"
          >
            <h2 class="menu__title">
              <nuxtLink
                v-if="item.link"
                class="js-button-standard menu__link"
                :class="{ 'is-active': $route.path.includes(item.link)}"
                :to="item.link"
                @click.native="handleClose"
              >
                {{ item.label }}
                <span class="menu__shape-container">
                  <ShapeIndustrial v-if="item.name === 'industrial'" />
                  <ShapeVisual v-else-if="item.name === 'visual'" />
                </span>
              </nuxtLink>
            </h2>

            <div v-if="!$store.state.status.isMobile" class="menu__collection">
              <div class="menu__list-container">
                <ul
                  v-if="$store.state.page.posts && $store.state.page.posts[item.name]"
                  class="menu__list"
                >
                  <li
                    v-for="post in $store.state.page.posts[item.name]"
                    :key="post.path"
                    ref="posts"
                    class="menu__item"
                  >
                    <nuxtLink
                      v-if="post.path"
                      class="js-button-standard u-decoration-link u-decoration-link--primary"
                      :class="{ 'is-active': $route.path.includes(post.path) }"
                      :to="post.path"
                      data-cursorSize="small"
                      @click.native="handleClose"
                    >
                      {{ post.title }}
                    </nuxtLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="menu__sub">
          <nuxtLink
            v-for="item in $store.state.page.navigation.right"
            :key="item.name"
            ref="rightItems"
            class="js-button-standard menu__link menu__link--sub"
            :class="{
              'u-text-not-ready': item.isClosed,
              'is-active': $route.path.includes(item.link)
            }"
            :to="item.link"
            @click.native="handleClose"
          >
            {{ item.label }}
            <span class="menu__shape-container">
              <ShapeShop v-if="item.name === 'shop'" />
              <ShapeBlog v-else-if="item.name === 'blog'" />
              <ShapeContact v-else-if="item.name === 'contact'" />
            </span>
          </nuxtLink>
        </div>
      </div>
    </div>

    <div ref="overlay" class="menu__overlay" />
  </div>
</template>

<script>
import { gsap } from 'gsap';
import { mapGetters } from 'vuex';
import ShapeIndustrial from '../../svgs/shape-industrial-menu.svg';
import ShapeVisual from '../../svgs/shape-visual-menu.svg';
import ShapeShop from '../../svgs/shape-shop-menu.svg';
import ShapeBlog from '../../svgs/shape-blog-menu.svg';
import ShapeContact from '../../svgs/shape-contact-menu.svg';

const TIMING = 0.6;
const BG_TIMING_IN = 0.6;
// const BG_TIMING_OUT = isMobile ? 0.8 : 1
// const BG_TIMING_IN = isMobile ? 0.4 : 0.8

export default {
  components: {
    ShapeIndustrial,
    ShapeVisual,
    ShapeShop,
    ShapeBlog,
    ShapeContact,
  },
  data() {
    return {
      isLoading: false,
      isOpenLocal: false,
    };
  },
  computed: {
    ...mapGetters([
      'status/getStatusMenuOpen',
    ]),
    isOpen() {
      return this.$store.state.status.isMenuOpen;
    },
  },
  watch: {
    isOpen() {
      if (!this.$store.state.status.isMenuOpen) {
        this.onClose();
      } else {
        this.onOpen();
      }
    },
  },
  methods: {
    async handleClose() {
      await this.onClose();
      this.$store.dispatch('status/setStatusMenuOpen', false);
    },
    async onOpen() {
      this.isLoading = true;
      this.isOpenLocal = true;
      const { isMobile } = this.$store.state.status;

      const {
        view,
        overlay,
        posts = [],
        leftItems,
        rightItems,
      } = this.$refs;

      const nav = document.querySelector('.navigation');
      const leftTargets = leftItems.map(item => item.children[0]);
      const rightTargets = rightItems.map(item => item.$el);
      const fadeOutTargets = [...leftTargets, ...rightTargets];

      if (isMobile) {
        gsap.set(view, { width: window.innerWidth });
      }

      // const fadeOutTargets = [...this.items, ...this.titles, ...this.subs, ...this.collections];
      gsap.set([...fadeOutTargets, ...posts], { opacity: 0, x: 20 });
      document.body.classList.add('is-menu-opened');

      if (nav) {
        gsap.to(nav, 0.4, { autoAlpha: 0 });
      }

      await gsap.to(overlay, BG_TIMING_IN, {
        width: window.innerWidth,
        ease: 'power3.out',
      });

      const props = { opacity: 1, x: 0 };
      gsap.to([...fadeOutTargets, ...posts], TIMING, props);
      // await gsap.to(posts, TIMING, { ...props, ...isMobile && { stagger: 0.2 }, delay: 0.2 });
      this.isLoading = false;
    },
    async onClose() {
      const nav = document.querySelector('.navigation');

      const {
        overlay,
        posts = [],
        leftItems,
        rightItems,
      } = this.$refs;

      const leftTargets = leftItems.map(item => item.children[0]);
      const rightTargets = rightItems.map(item => item.$el);
      const fadeOutTargets = [...leftTargets, ...rightTargets, ...posts];
      gsap.to(fadeOutTargets, { opacity: 0, x: 20, duration: 0.4 });

      if (nav) {
        gsap.to(nav, 0.4, { autoAlpha: 1, delay: 0.2 });
      }

      await gsap.to(overlay, BG_TIMING_IN, {
        width: 0,
        ease: 'power3.out',
        delay: 0.2,
      });

      this.isOpenLocal = false;
      this.isLoading = false;
    },
  },
};
</script>

<style lang="postcss" scoped>
@keyframes rotate {
  from { transform: rotateX(-360deg) rotateY(0deg); }
  to { transform: rotateX(0deg) rotateY(360deg); }
}

.menu {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 0;
  pointer-events: none;
  visibility: hidden;
  opacity: 0;

  @media (--screen-sm-max) {
    padding: 0 var(--space-m-mobile);
    padding-top: var(--header-height-mobile);
  }

  &.is-active {
    height: 100%;
    visibility: visible;
    opacity: 1;
  }

  &.is-loaded {
    pointer-events: auto;
  }

  &__content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;

    @media (--screen-sm-max) {
      align-items: center;
      padding-bottom: var(--header-height-mobile);
    }
  }

  &__overlay {
    position: fixed;
    top: 0;
    right: 0;
    width: 0;
    height: 100%;
    background-color: var(--colour-bg);
  }

  &__container {
    z-index: 2;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    width: 100%;
    padding: 0 var(--space-m);

    @media (--screen-sm-max) {
      display: block;
      padding: 0;
    }
  }

  &__main {
    display: flex;
    justify-content: space-between;
    width: 39.975vw;
    margin-right: 5rem;

    @media (--screen-sm-max) {
      display: block;
      width: auto;
      margin: 0;
    }
  }

  &__inner {
    width: 100%;
    max-width: 20rem;

    @media (--screen-sm-max) {
      min-width: 0;
      max-width: none;
      padding-right: 0;
      margin-right: auto;
      margin-left: auto;
    }
  }

  &__collection {
    height: 40vh;
    padding-bottom: 36px;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
  }

  &__title {
    font-size: 1rem;
    color: var(--colour-primary);

    @media (--screen-sm-max) {
      margin: 0;
      font-size: var(--fsize-xxl-mobile);
      text-align: center;
    }

    @media (--screen-xs-max) {
      font-size: var(--fsize-xl-mobile);
    }
  }

  &__shape-container {
    position: absolute;
    top: 50%;
    left: 50%;
    color: var(--colour-primary);
    opacity: 0;
    transition: 0.3s opacity ease;
    transform: translate(-50%, -50%);
    perspective: 1200px;
  }

  &__link {
    position: relative;
    display: inline-block;
    padding-right: 0;
    padding-left: 0;
    font-size: var(--fsize-xxl);
    font-weight: 500;

    &.is-active,
    &:hover {
      .menu__shape-container { opacity: 1; }
    }

    &.is-active {
      pointer-events: none;
    }

    @media (--screen-sm-max) {
      padding: 0;
      margin: 3.666vh 0;
      font-size: 1em;
      svg { transform: scale(0.8); }
    }

    &--sub {
      min-width: 51px;
      margin: 0 11px;
      text-align: center;

      @media (--screen-sm-max) {
        margin: 3.666vh 0;
        font-size: var(--fsize-xl-mobile);
      }
    }
  }

  &__list-container {
    width: 100%;

    @media (--screen-sm-max) {
      display: inline-block;
    }
  }

  &__list {
    width: auto;
    margin: auto;
  }

  &__item {
    margin: 8px 0;
    font-weight: 500;
    &:first-child { margin-top: 0; }

    &:last-child {
      @media (--screen-sm-max) {
        margin-bottom: 0;
      }
    }

    a::before {
      bottom: 0.85em;
      height: 1px;
    }
  }

  &__sub {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 36vw;
    margin-top: 0;
    opacity: 0;

    .is-loaded & { opacity: 1; }

    @media (--screen-sm-max) {
      flex-direction: column;
      justify-content: center;
      width: 100%;
    }
  }

  .scrollbar-track {
    background-color: transparent;
    opacity: 1;
    &.scrollbar-track-x { height: 6px; }

    &::before {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1px;
      margin: auto;
      content: '';
      background-color: var(--colour-primary);
    }
  }

  .scrollbar-thumb {
    height: 6px;
    background: var(--colour-bg);
    border: 1px solid var(--colour-primary);
  }

  .scrollbar-track-x { opacity: 0; }
  &.is-loaded .scrollbar-track-x { opacity: 1; }
}

</style>
