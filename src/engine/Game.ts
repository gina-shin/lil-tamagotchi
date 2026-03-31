import type { Scene } from './Scene'

export class Game {
  private scene: Scene | null = null
  private lastMs = 0
  private readonly root: HTMLElement

  constructor(root: HTMLElement) {
    this.root = root
  }

  setScene(scene: Scene) {
    if (this.scene) this.scene.unmount()
    this.scene = scene
    this.scene.mount(this.root)
  }

  start() {
    const tick = (ms: number) => {
      const dt = this.lastMs === 0 ? 0 : (ms - this.lastMs) / 1000
      this.lastMs = ms

      if (this.scene) this.scene.update(dt)
      requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }
}

