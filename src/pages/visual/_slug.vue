<template>
  <main
    id="main"
    class="main main--single"
    role="main"
    data-namespace="single"
  >
    <article class="content content--single single" data-component="ImageModal">
      <section class="single__intro">
        <div
          ref="text"
          class="single__inner"
          :class="{ 'is-expanded': isDescExpanded}"
        >
          <div class="single__text">
            <a
              v-if="!$store.state.status.isMobile"
              class="single__back"
              data-aos="fade-right"
              data-aos-delay="400"
              data-cursor="standard"
              @click="$router.back()"
            >
              <ArrowBack />
            </a>

            <header ref="head" class="single__head">
              <ProductInfo
                v-if="page.shop"
                first="4 products"
                second="In stock"
              />

              <h1 class="single__title" data-animation="fadeUp">
                {{ page.title }}
              </h1>
            </header>

            <div
              ref="descWrapper"
              class="single__desc-wrapper"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div ref="desc" class="single__desc">
                <nuxt-content :document="page" />
              </div>
            </div>

            <div class="single__subinfo" data-aos="fade" data-aos-delay="400">
              <button
                v-if="isExpandButtonActive"
                ref="expandButton"
                class="button button--expand"
                data-cursor="standard"
                @click="handleExpand"
              >
                Open
              </button>

              <a
                v-if="page.shop"
                href=""
                class="fab fab--cart"
                data-type="entrance"
                data-colour="outline"
                data-cursor="standard"
              >
                <IconCart />
              </a>
            </div>

            <Share
              v-if="page.share"
              custom-class="share--post"
              :data="page.share"
              :title="page.title"
              :url="url"
            />
          </div>
        </div>

        <div ref="gallery" class="single__gallery">
          <div v-if="page.video && page.video.length > 0">
            <div
              v-for="video in page.videos"
              :key="video"
              class="single__image"
            >
              <img
                alt="gallery"
                data-cursor="standard"
                :src="`https://img.youtube.com/vi/${video}/hqdefault.jpg`"
                :data-src="`https://img.youtube.com/vi/${video}/hqdefault.jpg`"
                :data-video-id="video"
              >
            </div>
          </div>

          <div
            v-for="(gallery, index) in page.gallery"
            :key="gallery"
            class="single__image"
          >
            <video
              v-if="gallery.includes('mp4')"
              :src="gallery"
              autoplay
              loop
              class="js-button-standard"
              data-cursor="standard"
              @click="onModalOpen(gallery, index)"
            />
            <img
              v-else
              class="js-lazyload"
              data-cursor="standard"
              alt="gallery"
              :src="gallery.replace('upload/', 'upload/w_5,c_scale/')"
              :data-src="gallery"
              :data-srcset="gallery"
              :data-image-id="index"
              @click="onModalOpen(gallery, index)"
            >
          </div>
        </div>
      </section>

      <PostIndex
        v-if="$store.state.page.posts && $store.state.page.posts[type]"
        :is-post="true"
        :posts="$store.state.page.posts[type]"
        :next="next"
        :prev="prev"
      />

      <NewsLetter />

      <ImageModal
        v-if="isModalOpen && target"
        :target="target"
        :start="modalIndex"
        :gallery="page.gallery"
        :close="onModalClose"
      />
    </article>
  </main>
</template>

<script>
import { gsap } from 'gsap';
import mixinGlobal from '~/mixins/global';
import ImageModal from '~/components/ImageModal.vue';
import PostIndex from '~/components/PostIndex.vue';
import NewsLetter from '~/components/NewsLetter.vue';
import ProductInfo from '~/components/ProductInfo.vue';
import Share from '~/components/Share/index.vue';
import PostScroller from '~/widgets/PostScroller';
import ArrowBack from '~/svgs/arrow-back.svg';
import IconCart from '~/svgs/icon-cart.svg';

const MIN_HEIGHT = 580;

export default {
  components: {
    ProductInfo,
    ArrowBack,
    IconCart,
    ImageModal,
    PostIndex,
    NewsLetter,
    Share,
  },
  mixins: [mixinGlobal],
  async asyncData({
    $content,
    route,
    $config,
    page,
  }) {
    const url = `${$config.url}${route.path}`;
    const type = route.name.replace('/slug', '');

    const [prev, next] = await $content(type)
      .only(['title', 'slug', 'path'])
      // .sortBy('createdAt', 'asc')
      .surround(route.params.slug)
      .fetch();

    return {
      page,
      prev,
      next,
      type,
      url,
    };
  },

  data() {
    return {
      page: {},
      isModalOpen: false,
      isExpandButtonActive: false,
      isDescExpanded: false,
      descWrapperHeight: 0,
      modalIndex: 0,
      target: null,
      prev: null,
      next: null,
      type: '',
    };
  },

  async mounted() {
    await this.lazyload();
    this.scroller = new PostScroller(this.$refs);
    this.scroller.render();
    this.displayExpandButton();
  },

  destroyed() {
    this.scroller.destroy();
  },

  methods: {
    onModalOpen(target, index) {
      this.target = target;
      this.modalIndex = index;
      this.isModalOpen = true;
    },

    onModalClose() {
      this.target = null;
      this.isModalOpen = false;
    },

    displayExpandButton() {
      const { desc, descWrapper } = this.$refs;

      if (desc && descWrapper) {
        const descWrapperHeight = descWrapper.clientHeight;
        const descHeight = desc.clientHeight;

        if (descHeight > descWrapperHeight) {
          this.isExpandButtonActive = true;
        }
      }
    },

    getDescSize() {
      if (window.innerHeight < MIN_HEIGHT) {
        return this.descWrapperHeight + this.$refs.head.clientHeight + 32;
      }

      if (this.$refs.desc.clientHeight > window.innerHeight / 2) {
        return window.innerHeight / 2;
      }

      return this.$refs.desc.clientHeight + 32;
    },

    onExpand() {
      this.isDescExpanded = true;

      if (this.$refs.head) {
        this.headHeight = this.$refs.head.clientHeight;
        gsap.to(this.$refs.head, { autoAlpha: 0, height: 0, duration: 0.4 });
      }

      if (this.$refs.desc) {
        this.descWrapperHeight = this.$refs.descWrapper.clientHeight;
        const height = this.getDescSize();
        gsap.to(this.$refs.descWrapper, { height, duration: 0.4 });
      }
    },

    onExpandMobile() {
      this.isDescExpanded = true;

      if (this.$refs.desc) {
        this.descWrapperHeight = this.$refs.descWrapper.clientHeight;
        const height = this.$refs.desc.clientHeight + 32;
        gsap.to(this.$refs.descWrapper, { height, duration: 0.4 });
      }
    },

    onShrink() {
      this.isDescExpanded = false;
      gsap.to(this.$refs.head, { height: this.headHeight, autoAlpha: 1, duration: 0.4 });
      gsap.to(this.$refs.descWrapper, { height: this.descWrapperHeight, duration: 0.4 });
    },

    onShrinkMobile() {
      this.isDescExpanded = false;
      gsap.to(this.$refs.descWrapper, { height: this.descWrapperHeight, duration: 0.4 });
      gsap.to(window, { scrollTo: this.$refs.desc.offsetTop, duration: 0.4 });
    },

    handleExpand(event) {
      event.preventDefault();

      if (this.isDescExpanded) {
        if (this.$store.state.status.isMobile) {
          this.onShrinkMobile();
        } else {
          this.onShrink();
        }
        this.isDescExpanded = false;
      } else {
        if (this.$store.state.status.isMobile) {
          this.onExpandMobile();
        } else {
          this.onExpand();
        }
        this.isDescExpanded = true;
      }
    },

    async lazyload() {
      const lazyImages = [].slice.call(this.$refs.gallery.querySelectorAll('.js-lazyload:not([src*=".mp4"])'));

      if ('IntersectionObserver' in window) {
        const lazyImageObserver = await new IntersectionObserver(async entries => {
          await entries.forEach(entry => {
            if (entry.isIntersecting) {
              const lazyImage = entry.target;
              lazyImage.src = lazyImage.dataset.src;

              if (lazyImage.dataset.srcset) {
                lazyImage.srcset = lazyImage.dataset.srcset;
              }

              lazyImage.classList.remove('js-lazyload');
              lazyImageObserver.unobserve(lazyImage);
            }
          });
        });

        lazyImages.forEach(lazyImage => {
          lazyImageObserver.observe(lazyImage);
        });
      } else {
      // Possibly fall back to a more compatible method here
      }
    },
  },
};
</script>

<style lang="postcss" scoped>
.single {
  width: 100%;
  min-height: 100vh;
  padding-bottom: 0;

  .product-info {
    position: relative;
    top: 0;
    margin-bottom: 4.25vh;

    @media (--screen-sm-max) {
      margin-top: 0.85715rem;
      margin-bottom: 0;
    }
  }

  .button--expand {
    position: relative;
    width: 4rem;
    height: 4rem;
    padding: 0;
    color: transparent;
    text-indent: -9999px;
    background: none;
    border: none;
    outline: none;

    &::after {
      transform: rotate(90deg);
    }

    &::before,
    &::after {
      position: absolute;
      top: 28px;
      left: 14px;
      width: 32px;
      height: 2px;
      content: '';
      background-color: var(--colour-font);
      transition: background 0.4s, transform 0.4s;
    }

    &:hover {
      &::before,
      &::after {
        background-color: var(--colour-primary);
      }
    }
  }

  .post-index {
    @media (--screen-sm-max) {
      height: 100vh;
      padding: 0;
    }
  }

  &__intro {
    position: relative;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 0;

    @media (--screen-sm-max) {
      display: block;
    }
  }

  &__head {
    margin-bottom: 5.3812vh;
    transition: margin-bottom 0.4s;

    @media (--screen-sm-max) {
      display: flex;
      flex-direction: column-reverse;
      align-items: center;
    }
  }

  &__title {
    margin-bottom: 0;
    font-size: var(--fsize-xxl);
  }

  &__back {
    display: inline-block;
    margin-bottom: 5vh;
    color: var(--colour-font);
    transition: color 0.4s;

    &:hover {
      color: var(--colour-primary);
    }
  }

  &__text {
    position: relative;
    display: flex;
    flex-direction: column;
    height: calc(100% - var(--header-height));
    padding: 0 0 var(--header-height);
    margin-top: calc(var(--header-height) + 3.5vh);
    overflow: auto;
    &::-webkit-scrollbar { display: none; }

    @media (--screen-sm-max) {
      width: 100%;
      height: auto;
      padding-bottom: 24px;
      margin-top: 0;
      text-align: center;
      .button { margin: auto; }
    }
  }

  &__gallery {
    width: 50%;
    padding: 0;
    overflow: hidden;
    background-size: cover;

    @media (--screen-sm-max) {
      width: 100%;
    }
  }

  &__outro {
    position: relative;
    width: 100%;
    height: 33.3333333333rem;
    margin: var(--space-l) 0;
    overflow: hidden;

    img { filter: none; }
  }

  &__image {
    display: flex;
    align-items: center;
    overflow: hidden;

    img {
      width: 100%;
      min-height: 100%;
      padding: 0;
      transition: transform 0.6s;
      object-fit: cover;
      &:hover { transform: scale(1.025); }

      @media (--screen-sm-max) {
        min-height: 0;
      }
    }

    video {
      width: 100%;
      height: 100%;
      padding: 0;
      object-fit: cover;
    }
  }

  &__desc-wrapper {
    position: relative;
    height: 20vh;
    overflow: hidden;
    text-align: left;

    &::-webkit-scrollbar { display: none; }

    .is-expanded & {
      overflow: auto;
    }

    @media (--screen-sm-max) {
      width: 100%;
      max-height: none;
      margin-bottom: 1rem;
    }

    &::before {
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 2;
      width: 100%;
      height: 8vh;
      content: '';
      background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, var(--colour-bg) 66.67%);
      transition: opacity 0.4s;
    }
  }

  &__desc {
    line-height: 2;

    p {
      margin-top: 0;
      &:last-child { margin-bottom: 0; }
    }
  }

  &__subinfo {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 1.25vh;
    text-align: center;

    .fab--cart {
      margin-top: 1vh;
      transition: opacity 0.4s, transform 1.2s var(--ease-out-circ);

      &:hover {
        transform: scale(1.125);
      }

      .is-expanded & {
        opacity: 0;
        transform: scale(0) !important;
      }
    }
  }

  &__inner {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    width: 50%;
    height: 100vh;
    padding: 0 var(--space-m) 0;
    overflow: hidden;

    &.is-done {
      position: absolute;
      top: auto;
      bottom: 0;
    }

    &.is-expanded {
      .single__head {
        @media (--screen-sm-min) {
          margin-bottom: 0;
        }
      }

      .single__desc-wrapper::before { opacity: 0; }
      .button--expand::before { transform: rotate(-45deg); }
      .button--expand::after { transform: rotate(45deg); }

      .button--expand::before,
      .button--expand::after { background-color: var(--colour-primary); }
    }

    @media (--screen-sm-max) {
      position: relative;
      align-items: flex-start;
      width: 100%;
      height: auto;
      min-height: 80vh;
      padding: 8rem var(--content-space-mobile) 4rem;
      margin: 0;
      text-align: center;
    }

    .button--link {
      margin-top: 10.09vh;
    }
  }
}

.share--post {
  margin-top: auto;

  @media (--screen-sm-max) {
    position: relative;
    bottom: 0;
  }
}
</style>
