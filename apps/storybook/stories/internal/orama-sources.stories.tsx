import type { StoryObj, Meta } from '@storybook/web-components'
import type { Components } from '@orama/wc-components'
import { html } from 'lit-html'

const meta: Meta<Components.OramaSources> = {
  title: 'Components/Internal/Sources',
  component: 'orama-sources',
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<Components.OramaSources>

export const Sources: Story = {
  render: ({ sources }) => {
    return html`
    <div style="background-color: black;
              /* widht: 100%; */
              max-width: 100%;
              height: 400px;
              padding: 20px 0;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              overflow: hidden">
      <orama-sources style="width: 100%;" .sources=${sources}></orama-sources>
    </div>`
  },
  args: {
    sources: [
      {
        title: 'Paris',
        description: 'The capital of France',
        path: 'https://en.wikipedia.org/wiki/Paris',
      },
      {
        title: 'Buenos Aires',
        description: 'The capital of Argentina',
        path: 'https://en.wikipedia.org/wiki/Buenos_Aires',
      },
      {
        title: 'Brasília',
        description: 'The capital of Brasil',
        path: 'https://en.wikipedia.org/wiki/Brazil',
      },
      {
        title: 'Recife',
        description: 'Alternative capital of Brazil',
        path: 'https://en.wikipedia.org/wiki/Recife',
      },
      {
        title: 'Pernambuco',
        description: 'A country inside Brazil',
        path: 'https://en.wikipedia.org/wiki/Brasil',
      },
      {
        title: 'Imbiribeira',
        description: 'Neughbourhood of Recife',
        path: 'https://en.wikipedia.org/wiki/imbiribeira',
      },
      {
        title: 'Lagoa do Araça',
        description: 'Neughbourhood of Recife',
        path: 'https://en.wikipedia.org/wiki/imbiribeira',
      },
    ],
  },
}
