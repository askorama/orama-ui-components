import { Component, Prop, h } from '@stencil/core';
export interface ParagraphProps {
  as?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'small' | 'a'
}
@Component({
  tag: 'orama-paragraph',
  styleUrl: 'typography.scss',
})

/**
 * The Paragraph component is used to render a paragraph of text.
 *
 */
export class Paragraph implements ParagraphProps {
  @Prop() as?: ParagraphProps['as']

  render() {
    const Tag = this.as || 'p';

    return (
      <Tag class="paragraph">
        <slot />
      </Tag>
    );
  }
}
