import { gsap } from 'gsap';

import * as Utils from '../utils/utils';
import { browserDetect } from '../utils/__globals';

export default class Cursor {
  constructor(el) {
    this.cursor = el;

    this.hoverElementsSelector = '.js-button-standard, [data-cursorSize="small"]';
    this.lightElementsSelector = '.js-button-light, [data-theme="dark"]';
    this.arrowElementsSelector = '.js-button-arrows';
    this.crossElementsSelector = '.js-button-cross';
    this.darkElementsSelector = '.js-button-dark, [data-theme="light"]';

    this.w = window.innerWidth;
    this.h = window.innerHeight;

    this.currentX = (this.w / 2);
    this.currentY = (this.h / 2);

    this.targetX = (this.w / 2);
    this.targetY = (this.h / 2);

    // Bindings
    // this.resetElementsBound = this.resetElements.bind(this);
    this.getInitialPosBound = this.getInitialPos.bind(this);
    this.getPosBound = this.getPos.bind(this);
    this.setPosBound = this.setPos.bind(this);
    this.setLogoPosBound = this.setLogoPos.bind(this);
    this.hideBound = this.hide.bind(this);
    this.showBound = this.show.bind(this);
    this.growBound = this.grow.bind(this);
    this.shrinkBound = this.shrink.bind(this);
    this.darkBound = this.dark.bind(this);
    this.lightBound = this.light.bind(this);
    this.crossBound = this.cross.bind(this);
    this.crossOff = this.crossOff.bind(this);
    this.sliderModeOnBound = this.sliderModeOn.bind(this);
    this.sliderModeOffBound = this.sliderModeOff.bind(this);
    this.sliderDirectionBound = this.sliderDirection.bind(this);
    this.destroy = this.destroy.bind(this);
    this.init = this.init.bind(this);
    this.resetElements = this.resetElements.bind(this);
    this.update = this.update.bind(this);
  }

  update(el) {
    this.cursor = el;
  }

  events() {
    window.addEventListener('mousemove', this.getInitialPosBound);
    window.addEventListener('mousemove', this.setLogoPosBound);
    document.body.addEventListener('mouseenter', this.showBound);
  }

  initMobile() {
    this.cursor.style.opacity = 0;
  }

  init() {
    this.hoverElements = document.body.querySelectorAll(this.hoverElementsSelector);
    this.lightElements = document.body.querySelectorAll(this.lightElementsSelector);
    this.arrowElements = document.body.querySelectorAll(this.arrowElementsSelector);
    this.crossElements = document.body.querySelectorAll(this.crossElementsSelector);
    this.darkElements = document.body.querySelectorAll(this.darkElementsSelector);

    for (let x = 0; x < this.hoverElements.length; x += 1) {
      this.hoverElements[x].addEventListener('mouseenter', this.growBound);
      this.hoverElements[x].addEventListener('mouseleave', this.shrinkBound);
    }

    for (let x = 0; x < this.lightElements.length; x += 1) {
      this.lightElements[x].addEventListener('mouseenter', this.lightBound);
      this.lightElements[x].addEventListener('mouseleave', this.darkBound);
    }

    for (let x = 0; x < this.arrowElements.length; x += 1) {
      this.arrowElements[x].addEventListener('mouseenter', this.sliderModeOnBound);
      this.arrowElements[x].addEventListener('mouseleave', this.sliderModeOffBound);
    }

    for (let x = 0; x < this.crossElements.length; x += 1) {
      this.crossElements[x].addEventListener('mouseenter', this.crossBound);
      this.crossElements[x].addEventListener('mouseleave', this.crossOff);
    }

    for (let x = 0; x < this.darkElements.length; x += 1) {
      this.darkElements[x].addEventListener('mouseenter', this.darkBound);
    }
  }

  destroy() {
    // super.destroy();
    this.shrinkBound();

    window.removeEventListener('mousemove', this.getInitialPosBound);
    window.removeEventListener('mousemove', this.getPosBound);
    window.removeEventListener('mousemove', this.setLogoPosBound);
    document.body.removeEventListener('mouseenter', this.showBound);

    for (let x = 0; x < this.hoverElements.length; x += 1) {
      this.hoverElements[x].removeEventListener('mouseenter', this.growBound);
      this.hoverElements[x].removeEventListener('mouseleave', this.shrinkBound);
    }

    for (let x = 0; x < this.lightElements.length; x += 1) {
      this.lightElements[x].removeEventListener('mouseenter', this.lightBound);
      this.lightElements[x].removeEventListener('mouseleave', this.darkBound);
    }

    for (let x = 0; x < this.arrowElements.length; x += 1) {
      this.arrowElements[x].removeEventListener('mouseenter', this.sliderModeOnBound);
      this.arrowElements[x].removeEventListener('mouseleave', this.sliderModeOffBound);
    }

    for (let x = 0; x < this.crossElements.length; x += 1) {
      this.crossElements[x].removeEventListener('mouseenter', this.crossBound);
      this.crossElements[x].removeEventListener('mouseleave', this.crossOff);
    }

    for (let x = 0; x < this.darkElements.length; x += 1) {
      this.darkElements[x].removeEventListener('mouseenter', this.darkBound);
    }
  }

  resetElements() {
    const isMobile = browserDetect().mobile;

    if (isMobile) {
      return;
    }

    this.darkElements = document.body.querySelectorAll(this.darkElementsSelector);
    this.hoverElements = document.body.querySelectorAll(this.hoverElementsSelector);
    this.crossElements = document.body.querySelectorAll(this.crossElementsSelector);

    for (let x = 0; x < this.hoverElements.length; x += 1) {
      this.hoverElements[x].removeEventListener('mouseenter', this.growBound);
      this.hoverElements[x].removeEventListener('mouseleave', this.shrinkBound);
    }

    for (let x = 0; x < this.lightElements.length; x += 1) {
      this.lightElements[x].removeEventListener('mouseenter', this.lightBound);
      this.lightElements[x].removeEventListener('mouseleave', this.darkBound);
    }

    for (let x = 0; x < this.arrowElements.length; x += 1) {
      this.arrowElements[x].removeEventListener('mouseenter', this.sliderModeOnBound);
      this.arrowElements[x].removeEventListener('mouseleave', this.sliderModeOffBound);
    }

    for (let x = 0; x < this.crossElements.length; x += 1) {
      this.crossElements[x].removeEventListener('mouseenter', this.crossBound);
      this.crossElements[x].removeEventListener('mouseleave', this.crossOff);
    }

    for (let x = 0; x < this.darkElements.length; x += 1) {
      this.darkElements[x].removeEventListener('mouseenter', this.darkBound);
    }

    this.init();
  }

  add(element, type) {
    switch (type) {
      case 'light':
        element.addEventListener('mouseenter', this.lightBound);
        element.addEventListener('mouseleave', this.darkBound);
        break;
      case 'cross':
        element.addEventListener('mouseenter', this.crossBound);
        element.addEventListener('mouseleave', this.crossOff);
        break;
      case 'arrow':
        element.addEventListener('mouseenter', this.sliderModeOnBound);
        element.addEventListener('mouseleave', this.sliderModeOffBound);
        break;
      case 'dark':
        element.addEventListener('mouseenter', this.darkBound);
        break;
      default:
        element.addEventListener('mouseenter', this.growBound);
        element.addEventListener('mouseleave', this.shrinkBound);
        break;
    }
  }

  remove(element, type) {
    switch (type) {
      case 'light':
        element.removeEventListener('mouseenter', this.lightBound);
        element.removeEventListener('mouseleave', this.darkBound);
        break;
      case 'cross':
        element.removeEventListener('mouseenter', this.crossBound);
        element.removeEventListener('mouseleave', this.crossOff);
        break;
      case 'arrow':
        element.removeEventListener('mouseenter', this.sliderModeOnBound);
        element.removeEventListener('mouseleave', this.sliderModeOffBound);
        break;
      case 'dark':
        element.removeEventListener('mouseenter', this.darkBound);
        break;
      default:
        element.removeEventListener('mouseenter', this.growBound);
        element.removeEventListener('mouseleave', this.shrinkBound);
        break;
    }
  }

  getInitialPos(e) {
    if (this.w < 1024) return;
    window.removeEventListener('mousemove', this.getInitialPosBound);

    this.targetX = e.clientX;
    this.targetY = e.clientY;
    this.currentX = this.targetX;
    this.currentY = this.targetY;

    window.requestAnimationFrame(this.setPosBound);
    window.addEventListener('mousemove', this.getPosBound);
  }

  getPos(e) {
    this.targetX = e.clientX;
    this.targetY = e.clientY;
  }

  setPos() {
    this.currentX += (this.targetX - this.currentX) * 0.5;
    this.currentY += (this.targetY - this.currentY) * 0.5;
    gsap.set(this.cursor, { x: this.currentX, y: this.currentY });
    window.requestAnimationFrame(this.setPosBound);
  }

  setLogoPos = e => {
    const eye = document.querySelector('.js-eye');

    if (!eye) return;
    const mouseX = (eye.getBoundingClientRect().left);
    const mouseY = (eye.getBoundingClientRect().top);
    const radianDegrees = Math.atan2(e.pageX - mouseX, e.pageY - mouseY);
    const rotationDegrees = (radianDegrees * (180 / Math.PI) * -1) + 180;
    gsap.killTweensOf(eye);
    gsap.to(eye, 0.6, { rotation: rotationDegrees });
    // eye.style.transform = `rotate(${rotationDegrees}deg)`
  }

  hide() {
    Utils.setAttribute(this.cursor, 'hidden', true);
  }

  show() {
    Utils.setAttribute(this.cursor, 'hidden', false);
  }

  grow(e) {
    // Utils.setAttribute(this.cursor, 'arrows', false)
    Utils.setAttribute(this.cursor, 'expand', true);

    if (e.target.dataset.cursorsize) {
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

  sliderModeOn(e) {
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
