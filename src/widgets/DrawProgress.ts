export default class DrawProgress {
  el: HTMLElement;

  paths: SVGPathElement[];

  pathsArr: SVGPathElement[];

  lengthsArr: number[];

  constructor(el: HTMLElement) {
    this.el = el;
    this.paths = [].slice.call(this.el.querySelectorAll('path'));
    this.pathsArr = [];
    this.lengthsArr = [];
    this.init();
  }

  draw = (val: number) => {
    for (let i = 0, len = this.pathsArr.length; i < len; i += 1) {
      this.pathsArr[i].style.strokeDashoffset = String(this.lengthsArr[i] * (1 - val));
    }
  }

  init = () => {
    this.paths.forEach((path, i) => {
      this.pathsArr[i] = path;
      this.lengthsArr[i] = path.getTotalLength();
      // eslint-disable-next-line
      path.style.strokeDasharray = String(this.lengthsArr[i]);
    });

    // undraw stroke
    this.draw(0);
  }
}
