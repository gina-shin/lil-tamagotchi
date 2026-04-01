import gameHTML from '../../components/Game.html?raw'
import '../../styles/game.css'

import { Scene } from '../../engine/Scene'
import { StatsView } from '../ui/StatsView'
import { Berry } from '../objects/Food'
import { Tomo } from '../objects/Tomo'

export class RoomScene extends Scene {
  private statsView: StatsView | null = null
  private tomo: Tomo | null = null
  private berry1: Berry | null = null
  private berry2: Berry | null = null
  private actions = {
    feed: false,
  }

  mount(root: HTMLElement) {
    super.mount(root)
    root.innerHTML = gameHTML

    const tomoEl = root.querySelector('#tomo') as HTMLElement
    const berry1El = root.querySelector('#berry1') as HTMLElement
    const berry2El = root.querySelector('#berry2') as HTMLElement

    this.tomo = new Tomo(tomoEl)
    this.tomo.x = 0

    this.berry1 = new Berry(berry1El)
    this.berry2 = new Berry(berry2El)

    this.berry1.x = innerWidth / 2
    this.berry1.y = 50

    this.berry2.x = 200
    this.berry2.y = 100

    this.berry2.el.style.backgroundColor = 'blue'
    this.berry2.el.style.scale = '1.3 1.3'
    this.berry2.el.style.rotate = '23deg'
    this.berry2.el.style.borderRadius = '500px'

    this.statsView = new StatsView(root)
    this.statsView.render(this.tomo)

    const feedButton = root.querySelector('#feed-button') as HTMLButtonElement
    feedButton.addEventListener('click', () => {
      this.actions.feed = true
    })
  }

  update(_dt: number) {
    if (!this.tomo) return
    if (!this.berry1) return

    if (this.actions.feed) {
      this.tomo.feed(this.berry1)

      const tomoRect = this.tomo.el.getBoundingClientRect()
      const foodRect = this.berry1.el.getBoundingClientRect()
      const isOverlapping =
        tomoRect.left < foodRect.right &&
        tomoRect.right > foodRect.left &&
        tomoRect.top < foodRect.bottom &&
        tomoRect.bottom > foodRect.top

      if (isOverlapping) {
        this.tomo.energy += this.berry1.energy
        this.tomo.health += this.berry1.health
        this.tomo.happiness += this.berry1.happiness
        this.berry1.el.remove()
        this.berry1 = null
        this.actions.feed = false
      }
    }

    if (this.statsView) this.statsView.render(this.tomo)
  }
}

