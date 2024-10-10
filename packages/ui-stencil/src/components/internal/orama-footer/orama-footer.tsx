import { Component, Prop, h, Element, Host } from '@stencil/core'
import type { ColorScheme } from '@/types'

@Component({
  tag: 'orama-footer',
  styleUrl: 'orama-footer.scss',
  scoped: true,
})

/**
 * The orama-footer component is used to render a footer element with logo and keyboard shortcuts.
 */
export class OramaFooter {
  @Element() el: HTMLElement

  @Prop() class?: string
  @Prop() colorScheme?: Omit<ColorScheme, 'system'> = 'light'

  private poweredByDestinationUrl: string
  private linkTarget = '_blank'

  componentWillLoad() {
    const utmSource = encodeURIComponent(window.location.hostname)
    this.poweredByDestinationUrl = `https://www.orama.com/?utm_source=${utmSource}&utm_medium=powered-by`
    if (['localhost', 'orama.com'].includes(utmSource)) {
      this.linkTarget = '_parent'
    }
  }

  render() {
    const imgName = this.colorScheme === 'dark' ? 'orama-when-dark.svg' : 'orama-when-light.svg'
    return (
      <Host>
        <div class="powered-by">
          <a href={this.poweredByDestinationUrl} target={this.linkTarget} rel="noopener noreferrer" class="logo-link">
            <orama-text as="small">Powered by</orama-text>
            <img
              src={`https://website-assets.oramasearch.com/${imgName}`}
              alt="Powered by Orama"
              class="logo"
              width={62}
            />
          </a>
        </div>
      </Host>
    )
  }
}
