import gameHTML from '../../components/Game.html?raw'
import '../../styles/game.css'

import { Scene } from '../../engine/Scene'
import type { Entity } from '../../engine/Entity'
import { TomoEntity } from '../entities/TomoEntity'
import { BerryEntity, FoodEntity } from '../entities/FoodEntity'
import { MovementSystem } from '../systems/MovementSystem'
import { CollisionSystem } from '../systems/CollisionSystem'
import { StatsView } from '../ui/StatsView'

export class RoomScene extends Scene {
  private statsView: StatsView | null = null

  mount(root: HTMLElement) {
    super.mount(root)
    root.innerHTML = gameHTML

    const tomoEl = root.querySelector('#tomo') as HTMLElement
    const berry1El = root.querySelector('#berry1') as HTMLElement
    const berry2El = root.querySelector('#berry2') as HTMLElement

    const tomo = this.add(new TomoEntity(tomoEl))
    tomo.collider = { width: 100, height: 100 }
    tomo.pos.x = 0
    tomo.pos.y = 0
    tomo.syncToDom()

    const berry1 = this.add(new BerryEntity(berry1El))
    berry1.pos.x = innerWidth / 2
    berry1.pos.y = 50
    berry1.syncToDom()

    const berry2 = this.add(new BerryEntity(berry2El))
    berry2.pos.x = 200
    berry2.pos.y = 100
    berry2.syncToDom()

    berry2.el.style.backgroundColor = 'blue'
    berry2.el.style.scale = '1.3 1.3'
    berry2.el.style.rotate = '23deg'
    berry2.el.style.borderRadius = '500px'

    this.statsView = new StatsView(root)
    this.statsView.render(tomo)

    const feedButton = root.querySelector('#feed-button') as HTMLButtonElement
    feedButton.addEventListener('click', () => {
      tomo.feedTarget = berry1
    })

    tomo.onCollision = (other: Entity, scene: Scene) => {
      if (!(other instanceof FoodEntity)) return
      tomo.stats.energy += other.effect.energy
      tomo.stats.health += other.effect.health
      tomo.stats.happiness += other.effect.happiness

      other.el.remove()
      const idx = scene.entities.indexOf(other)
      if (idx >= 0) scene.entities.splice(idx, 1)

      if (tomo.feedTarget === other) tomo.feedTarget = null
    }

    this.systems.push(new TomoSeekTargetSystem())
    this.systems.push(new MovementSystem({ friction: 0.95, maxSpeed: 7 }))
    this.systems.push(new CollisionSystem())
  }

  update(dt: number) {
    super.update(dt)

    const tomo = this.queryByTag('tomo')[0] as TomoEntity | undefined
    if (tomo && this.statsView) this.statsView.render(tomo)
  }
}

class TomoSeekTargetSystem {
  update(_dt: number, scene: Scene) {
    const tomo = scene.queryByTag('tomo')[0] as TomoEntity | undefined
    if (!tomo) return
    const target = tomo.feedTarget
    if (!target) return

    const dx = target.pos.x - tomo.pos.x
    const dy = target.pos.y - tomo.pos.y

    const len = Math.max(1, Math.hypot(dx, dy))
    const speed = 0.4

    tomo.vel.x += (dx / len) * speed
    tomo.vel.y += (dy / len) * speed
  }
}

