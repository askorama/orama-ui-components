export class WindowService extends EventTarget {
  private _width: number

  constructor() {
    super()
    this._width = window.innerWidth
    this.handleResize = this.handleResize.bind(this)
    window.addEventListener('resize', this.handleResize)
  }

  private handleResize() {
    this._width = window.innerWidth
    this.dispatchEvent(new CustomEvent('widthChange', { detail: this._width }))
  }

  get width() {
    return this._width
  }
}

const windowWidthListener = new WindowService()

export { windowWidthListener }
