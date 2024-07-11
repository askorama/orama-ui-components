import { Component, Prop, h, Element } from '@stencil/core'
import { AttributeUtils } from '../../../services/AttributeUtils'

type BaseProps = {
  /** the optional class name */
  class?: string
  /** the style variant of the button - default is primary */
  variant?: 'primary' | 'secondary'
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

  render() {
    const Tag = this.as
    const declaredProps = ['as', 'class', 'variant']
    const buttonProps = AttributeUtils.getNonExplicitAttributes(this.el, declaredProps)

    const buttonClass = `button button--${this.variant} ${this.class}`
    console.log('buttonClass', buttonProps)

    return (
      <Tag class={buttonClass} {...buttonProps}>
        <slot />
      </Tag>
    )
  }
}
