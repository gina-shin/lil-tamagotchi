import homeHTML from '../../components/Home.html?raw'
import '../../styles/home.css'

import { Scene } from '../../engine/Scene'
import { Tomo } from '../objects/Tomo'

export class HomeScene extends Scene {
  private tomo: Tomo | null = null
  private shouldGenerateFood = false
  private vx = 0
  private vy = 0
  private boost = 0

  private allowedCodes = ['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'Space'] as const
  private keys: Partial<Record<(typeof this.allowedCodes)[number], boolean>> = {}

  mount(root: HTMLElement) {
    super.mount(root)
    root.innerHTML = homeHTML

    const fishEl = root.querySelector('#fish') as HTMLDivElement
    const startButton = root.querySelector('.start-button') as HTMLButtonElement

    this.tomo = new Tomo(fishEl)
    this.tomo.x = 1000
    this.tomo.y = 100

    window.addEventListener('keydown', this.onKeyDown, { passive: false })
    window.addEventListener('keyup', this.onKeyUp, { passive: false })

    startButton.addEventListener('click', () => {
      this.shouldGenerateFood = true
    })
  }

  private generateFood(numberOfFood: number) {
    const root = this.getRoot() // what does this do?
  
    for (let i = 0; i < numberOfFood; i++) {
      const el = document.createElement('div')
      el.classList.add('food')
      el.style.position = 'absolute'
      el.style.width = '30px'
      el.style.height = '30px'
      el.style.backgroundColor = 'brown'
      el.style.left = `${Math.random() * 1000}px`
      el.style.top = `${Math.random() * 1000}px`
      root.appendChild(el)
    }
  }

  update(_dt: number) {
    if (!this.tomo) return

    if (this.shouldGenerateFood && document.querySelector('.food') === null) {
      const numberOfFoodToGenerate = Math.min(Math.floor(Math.random() * 3), 10 )
      this.generateFood(numberOfFoodToGenerate)
      this.shouldGenerateFood = false
    }

    const foodItems = document.querySelectorAll('.food')

    foodItems.forEach(foodItem => {
      const foodItemRect = foodItem.getBoundingClientRect()
      const tomoRect = this.tomo?.el.getBoundingClientRect()
      if (tomoRect && tomoRect.left < foodItemRect.right &&
        tomoRect.right > foodItemRect.left &&
        tomoRect.top < foodItemRect.bottom &&
        tomoRect.bottom > foodItemRect.top) {
          this.boost += 1
          foodItem.remove()
        }
    })

    console.log('boost', this.boost)

    const speed = 0.3 + this.boost

    console.log('speed', speed)


    if (this.tomo.shouldSwim) {
      if (this.keys.ArrowRight) this.vx += speed
      if (this.keys.ArrowLeft) this.vx -= speed
      if (this.keys.ArrowDown) this.vy += speed
      if (this.keys.ArrowUp) this.vy -= speed
    }

    const friction = 0.99
    this.vx *= friction
    this.vy *= friction

    const maxSpeed = 10
    if (this.vx > maxSpeed) this.vx = maxSpeed
    if (this.vx < -maxSpeed) this.vx = -maxSpeed
    if (this.vy > maxSpeed) this.vy = maxSpeed
    if (this.vy < -maxSpeed) this.vy = -maxSpeed

    this.tomo.x += this.vx
    this.tomo.y += this.vy
  }

  unmount() {
    window.removeEventListener('keydown', this.onKeyDown)
    window.removeEventListener('keyup', this.onKeyUp)
    super.unmount()
  }

  private onKeyDown = (e: KeyboardEvent) => {
    const code = e.code as (typeof this.allowedCodes)[number]
    if (!this.allowedCodes.includes(code)) return
    e.preventDefault()
    if (this.tomo) this.tomo.shouldSwim = true
    this.keys[code] = true
  }

  private onKeyUp = (e: KeyboardEvent) => {
    const code = e.code as (typeof this.allowedCodes)[number]
    if (!this.allowedCodes.includes(code)) return
    e.preventDefault()
    if (this.tomo) this.tomo.shouldSwim = false
    this.keys[code] = false
  }
}

