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

// element colors are all the colors under light and dark that are not semantic colors
const getElementsColors = (theme) => {
  return Object.keys(colors).reduce((acc, key) => {
    if (typeof colors[key] !== 'object') {
      return acc
    }
    if (key === theme) {
      for (const colorKey of Object.keys(colors[key])) {
        // include only the colors that don't start with the semantic color keys
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
  <div class="color-block" style="background-color: ${color}">
    <div class="color-label">${label}</div>
    <div class="color-value">${color}</div>
  </div>
`

const ColorsStory = () => html`
  <div style="padding: 20px; max-width: 1200px; margin: 0 auto;">
    <section>
      <h2>Primitive Colors</h2>
      <div class="color-container">
        ${Object.keys(primitiveColors).map((key) => renderColorBlock(primitiveColors[key], key))}
      </div>
    </section>
    <section>
      <h2>Semantic Colors</h2>
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
      <h3>Light Theme</h3>
      <div class="color-container">
        ${Object.keys(elementColorsLight).map((key) => renderColorBlock(elementColorsLight[key], key))}
      </div>
      <h3>Dark Theme</h3>
      <div class="color-container">
        ${Object.keys(elementColorsDark).map((key) => renderColorBlock(elementColorsDark[key], key))}
      </div>
    </section>
    <section>
      <h2>How to Use and Add Tokens</h2>
      <p>
        <strong>Primitive Colors:</strong> These are the basic colors used throughout the design system.
        They serve as the foundation for creating more complex color schemes.
      </p>
      <p>
        <strong>Semantic Colors:</strong> These colors convey specific meanings and are used to enhance
        user experience by providing visual cues. For example, the background, text colors, borders, and shadows.
      </p>
      <p>
        <strong>Element Colors:</strong> These colors are specific to UI elements like buttons, alerts, and other
        components. They are derived from the primitive colors and ensure consistency across the application.
      </p>
      <p>
        <strong>Adding Tokens:</strong> To add a new color token, update the respective color object in the codebase.
        Ensure to follow the naming conventions and maintain consistency. Once added, these tokens can be used in
        your stylesheets or inline styles.
      </p>
    </section>
  </div>
`

export default {
  title: 'Design Tokens/Colors',
  component: 'colors-story',
} as Meta

export const Colors: StoryObj = ColorsStory.bind({})
