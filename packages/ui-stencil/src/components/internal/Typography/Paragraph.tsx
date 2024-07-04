import { Component, Prop, h } from '@stencil/core';
export interface ParagraphProps {
  as?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'small';
}
@Component({
  tag: 'orama-paragraph',
  styleUrl: 'typography.scss',
})

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
