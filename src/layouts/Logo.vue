<template>
  <div class="logo" data-cursor="standard">
    <nuxtLink class="logo__link" to="/">
      <span class="logo__image">
        <span class="logo__outer">
          <LogoOuter />
        </span>
        <span class="logo__inner js-eye">
          <LogoInner />
        </span>
      </span>
      <span class="logo__text">
        <LogoTitle />
      </span>
    </nuxtLink>
  </div>
</template>

<script>
import LogoOuter from '~/svgs/logo-outer.svg';
import LogoInner from '~/svgs/logo-inner.svg';
import LogoTitle from '~/svgs/logo-title.svg';

export default {
  components: {
    LogoOuter,
    LogoInner,
    LogoTitle,
  },
};
</script>

<style scoped lang="postcss">
.logo {
  position: relative;
  grid-column-start: 6;
  grid-column-end: 8;
  width: 100%;
  height: 100%;
  margin: auto;
  background-color: var(--colour-font-contrast);
  border-bottom-right-radius: var(--border-radius);
  border-bottom-left-radius: var(--border-radius);

  &__link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 0;
    color: var(--colour-font);
    .is-post-visual & { color: var(--colour-primary); }
  }

  &__text {
    margin-left: 1rem;

    svg {
      width: 1.466rem;
      height: auto;
    }
  }

  &__image {
    position: relative;
    width: 5.8666rem;
    height: 4rem;

    svg {
      position: relative;
      z-index: 2;
      width: 100%;
      height: auto;
    }
  }

  &__outer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &__inner {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 5.8666rem;
  }
}
</style>
