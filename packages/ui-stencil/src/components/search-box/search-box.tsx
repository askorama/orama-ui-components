import { Component, Host, Prop, h } from '@stencil/core'
import cssCustomProperties from '../../config/colors';

@Component({
  tag: 'search-box',
  styleUrl: 'search-box.scss',
  shadow: true
})
export class SearchBox {
  @Prop() theme: { colors: { light: { primaryColor: string }; dark: { primaryColor: string } } }
  @Prop() color: 'dark' | 'light' | 'system'

  render() {
    console.log('***vars 1***', cssCustomProperties, typeof cssCustomProperties)
    return (
      <Host>
        <style>{`:host { --primary-color: ${this.theme?.colors?.light?.primaryColor}; }`}</style>

        <div>This is the searchbox</div>

        <button type="button" class="btn">
          This is a button
        </button>
      </Host>
    )
  }
}
