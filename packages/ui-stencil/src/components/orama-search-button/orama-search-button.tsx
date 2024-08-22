import { Component, Watch, Prop, h, State, Element, Listen, Host } from '@stencil/core'
import type { ColorScheme } from '@/types'
import '@phosphor-icons/webcomponents/dist/icons/PhMagnifyingGlass.mjs'
import type { TThemeOverrides } from '@/components'
import { generateRandomID } from '@/utils/utils'
import { globalContext } from '@/context/GlobalContext'

export type ButtonClick = {
  id: HTMLElement
  searchboxId: string
}

@Component({
  tag: 'orama-search-button',
  styleUrl: 'orama-search-button.scss',
  shadow: true,
})
export class OramaSearchButton {
  @Element() el: HTMLElement

  @Prop() size: 'small' | 'medium' | 'large' = 'medium'
  @Prop() themeConfig?: Partial<TThemeOverrides>
  @Prop() colorScheme?: ColorScheme = 'light'

  @State() systemScheme: Omit<ColorScheme, 'system'> = 'light'
  @State() shortcutLabel = ''
  @State() componentID = generateRandomID('search-button')

  @Watch('themeConfig')
  @Watch('colorScheme')
  watchHandler() {
    this.updateTheme()
  }

  buttonRef!: HTMLElement

  @Listen('searchboxClosed', { target: 'body' })
  handleSearchboxClosed(event: CustomEvent<ButtonClick>) {
    // TODO: should be based on the id of current searchbox
    this.buttonRef.querySelector('button').focus()
  }

  // trigger click when entering  '⌘ K' o Mac or 'Ctrl + K'
  @Listen('keydown', { target: 'document' })
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
      event.preventDefault()
      this.buttonRef.click()
    }
  }

  updateTheme() {
    const scheme = this.colorScheme === 'system' ? this.systemScheme : this.colorScheme
    const uiElement = this.el as HTMLElement

    if (uiElement && scheme) {
      uiElement.classList.remove('theme-light', 'theme-dark')
      uiElement.classList.add(`theme-${scheme}`)
    }

    this.updateCssVariables(scheme as ColorScheme)
  }

  updateCssVariables(scheme: ColorScheme) {
    const config = this.themeConfig
    const root = this.el as HTMLElement

    if (root && config && scheme) {
      if (config.colors?.[scheme]) {
        for (const key of Object.keys(config.colors[scheme])) {
          root.style.setProperty(`${key}`, config.colors[scheme][key])
        }
      }
      if (config.typography) {
        for (const key of Object.keys(config.typography)) {
          root.style.setProperty(`${key}`, config.typography[key])
        }
      }
    }
  }

  detectSystemColorScheme() {
    const darkSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)')

    this.systemScheme = darkSchemeQuery.matches ? 'dark' : 'light'

    darkSchemeQuery.addEventListener('change', (event) => {
      this.systemScheme = event.matches ? 'dark' : 'light'
      if (this.colorScheme === 'system') {
        this.updateTheme()
      }
    })
  }

  private handleShortcutLabel() {
    const userAgent = navigator.userAgent
    const isMac = userAgent.includes('Mac')

    return isMac ? '⌘ K' : 'Ctrl + K'
  }

  componentWillLoad() {
    this.el.id = this.componentID
    this.updateTheme()
    this.detectSystemColorScheme()
    this.shortcutLabel = this.handleShortcutLabel()
  }

  render() {
    return (
      <Host>
        {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
        <orama-button
          type="button"
          variant="secondary"
          ref={(el) => (this.buttonRef = el)}
          size={this.size}
          onClick={() => {
            globalContext.open = true
          }}
        >
          <span slot="adorment-start">
            <ph-magnifying-glass />
          </span>
          <slot />
          <span slot="adorment-end" class="kyb-shortcut">
            {this.shortcutLabel}
          </span>
        </orama-button>
      </Host>
    )
  }
}
