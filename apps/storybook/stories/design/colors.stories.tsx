import { html } from 'lit-html'
import type { Meta, StoryObj } from '@storybook/web-components'
import './colors.css'
import colors from '@orama/wc-components/src/config/colors'

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

const semanticColorsLight = getSemanticColors('light')
const semanticColorsDark = getSemanticColors('dark')

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

const elementColorsLight = getElementsColors('light')
const elementColorsDark = getElementsColors('dark')

const renderColorBlock = (color, label) => html`
  <div class="color-wrapper">
    <div class="color-block" style="background-color: ${color}"></div>
    <span class="color-label">${label}</span>
    <span class="color-value">${color}</span>
  </div>
`

const ColorsStory = () => html`
  <div style="padding: 20px; max-width: 1200px; margin: 0 auto; color: var(--text-color-primary)">
    <section>
      <h2>Primitive Colors</h2>
      <p>These are the basic colors used throughout the design system. They serve as the foundation for creating more complex color schemes.</p>
      <p>These colors are used to create the semantic and element colors. You can apply them directly to elements only when you need to apply the same color regardless of the theme.</p>
      <div class="color-container">
        ${Object.keys(primitiveColors).map((key) => renderColorBlock(primitiveColors[key], key))}
      </div>
    </section>
    <section>
      <h2>Semantic Colors</h2>
      <p>These colors convey specific meanings and are used to enhance
      user experience by providing visual cues. For example, the background, text colors, borders, and shadows.</p>
      <h3>Light Theme</h3> 
      <div class="color-container">
        ${Object.keys(semanticColorsLight).map((key) => renderColorBlock(semanticColorsLight[key], key))}
      </div>
      <h3>Dark Theme</h3>
      <div class="color-container">
        ${Object.keys(semanticColorsDark).map((key) => renderColorBlock(semanticColorsDark[key], key))}
      </div>
    </section>
    <section>
      <h2>Element Colors</h2>
      <p>These colors are specific to UI elements like buttons, alerts, and other
      components. They are derived from the primitive colors and ensure consistency across the application.</p>
      <h3>Light Theme</h3>
      <div class="color-container">
        ${Object.keys(elementColorsLight).map((key) => renderColorBlock(elementColorsLight[key], key))}
      </div>
      <h3>Dark Theme</h3>
      <div class="color-container">
        ${Object.keys(elementColorsDark).map((key) => renderColorBlock(elementColorsDark[key], key))}
      </div>
    </section>
  </div>
`

export default {
  title: 'Design Tokens/Colors',
  component: 'colors-story',
} as Meta

export const Colors: StoryObj = ColorsStory.bind({})
