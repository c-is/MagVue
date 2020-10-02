<template>
  <div v-if="!$fetchState.pending && $store.state.status.isPageLoaded">
    <CustomCursor />
    <Header />
    <Nuxt />
    <Footer v-if="$route.name !== 'index' && $route.name !== 'contact'" />
    <Menu />
  </div>
</template>

<script>
import { gsap } from 'gsap';
import AOS from 'aos';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { setBrowserDetect, browserDetect } from '../utils/globals';
import CustomCursor from '../components/Cursor.vue';
import Menu from '../components/Menu/index.vue';
import Header from './Header.vue';
import Footer from './Footer.vue';

function setPageView(route) {
  setBrowserDetect();

  const { body } = document;
  const list = [...body.classList];

  list.forEach(name => {
    if (name.match(/(^|\s)is-\S+/g)) {
      body.classList.remove(name);
    }
  });

  switch (route.name) {
    case 'visual':
      document.body.classList.add('is-post-visual');
      document.body.classList.add('is-post');
      break;
    case 'industrial':
      document.body.classList.add('is-post-industrial');
      document.body.classList.add('is-post');
      break;
    case 'visual/slug':
      document.body.classList.add('is-single');
      break;
    case 'industrial/slug':
      document.body.classList.add('is-single');
      break;
    case 'contact':
      document.body.classList.add('is-contact');
      break;
    case 'blog':
      document.body.classList.add('is-blog');
      break;
    case 'blog/slug':
      document.body.classList.add('is-blog');
      break;
    case 'index':
      document.body.classList.add('is-home');
      break;
    default:
      break;
  }
}

export default {
  components: {
    Header,
    Footer,
    CustomCursor,
    Menu,
  },
  async fetch() {
    setPageView(this.$route);
    // const ScrollToPlugin = require('gsap/ScrollToPlugin');
    const navigation = await this.$content('page/navigation').fetch();
    const industrial = await this.$content('industrial').limit(this.$config.postSize || 10).only(['title', 'path']).fetch();
    const visual = await this.$content('visual').limit(this.$config.postSize || 10).only(['title', 'path']).fetch();
    this.$store.dispatch('page/setNavigation', navigation.navigation);
    this.$store.dispatch('page/setPostAll', { visual, industrial });
    this.$store.dispatch('status/setIsPageLoaded', true);
    this.$store.dispatch('status/setIsMobile', browserDetect().mobile);
  },
  data() {
    return {
      isResizing: false,
    };
  },
  watch: {
    $route() {
      setPageView(this.$route);
    },
  },
  mounted() {
    window.addEventListener('resize', this.setResize);
    gsap.registerPlugin(ScrollToPlugin);

    AOS.init({
      // Global settings:
      disable: false,
      startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
      initClassName: 'aos-init', // class applied after initialization
      animatedClassName: 'aos-animate', // class applied on animation
      useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
      disableMutationObserver: false, // disables automatic mutations' detections (advanced)
      debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
      throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

      // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
      offset: 20, // offset (in px) from the original trigger point
      delay: 0, // values from 0 to 3000, with step 50ms
      duration: 600, // values from 0 to 3000, with step 50ms
      easing: 'ease-out-sine', // default easing for AOS animations
      once: true, // whether animation should happen only once - while scrolling down
      mirror: false, // whether elements should animate out while scrolling past them
      anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
    });
  },
  destroyed() {
    window.removeEventListener('resize', this.setResize);
  },
  methods: {
    setResize() {
      if (this.isResizing) return;
      const { isMobile } = this.$store.state.status;
      this.isResizing = true;

      if (window.innerWidth <= 992 && !isMobile) {
        this.$store.dispatch('status/setIsMobile', true);
      } else if (window.innerWidth > 992 && isMobile) {
        this.$store.dispatch('status/setIsMobile', false);
      }

      this.isResizing = false;
    },
  },
};
</script>

<style lang="postcss">
  @import '../css/_theme.css';
</style>
