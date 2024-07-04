import { Component, Prop, h } from '@stencil/core';

export type SpanProps = {
  as?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'small' | 'a'
}

@Component({
  tag: 'orama-span',
  styleUrl: 'typography.scss',
})

export class Span implements SpanProps {
  @Prop() as?: SpanProps['as']

  render() {
    const Tag = this.as || 'span';

    return (
      <Tag class="span">
        <slot />
      </Tag>
    );
  }
}
