import type { Meta, StoryObj } from '@storybook/web-components'
import type { Components } from '@orama/wc-components'
import demoIndexes from '../config'
import { html } from 'lit-html'
import type { DemoIndexConfig } from '../config'

const meta: Meta<Components.OramaSearchBox & { preset: keyof DemoIndexConfig }> = {
  title: 'Components/SearchBox',
  component: 'orama-search-box',
  argTypes: {
    preset: {
      options: Object.keys(demoIndexes),
      mapping: demoIndexes,
      control: { type: 'select' },
    },
    index: {
      control: { type: 'object' },
      table: {
        type: {
          summary: 'CloudIndexConfig',
          detail: `{
  api_key: string
  endpoint: string
}`,
        },
      },
    },
    sourceBaseUrl: {
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    sourcesMap: {
      table: {
        type: {
          summary: 'SourcesMap',
          detail: `{
  title?: string
  description?: string
  path?: string
}`,
        },
      },
    },
    suggestions: {
      table: {
        type: {
          summary: 'string[]',
        },
      },
    },
    colorScheme: {
      options: ['light', 'dark', 'system'],
      table: {
        defaultValue: { summary: 'light' },
      },
      control: { type: 'radio' },
    },
    disableChat: { type: 'boolean', defaultValue: false },
    themeConfig: {
      table: {
        type: {
          summary: 'Partial<TThemeOverrides>',
        },
      },
    },
  },
}
export default meta

// TODO: Poor controls: https://linear.app/oramasearch/issue/ORM-1823/poor-serachbox-storybook-controls
const SearchBoxTemplate = ({ preset, colorScheme, layout, disableChat }) => {
  return html`<orama-search-box
      .open=${preset?.open}
      .facetProperty=${preset?.facetProperty}
      .resultMap=${preset?.resultMap}
      .colorScheme=${colorScheme}
      .themeConfig=${preset.themeConfig}
      .index=${preset.index}
      .instance=${preset.instance}
      .suggestions=${preset?.suggestions}
      .sourceBaseUrl=${preset?.sourceBaseUrl}
      .sourcesMap=${preset?.sourcesMap}
      .disableChat=${disableChat}
      .layout=${layout}
    ></orama-search-box>`
}

const SearchBoxWithButtonTemplate = ({ preset, colorScheme, disableChat }) => {
  return html`
    <div style="display: flex; justify-content: flex-start">
      <div style="width: 240px">
      <orama-search-button
        label="Search"
        .colorScheme=${colorScheme}
        .size=${'medium'}
      >
          ${'Search'}
      </orama-search-button>
      </div>
      <orama-search-box
        .open=${preset?.open}
        .facetProperty=${preset?.facetProperty}
        .resultMap=${preset?.resultMap}
        .colorScheme=${colorScheme}
        .themeConfig=${preset.themeConfig}
        .index=${preset.index}
        .instance=${preset.instance}
        .suggestions=${preset?.suggestions}
        .sourceBaseUrl=${preset?.sourceBaseUrl}
        .sourcesMap=${preset?.sourcesMap}
        .disableChat=${disableChat}
      >
      </orama-search-box>
    </div>
  `
}

type Story = StoryObj<Components.OramaSearchBox & { preset: keyof DemoIndexConfig }>

export const SearchModal: Story = {
  render: SearchBoxWithButtonTemplate as any,
  args: {
    preset: 'orama',
    colorScheme: 'light',
  },
}

export const SearchBox: Story = {
  render: SearchBoxTemplate as any,
  args: {
    preset: 'orama',
    colorScheme: 'light',
    layout: 'embedded',
  },
}
