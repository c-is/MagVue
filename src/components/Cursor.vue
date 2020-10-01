<template>
  <div
    ref="cursor"
    class="cursor"
    data-light="false"
    data-expand="false"
    data-small="false"
    data-cross="false"
    data-arrows="false"
    data-direction="null"
    data-hidden="false"
    data-back="false"
  >
    <div class="cursor__disc">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 104 104">
        <circle
          cx="52"
          cy="52"
          r="43"
          fill="none"
          stroke="#ffffff"
          stroke-width="3"
        />
      </svg>
    </div>

    <div class="cursor__loader">
      <Loader />
    </div>

    <div class="cursor__cross" />

    <div class="cursor__arrows">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 104 104">
        <circle
          cx="52"
          cy="52"
          r="43"
          fill="none"
          stroke="#ffffff"
          stroke-width="2"
        />
      </svg>
      <div class="cursor__arrow cursor__arrow--left">
        <ArrowLeft />
      </div>

      <div class="cursor__arrow cursor__arrow--right">
        <ArrowRight />
      </div>
    </div>
  </div>
</template>

<script>
import Cursor from '../widgets/Cursor';
import Loader from '../svgs/loader.svg';
import ArrowLeft from '../svgs/arrow-left.svg';
import ArrowRight from '../svgs/arrow-right.svg';

export default {
  name: 'CustomCursor',
  components: {
    Loader,
    ArrowLeft,
    ArrowRight,
  },
  watch: {
    $route() {
      if (this.cursor) {
        this.cursor.shrinkBound();
        // console.log(this.cursor);
        // this.cursor.destroy();
        // this.cursor.resetElements();
      }
    },
  },
  mounted() {
    if (this.$store.state.status.isMobile) {
      return;
    }

    this.cursor = new Cursor(this.$refs.cursor);
    // this.cursor.update(this.$refs.cursor);
    this.cursor.events();
    this.cursor.init();
    // this.$store.dispatch('widgets/setInstance', {
    //   nstance: this.cursor, instanceKey: 'cursor'
    // });
    const instance = {
      crossOff: this.cursor.crossOff,
      reset: this.cursor.resetElements,
      add: this.cursor.add,
      remove: this.cursor.remove,
    };

    this.$store.commit('widgets/add', { instance, instanceKey: 'cursor' });
  },
};
</script>

<style lang="postcss" scoped>
.cursor {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  display: block;
  width: 3rem;
  height: 3rem;
  margin-top: -1.5rem;
  margin-left: -1.5rem;
  pointer-events: none;
  mix-blend-mode: difference;
  transform: translateX(-100%);

  &__disc {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--colour-font-contrast);
    border-radius: 50%;
    transition: transform 1s cubic-bezier(0.075, 0.82, 0.165, 1);
    transform: scale(0.2);
    will-change: transform;

    .is-post-visual & { background: var(--colour-primary-difference); }
    .is-blog & { background: var(--colour-primary-difference); }
    .is-menu-opened & { background: var(--colour-primary-difference); }

    circle {
      .is-post-visual & { stroke: var(--colour-primary-difference); }
      .is-blog & { stroke: var(--colour-primary-difference); }
      .is-menu-opened & { stroke: var(--colour-primary-difference); }
    }
  }

  &__cross {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: transform 1s var(--ease-out-circ);
    transform: scale(0);
    will-change: transform;

    &::before,
    &::after {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      margin: auto;
      content: '';
      background-color: var(--colour-font-contrast);
    }

    &::before { transform: rotate(45deg); }
    &::after { transform: rotate(-45deg); }
  }

  &__loader {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 25px;
    height: 25px;
    margin: auto;
    color: #fff;
    transition: transform 1s var(--ease-out-circ);
    transform: scale(0);

    svg {
      width: 25px;
      height: 25px;
    }

    .is-post-visual & { color: var(--colour-primary-difference); }
    .is-blog & { color: var(--colour-primary-difference); }
    .is-menu-opened & { color: var(--colour-primary-difference); }
    .is-load-start & { transform: scale(1); }
  }

  &__arrows {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    padding: 0 0.68rem;
    transition: transform 1s var(--ease-out-circ);
    transform: scale(0);
    will-change: transform;

    svg:first-child {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    .polygon { fill: #fff; }
  }

  &__arrow {
    position: absolute;
    top: 50%;
    width: 1.2rem;
    height: 1rem;
    margin-top: -0.5rem;
    overflow: hidden;
    font-size: 0;
    transition: width 0.2s;
    transition-timing-function: cubic-bezier(0.47, 0, 0.745, 0.715);
    will-change: transform;

    &--left { left: 0.5rem; }
    &--right { right: 0.5rem; }
  }

  &[data-expand=true] .cursor__disc {
    background: transparent;
    transform: scale(2);
  }

  &[data-light=true] .cursor__disc {
    circle { stroke: var(--colour-secondary); }
  }

  &[data-expand=true]&[data-small=true] .cursor__disc {
    background: transparent;
    transform: scale(1.125);
  }

  &[data-cross=true] .cursor__cross {
    background: transparent;
    transform: scale(1);
  }

  &[data-arrows=true] .cursor__arrows {
    background: transparent;
    transform: scale(1);
  }

  &[data-arrows=true]&[data-expand=false] .cursor__disc,
  &[data-cross=true]&[data-expand=false] .cursor__disc {
    opacity: 0;
  }

  &[data-direction=left] .cursor__arrows,
  &[data-direction=right] .cursor__arrows {
    background: transparent;
    transform: scale(1);
  }

  &[data-arrows=true]&[data-expand=true] {
    .cursor__disc {
      background: transparent;
      opacity: 1;
    }

    .cursor__arrows { opacity: 0; }
  }

  &[data-direction=left]&[data-expand=false] .cursor__disc,
  &[data-direction=right]&[data-expand=false] .cursor__disc {
    opacity: 0;
  }

  &[data-direction=right] {
    .cursor__arrow--left { opacity: 0; }
    .cursor__arrow--right { width: 2rem; }
  }

  &[data-direction=left] {
    .cursor__arrow--right { opacity: 0; }
    .cursor__arrow--left { width: 2rem; }
  }

  &[data-hidden=true] { opacity: 0; }
}
</style>
