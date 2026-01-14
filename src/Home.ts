import homeHTML from './components/Home.html?raw'

import './styles/home.css'

export function renderHome(container: HTMLElement) {
  container.innerHTML = homeHTML
  const hippo = container.querySelector('#hippo') as HTMLImageElement
  const startButton = container.querySelector('.start-button') as HTMLButtonElement
  let shouldHippoRun = false
  let hippoX = 0
  let hippoY = 0
  let shouldHippoFollowMouse = false
  let mouseX = 0
  let mouseY = 0

  document.addEventListener('mousemove', (event: MouseEvent) => {
    mouseX = event.clientX
    mouseY = event.clientY
  })

  const loop = () => {
    if (shouldHippoRun && !shouldHippoFollowMouse) {
      hippoX += (innerWidth - hippo.width) / 400
      hippo.style.left = `${hippoX}px`

      if (hippoX > (innerWidth / 2) - hippo.width/2) {
        hippoX = (innerWidth / 2) - hippo.width/2
      }
    }
    else if (shouldHippoFollowMouse) {
      hippoX += (mouseX - hippoX) / 100
      hippoY += (mouseY - hippoY) / 100 
      hippo.style.left = `${hippoX}px`
      hippo.style.top = `${hippoY}px`
    }
    else {
      hippo.style.left = `0px`
    }
    requestAnimationFrame(loop)
  }


  startButton.addEventListener('click', () => {
    shouldHippoFollowMouse = false
    shouldHippoRun = !shouldHippoRun
    hippoX = 0
    hippo.style.top = '50%'
  })

  hippo.addEventListener('click', (event: MouseEvent) => {
    shouldHippoFollowMouse = true
    hippoX = event.clientX - hippo.width/2
    hippoY = event.clientY - hippo.height/2
  })

  loop()
}

