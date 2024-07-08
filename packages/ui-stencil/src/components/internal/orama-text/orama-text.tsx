import { Component, Prop, h, State } from '@stencil/core';

export interface TextProps {
  /** it defines the HTML tag to be used */
  as?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'small' | 'a'
  /** it defines how it should look like */
  styledAs?: 'paragraph' | 'span' | 'small' | undefined
  /** the optional class name */
  class?: string
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
  @Prop() as?: TextProps['as'] = 'p'
  @Prop() styledAs?: TextProps['styledAs']
  @Prop() class?: string

  @State () defaultStyle: string = this.styledAs === 'span' || this.styledAs === 'small'  ? `${this.styledAs}` : `p`

  render() {
    const Tag = this.as;

    return (
      <Tag class={{
        [this.defaultStyle]: true,
        [this.class]: !!this.class
      }}>
        <slot />
      </Tag>
    );
  }
}
