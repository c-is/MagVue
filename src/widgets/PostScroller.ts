interface Refs {
  view: HTMLDivElement;
  text: HTMLElement;
  gallery: HTMLElement;
}

interface Section {
  el: HTMLImageElement;
  start: number;
  y: number;
  height: number;
}

export default class Scroller {
  view: HTMLElement;

  refs: Refs;

  sections: Section[];

  sectionIndex: number;

  storePosition: number;

  isScrollAnimating: boolean;

  onScrollTextBound: () => void;

  constructor(refs: Refs) {
    this.view = refs.view;
    this.refs = refs;
    this.sections = [];
    this.sectionIndex = 0;
    this.storePosition = 0;
    this.isScrollAnimating = false;
    this.onScrollTextBound = this.onScrollText.bind(this);
  }

  storeCache() {
    const sections: Section[] = [];
    const images = this.refs.gallery.querySelectorAll('img');

    images.forEach(image => {
      sections.push({
        el: image,
        start: 0.1,
        y: image.offsetTop,
        height: image.clientHeight,
      });
    });

    this.sections = sections;
  }

  onScrollText() {
    const doc = document.documentElement;
    const st = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    const wh = window.innerHeight;
    const infoHeight = this.refs.text.clientHeight;
    const sideNavHeight = wh - infoHeight;

    const box = this.refs.gallery.getBoundingClientRect().top;
    const contentTop = box + st;
    const contentHeight = this.refs.gallery.clientHeight;
    const ch = contentHeight < wh ? wh : contentHeight;
    const contentBottomLine = -wh + contentTop + ch + sideNavHeight;

    if (st >= contentTop && st < contentBottomLine) {
      this.refs.text.classList.remove('is-done');
      // this.refs.text.classList.add('is-fixed');
    } else if (st > contentBottomLine) {
      // this.refs.text.classList.remove('is-fixed');
      this.refs.text.classList.add('is-done');
    } else {
      // this.refs.text.classList.remove('is-fixed');
      this.refs.text.classList.remove('is-done');
    }
  }

  events() {
    window.addEventListener('scroll', this.onScrollTextBound);
  }

  destroy() {
    window.removeEventListener('scroll', this.onScrollTextBound);
  }

  render() {
    this.events();
    // this.storeCache();
    // this.onScrollTextBound();
  }
}
