<template>
  <header id="header" class="header" role="banner">
    <button
      v-if="$store.state.status.isMobile && $route.path === 'single'"
      class="header__back u-text-hide"
    >
      Back to previous page
    </button>

    <NavBar />

    <button
      class="menu-trigger js-button-standard"
      :class="{
        'is-active': $store.state.status.isMenuOpen,
        'is-loaded': $store.state.status.isMenuOpen,
      }"
      aria-label="Menu"
      data-cursorSize="small"
      @click="toggleMenu"
    />
  </header>
</template>

<script>
import NavBar from './Navigation.vue';

export default {
  components: { NavBar },
  methods: {
    toggleMenu() {
      this.$store.dispatch('status/setStatusMenuOpen', !this.$store.state.status.isMenuOpen);
    },
  },
  // mounted() {
  //   console.log(this.$route.path);
  //   return {
  //     path: this.$route.path,
  //   };
  // },
  // asyncData({ route, params }) {
  //   if (process.server) {
  //     // use route object
  //     console.log(route.params.slug);
  //     // directly use params
  //     console.log(params.slug);
  //   }
  // },
};
</script>

<style scoped lang="postcss">
.header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 11;
  width: 100%;
  height: var(--header-height);

  @media (--screen-sm-max) {
    display: flex;
    align-items: center;
    justify-content: center;
    height: var(--header-height-mobile);
    padding: 0 var(--content-space-mobile);
  }

  @media (--screen-xs-max) {
    padding: 0 1rem;
  }

  &__back {
    position: absolute;
    top: 0;
    left: 12px;
    pointer-events: none;
    background-color: transparent;
    border: none;
    outline: none;

    .is-single & {
      @media (--screen-sm-max) {
        position: relative;
        justify-self: center;
        width: 16px;
        height: 27px;
        pointer-events: auto;
        background-image: url(/assets/svgs/arrow-back.svg);
        background-size: cover;
      }
    }
  }
}

.menu-trigger {
  position: absolute;
  top: 2.8rem;
  right: 1.333rem;
  z-index: 10;
  justify-self: center;
  width: 2rem;
  height: 1rem;
  padding: 0;
  color: transparent;
  background-color: transparent;
  border: none;
  outline: none;

  @media (--screen-sm-max) {
    position: relative;
    top: 0;
    right: 12px;
    grid-column-start: 10;
    grid-column-end: 11;
    margin-left: auto;
  }

  @media (--screen-xs-max) {
    grid-column-start: 5;
    grid-column-end: 6;
  }

  &::before { top: 0; }
  &::after { bottom: 0; }

  &::before,
  &::after {
    position: absolute;
    left: 0;
    width: 100%;
    height: 2px;
    content: '';
    background-color: var(--colour-font-contrast);
    border-radius: 8px;
    transition: transform 0.4s, color 0.4s;

    .is-home & { background-color: var(--colour-font); }
    .is-contrast & { background-color: var(--colour-font); }
    .is-single & { background-color: var(--colour-font); }
    .is-blog & { background-color: var(--colour-font); }
    .is-post-visual & { background-color: var(--colour-primary); }

    @media (--screen-sm-max) {
      .is-home & { background-color: var(--colour-font-contrast); }
      .is-contact & { background-color: var(--colour-font-contrast); }
      .is-load-start & { background-color: var(--colour-font); }
    }
  }

  &.is-active {
    &::before { transform: rotate(45deg) translate(4px, 5px); }
    &::after { transform: rotate(-45deg) translate(4px, -5px); }
  }

  &.is-loaded,
  &:hover {
    &::before,
    &::after {
      @media (--screen-xs-min) {
        background-color: var(--colour-primary);
      }
    }
  }

  &.is-loaded {
    &::before,
    &::after {
      @media (--screen-sm-max) {
        .is-home & { background-color: var(--colour-primary); }
        .is-contact & { background-color: var(--colour-primary); }
      }
    }
  }
}
</style>
