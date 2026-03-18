import homeHTML from './components/Home.html?raw'

import './styles/home.css'

export function renderHome(container: HTMLElement) {
  container.innerHTML = homeHTML
  const hippo = container.querySelector('#hippo') as HTMLDivElement
  const startButton = container.querySelector('.start-button') as HTMLButtonElement
  let hippoX = 1000
  let hippoY = 100
  hippo.style.left = `${hippoX}px`
  hippo.style.top = `${hippoY}px`
  let shouldHippoRun = false
  let hasEaten = false
  let shouldGenerateFood = false

  let vx = 0
  let vy = 0

  let boost = 0

  const tomoStats = {
    hunger: 0,
    happiness: 0,
    energy: 0,
    social: 0,
    hygiene: 0,
    fun: 0,
    cleanliness: 0,
    health: 0,
  }

  type AllowedCode = 'ArrowRight' | 'ArrowLeft' | 'ArrowDown' | 'ArrowUp' | 'Space'
  const allowedCodes: AllowedCode[] = ['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'Space']

  const keys: Partial<Record<AllowedCode, boolean>> = {}
  window.onkeydown = e => {
    const code = e.code as AllowedCode
    if (!allowedCodes.includes(code)) return
    e.preventDefault()
    shouldHippoRun = true
    keys[code] = true
  }
  window.onkeyup = e => {
    const code = e.code as AllowedCode
    if (!allowedCodes.includes(code)) return
    e.preventDefault()
    shouldHippoRun = false
    keys[code] = false
    // vy = 0
    // vx = 0
  }
  startButton.addEventListener('click', () => {
    shouldGenerateFood = true
  })
  const bowl = container.querySelector('#bowl') as HTMLDivElement

  const loop = () => {
    if(shouldGenerateFood && document.querySelector('.food') === null) {
      const food = document.createElement('div')
      food.classList.add('food')
      food.style.left = `${Math.random() * 1000}px`
      food.style.top = `${Math.random() * 1000}px`
      container.appendChild(food)
    }

    if(shouldHippoRun) {
      if (keys.ArrowRight) {
        vx = 4 + boost
      }
      if (keys.ArrowLeft) {
        vx = -4 - boost
      }
      if (keys.ArrowDown) {
        vy = 4 + boost
      }
      if (keys.ArrowUp) {
        vy = -4 - boost
      }
      if (keys.Space) {
        console.log('vy', vy)
        console.log('vx', vx)
        console.log('hippoY', hippoY)
        vy = -10
        vx = -5 
      }
    }


    // how do I do this with multiple objects?
    const hippoRect = hippo.getBoundingClientRect()
    const bowlRect = bowl.getBoundingClientRect()

    hasEaten =
    (hippoRect.left < bowlRect.right &&
    hippoRect.right > bowlRect.left &&
    hippoRect.top < bowlRect.bottom &&
    hippoRect.bottom > bowlRect.top)

    console.log('hasEaten', hasEaten)
  
    if (hasEaten) {
      boost = 10
      console.log('removing bowl')
      bowl.remove()
      hasEaten = false
      shouldHippoRun = false
      tomoStats.hunger += 10
      tomoStats.happiness += 10
      tomoStats.energy += 10
      tomoStats.health += 10

      console.log(tomoStats)
    }

    const friction = 0.95  
    console.log('before friction x', '  hippoX', hippoX)
    console.log('before friction y', '  hippoY', hippoY)
    vy *= friction
    vx *= friction

    hippoX += vx
    hippoY += vy

    hippo.style.left = `${hippoX}px`
    hippo.style.top = `${hippoY}px`

    // setTimeout(() => {
    //   loop()
    // }, 10)

    requestAnimationFrame(loop)
  }

  loop()
}

