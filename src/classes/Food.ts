export class Food {
  _x = 1000
  _y = 100
  el: HTMLElement

  constructor(element: HTMLElement) {
    this.el = element
  }

  set x(value: number) {
    this._x = value
    this.el.style.left = `${value}px`
  }
  get x() {
    return this._x
  }
  set y(value: number) {
    this._y = value
    this.el.style.top = `${value}px`
  }
  get y() {
    return this._y
  }
}
