import { gsap } from 'gsap';

export default {
  mounted() {
    if (this.$store.state.widgets.cursor && this.$store.state.widgets.cursor.reset) {
      this.$store.state.widgets.cursor.reset();
    }
  },
  transition: {
    css: false,
    mode: 'out-in',
    async leave(el, done) {
      await gsap.to(el.querySelector('.content'), {
        opacity: 0, y: 20, duration: 0.4, ease: 'back',
      });
      done();
    },
    beforeEnter(el) {
      gsap.set(el, { opacity: 0 });
      const content = el.querySelector('.content');
      if (content) {
        gsap.set(content, { opacity: 0, y: 20 });
      }
    },
    async enter(el, done) {
      const content = el.querySelector('.content');
      gsap.to(el, { opacity: 1, duration: 0.4 });

      if (content) {
        await gsap.to(content, {
          opacity: 1, y: 0, duration: 0.4, ease: 'back',
        });
        gsap.set(content, { clearProps: 'all' });
      }

      done();
    },
  },
};
