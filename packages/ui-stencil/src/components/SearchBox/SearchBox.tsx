import { Component, Host, Prop, h } from '@stencil/core'
import  { sassVariables } from '../../config/colors';

@Component({
  tag: 'search-box',
  styleUrl: 'searchbox.scss',
  shadow: true
})
export class SearchBox {
  @Prop() themeConfig: { colors: { light: { primaryColor: string }; dark: { primaryColor: string } } }
  @Prop() color: 'dark' | 'light' | 'system'

  render() {
    console.log('***vars 1***', sassVariables, typeof sassVariables)

    return (
      <Host>
        <style>{`:host { --primary-color: ${this.themeConfig?.colors?.light?.primaryColor}; }`}</style>

        <orama-paragraph>This is the searchbox</orama-paragraph>

        <button type="button" class="btn">
          This is a button
        </button>
      </Host>
    )
  }
}
