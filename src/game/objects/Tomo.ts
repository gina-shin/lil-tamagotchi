import type { Activity } from './activity.ts'
import type { Food } from './Food'

export type SwimIntent = {
  left: boolean
  right: boolean
  up: boolean
  down: boolean
}

export class Tomo {
  _x = 1000
  _y = 100
  _shouldSwim = false
  vx = 0
  vy = 0
  boost = 0
  _hasEaten = false
  _feedingTarget: Food | null = null
  el: HTMLElement

  constructor(el: HTMLElement) {
    this.el = el
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

  set shouldSwim(value: boolean) {
    this._shouldSwim = value
  }
  get shouldSwim() {
    return this._shouldSwim
  }

  set hasEaten(value: boolean) {
    this._hasEaten = value
  }
  get hasEaten() {
    return this._hasEaten
  }

  friendship = 0
  health = 50
  happiness = 50
  isMaxPlayed = false
  isMaxPet = false
  state = 'sitting'
  hasWater = false
  hasFood = false
  energy = 50
  type = 'hippo'

  isMoving = false

  pet() {
    if (!this.isMaxPet) {
      this.happiness += 1
    }
  }

  play(activity: Activity) {
    if (!this.isMaxPlayed) {
      this.happiness += activity.happiness
      this.friendship += activity.friendship
      this.energy += activity.energy
    }
  }

  feed(food: Food) {
    this._feedingTarget = food

    const tomoRect = this.el.getBoundingClientRect()
    const foodRect = food.el.getBoundingClientRect()

    const dx = foodRect.left - tomoRect.left
    const dy = foodRect.top - tomoRect.top

    const step = 2
    if (Math.abs(dx) > 1) this.x += Math.sign(dx) * step
    if (Math.abs(dy) > 1) this.y += Math.sign(dy) * step
  }

  stepSwim(intent: SwimIntent, bounds: { windowHeight: number, floorPixelHeight: number }) {
    const speed = 0.3 + this.boost

    if (this._shouldSwim) {
      if (intent.right) {
        this.el.style.scale = '-1 1'
        this.vx += speed
      }
      if (intent.left) {
        this.el.style.scale = '1 1'
        this.vx -= speed
      }
      if (intent.down) this.vy += speed
      if (intent.up) this.vy -= speed
    }

    const friction = 0.99
    this.vx *= friction
    this.vy *= friction

    const maxSpeed = 10
    if (this.vx > maxSpeed) this.vx = maxSpeed
    if (this.vx < -maxSpeed) this.vx = -maxSpeed
    if (this.vy > maxSpeed) this.vy = maxSpeed
    if (this.vy < -maxSpeed) this.vy = -maxSpeed

    const minY = bounds.windowHeight - bounds.floorPixelHeight - this.el.offsetHeight
    this.x += this.vx
    this.y += this.vy

    if (this.y < 0) this.y = 0
    if (this.y >= minY) this.y = minY
  }
}

