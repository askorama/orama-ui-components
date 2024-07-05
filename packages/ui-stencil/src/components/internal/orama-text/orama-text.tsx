import { Component, Prop, h } from '@stencil/core';
export interface TextProps {
  /** it defines the HTML tag to be used */
  as?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'small' | 'a'
  /** it defines how it should look like */
  styledAs?: 'p' | 'span' | 'small'
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
  @Prop() as?: TextProps['as']
  @Prop() styledAs?: TextProps['styledAs']

  render() {
    const Tag = this.as || 'p';
    const style = this.styledAs || this.as || 'paragraph';

    return (
      <Tag class={style}>
        <slot />
      </Tag>
    );
  }
}
