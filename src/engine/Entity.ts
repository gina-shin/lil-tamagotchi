import type { Scene } from './Scene'

export type Collider = {
  width: number
  height: number
  offsetX?: number
  offsetY?: number
}

export type CollisionHandler = (other: Entity, scene: Scene) => void

export class Entity {
  readonly tags = new Set<string>()

  pos = { x: 0, y: 0 }
  vel = { x: 0, y: 0 }
  collider: Collider | null = null
  onCollision?: CollisionHandler

  readonly el: HTMLElement

  constructor(el: HTMLElement) {
    this.el = el
  }

  syncToDom() {
    this.el.style.left = `${this.pos.x}px`
    this.el.style.top = `${this.pos.y}px`
  }
}

