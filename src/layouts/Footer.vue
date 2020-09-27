<template>
  <footer class="footer" role="contentinfo" data-animation="fadeIn" data-delay="0.4">
    <span class="footer__copyright">Copyright © 2020 Jigen 次元 ー Studio . All rights reserved.</span>
    <span class="footer__divider u-pc">・</span>
    <a class="footer__link js-button-standard" href="">Privacy policy</a>
    <span class="footer__divider u-pc">・</span>
    <a class="footer__link js-button-standard" href="">Terms & Conditions</a>
  </footer>
</template>

<style lang="postcss" scoped>
.footer {
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 9rem 0 8.925rem;
  background-color: var(--colour-bg);

  @media (--screen-sm-max) {
    flex-direction: column-reverse;
    padding: 9rem var(--gutter-space-mobile) 5.2143rem;
    text-align: center;
  }

  /* .is-home &,
  .is-contact & {
    height: 0;
    padding: 0;
    overflow: hidden;
    visibility: hidden;
    opacity: 0;
  } */

  .is-post-industrial & {
    color: var(--colour-font-contrast);
    background-color: var(--colour-bg-secondary);
    a { color: var(--colour-font-contrast); }
  }

  &__copyright {
    padding: 1em;

    @media (--screen-sm-max) {
      padding: 1em 0;
    }
  }

  &__inner {
    display: grid;
    grid-template-columns: repeat(12, var(--grid-width));
    grid-column-gap: var(--gutter-space);
    padding: var(--space-m) calc(var(--gutter-space) / 2);
  }

  &__link {
    color: var(--colour-font);
    text-decoration: underline;
    &:hover { color: var(--colour-primary); }

    @media (--screen-sm-max) {
      padding: 0.5rem;
    }
  }

  &__sns {
    grid-area: 2 / auto / auto / span 3;
  }
}
</style>
