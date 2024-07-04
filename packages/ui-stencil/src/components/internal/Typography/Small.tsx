import { Component, Prop, h } from '@stencil/core';

export interface SmallProps {
  as?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'Small' | 'small' | 'a'
}

@Component({
  tag: 'orama-small',
  styleUrl: 'typography.scss',
})

export class Small implements SmallProps {
  @Prop() as?: SmallProps['as']

  render() {
    const Tag = this.as || 'small';

    return (
      <Tag class="small">
        <slot />
      </Tag>
    );
  }
}
