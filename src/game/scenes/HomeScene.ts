import homeHTML from '../../components/Home.html?raw'
import '../../styles/home.css'

import { Scene } from '../../engine/Scene'
import { Tomo } from '../objects/Tomo'

const layouts = [
  {
    numberOfFood: 5,
    foodPositions: [
      { x: 100, y: 100 },
      { x: 200, y: 200 },
    ],
    shells: [
      { x: 100, y: 100 },
      { x: 200, y: 200 },
      { x: 300, y: 300 },
      { x: 400, y: 400 },
      { x: 500, y: 500 },
    ],
  },
  {
    numberOfFood: 10,
    foodPositions: [
      { x: 100, y: 100 },
      { x: 200, y: 200 },
      { x: 300, y: 300 },
      { x: 400, y: 400 },
      { x: 500, y: 500 },
    ],
    shells: [
      { x: 100, y: 100 },
      { x: 200, y: 200 },
      { x: 300, y: 300 },
      { x: 400, y: 400 },
      { x: 500, y: 500 },
    ],
  }
]

export class HomeScene extends Scene {
  private tomo: Tomo | null = null
  private shouldGenerateFood = false
  private shouldChangeLayout = false
  private vx = 0
  private vy = 0
  private boost = 0

  private allowedCodes = ['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'Space'] as const
  private keys: Partial<Record<(typeof this.allowedCodes)[number], boolean>> = {}

  private windowWidth = window.innerWidth
  private windowHeight = window.innerHeight
  private floorPixelHeight = 80

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
      el.style.left = `${Math.random() * this.windowWidth}px`
      el.style.top = `${Math.random() * (this.windowHeight - this.floorPixelHeight)}px`
      root.appendChild(el)
    }
  }

  removeAllFoodItems() {
    const foodItems = document.querySelectorAll('.food')
    foodItems.forEach(foodItem => {
      foodItem.remove()
    })
  }

  generateShells(shells: (typeof layouts)[number]['shells']) {
    shells.forEach(shell => {
      const el = document.createElement('div')
      el.classList.add('shell')
      el.style.position = 'absolute'
      el.style.width = '100px'
      el.style.height = '100px'
      el.style.left = `${shell.x}px`
      el.style.top = `${shell.y}px`
      el.style.backgroundImage = 'url(./assets/pixel-shell.png)'
      this.getRoot().appendChild(el)
    })
  }

  setupLayout(layout: (typeof layouts)[number]) {
    this.removeAllFoodItems()
    this.generateShells(layout.shells)
    this.generateFood(layout.numberOfFood)
  }

  resetLayout() {
    this.removeAllFoodItems()
  }

  changeLayout() {
    const layout = layouts[Math.floor(Math.random() * layouts.length)]
    this.setupLayout(layout)
  }

  update(_dt: number) {
    if (!this.tomo) return

    if (this.tomo.x > (this.windowWidth - this.tomo.el.offsetWidth)) {
      this.tomo.x = (this.windowWidth - this.tomo.el.offsetWidth)
    }

    if (this.shouldGenerateFood) {
      const numberOfFoodToGenerate = Math.min(Math.floor(Math.random() * 5))
      this.generateFood(numberOfFoodToGenerate)
      this.shouldGenerateFood = false
    }

    this.shouldChangeLayout = 0 > this.tomo.x

    if (this.shouldChangeLayout) {
      this.changeLayout()
      this.tomo.x = 1000
      this.shouldChangeLayout = false
    }

    const foodItems = document.querySelectorAll('.food')

    foodItems.forEach(foodItem => {
      const foodItemRect = foodItem.getBoundingClientRect()
      const tomoRect = this.tomo?.el.getBoundingClientRect()
      if (tomoRect && tomoRect.left < foodItemRect.right &&
        tomoRect.right > foodItemRect.left &&
        tomoRect.top < foodItemRect.bottom &&
        tomoRect.bottom > foodItemRect.top) {
          this.boost += 0.2
          foodItem.remove()
        }
    })

    const speed = 0.3 + this.boost


    if (this.tomo.shouldSwim) {
      if (this.keys.ArrowRight) {
        // the nice thing about scale vs transforms is that it doesn't addect the other transforms
        // look up difference between scale and transform
        // it will magically combine the transforms
        this.tomo.el.style.scale = '-1 1'
        this.vx += speed
      }
      if (this.keys.ArrowLeft) {
        this.tomo.el.style.scale = '1 1'
        this.vx -= speed
      }
      if (this.keys.ArrowDown) this.vy += speed
      if (this.keys.ArrowUp) this.vy -= speed
    }

    const friction = 0.99
    this.vx *= friction
    this.vy *= friction

    const maxSpeed = 20
    if (this.vx > maxSpeed) this.vx = maxSpeed
    if (this.vx < -maxSpeed) this.vx = -maxSpeed
    if (this.vy > maxSpeed) this.vy = maxSpeed
    if (this.vy < -maxSpeed) this.vy = -maxSpeed

    const minY = this.windowHeight - this.floorPixelHeight - (this.tomo.el.offsetHeight)
    this.tomo.x += this.vx
    this.tomo.y += this.vy

    if (this.tomo.y < 0) { this.tomo.y = 0 }
    if (this.tomo.y >= minY) { this.tomo.y = minY }
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

