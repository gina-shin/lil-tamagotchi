import type { Scene } from './Scene'

export interface System {
  update(dt: number, scene: Scene): void
}

