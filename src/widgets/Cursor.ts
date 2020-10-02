import { gsap } from 'gsap';
// eslint-disable-next-line
import * as Utils from '../utils/utils';
import { browserDetect } from '../utils/globals';
import observer from './observer';

/* global NodeListOf */

export default class Cursor {
  /* eslint lines-between-class-members: 0 */
  cursor: HTMLDivElement;
  hoverElementsSelector: string;
  lightElementsSelector: string;
  arrowElementsSelector: string;
  crossElementsSelector: string;
  darkElementsSelector: string;
  w: number;
  h: number;
  currentX: number;
  currentY: number;
  targetX: number;
  targetY: number;
  hoverElements: null | NodeListOf<Element>;
  lightElements: null | NodeListOf<Element>;
  arrowElements: null | NodeListOf<Element>;
  crossElements: null | NodeListOf<Element>;
  darkElements: null | NodeListOf<Element>;

  constructor(el: HTMLDivElement) {
    this.cursor = el;

    this.hoverElementsSelector = '[data-cursor="small"], [data-cursor="standard"]';
    this.lightElementsSelector = '[data-cursor="light"], [data-theme="dark"]';
    this.arrowElementsSelector = '[data-cursor="arrow"]';
    this.crossElementsSelector = '[data-cursor="cross"]';
    this.darkElementsSelector = '[data-cursor="dark"], [data-theme="light"]';

    this.w = window.innerWidth;
    this.h = window.innerHeight;

    this.currentX = (this.w / 2);
    this.currentY = (this.h / 2);

    this.targetX = (this.w / 2);
    this.targetY = (this.h / 2);

    this.hoverElements = null;
    this.lightElements = null;
    this.arrowElements = null;
    this.crossElements = null;
    this.darkElements = null;

    // Bindings
    // this.resetElementsBound = this.resetElements.bind(this);
    this.getInitialPos = this.getInitialPos.bind(this);
    this.getPos = this.getPos.bind(this);
    this.setPos = this.setPos.bind(this);
    this.setLogoPos = this.setLogoPos.bind(this);
    this.hide = this.hide.bind(this);
    this.show = this.show.bind(this);
    this.grow = this.grow.bind(this);
    this.shrink = this.shrink.bind(this);
    this.dark = this.dark.bind(this);
    this.light = this.light.bind(this);
    this.cross = this.cross.bind(this);
    this.crossOff = this.crossOff.bind(this);
    this.sliderModeOn = this.sliderModeOn.bind(this);
    this.sliderModeOff = this.sliderModeOff.bind(this);
    this.sliderDirection = this.sliderDirection.bind(this);
    this.destroy = this.destroy.bind(this);
    this.init = this.init.bind(this);
    this.resetElements = this.resetElements.bind(this);
    this.update = this.update.bind(this);
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);

    observer.ready('[data-cursor]', this.add);
  }

  update(el: HTMLDivElement) {
    this.cursor = el;
  }

  events() {
    window.addEventListener('mousemove', this.getInitialPos);
    window.addEventListener('mousemove', this.setLogoPos);
    document.body.addEventListener('mouseenter', this.show);
  }

  initMobile() {
    this.cursor.style.opacity = '0';
  }

  init() {
    this.hoverElements = document.body.querySelectorAll(this.hoverElementsSelector);
    this.lightElements = document.body.querySelectorAll(this.lightElementsSelector);
    this.arrowElements = document.body.querySelectorAll(this.arrowElementsSelector);
    this.crossElements = document.body.querySelectorAll(this.crossElementsSelector);
    this.darkElements = document.body.querySelectorAll(this.darkElementsSelector);

    for (let x = 0; x < this.hoverElements.length; x += 1) {
      this.hoverElements[x].addEventListener('mouseenter', this.grow);
      this.hoverElements[x].addEventListener('mouseleave', this.shrink);
    }

    for (let x = 0; x < this.lightElements.length; x += 1) {
      this.lightElements[x].addEventListener('mouseenter', this.light);
      this.lightElements[x].addEventListener('mouseleave', this.dark);
    }

    for (let x = 0; x < this.arrowElements.length; x += 1) {
      this.arrowElements[x].addEventListener('mouseenter', this.sliderModeOn);
      this.arrowElements[x].addEventListener('mouseleave', this.sliderModeOff);
    }

    for (let x = 0; x < this.crossElements.length; x += 1) {
      this.crossElements[x].addEventListener('mouseenter', this.cross);
      this.crossElements[x].addEventListener('mouseleave', this.crossOff);
    }

    for (let x = 0; x < this.darkElements.length; x += 1) {
      this.darkElements[x].addEventListener('mouseenter', this.dark);
    }
  }

  destroy() {
    // super.destroy();
    this.shrink();

    window.removeEventListener('mousemove', this.getInitialPos);
    window.removeEventListener('mousemove', this.getPos);
    window.removeEventListener('mousemove', this.setLogoPos);
    document.body.removeEventListener('mouseenter', this.show);

    if (this.hoverElements) {
      for (let x = 0; x < this.hoverElements.length; x += 1) {
        this.hoverElements[x].removeEventListener('mouseenter', this.grow);
        this.hoverElements[x].removeEventListener('mouseleave', this.shrink);
      }
    }

    if (this.lightElements) {
      for (let x = 0; x < this.lightElements.length; x += 1) {
        this.lightElements[x].removeEventListener('mouseenter', this.light);
        this.lightElements[x].removeEventListener('mouseleave', this.dark);
      }
    }

    if (this.arrowElements) {
      for (let x = 0; x < this.arrowElements.length; x += 1) {
        this.arrowElements[x].removeEventListener('mouseenter', this.sliderModeOn);
        this.arrowElements[x].removeEventListener('mouseleave', this.sliderModeOff);
      }
    }

    if (this.crossElements) {
      for (let x = 0; x < this.crossElements.length; x += 1) {
        this.crossElements[x].removeEventListener('mouseenter', this.cross);
        this.crossElements[x].removeEventListener('mouseleave', this.crossOff);
      }
    }

    if (this.darkElements) {
      for (let x = 0; x < this.darkElements.length; x += 1) {
        this.darkElements[x].removeEventListener('mouseenter', this.dark);
      }
    }
  }

  resetElements() {
    const isMobile = browserDetect().mobile;

    if (isMobile) {
      return;
    }

    this.hoverElements = document.body.querySelectorAll(this.hoverElementsSelector);
    this.lightElements = document.body.querySelectorAll(this.lightElementsSelector);
    this.arrowElements = document.body.querySelectorAll(this.arrowElementsSelector);
    this.crossElements = document.body.querySelectorAll(this.crossElementsSelector);
    this.darkElements = document.body.querySelectorAll(this.darkElementsSelector);

    for (let x = 0; x < this.hoverElements.length; x += 1) {
      this.hoverElements[x].removeEventListener('mouseenter', this.grow);
      this.hoverElements[x].removeEventListener('mouseleave', this.shrink);
    }

    for (let x = 0; x < this.lightElements.length; x += 1) {
      this.lightElements[x].removeEventListener('mouseenter', this.light);
      this.lightElements[x].removeEventListener('mouseleave', this.dark);
    }

    for (let x = 0; x < this.arrowElements.length; x += 1) {
      this.arrowElements[x].removeEventListener('mouseenter', this.sliderModeOn);
      this.arrowElements[x].removeEventListener('mouseleave', this.sliderModeOff);
    }

    for (let x = 0; x < this.crossElements.length; x += 1) {
      this.crossElements[x].removeEventListener('mouseenter', this.cross);
      this.crossElements[x].removeEventListener('mouseleave', this.crossOff);
    }

    for (let x = 0; x < this.darkElements.length; x += 1) {
      this.darkElements[x].removeEventListener('mouseenter', this.dark);
    }

    this.init();
  }

  add(elements: HTMLElement[]) {
    for (let i = elements.length - 1; i >= 0; i -= 1) {
      const element = elements[i];

      if (element.dataset && element.dataset.cursor) {
        switch (element.dataset.cursor) {
          case 'light':
            element.addEventListener('mouseenter', this.light);
            element.addEventListener('mouseleave', this.dark);
            break;
          case 'cross':
            element.addEventListener('mouseenter', this.cross);
            element.addEventListener('mouseleave', this.crossOff);
            break;
          case 'arrow':
            element.addEventListener('mouseenter', this.sliderModeOn);
            element.addEventListener('mouseleave', this.sliderModeOff);
            break;
          case 'dark':
            element.addEventListener('mouseenter', this.dark);
            break;
          default:
            element.addEventListener('mouseenter', this.grow);
            element.addEventListener('mouseleave', this.shrink);
            break;
        }
      }
    }
  }

  remove(elements: HTMLElement[]) {
    for (let i = elements.length - 1; i >= 0; i -= 1) {
      const element = elements[i];
      const type = element.dataset ? element.dataset.cursor : '';
      switch (type) {
        case 'light':
          element.removeEventListener('mouseenter', this.light);
          element.removeEventListener('mouseleave', this.dark);
          break;
        case 'cross':
          element.removeEventListener('mouseenter', this.cross);
          element.removeEventListener('mouseleave', this.crossOff);
          break;
        case 'arrow':
          element.removeEventListener('mouseenter', this.sliderModeOn);
          element.removeEventListener('mouseleave', this.sliderModeOff);
          break;
        case 'dark':
          element.removeEventListener('mouseenter', this.dark);
          break;
        default:
          element.removeEventListener('mouseenter', this.grow);
          element.removeEventListener('mouseleave', this.shrink);
          break;
      }
    }
  }

  getInitialPos(e: MouseEvent) {
    if (this.w < 1024) return;
    window.removeEventListener('mousemove', this.getInitialPos);

    this.targetX = e.clientX;
    this.targetY = e.clientY;
    this.currentX = this.targetX;
    this.currentY = this.targetY;

    window.requestAnimationFrame(this.setPos);
    window.addEventListener('mousemove', this.getPos);
  }

  getPos(e: MouseEvent) {
    this.targetX = e.clientX;
    this.targetY = e.clientY;
  }

  setPos() {
    this.currentX += (this.targetX - this.currentX) * 0.5;
    this.currentY += (this.targetY - this.currentY) * 0.5;
    gsap.set(this.cursor, { x: this.currentX, y: this.currentY });
    window.requestAnimationFrame(this.setPos);
  }

  setLogoPos = (e: MouseEvent) => {
    const eye = document.querySelector('.js-eye');

    if (!eye) return;
    const mouseX = (eye.getBoundingClientRect().left);
    const mouseY = (eye.getBoundingClientRect().top);
    const radianDegrees = Math.atan2(e.pageX - mouseX, e.pageY - mouseY);
    const rotationDegrees = (radianDegrees * (180 / Math.PI) * -1) + 180;
    gsap.killTweensOf(eye);
    gsap.to(eye, { rotation: rotationDegrees, duration: 0.6 });
    // eye.style.transform = `rotate(${rotationDegrees}deg)`
  }

  hide() {
    Utils.setAttribute(this.cursor, 'hidden', true);
  }

  show() {
    Utils.setAttribute(this.cursor, 'hidden', false);
  }

  grow(e: Event) {
    // Utils.setAttribute(this.cursor, 'arrows', false)
    Utils.setAttribute(this.cursor, 'expand', true);

    // @ts-ignore
    if (e.target && e.target.dataset.cursor === 'small') {
      Utils.setAttribute(this.cursor, 'small', true);
    }
  }

  shrink() {
    // Utils.setAttribute(this.cursor, 'arrows', false)
    Utils.setAttribute(this.cursor, 'expand', false);
    Utils.setAttribute(this.cursor, 'small', false);
  }

  light() {
    // Utils.setAttribute(this.cursor, 'arrows', false)
    Utils.setAttribute(this.cursor, 'light', true);
  }

  dark() {
    // Utils.setAttribute(this.cursor, 'arrows', false)
    Utils.setAttribute(this.cursor, 'light', false);
  }

  cross() {
    Utils.setAttribute(this.cursor, 'arrows', false);
    Utils.setAttribute(this.cursor, 'direction', null);
    Utils.setAttribute(this.cursor, 'cross', true);
    // Utils.setAttribute(this.cursor, 'expand', true)
  }

  crossOff() {
    Utils.setAttribute(this.cursor, 'cross', false);
    // Utils.setAttribute(this.cursor, 'expand', false)
  }

  sliderModeOn(e: Event) {
    // @ts-ignore
    const dir = e.target.dataset.direction;

    if (dir) {
      Utils.setAttribute(this.cursor, 'direction', dir);
    }

    Utils.setAttribute(this.cursor, 'arrows', true);
  }

  sliderModeOff() {
    Utils.setAttribute(this.cursor, 'direction', null);
    Utils.setAttribute(this.cursor, 'arrows', false);
  }

  sliderDirection(dir = 'both') {
    Utils.setAttribute(this.cursor, 'direction', dir);
  }

  navDirection(dir = 'both') {
    Utils.setAttribute(this.cursor, 'arrows', true);
    Utils.setAttribute(this.cursor, 'direction', dir);
  }

  navDirectionOff() {
    Utils.setAttribute(this.cursor, 'arrows', false);
    Utils.setAttribute(this.cursor, 'direction', null);
  }
}
