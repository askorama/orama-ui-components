import { Component, Host, h, Element, Prop } from '@stencil/core';

export type SearchResultsProps = {
  items: { title: string; description: string , path?: string }[];
};

@Component({
  tag: 'orama-search-results',
  styleUrl: 'orama-search-results.scss',
})
export class SearchResults {
  @Element() el: HTMLUListElement;

  @Prop() items: SearchResultsProps['items'] = [];

  render() {
    if (!this.items.length) {
      return null;
    }

    return (
      <Host>
        <ul class="list">
          {this.items.map((item) => (
            <li class="list-item">
              <div>
                <orama-text as='h3' styledAs='p'>{item.title}</orama-text>
                <orama-text as='p' styledAs='span' class='collapsed'>{item.description}</orama-text>
              </div>
            </li>
          ))}
        </ul>
      </Host>
    );
  }
}
