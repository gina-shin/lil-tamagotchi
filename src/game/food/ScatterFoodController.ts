import {
  collectScatterFoodOverlaps,
  spawnScatterFood,
  type ScatterFoodLayout,
} from '../objects/Food'
import type { Tomo } from '../objects/Tomo'

export type ScatterFoodControllerOptions = {
  feedButton: HTMLButtonElement
  getLayout: () => ScatterFoodLayout
}

/**
 * Owns feed-button → spawn queue, per-frame overlap collection, and layout.
 * Scenes only wire the container, button, and a layout source.
 */
export class ScatterFoodController {
  private readonly container: HTMLElement
  private pendingSpawn = false
  private readonly abort = new AbortController()
  private readonly getLayout: () => ScatterFoodLayout

  constructor(
    container: HTMLElement,
    options: ScatterFoodControllerOptions,
  ) {
    this.container = container
    this.getLayout = options.getLayout
    options.feedButton.addEventListener(
      'click',
      () => {
        this.pendingSpawn = true
      },
      { signal: this.abort.signal },
    )
  }

  update(tomo: Tomo) {
    if (this.pendingSpawn) {
      const numberOfFoodToGenerate = Math.min(Math.floor(Math.random() * 5))
      spawnScatterFood(this.container, numberOfFoodToGenerate, this.getLayout())
      this.pendingSpawn = false
    }
    tomo.boost += collectScatterFoodOverlaps(tomo.el, this.container)
  }

  dispose() {
    this.abort.abort()
  }
}
