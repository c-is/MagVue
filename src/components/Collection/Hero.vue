<template>
  <section
    :class="`hero hero--${className} js-section`"
    :data-bgcolour="bgColour"
  >
    <div class="hero__title-container">
      <div class="hero__title-inner">
        <h1 class="hero__title">
          {{ page.title }}
        </h1>

        <i>
          <ShapeIndustrial v-if="type === 'industrial'" />
          <ShapeVisual v-else-if="type ==='visual'" />
          <ShapeBlog v-else-if="type ==='blog'" />
        </i>
      </div>
    </div>

    <slot>
      <div v-if="categories" class="category">
        <div class="category__inner">
          <h2 class="category__title" data-aos="fade-up">
            Categories
          </h2>

          <ul data-aos="fade-up" data-aos-delay="200">
            <li class="category__item">
              <button
                class="category__button"
                :class="{ 'is-active': !selected}"
                data-cursor="small"
                data-filter-id="*"
                @click="onFilter(null)"
              >
                All
              </button>
            </li>

            <li
              v-for="category in categories"
              :key="category.id"
              class="category__item"
            >
              <button
                class="category__button"
                :class="{ 'is-active': selected === category.id}"
                data-cursor="small"
                :data-filter-id="category.id"
                @click="onFilter(category.id)"
              >
                {{ category.name }}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </slot>
  </section>
</template>

<script lang="ts">
import ShapeIndustrial from '~/svgs/shape-industrial.svg';
import ShapeVisual from '~/svgs/shape-visual.svg';
import ShapeBlog from '~/svgs/shape-blog.svg';

export default {
  components: { ShapeIndustrial, ShapeVisual, ShapeBlog },
  props: {
    page: Object,
    title: String,
    className: String,
    bgColour: String,
    type: String,
    categories: Array,
    selected: [String, Number],
    onFilter: Function,
  },
};
</script>

<style lang="postcss" scoped>
.hero {
  position: relative;
  display: grid;
  grid-template-rows: repeat(12, var(--grid-width));
  grid-template-columns: repeat(12, minmax(auto, var(--grid-width)));
  grid-column-gap: var(--gutter-space);
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
  min-height: 800px;
  padding: 0 var(--grid-margin);
  color: var(--colour-font-contrast);

  &--industrial {
    background-color: var(--colour-bg-secondary);
  }

  &--visual {
    color: var(--colour-primary);
    background-color: var(--colour-bg);

    ::selection {
      color: var(--colour-font-contrast);
      text-shadow: none;
      background: var(--colour-secondary);
    }

    ::-moz-selection {
      color: var(--colour-font-contrast);
      text-shadow: none;
      background: var(--colour-secondary);
    }

    ::-webkit-selection {
      color: var(--colour-font-contrast);
      text-shadow: none;
      background: var(--colour-secondary);
    }
  }

  &--blog {
    color: var(--colour-font);
  }

  &--coming-soon {
    height: 60vh;
    min-height: 680px;
  }

  @media (--screen-sm-max) {
    display: grid;
    grid-template-rows: repeat(10, 4.79rem);
    grid-template-columns: repeat(12, var(--grid-width));
    grid-column-gap: var(--gutter-space-tablet);
    height: 80vh;
    min-height: 0;
    padding: 0;
  }

  @media (--screen-xs-max) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    padding: 10vh 0 0;
  }

  &__title-container {
    position: relative;
    top: -1.5rem;
    grid-row-start: 4;
    grid-column-start: 3;
    grid-column-end: 11;
    font-size: 7.3rem;
    text-align: center;
    white-space: nowrap;

    @media (--screen-sm-max) {
      grid-row-start: 3;
      grid-column-start: 2;
      grid-column-end: 8;
    }

    @media (--screen-xs-max) {
      top: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
    }

    svg {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      width: 10rem;
      height: auto;
      margin: auto;

      .hero--visual & {
        right: 0.62em;

        @media (--screen-sm-max) {
          right: 0;
        }
      }

      @media (--screen-sm-max) {
        top: -2rem;
        right: 0;
        width: 8.25rem;
      }
    }
  }

  &__title-inner {
    position: relative;
  }

  &__title {
    margin: 0;
    font-size: 7.3rem;
    white-space: nowrap;

    @media (--screen-sm-max) {
      font-size: 56px;
    }

    @media (--screen-xs-max) {
      font-size: var(--fsize-xxl-mobile);
    }
  }
}

.category {
  position: relative;
  grid-row-start: 6;
  grid-column-start: 4;
  grid-column-end: 10;
  margin: 0;
  margin-top: 2rem;

  @media (--screen-sm-max) {
    grid-row-start: 5;
    grid-column-start: 4;
    grid-column-end: 6;
    margin: 0;
  }

  @media (--screen-xs-max) {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vw;
    background: var(--colour-primary);
    border-radius: 50%;
  }

  &__inner {
    position: relative;
    top: 0;
    left: 50%;
    display: inline-block;
    width: 50%;

    @media (--screen-xs-max) {
      left: 0;
      display: block;
      width: 100%;
      text-align: center;
    }
  }

  &__title {
    @media (--screen-xs-max) {
      color: var(--colour-font-contrast);
    }
  }

  &__item {
    margin: 0.333rem 0;
    margin-left: -1rem;
    &:first-child { margin-top: 0; }

    @media (--screen-xs-max) {
      margin-left: 0;
    }
  }

  &__button {
    z-index: 0;
    display: inline-block;
    padding: 0.125em 0.75rem;
    font-weight: 500;
    color: var(--colour-font-contrast);
    text-align: center;
    background-color: transparent;
    border: none;
    outline: none;

    .is-post-visual & {
      color: var(--colour-primary);

      @media (--screen-xs-max) {
        color: var(--colour-font-contrast);
      }
    }

    &::before {
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: -1;
      width: 0;
      height: 100%;
      content: '';
      background-color: var(--colour-secondary);
      border-radius: 0.25rem;
      transition: width 0.4s;
    }

    &.is-active,
    &:hover {
      color: var(--colour-primary);
      &::before { width: 100%; }
    }

    &.is-active {
      pointer-events: none;
    }
  }
}
</style>
