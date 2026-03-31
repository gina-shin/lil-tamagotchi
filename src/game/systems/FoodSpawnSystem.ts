import type { Scene } from '../../engine/Scene'
import type { System } from '../../engine/System'
import { FoodEntity } from '../entities/FoodEntity'

export class FoodSpawnSystem implements System {
  private enabled = false
  private readonly makeFoodEl: () => HTMLElement

  constructor(makeFoodEl: () => HTMLElement) {
    this.makeFoodEl = makeFoodEl
  }

  enable() {
    this.enabled = true
  }

  update(_dt: number, scene: Scene) {
    if (!this.enabled) return
    const root = scene.getRoot()

    const hasFood = scene.entities.some(e => e.tags.has('food'))
    if (hasFood) return

    const el = this.makeFoodEl()
    root.appendChild(el)

    const food = new FoodEntity(el, { energy: 10, health: 10, happiness: 10 })
    food.pos.x = Math.random() * 1000
    food.pos.y = Math.random() * 1000
    food.syncToDom()

    scene.add(food)
  }
}

