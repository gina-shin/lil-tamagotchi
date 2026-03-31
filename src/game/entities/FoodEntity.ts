import { Entity } from '../../engine/Entity'

export type FoodEffect = {
  energy: number
  health: number
  happiness: number
}

export class FoodEntity extends Entity {
  readonly effect: FoodEffect

  constructor(
    el: HTMLElement,
    effect: FoodEffect,
  ) {
    super(el)
    this.effect = effect
    this.tags.add('food')
    this.collider = { width: 50, height: 50 }
  }
}

export class BerryEntity extends FoodEntity {
  constructor(el: HTMLElement) {
    super(el, { energy: 10, health: 10, happiness: 10 })
  }
}

