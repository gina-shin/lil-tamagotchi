export type KeyState = Readonly<{
  down: boolean
  pressed: boolean
  released: boolean
}>

export class Keyboard {
  private readonly down = new Set<string>()
  private readonly pressed = new Set<string>()
  private readonly released = new Set<string>()

  private onKeyDown = (e: KeyboardEvent) => {
    const code = e.code
    if (!this.down.has(code)) this.pressed.add(code)
    this.down.add(code)
  }

  private onKeyUp = (e: KeyboardEvent) => {
    const code = e.code
    this.down.delete(code)
    this.released.add(code)
  }

  attach(target: Window = window) {
    target.addEventListener('keydown', this.onKeyDown)
    target.addEventListener('keyup', this.onKeyUp)
  }

  detach(target: Window = window) {
    target.removeEventListener('keydown', this.onKeyDown)
    target.removeEventListener('keyup', this.onKeyUp)
    this.down.clear()
    this.pressed.clear()
    this.released.clear()
  }

  step() {
    this.pressed.clear()
    this.released.clear()
  }

  state(code: string): KeyState {
    return {
      down: this.down.has(code),
      pressed: this.pressed.has(code),
      released: this.released.has(code),
    }
  }
}

