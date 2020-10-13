<template>
  <nav id="navigation" class="navigation" role="navigation">
    <div class="navigation__main">
      <ul v-if="$store.state.page.navigation" class="navigation__list">
        <li
          v-for="item in $store.state.page.navigation.left"
          :key="item.label"
          class="navigation__item"
        >
          <nuxtLink
            v-if="item.link"
            class="navigation__link navigation__link--main"
            data-cursor="small"
            :to="item.link"
            :class="{
              'is-active': $route.path.includes(item.link),
              'u-text-not-ready': item.isClosed,
            }"
          >
            {{ item.label }}
          </nuxtLink>
        </li>
      </ul>
    </div>

    <Logo />

    <div class="navigation__sub">
      <ul v-if="$store.state.page.navigation" class="navigation__list navigation__list--sub">
        <li
          v-for="item in $store.state.page.navigation.right"
          :key="item.label"
          class="navigation__item"
        >
          <nuxtLink
            v-if="item.link"
            class="navigation__link navigation__link--sub"
            data-cursor="small"
            :to="item.link"
            :class="{
              'is-active': $route.path.includes(item.link),
              'u-text-not-ready': item.isClosed,
            }"
          >
            {{ item.label }}
          </nuxtLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import Logo from './Logo.vue';

export default {
  components: {
    Logo,
  },
  data() {
    return {
      left: [],
      right: [],
    };
  },
};
</script>

<style scoped lang="postcss">
.navigation {
  display: grid;
  grid-template-rows: 100%;
  grid-template-columns: repeat(12, minmax(auto, var(--grid-width)));
  grid-column-gap: var(--gutter-space);
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 0 var(--grid-margin);
  color: var(--colour-font-contrast);

  .is-contrast & { color: var(--colour-font); }
  .is-single & { color: var(--colour-font); }
  .is-blog & { color: var(--colour-font); }

  &__main {
    grid-column-start: 2;
    grid-column-end: 6;
    height: 100%;

    .is-contact & { color: var(--colour-font); }
    .is-post-visual & { color: var(--colour-primary); }

    li:first-child { margin-right: 8.15rem; }
  }

  &__link {
    position: relative;
    display: inline-block;
    padding: 0.2em 0.85em;
    font-weight: 500;
    color: inherit;
    border-radius: 2px;
    transition: color 0.3s, background-color 0.3s;

    &:hover,
    &.is-active { color: var(--colour-font-contrast); }
    &.is-active { pointer-events: none; }

    &--main {
      position: relative;

      &:hover,
      &.is-active {
        .is-contact & { background-color: var(--colour-primary); }
        .is-single & { background-color: var(--colour-font); }
        .is-contrast & { background-color: var(--colour-font); }
        .is-post-visual & { background-color: var(--colour-primary); }
        .is-blog & { background-color: var(--colour-primary); }

        .is-home & {
          color: var(--colour-font);
          background-color: var(--colour-font-contrast);
        }

        .is-coming-soon & {
          color: var(--colour-font);
          background-color: var(--colour-font-contrast);
        }

        .is-post-industrial & {
          color: var(--colour-font);
          background-color: var(--colour-font-contrast);
        }
      }
    }

    &--sub {
      &:hover,
      &.is-active {
        .is-single & { background-color: var(--colour-font); }
        .is-post-visual & { background-color: var(--colour-primary); }
        .is-blog & { background-color: var(--colour-primary); }

        .is-home & {
          color: var(--colour-font-contrast);
          background-color: var(--colour-primary);
        }

        .is-coming-soon & {
          color: var(--colour-font);
          background-color: var(--colour-font-contrast);
        }

        .is-contact & {
          color: var(--colour-font);
          background-color: var(--colour-font-contrast);
        }

        .is-post-industrial & {
          color: var(--colour-font);
          background-color: var(--colour-font-contrast);
        }
      }
    }
  }

  &__item {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  &__list {
    display: flex;
    align-items: center;
    height: 100%;

    &--sub {
      justify-content: space-between;
    }
  }

  &__sub {
    grid-column-start: 9;
    grid-column-end: 12;
    height: 100%;

    .is-contact & { color: var(--colour-font-contrast); }
    .is-post-visual & { color: var(--colour-primary); }
    .is-home & { color: var(--colour-font); }
  }
}
</style>
