import { Component, Prop, h, Element } from '@stencil/core'
import { getNonExplicitAttributes } from '@/utils/utils'

type BaseProps = {
  /** the optional class name */
  class?: string
  /** the style variant of the button - default is primary */
  variant?: 'primary' | 'secondary' | 'icon'
}

type ConditionalProps =
  | {
      /** it defines the HTML tag to be used */
      as?: 'button'
      type: 'button' | 'submit' | 'reset'
    }
  | {
      /** it defines the HTML tag to be used */
      as?: 'a'
      href: string
      type?: never
    }

export type ButtonProps = BaseProps & ConditionalProps

@Component({
  tag: 'orama-button',
  styleUrl: 'orama-button.scss',
  scoped: true,
})

/**
 * The orama-button component is used to render a button or anchor element looking like a button.
 */
export class OramaButton {
  @Element() el: HTMLButtonElement | HTMLAnchorElement

  @Prop() as?: ButtonProps['as'] = 'button'
  @Prop() class?: string
  @Prop() variant?: ButtonProps['variant'] = 'primary'
  @Prop() type?: ButtonProps['type']
  @Prop() disabled?: boolean
  @Prop() withTooltip?: string

  render() {
    const Tag = this.as
    const declaredProps = ['as', 'class', 'variant']
    const buttonProps = getNonExplicitAttributes(this.el, declaredProps)

    const buttonClass = `button button--${this.variant} ${this.class}`

    return (
      <Tag class={buttonClass} {...buttonProps} disabled={this.disabled}>
        <slot />
        {this.withTooltip && <span class="button__tooltip">{this.withTooltip}</span>}
      </Tag>
    )
  }
}
