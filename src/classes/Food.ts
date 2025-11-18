export class Food {
  _x = 0;
  _y = 0;
  el: HTMLElement;
  energy: number;
  health: number;
  happiness: number;

  constructor(element: HTMLElement, energy: number, health: number, happiness: number) {
    this.el = element;

    this.energy = 0;
    this.health = 0;
    this.happiness = 0;
  }
  set x(value: number) {
    this._x = value;
    this.el.style.left = `${value}px`;
  }
  get x() {
    return this._x;
  }

  set y(value: number) {
    this._y = value;
    this.el.style.top = `${value}px`;
  }
  get y() {
    return this._y;
  }
}

export class Hamburger extends Food {
  constructor(element: HTMLElement) {
    super(element, 10, -1, 6);
  }
}

export class Eggs extends Food {
  constructor(element: HTMLElement) {
    super(element, 20, 2, 6);
  }
}

export class Berry extends Food {
  constructor(element: HTMLElement) {
    super(element, 10, 10, 10);
  }
}

export class Rocks extends Food {
  constructor(element: HTMLElement) {
    super(element, -50, -50, -50);
  }
}