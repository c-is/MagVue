<template>
  <div ref="modal" class="modal">
    <div class="modal__overlay js-button-cross" @click="handleClose" />

    <fragment v-if="current">
      <video
        v-if="current && current.includes('mp4')"
        :src="current"
        autoplay
        loop
        controls
        class="modal__image"
      />

      <img v-else :src="current" class="modal__image">
    </fragment>

    <span
      class="modal__nav modal__nav--left js-button-standard"
      :class="{ 'is-hidden': !gallery[index - 1] }"
      @click="handleNavigation(index - 1)"
    />
    <span
      class="modal__nav modal__nav--right js-button-standard"
      :class="{ 'is-hidden': !gallery[index + 1] }"
      @click="handleNavigation(index + 1)"
    />
  </div>
</template>

<script>
import { gsap } from 'gsap';

export default {
  props: {
    target: String,
    close: Function,
    gallery: Array,
    start: Number,
  },
  data() {
    return {
      index: this.start,
      current: this.target,
      isLoaded: false,
    };
  },
  watch: {
    index() {
      this.current = this.gallery[this.index];
    },
  },
  mounted() {
    const header = document.querySelector('.header');

    if (header) {
      gsap.to(header, { autoAlpha: 0, duration: 0.4 });
    }

    gsap.to(this.$refs.modal, { opacity: 1, duration: 0.4 });
    if (this.$store.state.widgets && this.$store.state.widgets.cursor) {
      this.$store.state.widgets.cursor.reset();
    }
  },
  methods: {
    async handleClose() {
      const header = document.querySelector('.header');

      if (header) {
        gsap.to(header, { autoAlpha: 1, duration: 0.4 });
      }
      await gsap.to(this.$refs.modal, 0.4, { opacity: 0 });
      this.$store.state.widgets.cursor.crossOff();
      this.close();
    },
    handleNavigation(index) {
      if (this.gallery[index]) {
        this.index = index;
      }
    },
  },
};
</script>

<style lang="postcss" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 11;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 10vh;
  touch-action: pinch-zoom;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  /* @apply --hide; */

  @media (--screen-sm-max) {
    padding: 0;
    touch-action: pinch-zoom !important;
    -webkit-user-drag: element !important;
  }

  &__inner {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  &__image {
    z-index: 2;
    max-height: 100%;

    @media (--screen-sm-max) {
      width: 100%;
      object-fit: cover;
    }
  }

  &__button {
    position: absolute;
    top: 24px;
    right: 24px;
    z-index: 10;
    justify-self: center;
    width: 2rem;
    height: 2rem;
    padding: 0;
    margin-left: auto;
    color: transparent;
    background-color: transparent;
    border: none;
    outline: none;
    mix-blend-mode: difference;

    &::before,
    &::after {
      position: absolute;
      left: 0;
      width: 100%;
      height: 2px;
      content: '';
      background-color: var(--colour-font-contrast);
      transition: transform 0.4s, color 0.4s;
    }

    &::before {
      top: 0;
      transform: rotate(45deg) translate(9px, 10px);
    }

    &::after {
      bottom: 0;
      transform: rotate(-45deg) translate(9px, -9px);
    }

    &:hover {
      &::before,
      &::after {
        background-color: var(--colour-primary);
      }
    }
  }

  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    background-color: var(--colour-bg-secondary);
  }

  &__nav {
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 2;
    width: 4rem;
    max-width: 64px;
    height: 4rem;
    max-height: 64px;
    margin: auto;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    transition: transform 0.4s;

    /* @media (--screen-sm-max) {
      @apply --hide;
    } */

    &--left {
      left: 5vw;
      background-image: url(../svgs/arrow-modal-left.svg?inline);

      @media (--screen-sm-max) {
        left: 1vw;
      }

      &:hover { transform: translateX(-6px); }
    }

    &--right {
      right: 5vw;
      background-image: url(../svgs/arrow-modal-right.svg?inline);

      @media (--screen-sm-max) {
        right: 1vw;
      }

      &:hover { transform: translateX(6px); }
    }

    &.is-hidden {
      pointer-events: none;
      visibility: hidden;
      opacity: 0;
    }
  }
}

</style>
