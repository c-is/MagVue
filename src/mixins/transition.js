import { gsap } from 'gsap';

const curtainsOpenTimeline = () => (
  gsap.timeline()
    .set('.curtains', { transformOrigin: '0%' })
    .fromTo('.curtains', { scaleX: 0 }, { duration: 0.6, scaleX: 1, ease: 'power2.easeInOut' })
    .fromTo('.curtains-logo', { x: '-100%', autoAlpha: 0 }, {
      duration: 0.3, x: '-50%', autoAlpha: 1, ease: 'power2.easeInOut',
    }, '-=0.45')
);

const curtainsCloseTimeline = () => gsap.timeline()
  .set('.curtains', { transformOrigin: '100%' })
  .to('.curtains', { duration: 0.6, scaleX: 0, ease: 'power2.easeInOut' })
  .fromTo('.curtains-logo', { x: '-50%', autoAlpha: 1 }, {
    duration: 0.3, x: '0%', autoAlpha: 0, ease: 'power2.easeInOut',
  }, '-=0.5');

const caseStudyReveal = () => gsap.timeline()
  .to('.st', 0.3, { autoAlpha: 1, y: '0%', ease: 'back.easeOut' }, 0.05, '-=0.2')
  .fromTo('.project-header-year', { autoAlpha: 0, y: '20%' }, { duration: 0.3, autoAlpha: 1, y: '0%' }, '-=0.6');

const projectsHeroReveal = () => gsap.to('.st', {
  duration: 0.3,
  autoAlpha: 1,
  y: '0%',
  ease: 'back.easeOut',
  stagger: 0.05,
});

const hideStaggers = () => gsap
  .set('.st', { autoAlpha: 0, y: '-18px' });

const createTransitionMixin = (leaveTweens = [], enterTweens = []) => ({
  transition: {
    css: false,
    mode: 'out-in',
    leave(_el, done) {
      if (!this.$store.state.menuIsAnimating) {
        const leaveTimeline = gsap.timeline();
        leaveTweens.forEach(tween => {
          leaveTimeline.add(tween());
        });
        leaveTimeline.eventCallback('onComplete', done);
      } else {
        done();
      }
    },
    enter(_el, done) {
      if (!this.$store.state.menuIsAnimating) {
        const enterTimeline = gsap.timeline();
        enterTweens.forEach(tween => {
          enterTimeline.add(tween());
        });
        enterTimeline.eventCallback('onComplete', done);
      } else {
        done();
      }
    },
  },
});

export const CurtainTransitionBasic = createTransitionMixin(
  [curtainsOpenTimeline],
  [curtainsCloseTimeline],
);

export const CurtainTransitionCaseStudy = createTransitionMixin(
  [curtainsOpenTimeline],
  [curtainsCloseTimeline, hideStaggers, caseStudyReveal],
);

export const CurtainTransitionProjectList = createTransitionMixin(
  [curtainsOpenTimeline],
  [curtainsCloseTimeline, hideStaggers, projectsHeroReveal],
);
