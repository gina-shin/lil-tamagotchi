export abstract class Scene {
  protected root: HTMLElement | null = null

  mount(root: HTMLElement) {
    this.root = root
  }

  getRoot() {
    if (!this.root) throw new Error('Scene is not mounted')
    return this.root
  }

  unmount() {
    this.root = null
  }

  abstract update(dt: number): void
}

