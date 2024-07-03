import { Component, Prop, h } from '@stencil/core';
export interface ParagraphProps {
  as?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}
@Component({
  tag: 'orama-paragraph',
  styleUrl: 'typography.scss',
})

export class Paragraph implements ParagraphProps {
  @Prop() as?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

  render() {
    const Tag = this.as || 'p';

    return (
      <Tag class="paragraph">
        <slot />
      </Tag>
    );
  }
}
