import type { System } from '../../engine/System'
import type { Scene } from '../../engine/Scene'
import type { Entity } from '../../engine/Entity'
import { clamp } from '../../engine/math/clamp'

export class MovementSystem implements System {
  private readonly opts: {
    friction?: number
    maxSpeed?: number
    pixelsPerSecondScale?: number
  }

  constructor(
    opts: {
      friction?: number
      maxSpeed?: number
      pixelsPerSecondScale?: number
    } = {},
  ) {
    this.opts = opts
  }

  update(dt: number, scene: Scene) {
    const friction = this.opts.friction ?? 0.99
    const maxSpeed = this.opts.maxSpeed ?? 5
    const scale = this.opts.pixelsPerSecondScale ?? 60

    for (const entity of scene.entities) this.stepEntity(entity, dt, friction, maxSpeed, scale)
  }

  private stepEntity(entity: Entity, dt: number, friction: number, maxSpeed: number, scale: number) {
    entity.vel.x *= friction
    entity.vel.y *= friction

    entity.vel.x = clamp(entity.vel.x, -maxSpeed, maxSpeed)
    entity.vel.y = clamp(entity.vel.y, -maxSpeed, maxSpeed)

    entity.pos.x += entity.vel.x * dt * scale
    entity.pos.y += entity.vel.y * dt * scale

    entity.syncToDom()
  }
}

