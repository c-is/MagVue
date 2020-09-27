<template>
  <main
    id="main"
    class="main main--contact"
    role="main"
    data-page="Contact"
  >
    <article
      class="content content--contact contact"
      data-bgcolour="contanct"
    >
      <section class="contact__section contact__section--about">
        <div class="contact__inner">
          <div v-if="!$store.state.status.isMobile">
            <ProductInfo
              first="About Jigen"
              second="Contact form"
            />
          </div>

          <div
            data-aos="fade-up"
            class="contact__title-container"
          >
            <h1 class="contact__title">
              <span v-if="$store.state.status.isMobile">About</span>
              <span v-else>{{ page.title }}</span>
            </h1>

            <i v-if="!$store.state.status.isMobile">
              <ShapeContact />
            </i>
          </div>

          <div
            ref="descWrapper"
            class="contact__desc-wrapper"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <div ref="desc" class="contact__desc">
              <nuxt-content :document="page" />
            </div>
          </div>

          <div
            v-if="!$store.state.status.isMobile"
            ref="scrollIndicator"
            class="contact__scroll"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <i class="icon icon--scroll-indicator">
              <ArrowDown />
            </i>
          </div>
        </div>
      </section>

      <section class="contact__section contact__section--form">
        <div class="contact__inner contact__inner--form">
          <div
            v-if="$store.state.status.isMobile"
            class="contact__title-container contact__title-container--mobile"
            data-aos="fade-up"
          >
            <h1 class="contact__title">
              {{ page.title }}
            </h1>
            <i>
              <ShapeContact />
            </i>
          </div>

          <Form />

          <div class="social">
            <ul v-if="$config.accounts" class="social__list">
              <li
                v-for="(item, index) in $config.accounts"
                :key="item.name"
                class="social__item"
                data-aos="fade-up"
                :data-aos-delay="100 + (100 * index)"
                data-aos-duration="300"
              >
                <SocialItem v-if="item" :item="item" />
              </li>
            </ul>
          </div>
        </div>
      </section>
    </article>
  </main>
</template>

<script>
import { gsap } from 'gsap';
import SocialItem from './-SocialItem.vue';
import mixinGlobal from '../../mixins/global';
import ProductInfo from '../../components/ProductInfo.vue';
import Form from '../../components/Form.vue';
import ShapeContact from '../../svgs/shape-contact.svg';
import ArrowDown from '../../svgs/arrow-down.svg';

export default {
  components: {
    SocialItem,
    Form,
    ProductInfo,
    ShapeContact,
    ArrowDown,
  },
  mixins: [mixinGlobal],
  async asyncData({ $content }) {
    const page = await $content('page/contact').fetch();
    return {
      page,
    };
  },

  data() {
    return {
      isIndicatorActive: false,
      page: {},
    };
  },

  mounted() {
    this.$refs.descWrapper.addEventListener('scroll', this.handleIndicatorScroll);
  },

  beforeDestroy() {
    this.$refs.descWrapper.removeEventListener('scroll', this.handleIndicatorScroll);
  },

  methods: {
    displayIndicator() {
      const { desc, descWrapper, scrollIndicator } = this.$refs;
      if (desc && descWrapper && scrollIndicator) {
        const descHeight = desc.clientHeight;
        const descWrapperHeight = descWrapper.clientHeight;

        if (descHeight > descWrapperHeight) {
          this.isIndicatorActive = true;
          gsap.to(scrollIndicator.children, { autoAlpha: 1, duration: 0.4 });
        } else {
          this.isIndicatorActive = false;
          gsap.to(scrollIndicator.children, { autoAlpha: 0, duration: 0.4 });
        }
      }
    },

    handleIndicatorScroll() {
      const el = this.$refs.descWrapper;
      if (el.scrollTop === (el.scrollHeight - el.offsetHeight)) {
        this.isIndicatorActive = false;
        gsap.to(this.$refs.scrollIndicator.children, { autoAlpha: 0, duration: 0.4 });
      } else if (!this.isIndicatorActive) {
        this.isIndicatorActive = true;
        gsap.to(this.$refs.scrollIndicator.children, { autoAlpha: 1, duration: 0.4 });
      }
    },
  },
};
</script>

<style lang="postcss" scoped>
.contact {
  display: flex;
  height: 100vh;

  @media (--screen-sm-max) {
    flex-direction: column-reverse;
    height: auto;
    padding-top: 10vh;
  }

  .icon--scroll-indicator {
    &.is-active { opacity: 1; }
  }

  &__section {
    display: flex;
    width: 50%;
    height: 100%;
    padding: calc(15vh + var(--header-height)) var(--space-m);
    padding-left: var(--space-m);
    overflow: auto;

    @media (--screen-sm-max) {
      display: block;
      width: 100%;
      height: auto;
      padding: var(--space-m-mobile);
    }

    &--form {
      padding-bottom: 16.666vh;
      background-color: var(--colour-bg-secondary);

      @media (--screen-sm-max) {
        min-height: calc(100vh - 10vh);
        padding-top: 48px;
        color: var(--colour-font-contrast);
        background-color: transparent;
      }
    }

    &--about {
      padding-top: calc(15vh + 5.85rem);
      padding-right: var(--space-m);
      padding-bottom: var(--header-height);
      padding-left: var(--space-m);
      background-color: var(--colour-bg);

      @media (--screen-sm-max) {
        min-height: 100vh;
        padding: 8.2143rem var(--space-m-mobile) 12rem;
        color: var(--colour-font);
      }
    }
  }

  &__inner {
    position: relative;
    width: 100%;

    &--form {
      display: flex;
      flex-direction: column;
    }
  }

  &__title-container {
    position: relative;
    display: inline-block;
    margin-bottom: var(--content-space);

    @media (--screen-sm-max) {
      display: block;
      width: 100%;
      margin-bottom: 0;
    }

    svg {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      width: 9rem;
      height: auto;
      margin: auto;
      color: var(--colour-font);
      transform: translateY(-1rem);
    }

    &--mobile {
      svg {
        @media (--screen-sm-max) {
          z-index: -1;
          color: var(--colour-font-contrast);
          opacity: 0.5;
          transform: rotate(-45deg) translate(1.7em, -1.7em);
        }
      }
    }
  }

  &__title {
    margin: 0;
    font-size: 4.66666666667rem;

    @media (--screen-sm-max) {
      margin-bottom: 2.2857rem;
      font-size: var(--fsize-xxl-mobile);
      text-align: center;
    }
  }

  &__desc-wrapper {
    height: 40vh;
    overflow: auto;
    line-height: 2;
    -ms-overflow-style: none;

    @media (--screen-sm-max) {
      height: auto;
    }

    &::-webkit-scrollbar { width: 0 !important; }

    p {
      margin-top: 0;
      &:last-child { margin-bottom: 0; }
    }
  }

  &__scroll {
    margin-top: 3vh;
    text-align: center;

    .icon--scroll-indicator {
      @apply --hide;
    }
  }
}

.social {
  margin-top: auto;
  margin-bottom: 0;

  @media (--screen-sm-max) {
    position: absolute;
    bottom: 5rem;
    left: 0;
    width: 100%;
  }

  &__list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 355px;
    margin: auto;

    @media (--screen-sm-max) {
      width: 80%;
    }
  }
}

</style>
