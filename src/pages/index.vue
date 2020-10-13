<template>
  <main id="main" class="main main--home" role="main" data-page="Home">
    <article class="home content">
      <section class="home-category home-category--industrial u-inner">
        <div class="home-category__inner">
          <h1 class="home-category__title">
            Industrial design
          </h1>
          <nuxtLink
            v-tilt
            to="/industrial"
            class="home__link button button--link"
            data-type="industrial"
            data-colour="secondary"
            data-aos="fade-up"
            data-animation-mobile="fadeDown"
            data-cursor="standard"
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
            class="home__link button button--link"
            data-type="visual"
            data-colour="primary"
            data-aos="fade-up"
            data-cursor="standard"
          >
            <span>See design projects</span>
          </nuxtLink>
        </div>
      </section>
    </article>

    <div class="home__image-container anim-main-image-container">
      <img
        v-if="$store.state.status.isMobile"
        id="texture-mobile"
        class="home__image main-image--graphic anim-main-image"
        src="~/assets/images/home-image-mobile.png"
        alt="Jigen"
      >
      <img
        v-else
        id="texture"
        class="home__image main-image--graphic anim-main-image"
        src="~/assets/images/home-image.png"
        alt="Jigen"
      >
    </div>
  </main>
</template>

<script>
import { gsap } from 'gsap';
import mixinGlobal from '~/mixins/global';

const TRANSITION_EASE = 'expo.out';
const TRANSITION_TIMING = 0.8;

export default {
  mixins: [mixinGlobal],
  transition(to, from) {
    return {
      css: false,
      mode: 'out-in',
      async leave(el, done) {
        const isMobile = window.innerWidth < 992;

        if (to.name === 'visual' || to.name === 'industrial') {
          // const { CustomEase } = await import('gsap/CustomEase');
          // const TRANSITION_EASE = CustomEase.create(
          //   'custom', 'M0,0 C0.266,0.412 0.228,0.68 0.354,0.854 0.474,1.02 0.78,1 1,1 '
          // );
          const sections = [...el.querySelectorAll('.home-category')];
          const section = el.querySelector(`.home-category--${to.name}`);
          const inners = el.querySelectorAll('.home-category__inner');
          const otherSection = sections.find(element => element !== section);
          const mainImageContainer = el.querySelector('.anim-main-image-container');
          const timing = isMobile ? 0.8 : TRANSITION_TIMING;

          await gsap.to([mainImageContainer, ...inners], {
            opacity: 0,
            y: -20,
            ease: 'circ.inOut',
            duration: 0.6,
          });

          gsap.to(otherSection, {
            padding: 0,
            ease: TRANSITION_EASE,
            delay: 0.2,
            duration: timing,
            ...isMobile ? { height: 0 } : { width: 0 },
          });

          await gsap.to(section, {
            ease: TRANSITION_EASE,
            delay: 0.2,
            duration: timing,
            ...isMobile ? { height: '100%' } : { width: '100%' },
          });
        } else {
          await gsap.to(el, {
            opacity: 0, y: -20, duration: 0.4, ease: 'back',
          });
        }

        done();
      },

      beforeEnter(el) {
        const mainImage = el.querySelector('.anim-main-image');

        if (mainImage) {
          gsap.set(mainImage, { opacity: 0 });
        }

        if (from.name === 'visual' || from.name === 'industrial') {
          return;
        }

        gsap.set(el, { opacity: 0 });
        const content = el.querySelector('.content');

        console.log({ mainImage });

        if (content) {
          gsap.set(content, { opacity: 0, y: 20 });
        }
      },

      async enter(el, done) {
        // const mainImageContainer = el.querySelector('.anim-main-image-container');
        const mainImage = el.querySelector('.anim-main-image');

        if (from.name === 'visual' || from.name === 'industrial') {
          if (mainImage) {
            await gsap.to(mainImage, { opacity: 1, duration: 0.4 });
            gsap.set(mainImage, { clearProps: 'all' });
          }

          return;
        }

        const content = el.querySelector('.content');
        gsap.to(el, { opacity: 1, duration: 0.4 });

        if (mainImage) {
          gsap.to(mainImage, { opacity: 1, duration: 0.4 });
        }

        if (content) {
          await gsap.to(content, {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: 'back',
          });

          gsap.set([content, mainImage], { clearProps: 'all' });
        }

        done();
      },
    };
  },
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
      height: 100%;
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
      top: 49.9%;
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

    @media (--screen-sm-max) {
      color: var(--colour-font-contrast);
      background-color: var(--colour-primary);
    }
  }

  @media (--screen-sm-max) {
    display: grid;
    flex-direction: column;
    grid-template-columns: repeat(5, var(--grid-width-mobile));
    grid-column-gap: var(--gutter-space-mobile);
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 50%;
    text-align: center;
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
      align-items: center;
      justify-content: center;
      width: 160px;
      height: 56px;
      margin: 0 auto;
      margin-bottom: 6.1vh;
      border-radius: 2px;
    }

    .home-category--visual & {
      @media (--screen-sm-max) {
        flex-direction: column-reverse;
        color: var(--colour-primary);
        background-color: var(--colour-secondary);
      }
    }

    .home-category--industrial & {
      @media (--screen-sm-max) {
        color: var(--colour-font);
        background-color: var(--colour-bg);
      }
    }
  }

  &__title {
    font-size: var(--fsize-xxl);

    @media (--screen-sm-max) {
      margin: 0;
      font-size: 15px;
      font-weight: 700;
      white-space: nowrap;
    }
  }
}
</style>
