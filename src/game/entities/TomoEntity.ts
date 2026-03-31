import { Entity } from '../../engine/Entity'

export type TomoStats = {
  friendship: number
  health: number
  happiness: number
  energy: number
}

export class TomoEntity extends Entity {
  stats: TomoStats = {
    friendship: 0,
    health: 50,
    happiness: 50,
    energy: 50,
  }

  shouldSwim = false
  feedTarget: Entity | null = null

  constructor(el: HTMLElement) {
    super(el)
    this.tags.add('tomo')
    this.collider = { width: 300, height: 300 }
  }
}

