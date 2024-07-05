// create stencil component for Input
import { Component, Host, Prop, State, h, Element } from '@stencil/core'
import { AttributeUtils } from '../../../services/AttributeUtils'

type BaseInputProps = {
  name?: string
  placeholder?: string
  size?: 'small' | 'medium' | 'large'
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
  styleUrl: 'form.scss'
})
export class Input {
  @Element() el: HTMLElement

  @Prop() name: InputProps['name']
  @Prop() placeholder?: InputProps['placeholder']
  @Prop() size?: InputProps['size'] = 'medium'
  @Prop() label?: InputProps['label']
  @Prop() labelForScreenReaders?: InputProps['labelForScreenReaders']

  // inherits attributes from the input element
  @Prop() type: string

  @State() value = ''

  render() {
    const inputSizeClass = `input input--${this.size}`
    const labelClass = `label ${this.labelForScreenReaders ? 'sr-only' : ''}`

    const declaredProps = ['id', 'name']
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
            placeholder={this.placeholder || null}
            onInput={(e: Event) => (this.value = (e.target as HTMLInputElement).value)}
            value={this.value}
            {...inputProps}
          />
        </div>
      </Host>
    )
  }
}
