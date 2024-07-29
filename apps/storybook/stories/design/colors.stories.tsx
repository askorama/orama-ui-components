import { html } from 'lit-html'
import type { Meta, StoryObj } from '@storybook/web-components'
import colors from '@orama/wc-components/src/config/colors'
import { DARK_THEME_BG } from '../../constants'
import './colors.css'

const primitiveColors = Object.keys(colors).reduce((acc, key) => {
  if (typeof colors[key] === 'string') {
    acc[key] = colors[key]
  }
  return acc
}, {})

const semanticColorKeys = ['--text', '--background', '--border', '--shadow', '--icon']

const getSemanticColors = (theme) => {
  return Object.keys(colors).reduce((acc, key) => {
    if (typeof colors[key] !== 'object') {
      return acc
    }
    if (key === theme) {
      for (const colorKey of Object.keys(colors[key])) {
        if (semanticColorKeys.some((semanticColorKey) => colorKey.startsWith(semanticColorKey))) {
          acc[colorKey] = colors[key][colorKey]
        }
      }
    }
    return acc
  }, {})
}

const getSingleSemanticColorsByTheme = (themeSemanticColors, semanticKey) => {
  return Object.keys(themeSemanticColors).reduce((acc, key) => {
    if (key.startsWith(semanticKey)) {
      acc[key] = themeSemanticColors[key]
    }
    return acc
  }, {})
}

const getElementsColors = (theme) => {
  return Object.keys(colors).reduce((acc, key) => {
    if (typeof colors[key] !== 'object') {
      return acc
    }
    if (key === theme) {
      for (const colorKey of Object.keys(colors[key])) {
        if (!semanticColorKeys.some((semanticColorKey) => colorKey.startsWith(semanticColorKey))) {
          acc[colorKey] = colors[key][colorKey]
        }
      }
    }
    return acc
  }, {})
}

const renderPrimitiveBlock = (color, label) => html`
  <div class="color-wrapper">
    <div class="color-block" style="background-color: ${color}"></div>
    <span class="color-label">${label}</span>
    <span class="color-value">${color}</span>
  </div>
`

const renderColorBlock = (color, label) => html`
  <div class="color-wrapper">
    <div class="color-block" style="background-color: var(${label})"></div>
    <span class="color-label">${label}</span>
    <span class="color-value">${color}</span>
  </div>
`

const PrimitiveColors = () => {
  return html`
  <div style="padding: 20px; max-width: 1200px; margin: 0 auto; color: var(--text-color-primary)">
    <section>
      <h2>Primitive Colors</h2>
      <p>These are the basic colors used throughout the design system. They serve as the foundation for creating more complex color schemes.</p>
      <p>These colors are used to create the semantic and element colors. Avoid using these colors directly in the UI, unless you need an element to always have a specific color regardless of the theme.</p>
      <div class="color-container">
        ${Object.keys(primitiveColors).map((key) => renderPrimitiveBlock(primitiveColors[key], key))}
      </div>
    </section>
  </div>
`
}

const SemanticColors = (args, context) => {
  const semanticColors = getSemanticColors(context.globals?.backgrounds?.value === DARK_THEME_BG ? 'dark' : 'light')
  const textColors = getSingleSemanticColorsByTheme(semanticColors, '--text')
  const backgroundColors = getSingleSemanticColorsByTheme(semanticColors, '--background')
  const borderColors = getSingleSemanticColorsByTheme(semanticColors, '--border')
  const shadowColors = getSingleSemanticColorsByTheme(semanticColors, '--shadow')
  const iconColors = getSingleSemanticColorsByTheme(semanticColors, '--icon')

  return html`
  <div style="padding: 20px; max-width: 1200px; margin: 0 auto; color: var(--text-color-primary)">
    <section>
      <h2>Semantic Colors</h2>
      <p>These colors convey specific meanings and are used to enhance
      user experience by providing visual cues. For example, the background, text colors, borders, and shadows.</p>
      <p>You must always use these colors instead of the primitive colors to ensure consistency across the application and to make it easier to switch between themes.</p>
      <h3>Text colors</h3>
      <div class="color-container">
        ${Object.keys(textColors).map((key) => renderColorBlock(textColors[key], key))}
      </div>
      <h3>Background colors</h3>
      <div class="color-container">
        ${Object.keys(backgroundColors).map((key) => renderColorBlock(backgroundColors[key], key))}
      </div>
      <h3>Border colors</h3>
      <div class="color-container">
        ${Object.keys(borderColors).map((key) => renderColorBlock(borderColors[key], key))}
      </div>
      <h3>Shadow colors</h3>
      <div class="color-container">
        ${Object.keys(shadowColors).map((key) => renderColorBlock(shadowColors[key], key))}
      </div>
      <h3>Icon colors</h3>
      <div class="color-container">
        ${Object.keys(iconColors).map((key) => renderColorBlock(iconColors[key], key))}
      </div>
    </section>
  </div>
`
}

const ElementColors = (args, context) => {
  const elementColors = getElementsColors(context.globals?.backgrounds?.value === DARK_THEME_BG ? 'dark' : 'light')

  return html`
  <div style="padding: 20px; max-width: 1200px; margin: 0 auto; color: var(--text-color-primary)">
    <section>
      <h2>Element Colors</h2>
      <p>These colors are specific to UI elements like buttons, alerts, and other
      components. They are derived from the primitive colors and ensure consistency across the application.</p>
      <div class="color-container">
        ${Object.keys(elementColors).map((key) => renderColorBlock(elementColors[key], key))}
      </div>
    </section>
  </div>
`
}

export default {
  title: 'Design Tokens/Colors',
  component: 'colors-story',
} as Meta

type Story = StoryObj

export const Primitive: Story = {
  render: PrimitiveColors.bind({}),
  args: {},
}

export const Semantic: Story = {
  render: SemanticColors.bind({}),
  args: {},
}

export const Element: Story = {
  render: ElementColors.bind({}),
  args: {},
}
