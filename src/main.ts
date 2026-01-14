import { renderHome } from './Home'
import { renderGame } from './Game'
import './styles/global.css'

const shouldShowHome = true

const appContainer = document.querySelector('#app')!

if (shouldShowHome) {
  renderHome(appContainer as HTMLElement)
} else {
  renderGame(appContainer as HTMLElement)
}


