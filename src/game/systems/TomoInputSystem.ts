import type { Scene } from '../../engine/Scene'
import type { System } from '../../engine/System'
import type { Keyboard } from '../../engine/input/Keyboard'
import type { TomoEntity } from '../entities/TomoEntity'

export class TomoInputSystem implements System {
  private boost = 0
  private readonly keyboard: Keyboard

  constructor(keyboard: Keyboard) {
    this.keyboard = keyboard
  }

  update(dt: number, scene: Scene) {
    const tomo = scene.queryByTag('tomo')[0] as TomoEntity | undefined
    if (!tomo) return

    const speed = 0.3 + this.boost

    if (tomo.shouldSwim) {
      if (this.keyboard.state('ArrowRight').down) tomo.vel.x += speed
      if (this.keyboard.state('ArrowLeft').down) tomo.vel.x -= speed
      if (this.keyboard.state('ArrowDown').down) tomo.vel.y += speed
      if (this.keyboard.state('ArrowUp').down) tomo.vel.y -= speed

      if (this.keyboard.state('Space').pressed) {
        tomo.vel.y = -10
        tomo.vel.x = -5
      }
    }

    this.boost = Math.max(0, this.boost - dt * 30)
  }

  applyBoost(amount: number) {
    this.boost = Math.max(this.boost, amount)
  }
}

