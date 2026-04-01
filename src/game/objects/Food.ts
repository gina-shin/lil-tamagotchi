export class Food {
  _x = 0
  _y = 0
  el: HTMLElement
  energy: number
  health: number
  happiness: number

  constructor(el: HTMLElement, energy: number, health: number, happiness: number) {
    this.el = el

    this.energy = energy
    this.health = health
    this.happiness = happiness
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

export class Berry extends Food {
  constructor(el: HTMLElement) {
    super(el, 10, 10, 10)
  }
}

