<template>
  <main id="main" class="main main--home" role="main" data-page="Home">
    <article class="home">
      <section class="home-category home-category--industrial u-inner">
        <div class="home-category__inner">
          <h1 class="home-category__title">
            Industrial design
          </h1>
          <nuxtLink
            v-tilt
            to="/industrial"
            class="home__link button button--link js-button-standard"
            data-type="industrial"
            data-colour="secondary"
            data-animation="fadeUp"
            data-animation-mobile="fadeDown"
          >
            <span>See industrial projects</span>
          </nuxtLink>
        </div>
      </section>

      <section class="home-category home-category--visual u-inner">
        <div class="home-category__inner">
          <h1 class="home-category__title">
            3D/2D design
          </h1>
          <nuxtLink
            v-tilt
            to="/visual"
            class="home__link button button--link js-button-standard"
            data-type="visual"
            data-colour="primary"
            data-animation="fadeUp"
          >
            <span>See design projects</span>
          </nuxtLink>
        </div>
      </section>
    </article>

    <div class="home__image-container js-anim-main-image-container">
      <img
        v-if="$store.state.status.isMobile"
        id="texture-mobile"
        class="home__image main-image--graphic js-anim-main-image-mobile"
        src="~/assets/images/home-image-mobile.png"
        alt="Jigen"
      >
      <img
        v-else
        id="texture"
        class="home__image main-image--graphic js-anim-main-image"
        src="~/assets/images/home-image.png"
        alt="Jigen"
      >
    </div>
  </main>
</template>

<script>
import mixinGlobal from '../mixins/global';

export default {
  mixins: [mixinGlobal],
};
</script>

<style scoped lang="postcss">
.home {
  position: relative;
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;

  @media (--screen-sm-max) {
    flex-direction: column;
  }

  &__link {
    @media (--screen-sm-max) {
      position: absolute;
      z-index: 2;
      width: 100%;
      height: auto;
      padding: 0;
      line-height: 2.5;
      background-color: transparent;
      box-shadow: none;
      opacity: 0 !important;
    }

    &[data-type="industrial"] {
      &::before {
        @media (--screen-sm-max) {
          content: url(../svgs/arrow-down.svg);
        }
      }
    }

    &[data-type="visual"] {
      &::before {
        @media (--screen-sm-max) {
          content: url(../svgs/arrow-up.svg);
        }
      }
    }

    &::before {
      @media (--screen-sm-max) {
        box-shadow: none;
        opacity: 1;
      }
    }

    span {
      @media (--screen-sm-max) {
        text-indent: -9999px;
      }
    }
  }

  &__image-container {
    position: fixed;
    top: 50%;
    right: 0;
    left: 0;
    z-index: 2;
    display: grid;
    grid-template-rows: repeat(12, 6vw);
    grid-template-columns: repeat(12, minmax(auto, var(--grid-width)));
    grid-column-gap: var(--gutter-space);
    justify-content: space-between;
    padding: 0 var(--grid-margin);
    margin: auto;
    pointer-events: none;
    transform: translateY(-50%);
    will-change: filter;

    @media (--screen-sm-max) {
      position: absolute;
      right: 0 !important;
      left: 0 !important;
      display: block;
      width: auto;
      height: auto;
      text-align: center;
    }
  }

  &__image {
    grid-row-start: 4;
    grid-row-end: 10;
    grid-column-start: 4;
    grid-column-end: 10;
    width: 100%;
    max-width: 100%;
    height: 100%;
    object-fit: contain;

    @media (--screen-sm-max) {
      width: auto;
      max-width: none;
      height: 36vh;
      margin-bottom: 6.1vh;
    }
  }
}

.home-category {
  display: flex;
  align-items: center;
  width: 50%;
  height: 100%;
  color: var(--colour-font-contrast);

  &--industrial {
    background-color: var(--colour-bg-secondary);
  }

  &--visual {
    justify-content: flex-end;
    color: var(--colour-primary);
    text-align: right;
    background-color: var(--colour-bg);
  }

  @media (--screen-sm-max) {
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 50%;
    text-align: center;

    @apply --grid-mobile;
  }

  &__inner {
    height: 9.33333333333rem;
    margin-bottom: 10vh;

    @media (--screen-sm-max) {
      position: relative;
      display: flex;
      flex-direction: column;
      grid-column-start: 1;
      grid-column-end: 6;
      height: auto;
      margin: 0;
      margin-bottom: 6.1vh;
    }

    .home-category--visual & {
      @media (--screen-sm-max) {
        flex-direction: column-reverse;
      }
    }
  }

  &__title {
    font-size: var(--fsize-xxl);

    @media (--screen-sm-max) {
      margin: 0;
      font-size: var(--fsize-xxl-mobile);
      white-space: nowrap;
    }

    @media (--screen-xs-max) {
      font-size: var(--fsize-xl-mobile);
    }
  }
}
</style>
