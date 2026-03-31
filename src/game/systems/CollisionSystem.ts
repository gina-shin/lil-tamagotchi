import type { Entity } from '../../engine/Entity'
import type { Scene } from '../../engine/Scene'
import type { System } from '../../engine/System'

export class CollisionSystem implements System {
  update(_dt: number, scene: Scene) {
    const colliders = scene.entities.filter(e => e.collider != null) as Entity[]

    for (let i = 0; i < colliders.length; i++) {
      for (let j = i + 1; j < colliders.length; j++) {
        const a = colliders[i]
        const b = colliders[j]
        if (!this.intersects(a, b)) continue

        a.onCollision?.(b, scene)
        b.onCollision?.(a, scene)
      }
    }
  }

  private intersects(a: Entity, b: Entity) {
    const ca = a.collider
    const cb = b.collider
    if (!ca || !cb) return false

    const ax = a.pos.x + (ca.offsetX ?? 0)
    const ay = a.pos.y + (ca.offsetY ?? 0)
    const bx = b.pos.x + (cb.offsetX ?? 0)
    const by = b.pos.y + (cb.offsetY ?? 0)

    return (
      ax < bx + cb.width &&
      ax + ca.width > bx &&
      ay < by + cb.height &&
      ay + ca.height > by
    )
  }
}

