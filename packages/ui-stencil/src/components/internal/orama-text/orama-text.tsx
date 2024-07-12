import { Component, Prop, h, State, Element } from '@stencil/core'
// import { AttributeUtils } from '../../../services/AttributeUtils';

export interface TextProps {
  /** it defines the HTML tag to be used */
  as?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'small' | 'a'
  /** it defines how it should look like */
  styledAs?: 'p' | 'span' | 'small' | undefined
  /** the optional class name */
  class?: string
  /** optionally change text alignment */
  align?: 'left' | 'center' | 'right'
}
@Component({
  tag: 'orama-text',
  styleUrl: 'orama-text.scss',
})

/**
 * The OramaText component is used to render a text element with a specific style.
 *
 */
export class OramaText implements TextProps {
  @Element() el: HTMLElement

  @Prop() as?: TextProps['as'] = 'p'
  @Prop() styledAs?: TextProps['styledAs']
  @Prop() class?: string
  @Prop() align?: TextProps['align']

  @State() defaultStyle: string =
    this.styledAs === 'span' || this.styledAs === 'small' || this.styledAs === 'p' ? this.styledAs : this.as

  render() {
    const Tag = this.as
    // const declaredProps = ['as', 'styled-as', 'class']
    // const textProps = AttributeUtils.getNonExplicitAttributes(this.el, declaredProps)

    return (
      <Tag
        class={{
          [this.defaultStyle]: true,
          [`text-${this.align}`]: !!this.align,
          [this.class]: !!this.class,
        }}
      >
        <slot />
      </Tag>
    )
  }
}
