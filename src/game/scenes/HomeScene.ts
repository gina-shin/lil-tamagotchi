import homeHTML from '../../components/Home.html?raw'
import '../../styles/home.css'

import { Scene } from '../../engine/Scene'
import { Keyboard } from '../../engine/input/Keyboard'
import { TomoEntity } from '../entities/TomoEntity'
import type { Entity } from '../../engine/Entity'
import { CollisionSystem } from '../systems/CollisionSystem'
import { FoodSpawnSystem } from '../systems/FoodSpawnSystem'
import { MovementSystem } from '../systems/MovementSystem'
import { TomoInputSystem } from '../systems/TomoInputSystem'

export class HomeScene extends Scene {
  private keyboard = new Keyboard()
  private tomoInput = new TomoInputSystem(this.keyboard)
  private foodSpawn = new FoodSpawnSystem(() => {
    const el = document.createElement('div')
    el.classList.add('food')
    el.style.position = 'absolute'
    el.style.width = '50px'
    el.style.height = '50px'
    el.style.backgroundColor = 'brown'
    return el
  })

  mount(root: HTMLElement) {
    super.mount(root)
    root.innerHTML = homeHTML

    const fishEl = root.querySelector('#fish') as HTMLDivElement
    const startButton = root.querySelector('.start-button') as HTMLButtonElement

    const tomo = this.add(new TomoEntity(fishEl))
    tomo.pos.x = 1000
    tomo.pos.y = 100
    tomo.syncToDom()

    this.keyboard.attach(window)

    window.addEventListener('keydown', this.preventArrowScroll, { passive: false })

    startButton.addEventListener('click', () => {
      this.foodSpawn.enable()
    })

    tomo.onCollision = (other: Entity, scene: Scene) => {
      if (!other.tags.has('food')) return

      this.tomoInput.applyBoost(10)

      other.el.remove()
      const idx = scene.entities.indexOf(other)
      if (idx >= 0) scene.entities.splice(idx, 1)

      tomo.stats.happiness += 10
      tomo.stats.energy += 10
      tomo.stats.health += 10
    }

    this.systems.push(this.foodSpawn)
    this.systems.push(this.tomoInput)
    this.systems.push(new MovementSystem({ friction: 0.99, maxSpeed: 5 }))
    this.systems.push(new CollisionSystem())
  }

  update(dt: number) {
    const tomo = this.queryByTag('tomo')[0] as TomoEntity | undefined
    if (tomo) {
      tomo.shouldSwim = this.isSwimming()
    }

    super.update(dt)
    this.keyboard.step()
  }

  unmount() {
    window.removeEventListener('keydown', this.preventArrowScroll)
    this.keyboard.detach(window)
    super.unmount()
  }

  private isSwimming() {
    return (
      this.keyboard.state('ArrowRight').down ||
      this.keyboard.state('ArrowLeft').down ||
      this.keyboard.state('ArrowUp').down ||
      this.keyboard.state('ArrowDown').down ||
      this.keyboard.state('Space').down
    )
  }

  private preventArrowScroll = (e: KeyboardEvent) => {
    const allowed = new Set(['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'Space'])
    if (!allowed.has(e.code)) return
    e.preventDefault()
  }
}

