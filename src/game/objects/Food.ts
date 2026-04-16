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

export type ScatterFoodLayout = {
  width: number
  height: number
  floorPixelHeight: number
}

function rectsOverlap(a: DOMRectReadOnly, b: DOMRectReadOnly) {
  return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top
}

/** Brown crumb-style food scattered in a play area (e.g. ocean) */
export function spawnScatterFood(
  parent: HTMLElement,
  count: number,
  layout: ScatterFoodLayout,
) {
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div')
    el.classList.add('food')
    el.style.position = 'absolute'
    el.style.width = '30px'
    el.style.height = '30px'
    el.style.backgroundColor = 'brown'
    el.style.left = `${Math.random() * layout.width}px`
    el.style.top = `${Math.random() * (layout.height - layout.floorPixelHeight)}px`
    parent.appendChild(el)
  }
}

/** Removes scattered `.food` that overlaps the pet; returns how many were eaten */
export function collectScatterFoodOverlaps(tomoEl: HTMLElement, container: ParentNode) {
  let eaten = 0
  container.querySelectorAll('.food').forEach(foodItem => {
    const foodRect = foodItem.getBoundingClientRect()
    const tomoRect = tomoEl.getBoundingClientRect()
    if (rectsOverlap(tomoRect, foodRect)) {
      eaten += 1
      foodItem.remove()
    }
  })
  return eaten
}

