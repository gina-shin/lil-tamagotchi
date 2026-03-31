import type { TomoEntity } from '../entities/TomoEntity'

export class StatsView {
  private energyEl: HTMLElement
  private friendshipEl: HTMLElement
  private happinessEl: HTMLElement
  private healthEl: HTMLElement

  constructor(root: HTMLElement) {
    this.energyEl = root.querySelector('#energy') as HTMLElement
    this.friendshipEl = root.querySelector('#friendship') as HTMLElement
    this.happinessEl = root.querySelector('#happiness') as HTMLElement
    this.healthEl = root.querySelector('#health') as HTMLElement
  }

  render(tomo: TomoEntity) {
    this.energyEl.textContent = `${Math.round(tomo.stats.energy)}`
    this.friendshipEl.textContent = `${Math.round(tomo.stats.friendship)}`
    this.happinessEl.textContent = `${Math.round(tomo.stats.happiness)}`
    this.healthEl.textContent = `${Math.round(tomo.stats.health)}`
  }
}

