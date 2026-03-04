import homeHTML from './components/Home.html?raw'

import './styles/home.css'

export function renderHome(container: HTMLElement) {
  container.innerHTML = homeHTML
  const hippo = container.querySelector('#hippo') as HTMLDivElement
  let hippoX = 1000
  let hippoY = 100
  hippo.style.left = `${hippoX}px`
  hippo.style.top = `${hippoY}px`
  let shouldHippoRun = false
  let hasEaten = false

  let vx = 0
  let vy = 0

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
  const bowl = container.querySelector('#bowl') as HTMLDivElement

  const loop = () => {
    // if (shouldHippoRun) {
    //   // console.log(hippoX)
    //   hippoX += (0 - hippoX) / 500
    //   hippo.style.left = `${hippoX}px`

      // const hippoRect = hippo.getBoundingClientRect()
      // const bowlRect = bowl.getBoundingClientRect()

    //   hasEaten =
    //     hippoRect.left < bowlRect.right &&
    //     hippoRect.right > bowlRect.left &&
    //     hippoRect.top < bowlRect.bottom &&
    //     hippoRect.bottom > bowlRect.top

    //   console.log('hasEaten', hasEaten)
    // }

    if(shouldHippoRun) {
      if (keys.ArrowRight) {
        vx = 1
      }
      if (keys.ArrowLeft) {
        vx = -1
      }
      if (keys.ArrowDown) {
        vy = 1
      }
      if (keys.ArrowUp) {
        vy = -1
      }
      if (keys.Space) {
        console.log('vy', vy)
        console.log('vx', vx)
        console.log('hippoY', hippoY)
        vy = -10
        vx = -5 
      }
    }

    vy += 0.1

    if (hippoY > 500) {
      hippoY = 500
      vy = 0
    }
  
    hippoY += vy
    hippoX += vx
    hippo.style.left = `${hippoX}px`
    hippo.style.top = `${hippoY}px`

    const hippoRect = hippo.getBoundingClientRect()
    const bowlRect = bowl.getBoundingClientRect()

    hasEaten =
    hippoRect.left < bowlRect.right &&
    hippoRect.right > bowlRect.left &&
    hippoRect.top < bowlRect.bottom &&
    hippoRect.bottom > bowlRect.top

  
    if (hasEaten) {
      vx = 10
      vy = 10
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

    requestAnimationFrame(loop)
  }

  loop()
}

