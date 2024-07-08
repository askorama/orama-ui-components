import { Component, Host, Prop, State, h, Element } from '@stencil/core'
// import '@phoshpor-icons/webcomponents/PhHorse'
import { AttributeUtils } from '../../../services/AttributeUtils'

type BaseInputProps = {
  name?: string
  placeholder?: string
  size?: 'small' | 'medium' | 'large'
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search'
}

type ConditionalInputProps =
  | {
      label: string
      labelForScreenReaders?: never
    }
  | {
      label?: never
      labelForScreenReaders?: string
    }

export type InputProps = BaseInputProps & ConditionalInputProps

@Component({
  tag: 'orama-input',
  styleUrl: 'orama-input.scss',
})
export class Input {
  @Element() el: HTMLElement

  @Prop() name: InputProps['name']
  @Prop() size?: InputProps['size'] = 'medium'
  @Prop() label?: InputProps['label']
  @Prop() type?: InputProps['type'] = 'text'
  @Prop() labelForScreenReaders?: InputProps['labelForScreenReaders']

  @State() value = ''

  render() {
    const inputSizeClass = `input input--${this.size}`
    const labelClass = `label ${this.labelForScreenReaders ? 'sr-only' : ''}`

    const declaredProps = ['id', 'name', 'type', 'class', 'onInput']
    const inputProps = AttributeUtils.getNonExplicitAttributes(this.el, declaredProps)

    return (
      <Host>
        <div class="input-wrapper">
          <label htmlFor={this.name} class={labelClass}>
            {this.label || this.labelForScreenReaders}
          </label>
          <input
            class={inputSizeClass}
            id={this.name}
            type={this.type}
            onInput={(e: Event) => (this.value = (e.target as HTMLInputElement).value)}
            {...inputProps}
          />
          <ph-horse></ph-horse>
        </div>
      </Host>
    )
  }
}
