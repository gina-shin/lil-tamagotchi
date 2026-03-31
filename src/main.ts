import './styles/global.css'

import { Game } from './engine/Game'
import { HomeScene } from './game/scenes/HomeScene'
import { RoomScene } from './game/scenes/RoomScene'

const appContainer = document.querySelector('#app')!

const game = new Game(appContainer as HTMLElement)

const shouldShowHome = true
game.setScene(shouldShowHome ? new HomeScene() : new RoomScene())
game.start()


