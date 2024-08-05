import { Component, Prop, h, Element, Host } from '@stencil/core'
import type { ColorScheme } from '@/types'

@Component({
  tag: 'orama-footer',
  styleUrl: 'orama-footer.scss',
})

/**
 * The orama-footer component is used to render a footer element with logo and keyboard shortcuts.
 */
export class OramaFooter {
  @Element() el: HTMLElement

  @Prop() class?: string
  @Prop() colorScheme?: ColorScheme = 'light'

  render() {
    const imgName = this.colorScheme === 'dark' ? 'orama-when-dark.svg' : 'orama-when-light.svg'
    return (
      <Host class="footer">
        <div class="powered-by">
          <orama-text as="small">Powered by</orama-text>
          <a href="https://www.orama.com" target="_blank" rel="noopener noreferrer" class="logo-link">
            <img src={`https://website-assets.oramasearch.com/${imgName}`} alt="Powered by Orama" class="logo" />
          </a>
        </div>
      </Host>
    )
  }
}
