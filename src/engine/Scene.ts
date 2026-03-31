import type { Entity } from './Entity'
import type { System } from './System'

export abstract class Scene {
  protected root: HTMLElement | null = null

  readonly entities: Entity[] = []
  readonly systems: System[] = []

  mount(root: HTMLElement) {
    this.root = root
  }

  getRoot() {
    if (!this.root) throw new Error('Scene is not mounted')
    return this.root
  }

  unmount() {
    this.root = null
    this.entities.length = 0
    this.systems.length = 0
  }

  update(dt: number) {
    for (const system of this.systems) system.update(dt, this)
  }

  add<T extends Entity>(entity: T): T {
    this.entities.push(entity)
    return entity
  }

  queryByTag(tag: string) {
    return this.entities.filter(e => e.tags.has(tag))
  }
}

