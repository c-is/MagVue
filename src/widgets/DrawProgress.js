export default class DrawProgress {
  constructor(el) {
    this.el = el;
    this.paths = [].slice.call(this.el.querySelectorAll('path'));
    this.pathsArr = [];
    this.lengthsArr = [];
    this.init();
  }

  draw = val => {
    for (let i = 0, len = this.pathsArr.length; i < len; i += 1) {
      this.pathsArr[i].style.strokeDashoffset = this.lengthsArr[i] * (1 - val);
    }
  }

  init = () => {
    this.paths.forEach((path, i) => {
      this.pathsArr[i] = path;
      // eslint-disable-next-line
      path.style.strokeDasharray = this.lengthsArr[i] = path.getTotalLength();
    });

    // undraw stroke
    this.draw(0);
  }
}
